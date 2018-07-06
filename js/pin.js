'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAX_AVAILABLE_PINS = 5;
  var popupParent = document.querySelector('.map__filters-container');
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  // создаем метку на основе шаблона

  function createPinNode(pinObject) {
    var pinNode = pinTemplate.cloneNode(true);
    pinNode.style.left = pinObject.location.x - PIN_WIDTH / 2 + 'px';
    pinNode.style.top = pinObject.location.y - PIN_HEIGHT + 'px';
    pinNode.querySelector('img').src = pinObject.author.avatar;
    pinNode.querySelector('img').alt = pinObject.offer.title;
    pinNode.addEventListener('click', function () {
      var mapCard = window.map.map.querySelector('.map__card');
      if (mapCard) {
        mapCard.remove();
      }
      popupParent.appendChild(window.card.renderMapCard(pinObject));
    });
    return pinNode;

  }


  function removePins() {
    var pinsArr = window.map.map.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < pinsArr.length; i++) {
      pinsArr[i].remove();
    }
  }
  window.render = function (pins) {
    var pinsFragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_AVAILABLE_PINS; i++) {
      var pin = createPinNode(pins[i]);
      pinsFragment.appendChild(pin);
    }
    var pinsPlace = document.querySelector('.map__pins');
    pinsPlace.appendChild(pinsFragment);
  };

  window.pin = {
    createPinNode: createPinNode,
    removePins: removePins,
  };

})();
