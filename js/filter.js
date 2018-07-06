'use strict';

(function () {

  window.onSuccess = function (data) {
    pins = data;
    window.render(pins);
  };

  var Price = {
    low: 0, // 10000
    middle: 50000
  };

  var filterForm = document.querySelector('.map__filters');
  var filterType = filterForm.querySelector('#housing-type');
  var filterPrice = filterForm.querySelector('#housing-price');
  var filterRooms = filterForm.querySelector('#housing-rooms');
  var filterGuests = filterForm.querySelector('#housing-guests');
  var filterFeatures = filterForm.querySelector('#housing-features');
  var filterCheckboxes = filterFeatures.querySelectorAll('.map__checkbox'); // для получения инфы о длинне массива удобств
  var pins = [];

  // ФИЛЬТРЫ КОТОРЫЕ НУЖНЫ - жилье\ ценв\комны\кол-во людей\удобства

  // сортировка по типу жилья

  function onHouseTypeFilter(item) {
    return filterType.value === 'any' || item.offer.type === filterType.value;
  }

  // сортировка по разбросу цен

  function onPricefilter(item) {
    switch (filterPrice.value) {
      case 'low':
        return item.offer.price < Price.low;
      case 'middle':
        return item.offer.price >= Price.low && item.offer.price < Price.middle;
      case 'high':
        return item.offer.price >= Price.middle;
      default:
        return true;
    }
  }
  // сортировка по количеству комнат
  function onRoomsFilter(item) {
    return filterRooms.value === 'any' || item.offer.rooms.toString() === filterRooms.value;
  }

  // сортировка по кол-ву гостей
  function onGuestFilter(item) {
    return filterGuests.value === 'any' || item.offer.guests.toString() === filterGuests.value;
  }

  // function onFeaturesFilter (item) {
  //   return filterFeatures.value === 'any' || item.offer.eatures.toString() === filterFeatures.value;
  // }

  // Сортировка по фичам
  // function onFeaturesFilter (item) {
  //   for (var i = 0; i < filterCheckboxes.length; i++) {

  // }
  // фильтруем имеющиеся данные  (БЕЗ ФИЧЕЙ)
  function updatePins() {
    window.pin.removePins();
    window.card.closeCards();
    var filteredPins = pins.filter(onRoomsFilter).filter(onGuestFilter).filter(onPricefilter).filter(onHouseTypeFilter);
  }

  filterForm.addEventListener('change', function () {
    window.utils.debounce(updatePins);
  });

})()
