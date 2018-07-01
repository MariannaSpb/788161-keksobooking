'use strict';
(function () {

  var ENTER_KEYCODE = 13;


  // функция генерации случайного элемента массива
  function getRandomElement(array) {
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
    // isEnterEvent: isEnterEvent,
    getRandomElement: getRandomElement,
    getRandomInteger: getRandomInteger,
    shuffleArray: shuffleArray,
    getRandomLengthArray: getRandomLengthArray,
  };
})();