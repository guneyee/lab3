import { UserRecord } from "./types";

export interface UserRepo {
  findByEmail(email: string): UserRecord | undefined;
  create(input: { email: string; passwordHash: string }): UserRecord;
}

export class InMemoryUserRepo implements UserRepo {
  private readonly usersByEmail = new Map<string, UserRecord>();

  findByEmail(email: string): UserRecord | undefined {
    return this.usersByEmail.get(email.toLowerCase());
  }

  create(input: { email: string; passwordHash: string }): UserRecord {
    const id = `user_${this.usersByEmail.size + 1}`;
    const user: UserRecord = {
      id,
      email: input.email,
      passwordHash: input.passwordHash
    };

    this.usersByEmail.set(input.email.toLowerCase(), user);
    return user;
  }
}
