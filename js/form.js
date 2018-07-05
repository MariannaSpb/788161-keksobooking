'use strict';

(function () {
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
  var successPopup = document.querySelector('.success'); // НАЗВАНИЕ???????

  // var submitButton = adForm.querySelector('.ad-form__submit');

  var priceType = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 100000
  };
  function onHouseTypeChange() {
    priceField.min = priceType[accommodationType.value];
    priceField.placeholder = priceField.min;
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
    if ((roomNumberField.value === '1') && (capacityField.value !== '1')) {
      capacityField.setCustomValidity('Одноместный номер рассчитан только на одного гостя');
    } else if ((roomNumberField.value === '2') && (capacityField.value !== '2' && capacityField.value !== '1')) {
      capacityField.setCustomValidity('В двух комнатах может проживать не более 2 гостей.');
    } else if ((roomNumberField.value === '3') && (capacityField.value !== '2') && (capacityField.value !== '1') && (capacityField.value !== '3')) {
      capacityField.setCustomValidity('В трех  комнатах может проживать не более 3 гостей');
    } else if ((roomNumberField.value === '100') && (capacityField.value !== '0')) {
      capacityField.setCustomValidity('не для гостей');
    } else {
      capacityField.setCustomValidity('');
    }
  }


  accommodationType.addEventListener('change', onHouseTypeChange);
  capacityField.addEventListener('change', checkRoomGuests);
  roomNumberField.addEventListener('change', checkRoomGuests);
  timeInField.addEventListener('change', syncTimeIn);
  timeOutField.addEventListener('change', syncTimeOut);

  function resetPage() {
    window.card.closeCards();
    window.pin.removePins();
    adForm.reset();
    mainPin.style.left = window.map.mapCenterX - (mainPin.offsetWidth / 2) + 'px'; // сместила главный пин
    mainPin.style.top = window.map.mapCenterY - (mainPin.offsetHeight / 2) + 'px';
    window.map.getCoordinates();
    map.classList.add('map--faded');
    fieldsets.forEach(function (item) {
      item.disabled = true;
    });
    adForm.classList.add('ad-form--disabled');
    mainPin.addEventListener('mouseup', window.map.mainPinClick); // активация страницы
    mainPin.addEventListener('keydown', onPopupEnterPress);
  }

  resetButton.addEventListener('click', resetPage);

  // функция нажатия на гл пин enterom
  function onPopupEnterPress(evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      window.map.mainPinClick();
    }
  }

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

  // создание элемента с сообщением об ошибке

  // function onError(errorMessage) {
  //   var errorMessageElement = document.createElement('div');
  //   errorMessageElement.style = 'z-index: 100; margin: 5px auto; text-align: center; background-color: red';
  //   errorMessageElement.style.position = 'absolute';
  //   errorMessageElement.style.left = 0;
  //   errorMessageElement.style.right = 0;
  //   errorMessageElement.style.fontSize = '30px';
  //   errorMessageElement.textContent = errorMessage;
  //   document.body.insertAdjacentElement('afterbegin', errorMessageElement); // добавляем ноду в DOM
  //   errorMessageElement.classList.add('error');

  // }


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
    // document.removeEventListener('click', closePopup());
    document.removeEventListener('keydown', onPopupEscPress);
  }
  successPopup.addEventListener('click', closePopup);

  // Доработайте обработчик отправки формы так, чтобы он отменял действие формы по умолчанию и отправлял данные формы

  adForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(adForm), onSuccessClick, onError);
    evt.preventDefault();
  });

  function onError(errorMessage) {
    var errorMessageElement = document.createElement('div');
    errorMessageElement.style = 'z-index: 100; margin: 5px auto; text-align: center; background-color: red';
    errorMessageElement.style.position = 'absolute';
    errorMessageElement.style.left = 0;
    errorMessageElement.style.right = 0;
    errorMessageElement.style.fontSize = '30px';
    errorMessageElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorMessageElement); // добавляем ноду в DOM
    errorMessageElement.classList.add('hidden');
  }


  window.form = {
    fieldsets: fieldsets,
    onPopupEnterPress: onPopupEnterPress,
    resetPage: resetPage,
    onError: onError

  };
})();
