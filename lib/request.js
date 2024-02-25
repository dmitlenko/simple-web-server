import { getHeaders, getRoute, getRawData } from './utils.js';

export class Request {
  params = {};

  /**
   * @param {Buffer} buffer
   */
  constructor(buffer) {
    const [rawHeader, body] = getRawData(buffer);
    this.body = body;
    this.headers = getHeaders(rawHeader);
    this.method = getRoute(rawHeader)[0];
    this.path = getRoute(rawHeader)[1];
  }

  /**
   * @param {object} params
   * @returns {Request}
   */
  withParams(params) {
    this.params = params;
    return this;
  }
}