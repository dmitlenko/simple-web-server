
/**
 * Read the request headers from the buffer
 * @param {Buffer} buffer 
 * @returns {[string, string]} [headers, body]
 */
export const getRawData = (buffer) => {
  return buffer.toString().split('\r\n\r\n', 2);
}

/**
 * Get the method from the raw headers
 * @param {string} rawHeaders
 * @returns {[string, string]} [method, route]
 * @example getMethod('GET / HTTP/1.1\r\nHost: localhost:3000\r\n\r\n') // ['GET', '/']
 */
export const getRoute = (rawHeaders) => {
  return rawHeaders.split(' ', 3).slice(0, 2);
}

/**
 * Get the headers from the raw headers
 * @param {string} rawHeaders
 * @returns {object} { [key: string]: string }
 */
export const getHeaders = (rawHeaders) => {
  return rawHeaders.split('\r\n').slice(1).reduce((acc, header) => {
    const [name, value] = header.split(': ', 2);

    return {
      ...acc,
      [name.toLowerCase()]: value
    }
  }, {});
}

/**
 * Create a response string
 * @param {number} statusCode
 * @param {object} headers
 * @param {string} body
 * @returns {string}
 */
export const createRawResponse = (statusCode, headers, body) => {
  return `HTTP/1.1 ${statusCode}\r\n${Object.entries(headers).map(([name, value]) => `${name}: ${value}`).join('\r\n')}${body && '\r\n\r\n' + body}`;
}
