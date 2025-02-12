import { postRequest } from "../../../services/base";

export const UserAuthPostService = async (email: string, password: string) => await postRequest('/user/auth', { email, password });

export const UserCreatePostService = async (form: { email: string, password: string, first_name: string, last_name: string }) => await postRequest('/user/create', form);