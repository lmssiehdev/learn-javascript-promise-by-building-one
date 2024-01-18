import { describe, assert, it } from "vitest";

describe("Promise.resolve()", () => {
  it("works with non promise values", async () => {
    const original = Promise.reject(12);
    try {
      await original;
    } catch (err) {
      assert(original instanceof Promise);
      assert.strictEqual(err, 12);
    }
  });

  it("should resolve with the same promise if provided", async () => {
    const original = new Promise((res) => res(12));
    try {
      await Promise.reject(original);
    } catch (err) {
      assert.strictEqual(original, err);
    }
  });

  it("should accept an array", async () => {
    const original = new Promise((res) => res(13));
    try {
      await Promise.reject([14, original]);
    } catch (err) {
      // @ts-expect-error
      const [first, last] = err;
      assert.equal(first, 14);
      assert.strictEqual(last, original);
    }
  });

  it("should handle a rejected promise", async () => {
    const reason = "Error message";
    const promise = await Promise.resolve(reason);
    try {
      await Promise.reject(promise);
    } catch (error) {
      console.log({ error, reason });
      assert.strictEqual(error, reason);
    }
  });
});
