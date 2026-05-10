import { validateEmail, validatePassword } from "../../../src/auth/validation";

describe("validation", () => {
  describe("validateEmail", () => {
    it("should return false for malformed email", () => {
      // Arrange
      const malformed = "invalid-email-format";

      // Act
      const result = validateEmail(malformed);

      // Assert
      expect(result).toBe(false);
    });

    it("should return true for valid email", () => {
      // Arrange
      const valid = "user@example.com";

      // Act
      const result = validateEmail(valid);

      // Assert
      expect(result).toBe(true);
    });
  });

  describe("validatePassword", () => {
    it("should enforce minimum length >= 8", () => {
      // Arrange
      const weak = "short";
      const strong = "strongPass1";

      // Act
      const weakResult = validatePassword(weak);
      const strongResult = validatePassword(strong);

      // Assert
      expect(weakResult).toBe(false);
      expect(strongResult).toBe(true);
    });
  });
});
