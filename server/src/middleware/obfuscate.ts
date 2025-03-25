import { Request, Response, NextFunction } from 'express';
import { encrypt } from '../helpers/crypt';

export function obfuscateIds(obj: any, toJson: boolean = true): any {
    if(toJson && typeof obj === "object") {
        obj = JSON.parse(JSON.stringify(obj));
    }
    if (Array.isArray(obj)) {
        return obj.map((e) => obfuscateIds(e, toJson));
    } else if (obj !== null && typeof obj === 'object') {
        console.log('test');
        return Object.keys(obj).reduce((acc, key) => {
            acc[key] = key.match(/id$/gi) && (typeof obj[key] === 'string' || typeof obj[key] === 'number')
                ? encrypt(String(obj[key]))
                : obfuscateIds(obj[key]);
            return acc;
        }, {} as any);
    }
    return obj;
}

export const obfuscateResponseMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const originalJson = res.json;
    const originalSend = res.send;
  
    res.json = function (data) {
      const obfuscatedData = obfuscateIds(data); // Apply obfuscation
      return originalJson.call(this, obfuscatedData);
    };
  
    res.send = function (data) {
      if (typeof data === 'object') {
        try {
          data = JSON.stringify(obfuscateIds(JSON.parse(data)));
        } catch (error) {
          console.error('Obfuscation error:', error);
        }
      }
      return originalSend.call(this, data);
    };
  
    next();
  };