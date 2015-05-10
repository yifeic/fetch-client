
var url = require('url');
var querystring = require('querystring');
var base64 = require('base-64');

class FetchClient {
  constructor(baseURL, headers) {
    this.baseURL = baseURL;
    this.headers = headers != null ? headers : {};
    this.headers["Content-type"] = "application/json; charset=UTF-8";
  }

  GET(path, params) {
    return _req_without_body(path, params, 'get');
  }

  DELETE(path, params) {
    return _req_without_body(path, params, 'delete');
  }

  _req_without_body(path, params, method) {
    var query = params != null ? '?'+querystring.stringify(params) : '';
    var finalURL = url.resolve(this.baseURL, path) + query;
    
    return fetch(finalURL, {
      method: method, 
      headers: this.headers
    });
  }

  POST(path, params) {
    return this._req_with_body(path, params, 'post');
  }

  PUT(path, params) {
    return this._req_with_body(path, params, 'put');
  }

  _req_with_body(path, params, method) {
    var finalURL = url.resolve(this.baseURL, path);
    var options = {
      method: method, 
      headers: this.headers
    };
    if (params != null) {
      options.body = JSON.stringify(params);
    }
    return fetch(finalURL, options);
  }

  setBasicAuthorizationHeader(username, password) {
    var auth = username + ':' + password;
    var encodedAuth = base64.encode(auth);
    this.headers['Authorization'] = "Basic " + encodedAuth;
  }

  setHeader(field, value) {
    this.headers[field] = value;
  }

  getHeader(field) {
    return this.headers[field];
  }
}

module.exports = FetchClient;

