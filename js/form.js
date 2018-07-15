'use strict';

(function () {
  var MESSAGE_TIMEOUT = 5000;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var timeInField = adForm.querySelector('#timein');
  var timeOutField = adForm.querySelector('#timeout');
  var accommodationType = adForm.querySelector('#type');
  var priceField = adForm.querySelector('#price');
  var roomNumberField = adForm.querySelector('#room_number');
  var capacityField = adForm.querySelector('#capacity');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var fieldsets = adForm.querySelectorAll('fieldset');
  var mainPin = map.querySelector('.map__pin--main');
  var successPopup = document.querySelector('.success');
  var filters = document.querySelector('.map__filters');
 // var photoContainer = document.querySelector('.ad-form__photo-container');
  var capacityOptions = Array.from(capacityField.options);
  var roomsCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var PriceType = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 100000
  };
  onHouseTypeChange();
  checkRoomGuests();


  function onHouseTypeChange() {
    priceField.min = PriceType[accommodationType.value];
    priceField.placeholder = PriceType[accommodationType.value];
  }

  accommodationType.addEventListener('change', onHouseTypeChange);

  // время заезда  неравно времени выезда

  function syncTimeOut() {
    timeInField.value = timeOutField.value;
  }

  function syncTimeIn() {
    timeOutField.value = timeInField.value;
  }

  function checkRoomGuests() {
    var room = roomNumberField.options[roomNumberField.selectedIndex].value;
    var selectedValues = roomsCapacity[room];
    capacityOptions.forEach(function (option) {
      if (selectedValues.includes(option.value)) {
        option.disabled = false;
        option.selected = true;
      } else {
        option.selected = false;
        option.disabled = true;
      }
    });
  }

  function onRoomFieldsetChange() {
    checkRoomGuests();
  }

  accommodationType.addEventListener('change', onHouseTypeChange);
  roomNumberField.addEventListener('change', onRoomFieldsetChange);
  timeInField.addEventListener('change', syncTimeIn);
  timeOutField.addEventListener('change', syncTimeOut);


  function resetPage() {
    window.card.closeCards();
    window.pin.removePins();
    adForm.reset();
    filters.reset();
    onRoomFieldsetChange();
    onHouseTypeChange();
    mainPin.style.left = window.map.mapCenterX - (mainPin.offsetWidth / 2) + 'px'; // сместила главный пин
    mainPin.style.top = window.map.mapCenterY - (mainPin.offsetHeight / 2) + 'px';
    window.map.calcCoordsToInputAdress();
    map.classList.add('map--faded');
    window.pictures.removeImg();
    fieldsets.forEach(function (item) {
      item.disabled = true;
    });
    adForm.classList.add('ad-form--disabled');
    mainPin.addEventListener('mouseup', window.map.onMainPinClick); // активация страницы
    mainPin.addEventListener('keydown', window.map.onKeyboardActivatePin);
  }

  resetButton.addEventListener('click', resetPage);
  mainPin.removeEventListener('click', window.map.onMainPinClick);

  function onPopupEscPress(evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closePopup();
    }
  }

  // Функции для подсвечиваня невалидвой формы
  function isInvalid(input) {
    if (input.checkValidity() === false) {
      input.style.boxShadow = '0 0 2px 2px #ff6547';
    }
  }
  function isValid(input) {
    if (input.checkValidity() === true) {
      input.style.boxShadow = 'none';
    }
  }

  adForm.querySelector('.ad-form__submit').addEventListener('click', function () {
    isInvalid(adForm.querySelector('#title'));
    isInvalid(adForm.querySelector('#price'));
    isValid(adForm.querySelector('#title'));
    isValid(adForm.querySelector('#price'));
  });

  // успешная отправка формы
  function onSuccessClick() {
    resetPage();
    successPopup.classList.remove('hidden');
    successPopup.addEventListener('click', function () {
      successPopup.classList.add('hidden');
    });
    document.addEventListener('keydown', onPopupEscPress);
  }

  // закрыть сообщение об успешной отправке
  function closePopup() {
    successPopup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  }
  successPopup.addEventListener('click', closePopup);

  function onError(response) {
    var errorMassage = document.createElement('div');
    errorMassage.style = 'margin: 0 auto; text-align: center; color: red;';
    errorMassage.style.fontSize = '16px';
    errorMassage.textContent = response + '. Попробуйте отправить форму еще раз.';
    adForm.insertAdjacentElement('beforeend', errorMassage);
    setTimeout(function () {
      errorMassage.parentNode.removeChild(errorMassage);
    }, MESSAGE_TIMEOUT);
  }

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), onSuccessClick, onError);
    window.pictures.removeImg();
    evt.preventDefault();
  });


  window.form = {
    fieldsets: fieldsets,
    resetPage: resetPage,
    onError: onError,
    checkRoomGuests: checkRoomGuests
  };
})();
