import { environment } from "../environment";

export const deleteRequest = async <T>(service: string, body?: T) => {
    const token: string = localStorage.getItem('token') || '';
    const response = await fetch(`${environment.apiEndpoint}${service}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });
        return await response.json();
};

export const postRequest = async <T>(service: string, body?: T) => {
    const token: string = localStorage.getItem('token') || '';
    const response = await fetch(`${environment.apiEndpoint}${service}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });
        return await response.json();
};

export const getRequest = async <T, Z = any>(service: string, body?: T): Promise<Z> => {
    const token: string = localStorage.getItem('token') || '';
    const queryString = body? '?' + new URLSearchParams(body).toString() : '';
    const response = await fetch(`${environment.apiEndpoint}${service}${queryString}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
};

export const patchRequest = async <T>(service: string, body?: T) => {
    const token: string = localStorage.getItem('token') || '';
    const response = await fetch(`${environment.apiEndpoint}${service}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
    return await response.json();
};

class HttpClient
{
    public static delete<T>(service: string, body?: T) {
        return deleteRequest(service, body);
    }

    public static post<T>(service: string, body?: T) {
        return postRequest(service, body);
    }

    public static get<T>(service: string, body?: T) {
        return getRequest(service, body);
    }

    public static patch<T>(service: string, body?: T) {
        return patchRequest(service, body);
    }
}

export default HttpClient;