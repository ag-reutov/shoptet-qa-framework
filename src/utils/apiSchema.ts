import { z, ZodSchema } from 'zod';
import { APIResponse } from '@playwright/test';

export const validateJson = async <T>(response: APIResponse, schema: ZodSchema<T>): Promise<T> => {
  const payload = await response.json();
  return schema.parse(payload);
};

export const echoSchema = z.object({
  args: z.record(z.string(), z.string()).optional(),
  headers: z.record(z.string(), z.any()).optional(),
  url: z.string().url(),
});
