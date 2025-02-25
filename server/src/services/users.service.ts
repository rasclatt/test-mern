import { errors } from "../error-list";

const endpoint = 'https://randomuser.me/api';

export const getUsersFromExternal = async (page: number, results: number): Promise<Response> => {
    try {
        return await fetch(`${endpoint}?page=${page}&results=${results}`);
    } catch (error) {
        console.error(error);
        throw new Error(errors[500]);
    }
};