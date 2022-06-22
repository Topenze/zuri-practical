"use strict";

(function() {

  const options = [...document.querySelectorAll('.bundle_option')];
  const prev = document.querySelector('#prev');
  const next = document.querySelector('#next'); 
  const quizContainer = document.querySelector('#quiz');
  const quizWrapper = document.querySelector('.quiz_container');
  let previousPage = '';
  let activeOption = '';
  let collectionType = '';
  let chainType = '';
  let keychainColor = '';
  init();  
  nextOption();
  prevOption();
  
  
  function init(){
    options[0].style.display = 'block'; // display the first opition
    options[0].classList.add('active_option'); // add a tracking class
    prev.style.display = "none"; // remove previous button
    activeOption = options[0];
  };
  
  function pagination(curPage) {
    curPage != options[0] ? prev.style.display = 'block' : prev.style.display = 'none';
   // curPage == options[options.length - 1] ? next.style.display = 'none' : next.style.display = 'block';
  };
  
  function scrollIntoView() {
    const scloord = quizWrapper.getBoundingClientRect();
    window.scrollTo({
      top:scloord.top + window.pageYoffset,
      left:scloord.left + window.pageXoffset,
      behavior:'smooth'
    })
  }
  
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
    if (curPage.classList.contains('collection_type')) collectionType = value;
    if (curPage.classList.contains('bundle_collection')) chainType = value;
    if (curPage.classList.contains('keychain')) keychainColor = value;
  };
  
  
  function nextCheck(curPage){
    const value = curPage.querySelector('input[type="radio"]:checked').value;

    if (curPage.classList.contains('collection_type')) {
      const [nextPage] = options.filter(i => i.classList.contains(value));
      return nextPage;
    }
    if (curPage.classList.contains('bundle_collection')) {
      if (value.includes('keychain-gold')) {
        const [nextPage] = options.filter(i => i.classList.contains('keychain_gold'));
        return nextPage;
      }
      if (value.includes('keychain-silver')) {
      	const [nextPage] = options.filter(i => i.classList.contains('keychain_silver'));
        return nextPage;
      }
      setLimit();
      setcollectionSession();
      setProductSession();
      setCurrentPageUrl();
      setUpsellSession();
      loadProduct();
      
    }
    if (curPage.classList.contains('keychain')) {
      setLimit();
      setcollectionSession();
      setProductSession();
      setCurrentPageUrl()
      setKeychainSession();
      setUpsellSession();
      loadProduct();
    }
  };
  
  function nextOption(){
    next.addEventListener('click', function(){
      const validate = optionValidation(activeOption);

      if (!validate == false) {
        updateValues(activeOption);
        
        const nextItem = nextCheck(activeOption); 
        
        activeOption.style.display = 'none';
        if (nextItem) {
          nextItem.style.display = 'block';
          scrollIntoView();

          activeOption = nextItem;

          pagination(activeOption);
        }
      }
      
    });
  };
  function setProductSession(){
  	localStorage.setItem('charmSelected', true);
  };
  function setKeychainSession(){
  	localStorage.setItem('keyChainColor', keychainColor);
  };
  function setUpsellSession(){
  	localStorage.setItem('showUpsell', false);
  };
  function setcollectionSession() {
  	localStorage.setItem('collectionType', collectionType);
  };
  function setCurrentPageUrl(){
    localStorage.setItem('bundlePageUrl', window.location.pathname); 
  };
  function setLimit() {
    const limit = chainType.split('-')[0]
    localStorage.setItem('charmLimit', limit);
  }
  function loadProduct(){
    scrollIntoView();
    quizContainer.innerHTML = '<h2 class="text-center">Loading Product...</h2>';
    document.querySelector('.quiz_container .buttons').innerHTML = '';
    window.location.assign(`/products/${chainType}`);
  }
  
  function prevOption(){
    prev.addEventListener('click', function(){
      activeOption.style.display = 'none';
      
      if (activeOption.classList.contains('bundle_collection')) {
        options[0].style.display = 'block';
        scrollIntoView();
        activeOption = options[0];  
      };
      
      if (activeOption.classList.contains('keychain')) { 
        const colType = chainType.includes('gold') ? 'gold' : 'silver'; 
        const [newPrevPage] = options.filter(i => i.classList.contains(colType+'-'+'collection'));
        newPrevPage.style.display = 'block';
        scrollIntoView();
        activeOption = newPrevPage;
      };
     
      
      pagination(activeOption);
    });
  };
})();