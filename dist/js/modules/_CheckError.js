// ------------ Определяем поведение полей формы при корректном и некорректном заполнении поля ----------
import InputData from './_InputData.js';

export default class CheckError {
  constructor(fildName) {
    this.element = new InputData(fildName)._getElement(fildName);
  }

  errorAction(fildName) {
    let alertText;
    this.element.style.background = '#ffcccc';
    switch (fildName) {
      case 'name':
       alertText = 'Поле "Имя" не заполнено либо содержит некорректные символы';						
        break;
      case 'email':
        alertText = 'Поле "E-mail" не заполнено либо заполнено в неправильном формате';
        break;
      case 'message':
        alertText = 'Пожалуйста заполните поле "Сообщение"';
        break;
    }
    this.element.previousElementSibling.style.color = 'red';
    this.element.previousElementSibling.innerHTML = `${alertText}`;
  }

  okAction(fildName) {
    let alertText;
    this.element.style.background = '#cdeacd';
    switch (fildName) {
      case 'name':
       alertText = 'Имя';						
        break;
      case 'email':
        alertText = 'E-mail';
        break;
      case 'message':
        alertText = 'Сообщение';
        break;
    }
    this.element.previousElementSibling.style.color = '#fff';
    this.element.previousElementSibling.innerHTML = `${alertText}`;
  }
}