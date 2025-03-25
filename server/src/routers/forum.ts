const express = require('express');
import { body, validationResult } from 'express-validator';
import { failResponse, successResponse } from '../helpers/http';
import { IUser } from './users/interface';
import { decrypt } from '../helpers/crypt';
import { isAdmin } from './users/helpers';
import Forum from './forum/model';

const router = express.Router();

router.post('/', [
//   body('email').isEmail().withMessage('Please enter a valid email'),
//   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
//   body('first_name').notEmpty().withMessage('First name is required'),
//   body('last_name').notEmpty().withMessage('Last name is required'),
], async (req: any, res: any) => {
    //const errors = validationResult(req);
    let data: any = {};
    const account: IUser = req.account;
    if(!req.loggedIn) {
        return res.status(401).json(failResponse('You must be logged in to create a forum', undefined, true));
    }
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
    if(!isAdmin(req)) {
        return res.status(401).json(failResponse('You must be an admin to create a forum'));
    }
    try {
        let { _id, title, description, category, content } = req.body;
        if(!_id) {
            data = await Forum.create({ category, title, description, content, uid: account._id });
        } else {
            _id = decrypt(_id.toString());
            console.log(_id, { category, title, description, content });
            data = await Forum.update(_id, { category, title, description, content });
            if(data === null) {
                data = req.body;
            }
        }
        res.status(200).json(successResponse(data));
    } catch (error: any) {
        res.status(500).json({ message: error?.message || 'Server error' });
    }
});

router.get('/', async (req: any, res: any) => {
    try {
        const data = await Forum.get(undefined, { createdAt: -1 });
        res.status(200).json( successResponse(data));
    } catch (error: any) {
        res.status(500).json(failResponse(error?.message || 'Server error' ));
    }
});

router.delete('/', [
        body('id').notEmpty().withMessage('A forum id is required to delete a forum.'),
    ],
    async (req: any, res: any) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json(failResponse(errors.array().join('. ')));
        }
        if(!isAdmin(req)) {
            return res.status(401).json(failResponse('You must be an admin to delete a forum'));
        }
        const { id } = req.body;
        try {
            const data = await Forum.delete(decrypt(id.toString()));
            res.status(200).json( successResponse(data));
        } catch (error: any) {
            res.status(500).json(failResponse(error?.message || 'Server error' ));
        }
    }
);

export default router;