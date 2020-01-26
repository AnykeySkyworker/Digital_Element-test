 // ------------ Получаем данные из полей формы----------

 export default class InputData {
  constructor(fildName) {
    this.element = this._getElement(fildName);
    this.data = this._getData();
  }
  _getElement(fildName) {
    let element = document.querySelector(`#${fildName}`);
    return element
  }
  _getData() {
    let data = this.element.value;
    return data
  }
}
