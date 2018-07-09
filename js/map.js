'use strict';

(function () {

  var MAX_POSITION_Y = 630;
  var MIN_POSITION_Y = 130;
  var ENTER_KEYCODE = 13;
  var MAIN_PIN_SIZE = 62;
  var MAIN_PIN_ARROW = 22;
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var mapPins = map.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var inputAddress = adForm.querySelector('#address');
  var mapCenterX = map.offsetWidth / 2; // определила центр
  var mapCenterY = map.offsetHeight / 2;
  var dragLimit = {
    x: {
      min: 0,
      max: map.clientWidth - MAIN_PIN_SIZE
    },
    y: {
      min: MIN_POSITION_Y - (MAIN_PIN_SIZE + MAIN_PIN_ARROW),
      max: MAX_POSITION_Y - (MAIN_PIN_SIZE + MAIN_PIN_ARROW)
    }
  };


  mainPin.style.left = mapCenterX - (mainPin.offsetWidth / 2) + 'px'; // сместила главный пин
  mainPin.style.top = mapCenterY - (mainPin.offsetHeight / 2) + 'px';

  mainPin.addEventListener('mousedown', onMainPinClick); // активация страницы
  mainPin.addEventListener('keydown', onKeyboardActivatePin);

  function onKeyboardActivatePin(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onMainPinClick();
    }
  }


  // определение координат главного пина
  function calcCoordsToInputAdress() {
    inputAddress.value = parseInt(mainPin.style.left + MAIN_PIN_SIZE / 2, 10) + ', ' + parseInt(mainPin.style.top + (MAIN_PIN_SIZE + MAIN_PIN_ARROW), 10);
  }

  // активация странички
  function onMainPinClick() {
    window.backend.load(window.onSuccess, window.form.onError); // отрисовываем 5 пинов при активации
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    calcCoordsToInputAdress();
    window.form.fieldsets.forEach(function (item) {
      item.disabled = false;
    });
    filterForm.addEventListener('change', window.utils.debounce(window.filter.updatePins));
    mainPin.removeEventListener('mousedown', onMainPinClick);
    mainPin.removeEventListener('keydown', onKeyboardActivatePin);
  }

  mainPin.addEventListener('mousedown', function (evt) {
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

      var newCoordsX = left + MAIN_PIN_SIZE / 2;
      var newCoordsY = top + (MAIN_PIN_SIZE + MAIN_PIN_ARROW);

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
    onMainPinClick: onMainPinClick,
    calcCoordsToInputAdress: calcCoordsToInputAdress,
    mapCenterX: mapCenterX,
    mapCenterY: mapCenterY,
    onKeyboardActivatePin: onKeyboardActivatePin,
  };

})();
