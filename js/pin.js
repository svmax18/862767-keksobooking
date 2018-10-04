'use strict';

(function () {
  // Отступ геометки сверху и снизу от блока
  var MAIN_PIN_MIN_Y = 130;
  var MAIN_PIN_MAX_Y = 630;

  // Отступ геометки слева и справа от блока
  var MAIN_PIN_X = 50;

  // Смещение по оси Y для рендера геометки
  var MAIN_PIN_Y = 50;

  // Элементы
  var mainPin = document.querySelector('.map__pin--main');
  var getMainPinCoords = window.map.getMainPinCoords;

  // Геометка не должна заходить за рамки
  var checkCoords = function (coords) {
    var minX = MAIN_PIN_X;
    var maxX = document.querySelector('.map').offsetWidth - MAIN_PIN_X;
    var minY = MAIN_PIN_MIN_Y - MAIN_PIN_Y;
    var maxY = MAIN_PIN_MAX_Y - MAIN_PIN_Y;

    if (coords.x < minX) {
      coords.x = minX;
    }

    if (coords.x > maxX) {
      coords.x = maxX;
    }

    if (coords.y < minY) {
      coords.y = minY;
    }

    if (coords.y > maxY) {
      coords.y = maxY;
    }

    return coords;
  };

  //
  var onMainPinMouseDown = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    //
    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      newCoords = checkCoords(newCoords);

      mainPin.style.top = (newCoords.y) + 'px';
      mainPin.style.left = (newCoords.x) + 'px';
    };   
    var onMouseUp = function () {
      // Устанавливаем новый адрес
      window.map.setAddressPin(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };


  // Слушатели
  mainPin.addEventListener('mousedown', onMainPinMouseDown);

  window.map = {
    getMainPinCoords: getMainPinCoords,
    setAddressPin: setAddress2
  };
})();