const SessionFileStream = require("./session-file-stream");

module.exports = self = {
  sessions: {},
  sessionExists: sessionid => !!self.sessions[sessionid],
  commitFile: (sessionid, buffer, filename) =>
    new Promise(resolve => {
      self.sessions[sessionid].commitFile(buffer, sessionid, filename, _ => {
        delete self.sessions[sessionid];
        resolve();
      })
    }
  ),
  writeChunk: (sessionid, buffer) =>
    new Promise(resolve => self.sessions[sessionid].writeToFile(buffer, resolve)),
  createSession: (sessionid) =>
    new Promise(resolve => self.sessions[sessionid] = new SessionFileStream(sessionid, resolve))
}
