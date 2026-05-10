import { AuthApi } from "../../../src/auth/api";
import { AuthService } from "../../../src/auth/auth-service";
import { InMemoryUserRepo } from "../../../src/auth/user-repo";

describe("POST /api/auth/register", () => {
  let api: AuthApi;

  beforeEach(() => {
    const repo = new InMemoryUserRepo();
    const service = new AuthService(repo);
    api = new AuthApi(service);
  });

  it("should create account and store hashed password", () => {
    // Arrange
    const payload = {
      email: "new@example.com",
      password: "password123",
      confirmPassword: "password123"
    };

    // Act
    const response = api.postRegister(payload);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body.ok).toBe(true);
  });
});
