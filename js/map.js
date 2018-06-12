'use strict';
// создаю массивы с исходными данными
var users = [1, 2, 3, 4, 5, 6, 7, 8];

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
'14:00',
];

var features = [
'wifi',
'dishwasher',
'parking',
'washer',
'elevator',
'conditioner',
];
var photos = [
'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var minLocation_X = 300;
var maxLocation_X = 900;
var minLocation_Y = 130;
var maxLocation_Y = 630;
var minPrice = 1000;
var maxPrice = 1000000;
var minRooms = 1;
var maxRooms = 5;
var minGuests = 1;
var maxGuests = 10;

// У блока .map уберите класс .map--faded.
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// функция генерации случайного элемента массива
function getRandomElement(array) {
var randomElement = Math.floor(Math.random() * number.length);
return array[randomElement];
};
// функция генерации данных из заданного диапазона
function getRandomInteger(min, max) {
var randomInteger = Math.floor(Math.random() * (max - min + 1) + min);
return randomInteger;
};

//перетасовка массива
function getshuffle(array) {
return array[getRandomInteger(0, array.length - 1)];
};

// тут должна быть ф-ция для feauters  где разная длинна строк
function getRandomLengthArray(array) {
};

// Координаты меток
var coordinates = function() {
var locationX = getRandomInteger(minLocation_X, maxLocation_X);
var locationY =  getRandomInteger(minLocation_Y, maxLocation_Y);
var coordinates = locationX + ',' + locationY;
return coordinates;
};
var pinWidth = 50;
var pinHeight = 70;

//создаем массив объяв
var createAds = function() {
var ads_amount = 8;
for (var i  = 0; i < ads_amount; i++) {
var x = randomInteger(minLocation_X, maxLocation_X);
var y = randomInteger(minLocation_Y, maxLocation_Y);
//var ad[i] =
var ad = {
  autor:
    {
      avatar: 'img/avatars/user0' + getRandomElement(users) + 'png'
},
      offer:
      {
        title: getRandomElement(titles),
        adress: x + ',' + y,
        price: getRandomInteger(minPrice, maxPrice),
        type: getRandomElement (types),
        rooms: getRandomInteger(minRooms, maxRooms),
        guests: getRandomInteger(minGuests, maxGuests),
        checkIn: getRandomElement(checkinTimes),
        checkout: getRandomElement(checkinTimes),
        feauters: getRandomInteger(0,5), //ТАК ВООБЩЕ МОЖНО??
        description: '',
        photos:  // нет функции
      },
      location:{
        x: getRandomInteger(minLocation_X, maxLocation_X),
        y: getRandomInteger(minLocation_Y, maxLocation_Y)
      }
};
return ad;
}

//находим блок  с метками
var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin'); // нашли балблон метки

//создаем метку на основе шаблона
var renderMapPin = function (pin) {
var newPin = pinTemplate.cloneNode(true);
newPin.style.left =pin.location.x - pinWidth + 'px';
newPin.style.top = pin.location.y - pinHeight +'px';
newPin.querySelector('img').src = pin.author.avatar;
newPin.querySelector('img').alt = pin.offer.title;
return newPin;
};
//Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Используйте DocumentFragment.
var pinFragment = document.createDocumentFragment();
for (var i = 0; i < ad.length; i++) {
pinFragment.appendChild(newPin(ad[i]));
}
//вызов добавления
mapPins.appendChild(pinFragment);

