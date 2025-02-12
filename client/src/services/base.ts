import { environment } from "../environment";

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

export const getRequest = async <T>(service: string, body?: T) => {
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