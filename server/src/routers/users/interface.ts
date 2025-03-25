export interface IUser
{
    _id?: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    password?: string;
    usergroup?: '1' | '2' | '3';
    email?: string;
    roles?: string[];
    action?: 'create';
}