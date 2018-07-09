'use strict';

(function () {

  var HouseType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
  };
  function getHouseType(type) {
    return HouseType[type];
  }

  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  function renderMapCard(mapCard) {
    var mapCardElement = mapCardTemplate.cloneNode(true);
    mapCardElement.querySelector('.popup__title').textContent = mapCard.offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = mapCard.offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = mapCard.offer.price + '₽/ночь';
    mapCardElement.querySelector('.popup__type').textContent = getHouseType(mapCard.offer.type);
    mapCardElement.querySelector('.popup__text--capacity').textContent = mapCard.offer.rooms + ' комнаты для ' + mapCard.offer.guests + ' гостей';
    mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + mapCard.offer.checkin + ', выезд до ' + mapCard.offer.checkout;
    mapCardElement.querySelector('.popup__features').innerHTML = '';
    for (var j = 0; j < mapCard.offer.features.length; j++) {
      mapCardElement.querySelector('.popup__features').innerHTML += '<li class="popup__feature popup__feature--' + mapCard.offer.features[j] + '"></li>';
    }
    mapCardElement.querySelector('.popup__description').textContent = mapCard.offer.description;
    mapCardElement.querySelector('.popup__photos').textContent = '';
    for (var f = 0; f < mapCard.offer.photos.length; f++) {
      mapCardElement.querySelector('.popup__photos').insertAdjacentHTML('beforeend', '<img src="' + mapCard.offer.photos[f] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
    }
    mapCardElement.querySelector('.popup__avatar').src = mapCard.author.avatar;
    var closeButton = mapCardElement.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      mapCardElement.remove();
    });
    closeButton.addEventListener('keydown', onPopupEscapePress);
    return mapCardElement;
  }

  // Закрытие попапа по нажатию на esc
  function onPopupEscapePress(evt) {
    var mapCardElement = document.querySelector('.map__card');
    if (evt.keyCode === 27) {
      mapCardElement.remove();
    }
  }

  function closeCards() {
    var cardsList = document.querySelectorAll('.map__card');
    if (cardsList) {
      for (var l = 0; l < cardsList.length; l++) {
        cardsList[l].classList.add('hidden');
      }
    }
  }

  window.card = {
    renderMapCard: renderMapCard,
    closeCards: closeCards,
    getHouseType: getHouseType
  };

})();
