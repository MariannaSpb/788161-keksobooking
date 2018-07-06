'use strict';

window.backend = (function () {

  var STATUS_SUCCESS = 200;
  var TIMEOUT = 10000;

  function request(url, onLoad, onError, data) {


  // Функция получения данных с сервера
  //  var load = function (onLoad, onError) {
  //   var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT; // 10 сек

    if (data) {
      xhr.open('POST', url);
      xhr.send(data);
    } else {
      xhr.open('GET', url);
      xhr.send();
    }
  }

  return {
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      request(URL, onLoad, onError);
    },

    save: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking';
      request(URL, onLoad, onError, data);
    }
  };

  //   xhr.open('GET', URL); // настраивает запрос на получение данных с сервера
  //   xhr.send(); // открывем соединение
  // };

  // // Функция для отправки данных на сервер
  // var upload = function (data, onLoad, onError) {
  //   var URL = 'https://js.dump.academy/keksobooking';
  //   var xhr = new XMLHttpRequest();
  //   xhr.responseType = 'json';

  //   xhr.addEventListener('load', function () {
  //     if (xhr.status === STATUS_SUCCESS) {
  //       onLoad(xhr.response);
  //     } else {
  //       onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
  //     }
  //   });

  //   xhr.addEventListener('error', function () {
  //     onError('Произошла ошибка соединения');
  //   });

  //   xhr.addEventListener('timeout', function () {
  //     onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  //   });

  //   xhr.timeout = TIMEOUT;

  //   xhr.open('POST', URL); // настраивает запрос передачи данных на сервер
  //   xhr.send(data);
  // };

  //  window.backend = {
  //   load: load,
  //   upload: upload,
  // };

})();
