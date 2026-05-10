import { AuthError } from "./errors";
import { AuthService } from "./auth-service";
import { LoginInput, RegisterInput } from "./types";

type SuccessResponse = {
  status: 200 | 201;
  body: { ok: true; data: unknown };
};

type ErrorResponse = {
  status: 400 | 404;
  body: { ok: false; error: { code: string } };
};

export type ApiResponse = SuccessResponse | ErrorResponse;

export class AuthApi {
  constructor(private readonly authService: AuthService) {}

  postRegister(input: RegisterInput): ApiResponse {
    try {
      const identity = this.authService.register(input);
      return { status: 201, body: { ok: true, data: identity } };
    } catch (error) {
      return this.toErrorResponse(error);
    }
  }

  postLogin(input: LoginInput): ApiResponse {
    try {
      const identity = this.authService.login(input);
      return { status: 200, body: { ok: true, data: identity } };
    } catch (error) {
      return this.toErrorResponse(error);
    }
  }

  private toErrorResponse(error: unknown): ErrorResponse {
    if (error instanceof AuthError) {
      const status = error.code === "AUTH_USER_NOT_FOUND" ? 404 : 400;
      return { status, body: { ok: false, error: { code: error.code } } };
    }

    return { status: 400, body: { ok: false, error: { code: "AUTH_INVALID_CREDENTIALS" } } };
  }
}
