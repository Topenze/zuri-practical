"use strict";

(function() {

  const options = [...document.querySelectorAll('.bundle_option')];
  const next = document.querySelector('#next'); 
  const quizContainer = document.querySelector('#quiz');
  const quizWrapper = document.querySelector('.quiz_container');
  let activeOption = '';
  let keychainColor = '';
  init();  
 
  function init(){
    options[0].style.display = 'block'; // display the first opition
    options[0].classList.add('active_option'); // add a tracking class
    activeOption = options[0];
  };
  
  function optionValidation(curPage){
    const checked = curPage.querySelector('input[type="radio"]:checked');
    if (!checked) { 
      alert('Please make a selection');
      return false;
    }else {
      return true;
    }
  };
  
  function updateValues(curPage) {
    const value = curPage.querySelector('input[type="radio"]:checked').value;
    keychainColor = value;
  };
  
  function loadProduct(){
    quizContainer.innerHTML = '<h2 class="text-center">Loading Product...</h2>';
    document.querySelector('.quiz_container .buttons').innerHTML = '';
    window.location.assign(`/products/${keychainColor}`);
  };

  next.addEventListener('click', function() {
    const validate = optionValidation(activeOption);
    if (validate) {
      updateValues(activeOption);
      loadProduct();
    }
  });

})();