'use strict';

/**
 * SuperID OAuth API
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const assert = require('assert');
const utils = require('lei-utils');
const request = require('request');
const debug = require('debug')('superid:oauth');

function getSecondTimestamp() {
  return parseInt(Date.now() / 1000, 10);
}

function getNoncestr() {
  return utils.randomString(12);
}

class OAuth {

  constructor(options) {

    options = options || {};
    assert(options.appId && typeof options.appId === 'string', "invalid option appId");
    assert(options.token && typeof options.token === 'string', "invalid option token");
    if (options.url) {
      assert(typeof options.url === 'string', 'invalid url');
    } else {
      options.url = 'https://api.superid.me/v1';
    }
    if (options.timeout) {
      assert(typeof options.timeout === 'number', 'invalid option timeout');
      assert(options.timeout > 1000, 'option timeout is too short! must be > 1000')
    } else {
      options.timeout = 10000;
    }
    this.options = options;

  }

  signature(params) {

    const string = Object.keys(params).sort().map(function (k) {
      return k + '=' + encodeURIComponent(params[k]);
    }).join('&');
    const sign = utils.md5(string + ':' + this.options.token).toUpperCase();
    debug('signature: %s <= %s', sign, string);
    return sign;

  }

  request(method, api, _params) {
    return new Promise((resolve, reject) => {

      assert(method && typeof method === 'string', 'invalid method');
      method = method.toUpperCase();
      assert(api && typeof api === 'string', 'invalid api');

      const params = Object.assign({}, _params);
      params.app_id = this.options.appId;
      params.timestamp = getSecondTimestamp();
      params.noncestr = getNoncestr();

      params.signature = this.signature(params);

      const opt = {
        method: method,
        url: this.options.url + api,
        timeout: this.options.timeout,
        json: true,
      };
      if (method === 'GET' || method === 'HEAD') {
        opt.qs = params;
      } else {
        opt.body = params;
      }
      debug('request: %j', opt);

      request(opt, (err, res, data) => {
        debug('response: err=%s, data=%j', err, data);
        if (err) return reject(err);

        if (data && data.message === 'success') {
          resolve(data.data);
        } else {
          reject(data);
        }
      });

    });
  }

  createGroup(name, source_app_id, tag, info) {
    return new Promise((resolve, reject) => {

      const params = {};
      assert(source_app_id && typeof source_app_id === 'string', 'invalid source_app_id');
      params.source_app_id = source_app_id;
      assert(name && typeof name === 'string', 'invalid name');
      params.name = name;
      if (tag) {
        assert(typeof tag === 'string', 'invalid tag');
        params.tag = tag;
      }
      if (info) {
        assert(typeof info === 'object', 'invalid info');
        params.info = JSON.stringify(info);
      }

      this.request('POST', '/group/create', params)
          .then(resolve).catch(reject);
    });
  }

}

module.exports = OAuth;
