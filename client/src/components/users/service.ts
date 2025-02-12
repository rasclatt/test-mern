import { IUser } from "../../../../server/src/routers/users/interface";
import { getRequest, patchRequest } from "../../services/base";

export const UserGetService = async () => await getRequest<IUser>('/user/account');

export const UserUpdateService = async (body?: IUser) => await patchRequest<IUser>('/user/account', body);