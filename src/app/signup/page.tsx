import AuthForm from "@/components/AuthForm";
import AuthPanel from "@/components/AuthPanel";
import { getSupabaseConfig } from "@/lib/supabase/config";

export default function SignupPage() {
  const config = getSupabaseConfig();
  return (
    <AuthPanel mode="signup">
      <AuthForm mode="signup" config={config} />
    </AuthPanel>
  );
}
