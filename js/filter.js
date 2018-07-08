'use strict';
(function () {

  window.onSuccess = function (data) {
    pins = data;
    window.pin.renderPins(pins);
  };

  var Price = {
    low: 10000,
    middle: 50000
  };

  var filterForm = document.querySelector('.map__filters');
  var filterType = filterForm.querySelector('#housing-type');
  var filterPrice = filterForm.querySelector('#housing-price');
  var filterRooms = filterForm.querySelector('#housing-rooms');
  var filterGuests = filterForm.querySelector('#housing-guests');
  var filterFeatures = filterForm.querySelector('#housing-features');
  var pins = [];


  function onHouseTypeFilter(item) {
    return filterType.value === 'any' || item.offer.type === filterType.value;
  }

  // сортировка по стоимости

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

  var featuresFilter = function (newData) {
    var checkedElements = filterFeatures.querySelectorAll('input[type=checkbox]:checked');
    var selectedFeatures = [].map.call(checkedElements, function (item) {
      return item.value;
    });
    return selectedFeatures.every(function (currentFeature) {
      return newData.offer.features.includes(currentFeature);
    });
  };

  function updatePins() {
    window.pin.removePins();
    var filteredPins = pins
    .filter(onRoomsFilter)
    .filter(onGuestFilter)
    .filter(onPricefilter)
    .filter(onHouseTypeFilter)
    .filter(featuresFilter);
    window.pin.renderPins(filteredPins);
  }

  function onFiltersChange() {
    window.utils.debounce(updatePins, window.DEBOUNCE_INTERVAL);
  }
  filterForm.addEventListener('change', onFiltersChange);

  window.filter = {
    updatePins: updatePins,
  };

})();
