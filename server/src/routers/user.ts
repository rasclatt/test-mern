import { Users } from './users/model';
import { IUser } from './users/interface';
import { decrypt, encrypt } from '../helpers/crypt';
import { obfuscateIds } from '../middleware/obfuscate';
import { body, validationResult } from 'express-validator';
import { hashPassword } from './users/helpers';
import { getUsersFromExternal } from '../services/users.service';
import { successResponse } from '../helpers/http';
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const obfuscate = (account: any) => {
  let u = obfuscateIds(account);
  if(u.password)
    delete u.password;
  return u;
}

const router = express.Router();

router.post('/auth', async (req: {body: IUser}, res: any) => {
    let { email, password } = req.body;
    email = email?.trim();
    password = password?.trim();
    try {
        /**
         * Just to demonstrate hitting an external API, has no relevance to the actual code
        */
        // const external = await getUsersFromExternal(1, 20);
        // const d = await external.json();

        if(!email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        // Find the user by email
        const user = await Users.getBy<IUser>({ email }, true);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Create a JWT token
        const token = jwt.sign({ id: encrypt(user._id?.toString() || '') }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error: any) {
      res.status(500).json({ message: error?.message || 'Server error' });
    }
});
// Create user route
router.post('/create', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('first_name').notEmpty().withMessage('First name is required'),
  body('last_name').notEmpty().withMessage('Last name is required'),
], async (req: { body: IUser }, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
    let { email, password, first_name, last_name } = req.body;
    try {
      if (!email || !password || !first_name || !last_name) {
        return res.status(400).json({ message: 'Please enter all fields' });
      }
      const exists: IUser = await Users.getBy<IUser>({ email }, true);
      if(exists) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const userCount = await Users.getModel().countDocuments();
      const usergroup = userCount === 0? '1' : req.body.usergroup || '3';
      const form = {...req.body, username: req.body.email, usergroup };
      if(form.action)
        delete form.action;
      // Create a new user
      const newUser = await Users.create(form);
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(500).json({ message: error?.message || 'Server error' });
    }
  });

router.get('/account', async (req: any, res: any) => {
  const { filter } = req.query;
  try {
      const resp: { code: number, data: any } = { code: 200, data: null };
      if(Array.isArray(filter) && filter.includes('all') && req.isAdmin) {
        resp.data = await Users.get();
        resp.data = resp.data.map(obfuscate);
      } else {
        if(!req.token || !req.account) {
          resp.code = 400;
          resp.data = { message: 'Invalid token' };
        } else {
          resp.data = obfuscate(req.account);
        }
      }
      return res.status(resp.code).json(successResponse(resp.data));
  } catch (error: any) {
    res.status(500).json({ message: error?.message || 'Server error' });
  }
});

router.delete('/delete/:id', async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const resp: { code: number, data: any } = { code: 200, data: null };
    resp.data = await Users.getById(decrypt(id));
    if(!req.isAdmin || parseInt(resp.data.usergroup) < parseInt(req.account.usergroup)) {
      resp.code = 401;
      resp.data = { message: 'Unauthorized' };
    } else {
      await Users.delete(decrypt(id));
      resp.data = { message: 'User deleted' };
    }
    return res.status(resp.code).json(successResponse(resp.data));
  } catch (error: any) {
    res.status(500).json({ message: error?.message || 'Server error' });
  }
});

router.patch('/account', async (req: any, res: any) => {
  const { body } = req;
  try {
      if(!body.email && !body.first_name && !body.last_name) {
        return res.status(400).json({ message: 'Please enter all fields' });
      }
      if(!req.token || !req.account) {
        return res.status(400).json({ message: 'Invalid token' });
      }
      let uid = body._id || req.account._id;
      if(!req.isAdmin) {
        uid = req.account._id;
      } else {
        uid = decrypt(uid);
      }
      if(body._id)
          delete body._id;
      if(body.password) {
        body.password = await hashPassword(body.password);
      }
      const user = await Users.getModel().findByIdAndUpdate(uid, body, { new: true });
      let u = obfuscate(user?.toObject());
      delete u.password;
      res.status(200).json(u);
  } catch (error: any) {
    res.status(500).json({ message: error?.message || 'Server error' });
  }
});

export default router;