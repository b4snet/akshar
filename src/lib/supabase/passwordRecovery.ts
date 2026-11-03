export type PasswordRecoveryEvent = "PASSWORD_RECOVERY" | "SIGNED_IN" | "TOKEN_REFRESHED" | "USER_UPDATED" | "SIGNED_OUT" | (string & {});

export function isPasswordRecoveryAuthorized(event: PasswordRecoveryEvent): boolean {
  return event === "PASSWORD_RECOVERY";
}

export function sanitizeRecoveryError(message: string | undefined): string {
  void message;
  return "This password reset link is invalid or has expired. Please request a new link.";
}
