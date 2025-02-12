export const cacheGet = <T>(key: string, def?: T): string | T => localStorage.getItem(key) || def || '';

export const cacheDestroy = (key: string) => localStorage.removeItem(key);