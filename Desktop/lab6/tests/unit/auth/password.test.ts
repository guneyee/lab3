import { hashPassword, verifyPassword } from "../../../src/auth/password";

describe("password helpers", () => {
  it("should return false for malformed stored hash", () => {
    // Arrange
    const malformed = "invalid-format";

    // Act
    const result = verifyPassword("password123", malformed);

    // Assert
    expect(result).toBe(false);
  });

  it("should verify hashed password successfully", () => {
    // Arrange
    const raw = "password123";
    const hash = hashPassword(raw);

    // Act
    const result = verifyPassword(raw, hash);

    // Assert
    expect(result).toBe(true);
  });
});
