'use strict';

(function () {

  var MAX_POSITION_Y = 630;
  var MIN_POSITION_Y = 130;
  var MIN_POSITION_X = 0;
  var MAX_POSITION_X = document.querySelector('.map__pins').clientWidth;
  var ENTER_KEYCODE = 13;
  var pinMainSize = 62;
  var pinMainArrow = 22;
  var pinMainHalfSize = pinMainSize / 2;
  var pinMainAll = pinMainSize + pinMainArrow;
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var mapPins = map.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var inputAddress = adForm.querySelector('#address');
  var mapCenterX = map.offsetWidth / 2; // определила центр
  var mapCenterY = map.offsetHeight / 2;

  mainPin.style.left = mapCenterX - (mainPin.offsetWidth / 2) + 'px'; // сместила главный пин
  mainPin.style.top = mapCenterY - (mainPin.offsetHeight / 2) + 'px';

  mainPin.addEventListener('mousedown', mainPinClick); // активация страницы
  mainPin.addEventListener('keydown', function (evt) { // активация страницы
    if (evt.keyCode === ENTER_KEYCODE) {
      mainPinClick();
    }
  });

  // определение координат главного пина
  function getCoordinates() {
    inputAddress.value = parseInt(mainPin.style.left + pinMainHalfSize, 10) + ', ' + parseInt(mainPin.style.top + pinMainAll, 10);
  }

  // Координаты меток
  function createCoords() {
    var locationX = window.utils.getRandomInteger(MIN_POSITION_X, MAX_POSITION_X);
    var locationY = window.utils.getRandomInteger(MIN_POSITION_Y, MAX_POSITION_Y);

    return {x: locationX, y: locationY};
  }

  // активация странички
  function mainPinClick() {
    window.card.offers = window.card.createOffers();
    var pinFragment = document.createDocumentFragment(); // отрисуйум сгенерированные DOM-элементы в блок .map__pins. Используйте DocumentFragment.
    for (var i = 0; i < window.card.offers.length; i++) {
      var pinNode = window.pin.createPinNode(window.card.offers[i]);
      pinFragment.appendChild(pinNode);
    }
    map.classList.remove('map--faded'); // снять блок с карты
    adForm.classList.remove('ad-form--disabled'); // снять блок с полей формы
    getCoordinates();
    mapPins.appendChild(pinFragment);
    window.form.fieldsets.forEach(function (item) {
      item.disabled = false;
    });
    mainPin.removeEventListener('mousedown', mainPinClick);
    mainPin.removeEventListener('keydown', mainPinClick);
    mainPin.removeEventListener('mouseup', mainPinClick);
  }

  var mainPinHandler = map.querySelector('.map__pin--main');

  var dragLimit = {
    x: {
      min: 0,
      max: map.clientWidth - pinMainSize
    },
    y: {
      min: MIN_POSITION_Y - pinMainAll,
      max: MAX_POSITION_Y - pinMainAll
    }
  };

  mainPinHandler.addEventListener('mousedown', function (evt) {

    evt.preventDefault();

    // запомним координаты начальные
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // функция перемещения
    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      // смещение
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var left = mainPin.offsetLeft - shift.x;
      if (left > dragLimit.x.max) {
        left = dragLimit.x.max;
      } else if (left <= dragLimit.x.min) {
        left = dragLimit.x.min;
      }

      var top = mainPin.offsetTop - shift.y;
      if (top > dragLimit.y.max) {
        top = dragLimit.y.max;
      } else if (top <= dragLimit.y.min) {
        top = dragLimit.y.min;
      }

      var newCoordsX = left + pinMainHalfSize;
      var newCoordsY = top + pinMainAll;

      mainPin.style.top = top + 'px';
      mainPin.style.left = left + 'px';

      inputAddress.value = newCoordsX + ',' + newCoordsY;
    }

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      mapPins.removeEventListener('mousemove', onMouseMove);
      mapPins.removeEventListener('mouseup', onMouseUp);

    };

    mapPins.addEventListener('mousemove', onMouseMove);
    mapPins.addEventListener('mouseup', onMouseUp);
  });


  window.map = {
    createCoords: createCoords,
    mainPinClick: mainPinClick,
    map: map,
    getCoordinates: getCoordinates,
    mapCenterX: mapCenterX,
    mapCenterY: mapCenterY

  };

})();
