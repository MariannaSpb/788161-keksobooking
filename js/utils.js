'use strict';
(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;


  // функция генерации случайного элемента массива
  function getRandomElementArray(array) {
    var randomElement = Math.floor(Math.random() * array.length);

    return array[randomElement];
  }

  // функция генерации данных из заданного диапазона
  function getRandomInteger(min, max) {
    var randomInteger = Math.floor(Math.random() * (max - min + 1) + min);
    return randomInteger;
  }

  // перетасовка массива
  function shuffleArray(array) {
    return array.sort(function () {
      return Math.random() - 0.5;
    });
  }
  //  ф-ция для feauters  где разная длинна строк
  function getRandomLengthArray(array, minSize) {
    return shuffleArray(array).slice(0, getRandomInteger(minSize, array.length));
  }

  window.utils = {
    getRandomElementArray: getRandomElementArray,
    getRandomInteger: getRandomInteger,
    shuffleArray: shuffleArray,
    getRandomLengthArray: getRandomLengthArray,
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE

  };
})();
