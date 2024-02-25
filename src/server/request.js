import { getHeaders, getRoute } from './utils.js';

export class Request {
  params = {};

  /**
   * @param {string} rawData
   */
  constructor(rawData) {
    const [rawHeader, body] = rawData;
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