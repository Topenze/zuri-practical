var bundleApp = (function(){
  // Check if the user started from the "/pages/charm-bundle" page. Refer the user back to the page if false. 

  const countListWrapper = document.querySelector('.tokensList');
  const curLocation = window.location.href;
  countListWrapper.insertAdjacentHTML('beforeend', `<li class="tokenVariant" data-park="" data-custom=""><span class="tokenTitle"><input type="text" placeholder="Your text" maxlength="12" class="customTextInput"><span class="extra_charge">&nbsp;+€2</span><span class="add_plus add_country">+</span></span><span class="back_side"><span class="back_checkbox"><input type="checkbox" id="CustomText" name="Backside" value="" class="add_back_side"><label for="CustomText" class="back_label">Back side text<span class="extra_charge">&nbsp;+€2</span> </label></span><span class="back_input"style="display:none"><input type="text" placeholder="Back side text" maxlength="12" class="bacdside_box"></span></span></li>`);     
 
  let countryList;
  
  if (curLocation.includes('silver')) {
    countryList = ["Abu Dhabi", "Afghanistan", "Agra", "Albania", "Algeria", "Amrum", "Amsterdam", "Andorra", "Angola", "Anguilla", "Ankara", "Antalya", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Athens", "Atlanta", "Australia", "Azerbaijan", "Austria", "Azores", "Baghdad", "Bahamas", "Bahrain", "Bali", "Bangkok", "Bangladesh", "Barbados", "Barcelona", "Beijing", "Belarus", "Belgium", "Belgrade", "Belize", "Benin", "Berlin", "Bermuda", "Bern", "Bhutan", "Birmingham", "Bogota", "Bolivia", "Bonaire", "Bora Bora", "Boracay", "Borkum", "Bosn. & Herz.", "Botswana", "Bratislava", "Brazil", "Brunei", "Brussels", "Bucharest", "Budapest", "Buenos Aires", "Bulgaria", "Burkina Faso", "Burundi", "Cairo", "Cambodia", "Cameroon", "Canada", "Canary Islands", "Canberra", "Cancun", "Cape Town", "Cape Verde", "Capri", "Caracas", "Cayman Isl.", "Central Africa", "Chad", "Chennai", "Chiang Mai", "Chicago", "Chile", "China", "Cologne", "Colombia", "Comoros", "Congo", "Cook Islands", "Copenhagen", "Corfu", "Corsica", "Costa Rica", "Cote D'Ivoire", "Crete", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech", "Dalmatian Islands", "Delhi", "Denmark", "Denpasar", "Djibouti", "Dominica", "Dominican Rep.", "Dubai", "Dublin", "Dubrovnik", "Dusseldorf", "Easter Island", "Ecuador", "Edinburgh", "Egypt", "El Hierro", "El Salvador", "England", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fakarava", "Faroe Islands", "Fehmarn", "Fiji", "Finland", "Florence", "Föhr", "France", "Frankfurt", "Fuerteventura", "Gabon", "Galapagos Islands", "Gambia", "Genoa", "Georgia", "Germany", "Ghana", "Gibraltar", "Gili Islands", "Glasgow", "Gran Canaria", "Grand Cayman", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guangzhou", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Hamburg", "Hanoi", "Havana", "Hawaii", "Helsinki", "Hiva Oa", "Ho Chi Minh City", "Honduras", "Hong Kong", "Honolulu", "Huahine", "Hungary", "Hurghada", "Ibiza", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isla de Providencia", "Isle of Skye", "Israel", "Istanbul", "Italy", "Jaipur", "Jakarta", "Jamaica", "Japan", "Jersey", "Jerusalem", "Johannesburg", "Johor Bahru", "Jordan", "Juist", "Kaua'i", "Kazakhstan", "Kenya", "Kiribati", "Kiev", "Ko Lanta", "Ko Pha-ngan", "Ko Phi Phi", "Ko Samui", "Ko Tao", "Kosovo", "Krabi", "Kuala Lumpur", "Kuwait", "Kyrgyzstan", "La Gomera", "La Palma", "Lagos", "Langeoog", "Langkawi", "Lanzarote", "Laos", "Las Vegas", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lima", "Lisbon ", "Lithuania", "Liverpool", "Ljubljana", "Lofoten Islands", "Lombok", "London", "Los Angeles", "Luxembourg", "Macedonia", "Macao", "Madagascar", "Madrid", "Malawi", "Malaysia", "Maldives", "Mali", "Mallorca", "Malta", "Manchester", "Manila", "Marrakesch", "Marseille", "Marshall Islands", "Martinique", "Maui", "Maupiti", "Mauritania", "Mauritius", "Mecca", "Melbourne", "Menorca", "Mexico", "Miami", "Micronesia", "Milan", "Milos", "Minsk", "Moldova", "Monaco", "Mongolia", "Montenegro", "Mo'orea", "Morocco", "Moscow", "Mozambique", "Mumbai", "Munich", "Murcia", "Myanmar", "Mykonos", "Nairobi", "Namibia", "Naples", "Nauru", "Naxos", "Nepal", "Netherlands", "New York City", "New Zealand", "Nicaragua", "Nice", "Niger", "Nigeria", "Nikosia", "Norderney", "North Korea", "Northern Ireland", "Norway", "Nuka Hiva", "Oman", "Orlando", "Osaka", "Oslo", "Pakistan", "Palawan", "Palau", "Palermo", "Palestine", "Palma", "Panama", "Papua New Guinea", "Paraguay", "Paris", "Pattaya", "Perhentian Islands", "Peru", "Philadelphia", "Philippines", "Phuket", "Poland", "Porto", "Portugal", "Prague", "Prince Edward Island", "Puerto Rico", "Qatar", "Raiatea", "Rangiroa", "Reykjavik", "Rhodes", "Riga", "Rio de Janeiro", "Riyadh", "Romania", "Rome", "Rotterdam", "Rügen", "Russia", "Rwanda", "Saint Petersburg", "Samoa", "San Blas Islands", "San Diego", "San Francisco", "San Marino", "Santiago", "Santorini", "Sao Paulo", "Sao Tome & Principe", "Sarajevo", "Sardinia", "Saudi Arabia", "Scotland", "Senegal", "Seoul", "Serbia", "Seville", "Seychelles", "Shanghai", "Shenzhen", "Sicily", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Sofia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St. Barths", "St. John", "St. Kitts and Nevis", "St. Lucia", "St. Maarten", "St. Vincent", "Stockholm", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Sydney", "Sylt", "Syria", "Tahiti", "Taipei", "Taiwan", "Tajikistan", "Tanzania", "Tel Aviv", "Tenerife", "Thailand", "Timor-Leste", "Togo", "Tokyo", "Tonga", "Toronto", "Trin. & Toba.", "Tunis", "Tunisia", "Turin", "Turkey", "Turkmenistan", "Turks & Caicos", "Tuvalu", "UAE", "Uganda", "Ukraine", "United Kingdom", "Uruguay", "USA", "Usedom", "Uzbekistan", "Valencia", "Vancouver", "Vanuatu", "Vatican City", "Venezuela", "Venice", "Vienna", "Vietnam", "Wales", "Warsaw", "Washington", "Whitsunday Islands", "Windhoek", "Yemen", "Zadar", "Zagreb", "Zambia", "Zanzibar", "Zimbabwe", "Zürich"];
  } else {
    countryList = ["Abu Dhabi","Amsterdam","Antalya","Antigua & Barbuda ","Argentina ","Aruba ","Athens ","Australia ","Austria ","Bahamas ","Bali ","Bangkok ","Barbados ","Barcelona ","Belgium ","Belize ","Berlin ","Bonaire ","Bosn. & Herz. ","Brazil ","Brussels ","Budapest ","Bulgaria ","Cambodia ","Canada ","Canary Islands ","Cancun ","Cape Town ","Cape Verde ","Chile ","China ","Cologne ","Colombia ","Copenhagen ","Corfu ","Costa Rica ","Crete ","Croatia ","Cuba ","Curacao ","Cyprus ","Czech ","Denmark ","Dominican Rep. ","Dubai ","Dublin ","Dusseldorf ","Edinburgh ","Egypt ","England ","Estonia ","Finland ","Florence ","France ","Frankfurt ","Fuerteventura ","Germany ","Gibraltar ","Gran Canaria ","Greece ","Hamburg ","Hawaii ","Hong Kong ","Hungary ","Hurghada ","Ibiza ","Iceland ","India ","Indonesia ","Ireland ","Israel ","Istanbul ","Italy ","Jamaica ","Japan ","Kenya ","Ko Samui ","Kuala Lumpur ","Lanzarote ","Las Vegas ","Latvia ","Lisbon ","Liverpool ","London ","Los Angeles ","Luxembourg ","Madrid ","Malaysia ","Maldives ","Mallorca ","Malta ","Marrakesch ","Mauritius ","Menorca ","Mexico ","Miami ","Milan ","Monaco ","Montenegro ","Morocco ","Munich ","Namibia ","Netherlands ","New York City ","New Zealand ","Norway ","Orlando ","Palma ","Panama ","Paris ","Peru ","Philippines ","Poland ","Porto ","Portugal ","Prague ","Rhodes ","Romania ","Rome ","Rotterdam ","Rügen ","Russia ","San Francisco ","Santorini ","Sardinia ","Scotland ","Serbia ","Seychelles ","Sicily ","Singapore ","Slovakia ","Slovenia ","South Africa ","South Korea ","Spain ","Sri Lanka ","Stockholm ","Sweden ","Switzerland ","Sydney ","Sylt ","Tenerife ","Thailand ","Toronto ","Tunisia ","Turkey ","UAE ","United Kingdom ","USA ","Valencia ","Vancouver ","Vatican City ","Venice ","Vienna ","Vietnam ","Wales ","Zanzibar ","Zürich"];
  }
    countryList.forEach(i => countListWrapper.insertAdjacentHTML('beforeend', `<li class="tokenVariant" data-park="${i}"><span class="tokenTitle">${i}<span class="add_plus add_country">+</span></span><span class="back_side"><span class="back_checkbox"><input type="checkbox" id="${i.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '').replace(/^-/, '')}" name="Backside" value="" class="add_back_side">
      <label for="${i.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '').replace(/^-/, '')}" class="back_label">Back side text<span class="extra_charge">&nbsp;+€2</span> </label></span><span class="back_input" style="display:none"><input type="text" placeholder="Back side text" maxlength="12" class="bacdside_box"></span></span></li>`));
  let limit = Number(localStorage.getItem('charmLimit'));
  let state = true; 
  let exOptnsCt = 0;
  const ListWrapper = document.querySelector('.tokenData');
  const specialCharmWrapper = document.querySelector(".christmas_charms");
  const countryWrapper = document.querySelector('.line-item-property__field');
  const charmList = document.querySelector('.tokenData');
  const addTocartBtn = document.querySelector('#AddToCart');
  const addTocartBtnWrapper = addTocartBtn.parentElement;
  let productData = [];
  let finalItems = [];
  let charmCount = 0;
  const itemCountEl = document.querySelector('.itemCount');
  const charmDataEl = document.querySelector('.charmData');
  const addedcharmListEL = document.querySelector('.charmList');
  let variantSelector;
  let optionSelector;
  const scrollIndicatorEl = document.querySelector('.scroll-indicator');
  
  const initWrapperHeight = countListWrapper.clientHeight;
  
  // call the list filter plugin
  var options = {
    valueNames: [
      { data: ['park'] },
      { data: ['custom'] }
    ]
  };
  scrollIndicator(countListWrapper);
  scrollIndicator(specialCharmWrapper);
  
  const btns = [...document.querySelectorAll('.custom_btn, .product-add')].forEach(el => el.style.visibility = 'visible');
  function updateVariant(count, canvasEl) {
    canvasEl[count].selected = 'selected';
    canvasEl.dispatchEvent(new Event('change'));
  };
  var userList = new List('countryData', options);
  
    userList.on('searchComplete', function(){
    
    const addCustomText = `<li class="tokenVariant custom__text_item" data-park="" data-custom=""><span class="tokenTitle"><input type="text" placeholder="Your text" maxlength="12" class="customTextInput"><span class="extra_charge">&nbsp;+€2</span><span class="add_plus add_country">+</span></span><span class="back_side"><span class="back_checkbox"><input type="checkbox" id="CustomText" name="Backside" value="" class="add_back_side"><label for="CustomText" class="back_label">Back side text<span class="extra_charge">&nbsp;+€2</span> </label></span><span class="back_input"style="display:none"><input type="text" placeholder="Back side text" maxlength="12" class="bacdside_box"></span></span></li>`;
    let wrapperHeight = countListWrapper.clientHeight;
    if (userList.matchingItems.length > 0) {
      
      const customItemEl =  ListWrapper.querySelector('.custom__text_item');
      if (customItemEl) customItemEl.remove();
    }else {
      countListWrapper.insertAdjacentHTML('afterbegin', addCustomText);
    };
    
    wrapperHeight < initWrapperHeight ? scrollIndicatorEl.style.cssText = 'opacity:0;visibility:hidden' : scrollIndicatorEl.style.cssText = 'opacity:1;visibility:visible';
  
  });
  
  itemCountEl.textContent = charmCount;
 
  
  
  function goBack() {
    window.history.back();
  };
  
  function resetApp() {
    state = true; 
    productData = [];
    charmCount = 0;
    charmListNofn();
    updateVariant(charmCount,variantSelector);
    
    itemCountEl.textContent = charmCount;
    [...charmList.querySelectorAll('.charm_item')].forEach(i => i.remove());

  };
  
  function scrollIndicator(el) {
    el.addEventListener("scroll", function () {
      let topOffset = this.scrollTop;
      const scrollEl = el.parentElement.querySelector(".scroll-indicator");
      topOffset > 20
      ? (scrollEl.style.cssText = "opacity:0;visibility:hidden")
      : (scrollEl.style.cssText = "opacity:1;visibility:visible");
    });
  }
  
  // callback executed when canvas was found
    function handleCanvas(canvas) { 
      variantSelector = canvas;
      optionSelector = document.querySelector('select[name="id"]');
      state = true;
      updateVariant(charmCount, variantSelector);
    };

    // set up the mutation observer
    var observer = new MutationObserver(function (mutations, me) {
      // `mutations` is an array of mutations that occurred
      // `me` is the MutationObserver instance
      var canvas = document.querySelector('.single-option-selector');
      if (canvas) {
        handleCanvas(canvas);
        me.disconnect(); // stop observing
        return;
      }
    });
  // start observing
  observer.observe(document, {
    childList: true,
    subtree: true
  });
  
  // Product constructor
  const Product = function (id,frontText, backText, variantId) {
    this.id = id;
    this.frontText = frontText;
    this.backText = backText;
    this.variantId = variantId;
  };

  // Generate unique id
  let guid = () => {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };
  
  function charmListNofn(){
    const el = addedcharmListEL.querySelector('.charmListNofn');
    productData.length > 0 ? el.style.display = 'none' : el.style.display = 'block'
  };
  
  
  function valinput(el){
    if (el.querySelector('.add_back_side').checked && el.querySelector('.back_input input').value == '') {
      el.style.border = '1px solid red';
      return false;
    }
    if (el.querySelector('.customTextInput') && el.querySelector('.customTextInput').value == '') {
      el.style.border = '1px solid red';
      return false;
    }
    return true;
  };
  
  function updateCharmCount(data) {
    charmCount = data.length;
  };
  
  function clearItem(el, specialCharm)  {
    if (specialCharm) return;
    if (el.querySelector('.customTextInput')) el.querySelector('.customTextInput').value = '';
    el.querySelector('.back_input input').value = '';
    el.querySelector('.back_input').style.display = 'none';
    el.querySelector('.add_back_side').checked = false;
    el.style.borderColor = '#ddd';
  };
  
  // render charm count
  function rendercharmNumber(){
    itemCountEl.textContent = charmCount;
  };
  
  function checkFrontText(el){
    if (el.querySelector('.customTextInput')) {
      el.querySelector('.customTextInput').value;
      exOptnsCt++;
    }
  };
  function checkBackText(el, specialCharm){
    if (specialCharm) return
    if (el.querySelector('.back_input input').value != '') {
      exOptnsCt++;
    };
  };
  
  // Create charmList object and push to the productData array 
  function createData(el, specialCharm) {
    checkFrontText(el);
    checkBackText(el, specialCharm);
    const id = guid(); 
    const variantId = specialCharm ? el.dataset.variant : optionSelector[exOptnsCt].value;
    let frontText;
    let backText = "";
    if (specialCharm) frontText = `<span class="christmas_charm">${el.dataset.park}</span>`;
    if (!specialCharm) {
      frontText = el.querySelector('.customTextInput') ? '<span class="custom_front">' + el.querySelector('.customTextInput').value + '</span>': el.dataset.park;
      backText = el.querySelector('.back_input input').value;
    }
    
    
    // Create object
    const data = new Product(id, frontText, backText, variantId);
    exOptnsCt = 0;
    // Push to array
    productData.push(data);
    
  };
  
  // Render CharmList Data on the frontend
  function renderItem(data) {
    const curData = data[data.length - 1];
    
    const backText = curData.backText != '' ? `<span class="charm_bck">&nbsp;|&nbsp;Backtext: ${curData.backText}</span>` : '';
    const charmItem = `<div class="charm_item">${curData.frontText}${backText}<span class="remove_item" id="${curData.id}">x</span></div>`;
        
    ListWrapper.insertAdjacentHTML('beforeend', charmItem);
  };
  
  function addNofn(el){
    el.style.fontSize = '12px';
    el.textContent = '✓';
    el.style.backgroundColor = '#1c9666';
    setTimeout(function(){
      el.style.fontSize = null;
      el.textContent = '+';
      el.style.backgroundColor = null;
    },600)
  };
  
  
//   function valinput(el){
//     if (el.querySelector('.add_back_side').checked && el.querySelector('.back_input input').value == '') {
//       el.style.border = '1px solid red';
//       return false;
//     }
//     if (el.querySelector('.customTextInput') && el.querySelector('.customTextInput').value == '') {
//       el.style.border = '1px solid red';
//       return false;
//     }
//     return true;
//   };
  
  
    // Validate input info when checked
    function valinput(el, specialCharm) {
      if (specialCharm) return true; // return if it's a christmas charm because it has no backside

      if (
        el.querySelector(".add_back_side").checked &&
        el.querySelector(".back_input input").value == ""
      ) {
        el.style.border = "1px solid red";
        return false;
      }
      if (
        el.querySelector(".customTextInput") &&
        el.querySelector(".customTextInput").value == ""
      ) {
        el.style.border = "1px solid red";
        return false;
      }
      return true;
    };
  
  // Open , focus and close backside text input box
  countryWrapper.addEventListener('click', function(e){ 
    const el = e.target.closest('.add_back_side');
    if (!el) return;

    setTimeout(function(){
      if (el.checked) {
        el.parentElement.nextElementSibling.style.display = 'block';
        el.parentElement.parentElement.querySelector('.bacdside_box').focus();
      }else {
        el.parentElement.nextElementSibling.style.display = 'none';
        el.parentElement.parentElement.querySelector('.bacdside_box').blur();
      }
    }, 100);

  });
  
  // Add country to CharmList
  countryWrapper.addEventListener('click', function(e) {
    const el = e.target;
    const itemWrapper = el.closest('.tokenVariant');
	if (!itemWrapper) return;
    const specialCharm = itemWrapper.classList.contains("christmasVariant");
    // Check the clicked element and validate backside text
    if (el.closest('.add_country') && valinput(itemWrapper, specialCharm))  {
      if (!state) return

      // create the charm data
      createData(itemWrapper, specialCharm);

      // addExOptnCt(itemWrapper);
      // update the charm count
      updateCharmCount(productData);
      // Add notification
      addNofn(el);
      // clear the UI data on the added charm
      clearItem(itemWrapper, specialCharm);
      // Render charm item to charm list
      renderItem(productData);
      // Render charm number
      rendercharmNumber();

      charmListNofn();
    }
  });
  
  
  // Remove charm from the list
  charmList.addEventListener('click', function(e) {
    
    const charmItem = e.target.closest('.remove_item');
    
    if (!charmItem) return; // Guard clause
   
    
    const index = productData.findIndex(charm => charm.id == charmItem.id);
    const id = charmItem.id;
    
    productData.splice(index,1);
    
    charmItem.parentElement.remove();
    
   // charmDataEl.querySelector(`#lp_${id}`).remove();
    
    updateCharmCount(productData);
    
    
    // Render Charm
    rendercharmNumber();
    
     charmListNofn();
    
  });
  
  [...document.querySelectorAll('.addBundles, .custom_btn')].forEach(btn => btn.addEventListener('click', function() {
    if (charmCount == 0) {
      alert('Add at least 1 charm to continue');
      return;
    }
    productData.forEach(function(i,n){
      let variantId = i.variantId;
      let qty = 1;
      let charmObj = {};
      let lineFrontCustom = i.frontText.includes('custom_front') ? '&nbsp;(Custom text)' : '';
      let frontText = i.frontText.replace(/(<([^>]+)>)/gi, "");
      if (i.backText != ''){
        charmObj = {
          id: variantId,
          quantity: qty,
          properties: {
            [`Charm${lineFrontCustom}`]: `${frontText}`,
            [`BackText`]: `${i.backText}`,
            [`_No`]: `${n}`
          }
        }
      } else {
        charmObj = {
          id: variantId,
          quantity: qty,
          properties: {
            [`Charm${lineFrontCustom}`]: `${frontText}`,
            [`_No`]: `${n}`
          }
        }
      }
      finalItems.push(charmObj);

    });
    
    let formData = {
      'items': finalItems
    };

    fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      document.querySelector('.addBundles').textContent = 'Added';
      setTimeout(function(){
        document.querySelector('.addBundles').textContent = 'Add to cart';
      },1000);
      resetApp();
      finalItems = [];
      document.querySelector('.site-header__cart-toggle').click();
      return response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }));
  
    
  return {
    reset: resetApp,
    goback: goBack
  }

})();