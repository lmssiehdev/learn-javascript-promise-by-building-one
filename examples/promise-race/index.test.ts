import { describe, assert, it } from "vitest";
import { promiseRace } from ".";
import { getErrorMessage } from "../../src/utils";

describe("Promise.race()", () => {
  it("resolves with the first resolved promise", async () => {
    const promises = [
      new Promise((res) =>
        setTimeout(() => {
          res("Promise 1");
        }, 100)
      ),
      new Promise((_, rej) =>
        setTimeout(() => {
          rej("Promise 1");
        }, 50)
      ),
      new Promise((res) =>
        setTimeout(() => {
          res("Promise 3");
        }, 40)
      ),
    ];

    const result = await promiseRace(promises);
    assert.equal(result, "Promise 3");
  });

  it("rejects with the first rejected promise", async () => {
    const promises = [
      new Promise((res) =>
        setTimeout(() => {
          res("Promise 1");
        }, 100)
      ),
      new Promise((_, rej) =>
        setTimeout(() => {
          rej(new Error("Promise 2"));
        }, 50)
      ),
      new Promise((res) =>
        setTimeout(() => {
          res("Promise 3");
        }, 110)
      ),
    ];
    try {
      await promiseRace(promises);
    } catch (err) {
      assert.equal(getErrorMessage(err), "Promise 2");
    }
  });

  it("works with non promise values in the array", async () => {
    const promises = ["Not A Promise", 10, true];
    const result = await promiseRace(promises);
    assert(result, "Not A Promise");
  });
});
