const { createClass } = require("kaop");
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const { path } = require("./low.conf");

module.exports = LowAdapter = createClass({
  instance: undefined,
  constructor() {
    low(new FileAsync(path))
      .then(db => {
        this.instance = db
        this.instance.defaults({ sessions: [] })
          .write()
      });
  },

  saveSessionFile(uid, sessionid, filename) {
    return this.instance.get("sessions")
    .push({ uid, sessionid, filename })
      .write();
  },

  saveSessionInfo(uid, data) {
    return this.instance.get("sessions")
    .find({ uid })
    .assign({ ...data })
      .write();
  }
});
