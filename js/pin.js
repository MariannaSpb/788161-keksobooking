'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAX_AVAILABLE_PINS = 5;
  var popupParent = document.querySelector('.map__filters-container');
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  // создаем метку на основе шаблона

  function createPinNode(pinObject) {
    var pinNode = pinTemplate.cloneNode(true);
    pinNode.style.left = pinObject.location.x - PIN_WIDTH / 2 + 'px';
    pinNode.style.top = pinObject.location.y - PIN_HEIGHT + 'px';
    pinNode.querySelector('img').src = pinObject.author.avatar;
    pinNode.querySelector('img').alt = pinObject.offer.title;
    pinNode.addEventListener('click', function () {
      var mapCard = document.querySelector('.map__card');
      if (mapCard) {
        mapCard.remove();
      }
      popupParent.appendChild(window.card.renderMapCard(pinObject));
    });
    return pinNode;

  }

  function removePins() {
    var pinsArr = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < pinsArr.length; i++) {
      pinsArr[i].remove();
    }
  }
  var mapPinsElements = [];

  function renderPins(pins) {
    var visiblePins = Math.min(pins.length, MAX_AVAILABLE_PINS);
    for (var i = 0; i < visiblePins; i++) {
      var data = pins[i];
      var pinElement = createPinNode(data, data.author.avatar);
      mapPinsElements.push(pinElement);
      mapPins.appendChild(pinElement);
    }
  }


  window.pin = {
    createPinNode: createPinNode,
    removePins: removePins,
    renderPins: renderPins,

  };

})();
