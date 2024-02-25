/**
 * @typedef {function(import('./request.js').Request, import('./response.js').Response)} RouteFunction
 */

import { createRawResponse } from './utils.js';

export class Route {
  /**
   * @param {string[]} methods
   * @param {string} path
   * @param {RouteFunction} callback
   */
  constructor(methods, path, callback) {
    this.methods = methods;
    this.path = path;
    this.pathPattern = this._convertParams(path);
    this.callback = callback;
  }

  /**
   * Convert the path to a regex pattern 
   * @param {string} path 
   * @returns {RegExp}
   */
  _convertParams(path) {
    let regexPattern = path.replace(/:\?(\w+)\//g, '(?<$1>\\w*)\/?');

    // Replace required parameters (e.g., ':name') with regex
    regexPattern = regexPattern.replace(/:(\w+)\//g, '(?<$1>\\w+)\/?');

    // All slashes are optional
    regexPattern = regexPattern.replace(/\//g, '\\/?');

    return new RegExp(`^\/?${regexPattern}$`);
  }

  /**
   * @param {string} path
   * @returns {object}
   * @private
   */
  _getPathParams(path) {
    const params = this.pathPattern.exec(path.slice(1))?.groups || {};

    return Object.keys(params).reduce((acc, key) => ({
      ...acc,
      [key]: params[key] || null
    }), {});
  }

  /**
   * @param {net.Socket} socket
   * @param {import('./request.js').Request} request
   * @param {import('./response.js').Response} response
   */
  call(socket, request, response) {
    if (!this.methods.includes(request.method))
      return socket.end(createRawResponse(405, {}, ''));

    this.callback(request.withParams(this._getPathParams(request.path)), response);

    socket.end(createRawResponse(response._statusCode, response._createHeaders(request), response._body))

    console.log(`${request.method} ${request.path} - ${response._statusCode}`)
  }
}
