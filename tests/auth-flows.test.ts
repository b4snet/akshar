import { describe, expect, it } from "vitest";
import { isPasswordRecoveryAuthorized, sanitizeRecoveryError } from "../src/lib/supabase/passwordRecovery";

// ============================================================================
// Auth form validation tests
// These test the validation logic used in the login/signup/password-reset forms.
// ============================================================================

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password: string): { valid: boolean; message?: string } {
  if (!password) return { valid: false, message: "Password is required." };
  if (password.length < 8) return { valid: false, message: "Password must be at least 8 characters." };
  return { valid: true };
}

function validateConfirmPassword(password: string, confirmPassword: string): { valid: boolean; message?: string } {
  if (password !== confirmPassword) return { valid: false, message: "Passwords do not match." };
  return { valid: true };
}

describe("Auth form validation", () => {
  describe("validateEmail", () => {
    it("accepts valid email addresses", () => {
      expect(validateEmail("student@example.com")).toBe(true);
      expect(validateEmail("user+tag@domain.co.uk")).toBe(true);
      expect(validateEmail("a@b.cd")).toBe(true);
    });

    it("rejects invalid email addresses", () => {
      expect(validateEmail("")).toBe(false);
      expect(validateEmail("not-an-email")).toBe(false);
      expect(validateEmail("@example.com")).toBe(false);
      expect(validateEmail("user@")).toBe(false);
      expect(validateEmail("user@.com")).toBe(false);
    });
  });

  describe("validatePassword", () => {
    it("accepts passwords 8+ characters", () => {
      expect(validatePassword("password123").valid).toBe(true);
      expect(validatePassword("Str0ng!Pass").valid).toBe(true);
    });

    it("rejects short passwords", () => {
      const result = validatePassword("short");
      expect(result.valid).toBe(false);
      expect(result.message).toBe("Password must be at least 8 characters.");
    });

    it("rejects empty passwords", () => {
      const result = validatePassword("");
      expect(result.valid).toBe(false);
      expect(result.message).toBe("Password is required.");
    });
  });

  describe("validateConfirmPassword", () => {
    it("accepts matching passwords", () => {
      expect(validateConfirmPassword("mypassword", "mypassword").valid).toBe(true);
    });

    it("rejects non-matching passwords", () => {
      const result = validateConfirmPassword("password1", "password2");
      expect(result.valid).toBe(false);
      expect(result.message).toBe("Passwords do not match.");
    });
  });
});

// ============================================================================
// Password recovery state tests
// These test the message states shown during the forgot-password flow.
// ============================================================================

function getResetMessage(error: unknown): string {
  const msg = error instanceof Error ? error.message : "";
  if (/network|fetch failed|failed to fetch/i.test(msg)) {
    return "Could not reach Akshar. Check your connection and try again.";
  }
  return "If an account exists for this email, you will receive a password reset link. Check your inbox.";
}

function getPasswordUpdateMessage(error: unknown): string {
  const msg = error instanceof Error ? error.message : "";
  if (/invalid token|expired|not found/i.test(msg)) {
    return "Invalid or expired reset link. Please request a new password reset.";
  }
  if (/network|fetch failed|failed to fetch/i.test(msg)) {
    return "Could not reach Akshar. Check your connection and try again.";
  }
  return "Password reset could not be completed. Try again.";
}

describe("Password recovery authorization", () => {
  it("authorizes only the Supabase PASSWORD_RECOVERY event", () => {
    expect(isPasswordRecoveryAuthorized("PASSWORD_RECOVERY")).toBe(true);
    expect(isPasswordRecoveryAuthorized("SIGNED_IN")).toBe(false);
    expect(isPasswordRecoveryAuthorized("TOKEN_REFRESHED")).toBe(false);
  });

  it("returns a non-sensitive generic error for invalid recovery sessions", () => {
    expect(sanitizeRecoveryError("database connection string secret")).toBe(
      "This password reset link is invalid or has expired. Please request a new link."
    );
  });
});

describe("Password recovery states", () => {
  describe("getResetMessage", () => {
    it("returns neutral confirmation on success", () => {
      expect(getResetMessage(null)).toContain("receive a password reset link");
    });

    it("returns network error message", () => {
      const error = new Error("fetch failed");
      expect(getResetMessage(error)).toContain("Could not reach Akshar");
    });

    it("returns generic message for unknown errors", () => {
      const error = new Error("some other error");
      expect(getResetMessage(error)).toContain("receive a password reset link");
    });
  });

  describe("getPasswordUpdateMessage", () => {
    it("returns invalid token message", () => {
      const error = new Error("Invalid token");
      expect(getPasswordUpdateMessage(error)).toContain("Invalid or expired reset link");
    });

    it("returns expired token message", () => {
      const error = new Error("Token has expired");
      expect(getPasswordUpdateMessage(error)).toContain("Invalid or expired reset link");
    });

    it("returns network error message", () => {
      const error = new Error("failed to fetch");
      expect(getPasswordUpdateMessage(error)).toContain("Could not reach Akshar");
    });
  });
});

// ============================================================================
// Safe redirect URL tests
// These test the redirect URL validation used in auth callbacks.
// ============================================================================

function isSafeRedirectUrl(next: string | null): boolean {
  if (!next) return false;
  return next.startsWith("/") && !next.startsWith("//") && !next.includes("\\");
}

describe("Safe redirect URL validation", () => {
  it("accepts same-origin paths", () => {
    expect(isSafeRedirectUrl("/dashboard")).toBe(true);
    expect(isSafeRedirectUrl("/settings")).toBe(true);
    expect(isSafeRedirectUrl("/learn")).toBe(true);
  });

  it("rejects external URLs", () => {
    expect(isSafeRedirectUrl("https://evil.com")).toBe(false);
    expect(isSafeRedirectUrl("//evil.com")).toBe(false);
    expect(isSafeRedirectUrl("\\\\evil.com")).toBe(false);
  });

  it("rejects null and empty", () => {
    expect(isSafeRedirectUrl(null)).toBe(false);
    expect(isSafeRedirectUrl("")).toBe(false);
  });
});

// ============================================================================
// Password change validation tests
// ============================================================================

function validatePasswordChange(currentPassword: string, newPassword: string): { valid: boolean; message?: string } {
  if (!currentPassword) return { valid: false, message: "Current password is required." };
  if (!newPassword || newPassword.length < 8) return { valid: false, message: "New password must be at least 8 characters." };
  return { valid: true };
}

describe("Password change validation", () => {
  it("accepts valid password change", () => {
    const result = validatePasswordChange("current123", "newpassword456");
    expect(result.valid).toBe(true);
  });

  it("rejects missing current password", () => {
    const result = validatePasswordChange("", "newpassword456");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("Current password is required.");
  });

  it("rejects short new password", () => {
    const result = validatePasswordChange("current123", "short");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("New password must be at least 8 characters.");
  });
});
