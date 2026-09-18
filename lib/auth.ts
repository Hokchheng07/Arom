import { z } from "zod";

export const mockUser = {
  name: "Muoyly",
  email: "muoyly123@gmail.com",
  password: "Qwer1234!",
} as const;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Enter your full name")
      .max(60, "Name must be 60 characters or fewer"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Use at least 8 characters")
      .regex(/[a-z]/, "Include a lowercase letter")
      .regex(/[A-Z]/, "Include an uppercase letter")
      .regex(/[0-9]/, "Include a number")
      .regex(/[^A-Za-z0-9]/, "Include a special character"),
    confirmPassword: z.string().min(1, "Confirm your password"),
    terms: z.boolean().refine((value) => value, {
      message: "Please accept the Terms and Privacy Policy",
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;

export function matchesMockCredentials(values: LoginValues) {
  return (
    values.email.toLowerCase() === mockUser.email &&
    values.password === mockUser.password
  );
}
