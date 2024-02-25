export class Response {
  constructor() {
    this._statusCode = 200;
    this._headers = {};
    this._body = '';
  }

  /**
   * @param {string} body
   * @param {number} statusCode
   */
  text(body, statusCode = 200) {
    this._statusCode = statusCode;
    this._headers['Content-Type'] = 'text/plain';
    this._body = body;
  }

  /**
   * @param {object} body
   * @param {number} statusCode
   */
  json(body, statusCode = 200) {
    this._statusCode = statusCode;
    this._headers['Content-Type'] = 'application/json';
    this._body = JSON.stringify(body);
  }

  /**
   * @param {Request} request
   * @returns {object}
   * @private
   */
  _createHeaders(request) {
    return {
      'Content-Length': Buffer.byteLength(this._body),
      'Date': new Date().toUTCString(),
      'Connection': request.headers['connection'] || 'close',
      'Server': 'Node.js'
    };
  }
}