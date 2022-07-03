import bcrypt from 'bcrypt';

const rounds = 10

export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, rounds)
}

export async function checkPassword(hashed: string, password: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
}