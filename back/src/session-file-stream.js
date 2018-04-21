const { createClass } = require("kaop");
const fs = require("fs");

const getTmpFilePath = tmpFileName => `${__dirname}/../tmp/${tmpFileName}`;
const getPath = filename => `${__dirname}/../files/${filename}`;

module.exports = SessionFileStream = createClass({
  writeStream: null,
  constructor(base64, cbk) {
    this.writeStream = fs.createWriteStream(getTmpFilePath(base64));
    this.writeStream.on("open", cbk);
  },
  writeToFile(buffer, cbk) {
    this.writeStream.write(buffer, undefined, cbk);
  },
  commitFile(buffer, base64, filename, cbk) {
    this.writeStream.end(buffer, undefined, _ =>
      fs.rename(getTmpFilePath(base64), getPath(filename), cbk));
  }
})
