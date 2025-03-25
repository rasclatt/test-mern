import { obfuscateIds } from "../middleware/obfuscate";

export const successResponse = <T = any>(data: T, success: boolean = true) => {
    return {
        success,
        data: ['object'].includes(typeof data) || Array.isArray(data)? obfuscateIds(data) : null,
    };
}

interface IResponse {
    error: string,
    success: boolean,
    data: any,
    reload: boolean,
};

export const failResponse = <T = any>(message: string, data?: T, reload?: boolean): IResponse => {
    return {
        error: message,
        success: false,
        data: data || null,
        reload: reload || false,
    };
}