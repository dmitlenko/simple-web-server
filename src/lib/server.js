import net from 'net';
import { getRawData, createRawResponse } from './utils.js';

import { Request } from './request.js';
import { Response } from './response.js';
import { Route } from './route.js';

const ERROR_REGEX = '.+'; // Match any path

export default class Server {
  /** @type {Route[]} */
  routes = [];

  constructor() {
    this.server = net.createServer((socket) => {
      socket.on('data', (buffer) => {
        const request = new Request(getRawData(buffer));
        const response = new Response();
        const route = this._getRoute(request.path);

        return route ? route.call(socket, request, response) : this._notFound(socket);
      })
    }).on('error', (err) => {
      console.error(err)
    });
  }

  /**
   * @param {string} path
   * @returns {Route}
   * @private
   */
  _getRoute(path) {
    return this.routes.find((route) => {
      return route.pathPattern.test(path)
    }
    );
  }

  /**
   * @param {net.Socket} socket
   * @returns {void}
   * @private
   */
  _notFound(socket) {
    socket.end(createRawResponse(404, {}, ''));
  }

  /**
   * Add a new route
   * @param {string[]} methods
   * @param {string} path
   * @param {import('./route.js').RouteFunction} callback
   */
  on(methods, path, callback) {
    if (this.routes.some((route) => route.path === path))
      throw new Error(`Route ${path} already exists`);

    this.routes.push(new Route(
      methods,
      path,
      callback
    ))
  }

  /**
   * Add a new route with the GET method
   * @param {string} path
   * @param {import('./route.js').RouteFunction} callback
   */
  get = (path, callback) => this.on(['GET'], path, callback);

  /**
   * Add a new route with the POST method
   * @param {string} path
   * @param {import('./route.js').RouteFunction} callback
   */
  post = (path, callback) => this.on(['POST'], path, callback);

  /**
   * Add a new route with the PUT method
   * @param {string} path
   * @param {import('./route.js').RouteFunction} callback
   */
  put = (path, callback) => this.on(['PUT'], path, callback);

  /**
   * Add a new route with the DELETE method
   * @param {string} path
   * @param {import('./route.js').RouteFunction} callback
   */
  delete = (path, callback) => this.on(['DELETE'], path, callback);

  /**
   * Add a new route to handle errors
   * @param {import('./route.js').RouteFunction} callback
   */
  error = (callback) => this.on(['GET', 'POST', 'PUT', 'DELETE'], ERROR_REGEX, callback);

  /**
   * Start the server
   * @param {{ host: string, port: number }} options
   * @param {function} callback
   */
  listen({ host, port }, callback) {
    this.server.listen({ host, port }, () => callback());
  }
}