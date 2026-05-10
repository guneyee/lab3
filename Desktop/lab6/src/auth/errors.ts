export type AuthErrorCode =
  | "AUTH_INVALID_EMAIL"
  | "AUTH_WEAK_PASSWORD"
  | "AUTH_PASSWORD_MISMATCH"
  | "AUTH_EMAIL_EXISTS"
  | "AUTH_USER_NOT_FOUND"
  | "AUTH_INVALID_CREDENTIALS";

export class AuthError extends Error {
  public readonly code: AuthErrorCode;

  constructor(code: AuthErrorCode, message?: string) {
    super(message ?? code);
    this.code = code;
    this.name = "AuthError";
  }
}
