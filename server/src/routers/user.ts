import { Users } from './users/model';
import { IUser } from './users/interface';
import { encrypt } from '../helpers/crypt';
import { obfuscateIds } from '../middleware/obfuscate';
import { body, validationResult } from 'express-validator';
import { hashPassword } from './users/helpers';
import { getUsersFromExternal } from '../services/users.service';
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
        const external = await getUsersFromExternal(1, 20);
        const d = await external.json();
        console.log(d, 'external');

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
        res.json({ token });
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
      // Create a new user
      const newUser = await Users.create({...req.body, username: req.body.email, usergroup });
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(500).json({ message: error?.message || 'Server error' });
    }
  });

router.get('/account', async (req: any, res: any) => {
  const { all } = req.query;
  try {
      if(all) {
        const users = await Users.get();
        return res.status(200).json(users);
      } else {
        if(!req.token || !req.account) {
          return res.status(400).json({ message: 'Invalid token' });
        }
        return res.status(200).json(obfuscate(req.account));
      }
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
      delete body._id;
      if(body.password) {
        body.password = await hashPassword(body.password);
      }
      const user = await Users.getModel().findByIdAndUpdate(req.account._id, body, { new: true });
      let u = obfuscate(user?.toObject());
      delete u.password;
      res.status(200).json(u);
  } catch (error: any) {
    res.status(500).json({ message: error?.message || 'Server error' });
  }
});


export default router;