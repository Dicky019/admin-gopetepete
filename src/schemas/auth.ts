import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

export const signInFormSchema = z.object({
  name: z.string().min(6).max(50),
  image: z.string().url().optional(),
  email: z.string().email(),
});

// admin
// driver
// passenger

export const loginFormSchemaUser = z.object({ email: z.string().email() });

