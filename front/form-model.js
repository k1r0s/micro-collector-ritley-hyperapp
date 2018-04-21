import { dataUpload } from "./request";
import FileUpload from "./file-upload";

const REGEX_MAIL = /^([a-zA-Z0-9_\-\.+-]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

const AccessError = {
  MAIL_WRONG_FORMAT : "Invalid email format.",
  REQUIRED_FIELDS : "Some fields (Name, Email) are required."
}

export default class {

  static validate(Form) {
    if(!(Form.name && Form.email && Form.file)){
      return AccessError.REQUIRED_FIELDS;
    }
    if(!REGEX_MAIL.test(Form.email)) {
      return AccessError.MAIL_WRONG_FORMAT;
    }
    return "";
  }

  static send(uid, data) {
    return dataUpload(uid, data)
  }

}
