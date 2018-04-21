const { AbstractResource } = require("ritley");
const { override, inject, extend } = require("kaop");
const LowProvider = require("./db/low-provider");
const uuidv1 = require('uuid/v1');

module.exports = UserDataResource = extend(AbstractResource, {
  constructor: [override.implement, inject.args(LowProvider), function(parent, uri, db) {
    parent(uri);
    this.db = db;
  }],
  writeResponse(response, body) {
    body && response.write(JSON.stringify(body));
    response.statusCode = 200;
    response.end();
  },
  post(request, response) {

    const uid = request.query.uid;
    const data = request.toJSON();

    this.db.saveSessionInfo(uid, data).then(_ => this.writeResponse(response, { message: "OK" }));
  }
});
