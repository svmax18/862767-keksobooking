'use strict';

var ROOMS_CAPACITY = {
    '1': [1],
    '2': [2, 1],
    '3': [3, 2, 1],
    '100': [0]
};

var capacityInput = form.querySelector('#capacity');

var onRoomNumberInputChange = function (evt) {
    var value = evt.target.value;
    var capacity = ROOMS_CAPACITY[value];
    var options = capacityInput.querySelectorAll('option');
  
    for (var i = 0; i < options.length; i++) {
      capacityInput.querySelector('.capacity' + i).disabled = true;
      capacityInput.querySelector('.capacity' + i).selected = false;
    }
  
    capacityInput.querySelector('.capacity' + capacity[0]).selected = true;
  
    for (i = 0; i < capacity.length; i++) {
      capacityInput.querySelector('.capacity' + capacity[i]).disabled = false;
    }
  };
