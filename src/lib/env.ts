import { z } from "zod";

const envSchema = z.object({
  VITE_API_BASE_URL: z.string(),
});

const _env = envSchema.safeParse(import.meta.env);

if (!_env.success) {
  console.error("⚠️ Invalid environment variables");
  console.error(JSON.stringify(_env.error.format(), null, 2));

  throw new Error("Invalid environment variables.");
}

export const env = _env.data;
