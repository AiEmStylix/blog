import { z } from 'zod';

export const registerDto = z.object({
  username: z.string().min(3),
  email: z.email().optional().nullable(),
  password: z.string().min(6),
});

export const loginDto = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export type RegisterInput = z.infer<typeof registerDto>;
export type LoginInput = z.infer<typeof loginDto>;
