import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = crypto.createHash('sha256').update(String(process.env.ENCRYPTION_KEY)).digest('base64').substring(0, 32);

export function encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}

export function decrypt(encryptedText: string): string {
    if (!encryptedText || typeof encryptedText !== 'string') {
        console.error('Invalid encryptedText:', encryptedText);
        return '';
    }
    const sp = encryptedText.split(':');
    if (sp.length !== 2) {
        console.error('Invalid encryptedText format:', encryptedText);
        return '';
    }
    const ivHex = sp[0];
    const encrypted = sp[1];
    const ivBuffer = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export function generateEncryptionKey(): string {
    return crypto.randomBytes(32).toString('hex');
}