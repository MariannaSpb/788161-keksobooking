// 'use strict';

// (function () {
//   var titles = [
//     'Большая уютная квартира',
//     'Маленькая неуютная квартира',
//     'Огромный прекрасный дворец',
//     'Маленький ужасный дворец',
//     'Красивый гостевой домик',
//     'Некрасивый негостеприимный домик',
//     'Уютное бунгало далеко от моря',
//     'Неуютное бунгало по колено в воде'
//   ];

//   var types = [
//     'palace',
//     'flat',
//     'house',
//     'bungalo'
//   ];

//   var checkinTimes = [
//     '12:00',
//     '13:00',
//     '14:00'
//   ];

//   var checkoutTimes = [
//     '12:00',
//     '13:00',
//     '14:00'
//   ];

//   var features = [
//     'wifi',
//     'dishwasher',
//     'parking',
//     'washer',
//     'elevator',
//     'conditioner'
//   ];

//   var photos = [
//     'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
//     'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
//     'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
//   ];

//   var MAX_POSITION_Y = 630;
//   var MIN_POSITION_Y = 130;
//   var MIN_POSITION_X = 0;
//   var MAX_POSITION_X = document.querySelector('.map__pins').clientWidth;
//   var minPrice = 1000;
//   var maxPrice = 1000000;
//   var minRooms = 1;
//   var maxRooms = 5;
//   var minGuests = 1;
//   var maxGuests = 10;

//   var NUMBER_ROOMS = 8;
//   var offers = [];

//   // Координаты меток
//   function createCoords() {
//     var locationX = window.utils.getRandomInteger(MIN_POSITION_X, MAX_POSITION_X);
//     var locationY = window.utils.getRandomInteger(MIN_POSITION_Y, MAX_POSITION_Y);

//     return {x: locationX, y: locationY};
//   }
//   function createOffers() {
//     var newOffers = [];

//     for (var id = 1; id <= NUMBER_ROOMS; id++) {
//       var offer = createOffer(id);
//       newOffers.push(offer);
//     }

//     return newOffers;
//   }
//   offers = createOffers();
//   // создаем массив объяв

//   function createOffer(id) {
//     var coords = createCoords();

//     return {
//       author: {
//         avatar: 'img/avatars/user0' + (id) + '.png'
//       },
//       offer: {
//         title: window.utils.getRandomElementArray(titles),
//         address: coords.x + ', ' + coords.y,
//         price: window.utils.getRandomInteger(minPrice, maxPrice),
//         type: window.utils.getRandomElementArray(types),
//         rooms: window.utils.getRandomInteger(minRooms, maxRooms),
//         guests: window.utils.getRandomInteger(minGuests, maxGuests),
//         checkin: window.utils.getRandomElementArray(checkinTimes),
//         checkout: window.utils.getRandomElementArray(checkoutTimes),
//         features: window.utils.getRandomLengthArray(features, 1),
//         description: '',
//         photos: window.utils.shuffleArray(photos),
//       },
//       location: {
//         x: coords.x,
//         y: coords.y
//       }
//     };
//   }


//     window.data = {
//     createOffers: createOffers,
//     offers: offers,
//     createCoords: createCoords

//   };

// })();
