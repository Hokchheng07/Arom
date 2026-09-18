"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LockKeyhole, Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  loginSchema,
  matchesMockCredentials,
  mockUser,
  type LoginValues,
} from "@/lib/auth";
import { AuthInput, FormAlert } from "./auth-input";

const pause = (milliseconds: number) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

function SocialMark({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt=""
      width={20}
      height={20}
      className="size-5 shrink-0 object-contain"
      unoptimized
    />
  );
}

export function LoginForm() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [notice, setNotice] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (values) => {
    setNotice(null);
    await pause(450);

    if (!matchesMockCredentials(values)) {
      setError("root", {
        type: "credentials",
        message: "That email and password do not match the demo account.",
      });
      return;
    }

    window.sessionStorage.setItem(
      "arom:mock-session",
      JSON.stringify({ name: mockUser.name, email: mockUser.email }),
    );
    await pause(350);
    router.push("/");
  });

  const useDemoAccount = () => {
    reset({ email: mockUser.email, password: mockUser.password });
    setNotice("Demo credentials added. You can log in now.");
  };

  return (
    <div>
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-arom-accent">
          Welcome back
        </p>
        <h2 className="mt-2 text-[2rem] font-bold leading-tight tracking-[-0.045em] text-arom sm:text-[2.35rem]">
          Welcome Back
        </h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-ink-muted sm:text-[0.95rem]">
          Log in to continue your journey towards a healthier, happier you.
        </p>
      </header>

      <form onSubmit={onSubmit} noValidate className="mt-7 space-y-0.5">
        <AuthInput
          {...register("email")}
          id="login-email"
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
          id="login-password"
          label="Password"
          icon={LockKeyhole}
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          revealable
          error={errors.password?.message}
        />

        <div className="-mt-1 flex items-center justify-between gap-4 pb-4">
          <button
            type="button"
            onClick={useDemoAccount}
            className="rounded-md text-xs font-semibold text-ink-muted underline decoration-arom-border underline-offset-4 transition-colors duration-150 hover:text-arom focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom"
          >
            Use demo account
          </button>
          <button
            type="button"
            onClick={() =>
              setNotice("Password reset is not connected in this prototype. Use the demo account instead.")
            }
            className="rounded-md text-sm font-semibold text-arom transition-colors duration-150 hover:text-arom-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom"
          >
            Forgot password?
          </button>
        </div>

        {errors.root?.message && <FormAlert tone="error">{errors.root.message}</FormAlert>}
        {notice && <FormAlert tone="success">{notice}</FormAlert>}
        {isSubmitSuccessful && !errors.root && (
          <FormAlert tone="success">
            <span className="flex items-center gap-2">
              <CheckCircle2 aria-hidden="true" size={18} /> Login successful. Opening your home…
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
          {isSubmitting ? "Checking your details…" : "Log In"}
        </motion.button>
      </form>

      <div className="my-6 flex items-center gap-4" aria-hidden="true">
        <span className="h-px flex-1 bg-arom-border" />
        <span className="text-xs font-medium text-ink-muted">Or continue with</span>
        <span className="h-px flex-1 bg-arom-border" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setNotice("Google sign-in is not connected in this prototype.")}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-arom-border bg-white text-sm font-semibold text-ink shadow-sm transition-colors duration-150 hover:border-arom/35 hover:bg-arom-wash focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom"
        >
          <SocialMark src="/google.svg" /> Google
        </button>
        <button
          type="button"
          onClick={() => setNotice("Apple sign-in is not connected in this prototype.")}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-arom-border bg-white text-sm font-semibold text-ink shadow-sm transition-colors duration-150 hover:border-arom/35 hover:bg-arom-wash focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom"
        >
          <SocialMark src="/Apple_light.svg" /> Apple
        </button>
      </div>

      <p className="mt-7 text-center text-sm text-ink-muted">
        New to AROM?{" "}
        <Link
          href="/signup"
          className="font-bold text-arom underline decoration-arom-border underline-offset-4 hover:text-arom-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom"
        >
          Create an account
        </Link>
      </p>

      <p className="mt-6 text-center text-xs font-medium text-ink-muted/80">
        You’re not alone. A brighter tomorrow is possible.
      </p>
    </div>
  );
}
