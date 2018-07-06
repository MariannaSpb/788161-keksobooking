'use strict';

(function () {

  var SIMILAR_OFFERS = 5;

  var Price = {
    low: 0, // 10000
    hight: 50000
  };

  var filterForm = document.querySelector('.map__filters');
  var filterType = filterForm.querySelector('#housing-type');
  var filterPrice = filterForm.querySelector('#housing-price');
  var filterRooms = filterForm.querySelector('#housing-rooms');
  var filterGuests = filterForm.querySelector('#housing-guests');
  var filterFeatures = filterForm.querySelector('#housing-features');
  var filterCheckboxes = filterFeatures.querySelectorAll('.map__checkbox');
  var pins = [];

  // ФИЛЬТРЫ КОТОРЫЕ НУЖНЫ - жилье\ ценв\комны\кол-во людей\удобства

  function onHouseTypeFilter (item) {
    return filterType.value === 'any' || item.offer.type === filterType.value;
  }







})()
