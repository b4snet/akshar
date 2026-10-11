import AppShell from "@/components/AppShell";
import AuthForm from "@/components/AuthForm";
import { getSupabaseConfig } from "@/lib/supabase/config";

export default function SignupPage() {
  const config = getSupabaseConfig();
  return <AppShell active="account"><div className="auth-page"><AuthForm mode="signup" config={config} /></div></AppShell>;
}