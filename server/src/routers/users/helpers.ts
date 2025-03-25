import { IUser } from "./interface";

const bcrypt = require('bcryptjs');

export const hashPassword = (password: string): string => {
    return bcrypt.hashSync(password, 10);
}
/**
 * @description Checks the request object to determine if the user is an admin
 * @param req   Request object from router
 * @returns     boolean
 */
export const isAdmin = (req: any): boolean => {
    const account: IUser = req?.account || {};
    if(!account._id)
        return false;
    return req.isAdmin;
}
/**
 * @description Checks the request object to determine if the user is a super admin
 * @param req   Request object from router
 * @returns     boolean
 */
export const isSuperUser = (req: any): boolean => {
    const admin: boolean = isAdmin(req);
    if(!admin)
        return false;
    return req.isSuperUser;
}