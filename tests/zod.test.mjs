import { describe, expect, it } from 'vitest';
import { z } from 'zod';

const userSchema = z.object({
  id: z.string(),
  age: z.number().int().nonnegative(),
});

describe('zod object schema', () => {
  it('parses a valid payload and strips unknown keys', () => {
    const parsed = userSchema.parse({ id: 'u_1', age: 30, role: 'admin' });

    expect(parsed).toEqual({ id: 'u_1', age: 30 });
  });

  it('reports the failing field path on invalid input', () => {
    const result = userSchema.safeParse({ id: 'u_1', age: -1 });

    expect(result.success).toBe(false);
    expect(result.error.issues[0].path).toEqual(['age']);
  });
});

describe('zod coercion', () => {
  it('coerces string input to a number', () => {
    expect(z.coerce.number().parse('42')).toBe(42);
  });
});
