import { Request, Response, NextFunction } from 'express';
import { Users } from '../routers/users/model';
import { IUser } from '../routers/users/interface';
import { decrypt, generateEncryptionKey } from '../helpers/crypt';

const trimRequestBody = (obj: any): any => {
    if (typeof obj === 'string') {
        return obj.trim();
    } else if (Array.isArray(obj)) {
        return obj.map(trimRequestBody);
    } else if (typeof obj === 'object' && obj !== null) {
        return Object.keys(obj).reduce((acc, key) => {
            acc[key] = trimRequestBody(obj[key]);
            return acc;
        }, {} as any);
    }
    return obj;
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    (req as any).body = trimRequestBody(req.body);
    if (authHeader) {
        let account: IUser | null = null;
        let token = authHeader.split(' ')[1];
        if (token) {
            const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
            const expiration = payload.exp || -1;
            if (Date.now() >= expiration * 1000) {
                token = '';
            } else {
                const id: string = decrypt(payload.id);
                const r = await Users.getById(id);
                if (r?._id) {
                    (req as any).account = r;
                } else {
                    token = '';
                }
            }
        }
        (req as any).token = token;
    } else {
        (req as any).token = '';
    }
    (req as any).tester = generateEncryptionKey();

    next();
};