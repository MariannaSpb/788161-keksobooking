'use strict';

(function () {
  var STATUS_SUCCESS = 200;
  var TIMEOUT = 10000;
  var DOWNLOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';

  function request(url, onSuccess, onError, data) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
        onSuccess(xhr.response);
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
      xhr.open('POST', UPLOAD_URL);
      xhr.send(data);
    } else {
      xhr.open('GET', DOWNLOAD_URL);
      xhr.send();
    }
  }

  window.backend = {
    load: function (onSuccess, onError) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      request(URL, onSuccess, onError);
    },

    save: function (data, onSuccess, onError) {
      var URL = 'https://js.dump.academy/keksobooking';
      request(URL, onSuccess, onError, data);
    }
  };
})();
