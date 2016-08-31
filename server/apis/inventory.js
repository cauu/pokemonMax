const pogobuf = require('pogobuf'),
    POGOProtos = require('node-pogo-protos');

function *getInventory() {

  const login = pogobuf.GoogleLogin(),
      client = pogobuf.Client();

  let params = this.request.body || {};

  let username = params.username,
    pwd = params.pwd;

  let token = yield login.login(username, pwd);

  client.setAuthInfo('google', token);

  yield client.init();

  let inventory = yield client.getInventory(0);
  
  this.body = pogobuf.Utils.splitInventory(inventory);
}

exports.getInventory = getInventory;
