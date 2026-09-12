import { describe, expect, it } from 'vitest';
import { customAlphabet, nanoid, urlAlphabet } from 'nanoid';

describe('nanoid default ids', () => {
  it('generates a 21-character URL-safe id by default', () => {
    const id = nanoid();

    expect(id).toHaveLength(21);
    expect([...id].every((char) => urlAlphabet.includes(char))).toBe(true);
  });

  it('honours an explicit size', () => {
    expect(nanoid(10)).toHaveLength(10);
    expect(nanoid(32)).toHaveLength(32);
  });

  it('generates unique ids across many calls', () => {
    const ids = new Set(Array.from({ length: 1000 }, () => nanoid()));

    expect(ids.size).toBe(1000);
  });
});

describe('nanoid custom alphabets', () => {
  it('only uses characters from the supplied alphabet', () => {
    const alphabet = 'abcdef0123456789';
    const generate = customAlphabet(alphabet, 12);
    const id = generate();

    expect(id).toHaveLength(12);
    expect([...id].every((char) => alphabet.includes(char))).toBe(true);
  });

  it('rejects an out-of-range explicit size', () => {
    expect(() => nanoid(-1)).toThrowError(RangeError);
  });
});
