# superid-nodejs-sdk
SuperID SDK For Node.js

## 安装

```bash
$ npm install superid --save
```

**运行环境必须 Node.js 4.0 或更新版本**


## OAuth

```javascript
'use strict';

const OAuth = require('superid').OAuth;

const client = new OAuth({
  appId: 'YOUR_APP_ID',
  token: 'YOUR_TOKEN',
  timeout: 30000, // 可选参数，单位：ms
});
```

接口详细参数参考文档 [一登 OAuth API](http://www.superid.me/developer/document/server_serverGroupApi.html)：

+ 创建集合 - `createGroup(name, source_app_id, tag, info)`
+ 获取指定集合信息 - `getGroupInfo(group_id)`
+ 获取指定集合用户列表 - `getGroupUsers(group_id)`
+ 查询集合列表 - `getGroupList(tag)`
+ 更新集合 - `updateGroup(group_id, tag, info)`
+ 删除集合 - `deleteGroup(group_id)`
+ 添加用户到指定集合 - `addUsersToGroup(open_id, group_id)`
+ 从指定集合删除用户 - `deleteUsersFromGroup(open_id, group_id)`


## License

```
The MIT License (MIT)

Copyright (c) 2016 SuperID | 免费极速身份验证服务

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
