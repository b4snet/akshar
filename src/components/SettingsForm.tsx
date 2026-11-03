"use client";

import { useState, type FormEvent } from "react";
import { updateMyProfile, changePassword } from "@/app/actions/learning";

type SettingsFormProps = {
  email: string;
  initialDisplayName: string;
  profileExists: boolean;
};

export default function SettingsForm({ email, initialDisplayName, profileExists }: SettingsFormProps) {
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  async function saveDisplayName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");
    setIsError(false);
    setIsSaving(true);

    try {
      const result = await updateMyProfile(displayName);
      if (result.status === "saved") {
        setDisplayName(result.displayName);
        setFeedback("Display name saved to your profile.");
      } else {
        setIsError(true);
        setFeedback(result.status === "signed-out" ? "Your session ended. Log in again before saving." : result.status === "unconfigured" ? "Supabase is not configured; nothing was saved." : result.status === "invalid" ? "Enter a name between 1 and 80 characters." : "Profile update failed. Check the database migration and profile update policy.");
      }
    } catch {
      setIsError(true);
      setFeedback("The update request failed. Your profile was not confirmed as changed.");
    } finally {
      setIsSaving(false);
    }
  }

  async function changeUserPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");
    setIsError(false);
    setIsChangingPassword(true);

    try {
      const result = await changePassword(currentPassword, newPassword);
      if (result.status === "saved") {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setFeedback("Password changed successfully. You will be signed out and need to sign in again.");
      } else {
        setIsError(true);
        setFeedback(result.message || "Password change failed. Check your details and try again.");
      }
    } catch {
      setIsError(true);
      setFeedback("The password change request failed. Try again.");
    } finally {
      setIsChangingPassword(false);
    }
  }

  return <section className="settings-card" aria-labelledby="settings-account-heading">
    <div className="settings-card-heading"><span className="lesson-mark violet" aria-hidden="true">A</span><div><div className="section-kicker">PERSONAL DETAILS</div><h2 id="settings-account-heading">Account information</h2></div></div>
    <div className="settings-readonly-field"><span>Email address</span><strong>{email || "Email unavailable"}</strong><small>Email is managed by your sign-in provider.</small></div>
    {profileExists ? <form className="settings-profile-form" onSubmit={saveDisplayName}>
      <label htmlFor="settings-display-name">Display name<input id="settings-display-name" type="text" autoComplete="name" maxLength={80} value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="Add a display name" /></label>
      <p className="settings-field-help">This name is saved to your Akshar profile.</p>
      <button className="button button-primary" type="submit" disabled={isSaving || !displayName.trim()}>{isSaving ? "Saving…" : "Save display name"}</button>
      {feedback && <p className={isError ? "settings-feedback error" : "settings-feedback success"} role={isError ? "alert" : "status"}>{feedback}</p>}
    </form> : <div className="settings-profile-missing" role="alert"><strong>Profile record unavailable.</strong><p>Your account is signed in, but its profile row could not be found. Apply the existing profile migration before changing profile settings.</p></div>}

    <form className="settings-profile-form" onSubmit={changeUserPassword} style={{ marginTop: 24 }}>
      <div className="settings-card-heading" style={{ paddingBottom: 12, borderBottom: "none" }}>
        <span className="lesson-mark violet" aria-hidden="true">🔒</span><div><div className="section-kicker">ACCOUNT SECURITY</div><h2 style={{ margin: "5px 0 0", color: "var(--foreground)", fontSize: "15px", fontWeight: "610" }}>Change password</h2></div>
      </div>
      <label className="settings-profile-form-label" htmlFor="settings-current-password">Current password<input id="settings-current-password" type="password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} placeholder="Current password" required /></label>
      <label className="settings-profile-form-label" htmlFor="settings-new-password">New password<input id="settings-new-password" type="password" autoComplete="new-password" minLength={8} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="New password (min 8 chars)" required /></label>
      <label className="settings-profile-form-label" htmlFor="settings-confirm-password">Confirm password<input id="settings-confirm-password" type="password" autoComplete="new-password" minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm new password" required /></label>
      <button className="button button-primary" type="submit" disabled={isChangingPassword || !currentPassword || !newPassword || !confirmPassword || newPassword.length < 8 || newPassword !== confirmPassword}>{isChangingPassword ? "Changing…" : "Change password"}</button>
      <p className="settings-field-help">After changing your password, you will be signed out and asked to sign in again.</p>
    </form>

    <div className="settings-session-note"><div className="section-kicker">ACCOUNT SECURITY</div><p>Your session is managed by Supabase. Use <strong>Log out</strong> in the top navigation to end this session.</p></div>
  </section>;
}
