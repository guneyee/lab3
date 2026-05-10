import { createHash, randomBytes } from "crypto";

export function hashPassword(password: string): string {
  const salt = randomBytes(8).toString("hex");
  const digest = createHash("sha256").update(`${salt}:${password}`).digest("hex");
  return `${salt}:${digest}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, expectedDigest] = storedHash.split(":");
  if (!salt || !expectedDigest) {
    return false;
  }

  const actualDigest = createHash("sha256").update(`${salt}:${password}`).digest("hex");
  return actualDigest === expectedDigest;
}
