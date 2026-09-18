import type { Metadata } from "next";
import { AuthShell } from "../_components/auth/auth-shell";
import { SignupForm } from "../_components/auth/signup-form";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your AROM account and begin your wellbeing journey.",
};

export default function SignupPage() {
  return (
    <AuthShell mode="signup">
      <SignupForm />
    </AuthShell>
  );
}
