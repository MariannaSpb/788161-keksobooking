'use strict';
(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  function debounce(fun) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(fun, DEBOUNCE_INTERVAL);
  }

  window.utils = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    debounce: debounce
  };
})();
