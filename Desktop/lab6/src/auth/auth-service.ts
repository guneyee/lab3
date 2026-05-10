import { AuthError } from "./errors";
import { hashPassword, verifyPassword } from "./password";
import { LoginInput, AuthIdentity, RegisterInput } from "./types";
import { UserRepo } from "./user-repo";
import { validateEmail, validatePassword } from "./validation";

export class AuthService {
  constructor(private readonly repo: UserRepo) {}

  register(input: RegisterInput): AuthIdentity {
    if (!validateEmail(input.email)) {
      throw new AuthError("AUTH_INVALID_EMAIL");
    }

    if (!validatePassword(input.password)) {
      throw new AuthError("AUTH_WEAK_PASSWORD");
    }

    if (input.password !== input.confirmPassword) {
      throw new AuthError("AUTH_PASSWORD_MISMATCH");
    }

    const existing = this.repo.findByEmail(input.email);
    if (existing) {
      throw new AuthError("AUTH_EMAIL_EXISTS");
    }

    const passwordHash = hashPassword(input.password);
    const created = this.repo.create({ email: input.email, passwordHash });
    return { id: created.id, email: created.email };
  }

  login(input: LoginInput): AuthIdentity {
    const user = this.repo.findByEmail(input.email);
    if (!user) {
      throw new AuthError("AUTH_USER_NOT_FOUND");
    }

    if (!verifyPassword(input.password, user.passwordHash)) {
      throw new AuthError("AUTH_INVALID_CREDENTIALS");
    }

    return { id: user.id, email: user.email };
  }
}
