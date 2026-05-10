import { AuthApi } from "../../../src/auth/api";
import { AuthService } from "../../../src/auth/auth-service";
import { InMemoryUserRepo } from "../../../src/auth/user-repo";

describe("POST /api/auth/login", () => {
  let api: AuthApi;

  beforeEach(() => {
    const repo = new InMemoryUserRepo();
    const service = new AuthService(repo);
    api = new AuthApi(service);

    api.postRegister({
      email: "user@example.com",
      password: "password123",
      confirmPassword: "password123"
    });
  });

  it("should return success for valid credentials", () => {
    // Arrange
    const payload = { email: "user@example.com", password: "password123" };

    // Act
    const response = api.postLogin(payload);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
  });

  it("should return deterministic error code for invalid credentials", () => {
    // Arrange
    const payload = { email: "user@example.com", password: "wrongPassword" };

    // Act
    const response = api.postLogin(payload);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body.ok).toBe(false);
    if (response.body.ok) {
      throw new Error("Expected error response");
    }
    expect(response.body.error.code).toBe("AUTH_INVALID_CREDENTIALS");
  });

  it("should return deterministic error code for unknown email", () => {
    // Arrange
    const payload = { email: "missing@example.com", password: "password123" };

    // Act
    const response = api.postLogin(payload);

    // Assert
    expect(response.status).toBe(404);
    expect(response.body.ok).toBe(false);
    if (response.body.ok) {
      throw new Error("Expected error response");
    }
    expect(response.body.error.code).toBe("AUTH_USER_NOT_FOUND");
  });
});
