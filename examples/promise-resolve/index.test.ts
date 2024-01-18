import { describe, assert, it } from "vitest";
import { promiseResolve } from "./";

describe("Promise.resolve()", () => {
  it("works with non promise values", async () => {
    const original = promiseResolve(12);
    const result = await original;

    assert(original instanceof Promise);
    assert.equal(result, 12);
  });

  it("should resolve with the same promise if provided", async () => {
    const original = new Promise((res) => res(12));
    const cast = promiseResolve(original);
    assert.strictEqual(original, cast);
  });

  it("should accept an array", async () => {
    const original = new Promise((res) => res(13));
    const [first, last] = await promiseResolve([14, original]);

    assert.equal(first, 14);
    assert.strictEqual(last, original);
  });

  it("should handle a rejected promise", async () => {
    const reason = "Error message";

    try {
      await promiseResolve(Promise.reject(reason));
    } catch (error) {
      return error === reason;
    }
  });
});
