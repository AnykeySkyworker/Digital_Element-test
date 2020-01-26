 //-----Отправляет данные на почту-----  

 export default function AJAXsender() {
  if (document.forms[0] && window.FormData) {

    let form = document.forms[0];

    // Настройка AJAX запроса
    let request = new XMLHttpRequest();
    request.open('POST', './mail.php', true);
    request.setRequestHeader('accept', 'application/json');
      // Это простой способ подготавливить данные для отправки (все браузеры и IE > 9)
      let formData = new FormData(form);
      // Отправляем данные
      request.send(formData);
      // Функция для наблюдения изменения состояния request.readyState обновления statusMessage соответственно
      request.onreadystatechange = function () {
        // 4 = Ответ от сервера полностью загружен
        if (request.readyState === 4) {
            // 200 - 299 = успешная отправка данных!
            if (request.status == 200 && request.status < 300) {
              document.querySelector('.popup__form').reset();
              document.querySelector('.popup').classList.toggle('hidden');
              alert('ВАШЕ СООБЩЕНИЕ Доставлено');
            } else  {
              alert('ВАШЕ СООБЩЕНИЕ не Доставлено');
            }
        }
      };
  };
}