import CheckError from './_CheckError.js';
import InputData from './_InputData.js';
import AJAXsender from './_AJAXsender.js';

export default class Form {
  constructor(fildName) {
    this.validater = 0;
    this.fildPattern = this._fildPattern(fildName);
  }

  _fildPattern(fildName) {
    let fildPattern
    switch (fildName) {
      case 'name':
        this.fildPattern = /[a-zа-яё\s]+/ig;
        break;
      case 'email':
        this.fildPattern = /\w+\.?-?\w+@\w+\.\w{2,4}/ig;
        break;
      case 'message':
        this.fildPattern = 'textArea';
        break;  
      default:
        this.fildPattern = undefined;
        break;
    }
    return fildPattern
  }

  _checkFild(fildName) {
  this._fildPattern(fildName);
  let fildData = new InputData(fildName).data;
  if (this.fildPattern == undefined || fildData === '') {
    return new CheckError (fildName).errorAction(fildName)
  } else if (this.fildPattern == 'textArea') {
    new CheckError(fildName).okAction(fildName)
    return this.validater += 1;
  } else {
    switch (this.fildPattern.test(fildData)) {
      case true:
        new CheckError(fildName).okAction(fildName)
        return this.validater += 1;
        break;
      default:
        new CheckError(fildName).errorAction(fildName)
        break;
    }
  }
};

  validate(name, phone, email, message) {
      this._checkFild(name);
      this._checkFild(email);
      this._checkFild(message);

      if (this.validater == 3) {
      //-----Отправляет данные на почту-----  
        AJAXsender()
      
    }
  };
}
