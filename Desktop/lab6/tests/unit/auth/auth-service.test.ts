import { AuthService } from "../../../src/auth/auth-service";
import { AuthError } from "../../../src/auth/errors";
import { UserRecord } from "../../../src/auth/types";
import { UserRepo } from "../../../src/auth/user-repo";

describe("AuthService", () => {
  let users = new Map<string, UserRecord>();
  let createSpy: jest.Mock<UserRecord, [{ email: string; passwordHash: string }]>;
  let repo: UserRepo;
  let service: AuthService;

  beforeEach(() => {
    users = new Map<string, UserRecord>();
    createSpy = jest.fn(({ email, passwordHash }) => {
      const user: UserRecord = {
        id: `user_${users.size + 1}`,
        email,
        passwordHash
      };
      users.set(email.toLowerCase(), user);
      return user;
    });

    repo = {
      findByEmail: (email: string) => users.get(email.toLowerCase()),
      create: createSpy
    };

    service = new AuthService(repo);
  });

  it("should reject mismatched password and confirmPassword with AUTH_PASSWORD_MISMATCH", () => {
    // Arrange
    const input = {
      email: "new@example.com",
      password: "password123",
      confirmPassword: "password456"
    };

    // Act
    const action = () => service.register(input);

    // Assert
    expect(action).toThrow(AuthError);
    expect(action).toThrow("AUTH_PASSWORD_MISMATCH");
  });

  it("should reject invalid email with AUTH_INVALID_EMAIL", () => {
    // Arrange
    const input = {
      email: "not-an-email",
      password: "password123",
      confirmPassword: "password123"
    };

    // Act
    const action = () => service.register(input);

    // Assert
    expect(action).toThrow(AuthError);
    expect(action).toThrow("AUTH_INVALID_EMAIL");
  });

  it("should reject weak password with AUTH_WEAK_PASSWORD", () => {
    // Arrange
    const input = {
      email: "new@example.com",
      password: "short",
      confirmPassword: "short"
    };

    // Act
    const action = () => service.register(input);

    // Assert
    expect(action).toThrow(AuthError);
    expect(action).toThrow("AUTH_WEAK_PASSWORD");
  });

  it("should reject duplicate email with AUTH_EMAIL_EXISTS", () => {
    // Arrange
    users.set("new@example.com", {
      id: "user_1",
      email: "new@example.com",
      passwordHash: "salt:hash"
    });

    // Act
    const action = () =>
      service.register({
        email: "new@example.com",
        password: "password123",
        confirmPassword: "password123"
      });

    // Assert
    expect(action).toThrow(AuthError);
    expect(action).toThrow("AUTH_EMAIL_EXISTS");
  });

  it("should hash password before persistence call", () => {
    // Arrange
    const input = {
      email: "new@example.com",
      password: "password123",
      confirmPassword: "password123"
    };

    // Act
    service.register(input);

    // Assert
    expect(createSpy).toHaveBeenCalledTimes(1);
    const payload = createSpy.mock.calls[0][0];
    expect(payload.passwordHash).not.toBe(input.password);
    expect(payload.passwordHash.includes(":")).toBe(true);
  });

  it("should reject unknown email with AUTH_USER_NOT_FOUND", () => {
    // Arrange
    const input = { email: "unknown@example.com", password: "password123" };

    // Act
    const action = () => service.login(input);

    // Assert
    expect(action).toThrow(AuthError);
    expect(action).toThrow("AUTH_USER_NOT_FOUND");
  });

  it("should reject wrong password with AUTH_INVALID_CREDENTIALS", () => {
    // Arrange
    service.register({
      email: "user@example.com",
      password: "password123",
      confirmPassword: "password123"
    });

    // Act
    const action = () => service.login({ email: "user@example.com", password: "wrongPass123" });

    // Assert
    expect(action).toThrow(AuthError);
    expect(action).toThrow("AUTH_INVALID_CREDENTIALS");
  });
});
