import { AuthApi } from "../../../src/auth/api";
import { AuthService } from "../../../src/auth/auth-service";
import { InMemoryUserRepo } from "../../../src/auth/user-repo";

describe("E2E auth register -> login", () => {
  let api: AuthApi;

  beforeEach(() => {
    const repo = new InMemoryUserRepo();
    const service = new AuthService(repo);
    api = new AuthApi(service);
  });

  it("should allow user to register and then login successfully", () => {
    // Arrange
    const registerPayload = {
      email: "flow@example.com",
      password: "password123",
      confirmPassword: "password123"
    };

    // Act
    const registerResponse = api.postRegister(registerPayload);
    const loginResponse = api.postLogin({
      email: registerPayload.email,
      password: registerPayload.password
    });

    // Assert
    expect(registerResponse.status).toBe(201);
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.ok).toBe(true);
  });
});
