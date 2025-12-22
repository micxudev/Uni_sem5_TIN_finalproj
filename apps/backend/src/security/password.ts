import argon2 from "argon2";

const ARGON2_OPTIONS = {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 1
};

const DUMMY_HASH =
    "$argon2id$v=19$m=65536,t=3,p=1$AAAAAAAAAAAAAAAAAAAAAA$BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";

export async function hashPassword(password: string): Promise<string> {
    return argon2.hash(password, ARGON2_OPTIONS);
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
    return argon2.verify(hash, password);
}

export async function needsRehash(hash: string): Promise<boolean> {
    return argon2.needsRehash(hash, ARGON2_OPTIONS);
}

export function getDummyHash(): string {
    return DUMMY_HASH;
}