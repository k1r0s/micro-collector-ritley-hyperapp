const { extend } = require("kaop");
const UserDataResource = require("./user-data-resource");
const SessionPool = require("./session-pool");
const LowProvider = require("./db/low-provider");
const uuidv1 = require('uuid/v1');

module.exports = UploadResource = extend(UserDataResource, {
  post(request, response) {
    const sessionHeader = request.headers["session"];
    const filename = request.headers["filename"];

    if (filename) { // if its the final chunk
      const uid = uuidv1();
      SessionPool.commitFile(sessionHeader, request.buffer, filename)
        .then(_ => this.db.saveSessionFile(uid, sessionHeader, filename)
          .then(_ => this.writeResponse(response, { uid })))
    } else { // not the final chunk
      if (!SessionPool.sessionExists(sessionHeader)) { // first chunk, create a session
        SessionPool.createSession(sessionHeader)
          .then(_ => SessionPool.writeChunk(sessionHeader, request.buffer)
            .then(_ => this.writeResponse(response)))
      } else { // session its already created, write it
        SessionPool.writeChunk(sessionHeader, request.buffer)
          .then(_ => this.writeResponse(response));
      }
    }
  }
});
