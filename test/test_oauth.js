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

  let group_id;
  const open_id = '8b2709d1bf62f95de3c9a4b79b884e63';

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

      group_id = ret.id;

      return Promise.resolve(ret);

    }).then(ret => {

      return oauth.getGroupInfo(group_id).then(ret => {

        console.log(ret);
        assert.equal(ret.name, name);
        assert.equal(ret.tag, tag);
        assert.deepEqual(ret.info, info);

        return Promise.resolve(ret);

      });

    }).then(ret => {

      return oauth.getGroupList('test').then(ret => {

        console.log(ret)
        assert(Array.isArray(ret.groups));
        assert(ret.groups.length > 0);

        return Promise.resolve(ret);

      });

    }).then(ret => {

      return oauth.addUsersToGroup(open_id, group_id);

    }).then(ret => {

      return oauth.getGroupUsers(group_id).then(ret => {

        console.log(ret);
        assert.equal(ret.count, 1);
        assert(Array.isArray(ret.users));
        assert.equal(ret.users[0], open_id);

        return Promise.resolve(ret);

      });

    }).then(ret => {

      return oauth.deleteUsersFromGroup(open_id, group_id);

    }).then(ret => {

      return oauth.getGroupUsers(group_id).then(ret => {

        console.log(ret);
        assert.equal(ret.count, 0);

        return Promise.resolve(ret);

      });

    }).then(ret => {

      return oauth.deleteGroup(group_id);

    }).then(ret => {

      return oauth.getGroupInfo(group_id).then(ret => {

        console.log(ret);

        return Promise.reject(new Error('group has been deleted'));

      }).catch(err => {

        console.log(err);

        if (err.message.indexOf('group does not exists') != -1) {
          return Promise.resolve()
        }

        Promise.reject(err);

      });

    });

  });

});