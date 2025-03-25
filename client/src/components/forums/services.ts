import { deleteRequest, getRequest } from "../../services/base";

export const ForumsGetService = (id?: string) => getRequest('/forum', id? { id } : undefined);

export const ForumsDeleteService = (id?: string) => deleteRequest('/forum', id? { id } : undefined);