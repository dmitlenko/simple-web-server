import assert from "assert";
import * as utils from "../lib/utils.js";

describe("utils", () => {
  describe("getRawData", () => {
    const buffer = Buffer.from("GET / HTTP/1.1\r\nHost: localhost:3000\r\n\r\n");

    it("should return an array", () => {
      assert.strictEqual(Array.isArray(utils.getRawData(buffer)), true);
    });

    it("should return an array with two elements", () => {
      assert.strictEqual(utils.getRawData(buffer).length, 2);
    });
  });

  describe("getRoute", () => {
    const rawHeaders = "GET / HTTP/1.1\r\nHost: localhost:3000";

    it("should return an array", () => {
      assert.strictEqual(Array.isArray(utils.getRoute(rawHeaders)), true);
    });

    it("should return an array with two elements", () => {
      assert.strictEqual(utils.getRoute(rawHeaders).length, 2);
    });

    it("should return an array with the method and route", () => {
      assert.deepStrictEqual(utils.getRoute(rawHeaders), ["GET", "/"]);
    });
  });

  describe("getHeaders", () => {
    const rawHeaders = "GET / HTTP/1.1\r\nHost: localhost:3000";

    it("should return an object", () => {
      assert.strictEqual(typeof utils.getHeaders(rawHeaders), "object");
    });

    it("should return an object with the correct headers", () => {
      assert.deepStrictEqual(utils.getHeaders(rawHeaders), { host: "localhost:3000" });
    });
  });

  describe("createRawResponse", () => {
    const statusCode = 200;
    const headers = { "Content-Type": "text/plain" };
    const body = "Hello, World!";

    it("should return a string", () => {
      assert.strictEqual(typeof utils.createRawResponse(statusCode, headers, body), "string");
    });

    it("should return a string with the correct response", () => {
      assert.strictEqual(utils.createRawResponse(statusCode, headers, body), "HTTP/1.1 200\r\nContent-Type: text/plain\r\n\r\nHello, World!");
    });
  });
});