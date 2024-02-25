import { Request } from '../lib/request.js';
import { getRawData } from '../lib/utils.js';

import assert from 'assert';

describe("request", () => {
  describe("Request", () => {
    const buffer = Buffer.from("GET / HTTP/1.1\r\nHost: localhost:3000\r\n\r\nbody");
    const request = new Request(buffer);

    console.log(request)

    it("should return an object", () => {
      assert.strictEqual(typeof request, "object");
    });

    it("should return an object with the correct method", () => {
      assert.strictEqual(request.method, "GET");
    });

    it("should return an object with the correct path", () => {
      assert.strictEqual(request.path, "/");
    });

    it("should return an object with the correct headers", () => {
      assert.deepStrictEqual(request.headers, { host: "localhost:3000" });
    });

    it("should return an object with the correct body", () => {
      assert.strictEqual(request.body, "body");
    });
  });
});