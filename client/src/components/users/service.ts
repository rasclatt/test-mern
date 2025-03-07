import { getRequest, patchRequest } from "../../services/base";
import { IUser } from "./interface";

export const UserGetService = async () => await getRequest<IUser>('/user/account');

export const UserUpdateService = async (body?: IUser) => await patchRequest<IUser>('/user/account', body);