'use strict';

(function () {

  var titles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var types = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var checkinTimes = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var checkoutTimes = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var houseType = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
  };
  var minPrice = 1000;
  var maxPrice = 1000000;
  var minRooms = 1;
  var maxRooms = 5;
  var minGuests = 1;
  var maxGuests = 10;

  var NUMBER_ROOMS = 8;
  var offers = [];
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  function getHouseType(type) {
    return houseType[type];
  }


  // создаем массив объяв

  function createOffer(id) {
    var coords = window.map.createCoords();

    return {
      author: {
        avatar: 'img/avatars/user0' + (id) + '.png'
      },
      offer: {
        title: window.utils.getRandomElement(titles),
        address: coords.x + ', ' + coords.y,
        price: window.utils.getRandomInteger(minPrice, maxPrice),
        type: window.utils.getRandomElement(types),
        rooms: window.utils.getRandomInteger(minRooms, maxRooms),
        guests: window.utils.getRandomInteger(minGuests, maxGuests),
        checkin: window.utils.getRandomElement(checkinTimes),
        checkout: window.utils.getRandomElement(checkoutTimes),
        features: window.utils.getRandomLengthArray(features, 1),
        description: '',
        photos: window.utils.shuffleArray(photos),
      },
      location: {
        x: coords.x,
        y: coords.y
      }
    };
  }

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
    var mapCardElement = window.map.map.querySelector('.map__card'); // function (evt)
    if (evt.keyCode === 27) {
      mapCardElement.remove();
    }
  }

  function closeCards() {
    var cardsList = window.map.map.querySelectorAll('.map__card');
    if (cardsList) {
      for (var l = 0; l < cardsList.length; l++) {
        cardsList[l].classList.add('hidden');
      }
    }
  }

  function createOffers() {
    var newOffers = [];

    for (var id = 1; id <= NUMBER_ROOMS; id++) {
      var offer = createOffer(id);
      newOffers.push(offer);
    }

    return newOffers;
  }


  window.card = {
    renderMapCard: renderMapCard,
    closeCards: closeCards,
    createOffers: createOffers,
    offers: offers,
  };

})();
