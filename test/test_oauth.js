'use strict';

/**
 * SuperID OAuth API
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const assert = require('assert');
const superid = require('../');

const SOURCE_APP_ID = '5vY4mg0Eog8SWo0mHYSWbqpl';
const APP_ID = '5vY4mg0Eog8SWo0mHYSWbqpl';
const TOKEN = 'Ppuj8xfvb8jltBkcDvALFcEtWvgXGdxj';
const URL = 'https://api.superid.me/test';

describe('OAuth', function () {

  const oauth = new superid.OAuth({
    appId: APP_ID,
    token: TOKEN,
    url: URL,
    timeout: 30000,
  });

  it('createGroup', function () {

    const name = 'test222' + Date.now();
    const tag = 'test';
    const info = {
      hello: Date.now(),
    };

    return oauth.createGroup(name, SOURCE_APP_ID, tag, info).then(ret => {
      console.log(ret);
      assert(ret.id);
      assert.equal(ret.name, name);
      assert.equal(ret.tag, tag);
      assert.deepEqual(ret.info, info);
    });

  });

});