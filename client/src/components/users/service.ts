import { IResponse } from "../../interfaces/http.interface";
import { deleteRequest, getRequest, patchRequest, postRequest } from "../../services/base";
import { IUser } from "./interface";

export const UserGetService = async () => await getRequest<void, IResponse<IUser>>('/user/account');

export const UserGetAllService = async () => await getRequest<{[k: string]: string}>('/user/account', { 'filter[]': 'all'});

export const UserUpdateService = async (body?: IUser) => await patchRequest<IUser>('/user/account', body);

export const UserCreateService = async (body?: IUser) => await postRequest<IUser>('/user/create', body);

export const UserDeleteService = async (id: string) => await deleteRequest<any>(`/user/delete/${id}`);