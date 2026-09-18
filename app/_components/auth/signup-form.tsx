"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LockKeyhole, Mail, UserRound } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signupSchema, type SignupValues } from "@/lib/auth";
import { AuthInput, FormAlert } from "./auth-input";

const pause = (milliseconds: number) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export function SignupForm() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (values) => {
    await pause(550);
    window.sessionStorage.setItem(
      "arom:mock-registration",
      JSON.stringify({ name: values.fullName, email: values.email }),
    );
    await pause(650);
    router.push("/login");
  });

  return (
    <div>
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-arom-accent">
          Join AROM
        </p>
        <h2 className="mt-2 text-[2rem] font-bold leading-tight tracking-[-0.045em] text-arom sm:text-[2.35rem]">
          Create Your Account
        </h2>
        <p className="mt-2 text-sm leading-6 text-ink-muted sm:text-[0.95rem]">
          Let’s get started on your journey.
        </p>
      </header>

      <form onSubmit={onSubmit} noValidate className="mt-7 space-y-0.5">
        <AuthInput
          {...register("fullName")}
          id="signup-name"
          label="Full name"
          icon={UserRound}
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          error={errors.fullName?.message}
        />

        <AuthInput
          {...register("email")}
          id="signup-email"
          label="Email"
          icon={Mail}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
        />

        <AuthInput
          {...register("password")}
          id="signup-password"
          label="Password"
          icon={LockKeyhole}
          type="password"
          autoComplete="new-password"
          placeholder="Create a strong password"
          revealable
          error={errors.password?.message}
        />

        <AuthInput
          {...register("confirmPassword")}
          id="signup-confirm-password"
          label="Confirm password"
          icon={LockKeyhole}
          type="password"
          autoComplete="new-password"
          placeholder="Enter your password again"
          revealable
          error={errors.confirmPassword?.message}
        />

        <div className="pb-4 pt-1">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-5 text-ink-muted">
            <input
              {...register("terms")}
              type="checkbox"
              className="mt-0.5 size-[1.05rem] shrink-0 accent-[var(--arom)]"
              aria-invalid={Boolean(errors.terms)}
              aria-describedby={errors.terms ? "terms-error" : undefined}
            />
            <span>
              I agree to the{" "}
              <a
                href="#terms"
                className="font-semibold text-arom underline decoration-arom-border underline-offset-4"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#privacy"
                className="font-semibold text-arom underline decoration-arom-border underline-offset-4"
              >
                Privacy Policy
              </a>
              .
            </span>
          </label>
          {errors.terms?.message && (
            <p id="terms-error" role="alert" className="mt-1.5 text-xs font-medium text-arom-danger">
              {errors.terms.message}
            </p>
          )}
        </div>

        {isSubmitSuccessful && (
          <FormAlert tone="success">
            <span className="flex items-center gap-2">
              <CheckCircle2 aria-hidden="true" size={18} /> Account created. Taking you to log in…
            </span>
          </FormAlert>
        )}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileTap={shouldReduceMotion || isSubmitting ? undefined : { scale: 0.985 }}
          transition={{ duration: 0.14 }}
          className="mt-4 flex h-[3.2rem] w-full items-center justify-center rounded-xl bg-arom px-5 text-[0.95rem] font-bold text-white shadow-[0_12px_28px_rgba(31,111,91,0.2)] transition-[background-color,box-shadow] duration-150 hover:bg-arom-deep hover:shadow-[0_14px_32px_rgba(31,111,91,0.26)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom disabled:opacity-65"
        >
          {isSubmitting ? "Creating your account…" : "Create Account"}
        </motion.button>
      </form>

      <p className="mt-7 text-center text-sm text-ink-muted">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-arom underline decoration-arom-border underline-offset-4 hover:text-arom-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
