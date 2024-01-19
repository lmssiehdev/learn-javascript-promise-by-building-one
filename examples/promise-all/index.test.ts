import { assert, describe, it } from "vitest";
import { promiseAll } from ".";

describe("Promise.all()", () => {
  it("rejects on the first returned promise", async () => {
    const REJECT_ERROR = ": sob :";
    const promises = [
      Promise.resolve(10),
      Promise.reject(REJECT_ERROR),
      Promise.resolve(20),
    ];

    try {
      await promiseAll(promises);
    } catch (err) {
      assert.strictEqual(err, REJECT_ERROR);
    }
  });

  it("returns the resolved promises in order", async () => {
    const promises = [
      Promise.resolve(10),
      Promise.resolve(20),
      Promise.resolve(30),
    ];

    const result = await promiseAll(promises);
    assert.deepEqual(result, [10, 20, 30]);
  });

  it("should work with non-promise values", async () => {
    const promises = [10, Promise.resolve(20), 30];

    const result = await promiseAll(promises);
    assert.deepEqual(result, [10, 20, 30]);
  });
});
