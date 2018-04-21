const { setConfig } = require("ritley");
const conf = require("./ritley.conf");
const UploadResource = require("./src/upload-resource");
const UserDataResource = require("./src/user-data-resource");

setConfig(conf);

new UploadResource("upload");
new UserDataResource("user-data");
