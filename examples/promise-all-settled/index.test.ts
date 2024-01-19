import { it, describe, assert, expect } from "vitest";
import { promiseAllSettled } from ".";

const isRejected = (
  input: PromiseSettledResult<unknown>
): input is PromiseRejectedResult => input.status === "rejected";

const isFulfilled = <T>(
  input: PromiseSettledResult<T>
): input is PromiseFulfilledResult<T> => input.status === "fulfilled";

describe("Promise.allSettled()", () => {
  it("returns the resolved promises in the correct order", async () => {
    const promises = [
      Promise.resolve(10),
      Promise.resolve(20),
      Promise.resolve(30),
    ];

    const result = await promiseAllSettled(promises);
    const fulfilled = result.filter(isFulfilled).map(({ value }) => value);
    assert.deepEqual(fulfilled, [10, 20, 30]);
  });

  it("does not reject immediately upon encountering the first rejected promise", async () => {
    const promises = [
      Promise.resolve(10),
      Promise.reject(20),
      Promise.resolve(30),
    ];

    const result = await promiseAllSettled(promises);

    const fulfilled = result.filter(isFulfilled).map(({ value }) => value);
    const rejected = result.filter(isRejected).map(({ reason }) => reason);

    assert.deepEqual(fulfilled, [10, 30]);
    assert.deepEqual(rejected, [20]);
  });

  it("returns an array of objects representing the settled promises", async () => {
    const promises = [Promise.resolve(10), Promise.reject(11)];

    const result = await promiseAllSettled(promises);
    expect(result).to.deep.equal([
      { status: "fulfilled", value: 10 },
      { status: "rejected", reason: 11 },
    ]);
  });

  it("works with non promise values", async () => {
    const promises = [Promise.resolve(10), Promise.reject(11), 12];

    const result = await promiseAllSettled(promises);
    expect(result).to.deep.equal([
      { status: "fulfilled", value: 10 },
      { status: "rejected", reason: 11 },
      { status: "fulfilled", value: 12 },
    ]);
  });
});
