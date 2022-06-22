  var bundleApp = (function () {
    // Check if the user started from the "/pages/charm-bundle" page. Refer the user back to the page if false.
    const startApplication = startApp();
    if (!startApplication) return; // Guard clause
    const countListWrapper = document.querySelector(".tokensList");
    const collectionType = localStorage.getItem("collectionType");
    const customText = `<li class="tokenVariant" data-park="" data-custom=""><span class="tokenTitle"><input type="text" placeholder="Your text" maxlength="12" class="customTextInput"><span class="extra_charge">&nbsp;+€2</span><span class="add_plus add_country">+</span></span><span class="back_side"><span class="back_checkbox"><input type="checkbox" id="CustomText" name="Backside" value="" class="add_back_side"><label for="CustomText" class="back_label">Back side text<span class="extra_charge">&nbsp;+€2</span> </label></span><span class="back_input"style="display:none"><input type="text" placeholder="Back side text" maxlength="12" class="bacdside_box"></span></span></li>`;
    countListWrapper.insertAdjacentHTML("beforeend", customText);
    let countryList;

    if (collectionType == "silver-collection") {
      countryList = [
        "Abu Dhabi",
        "Afghanistan",
        "Agra",
        "Albania",
        "Algeria",
        "Amrum",
        "Amsterdam",
        "Andorra",
        "Angola",
        "Anguilla",
        "Ankara",
        "Antalya",
        "Antigua & Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Athens",
        "Atlanta",
        "Australia",
        "Azerbaijan",
        "Austria",
        "Azores",
        "Baghdad",
        "Bahamas",
        "Bahrain",
        "Bali",
        "Bangkok",
        "Bangladesh",
        "Barbados",
        "Barcelona",
        "Beijing",
        "Belarus",
        "Belgium",
        "Belgrade",
        "Belize",
        "Benin",
        "Berlin",
        "Bermuda",
        "Bern",
        "Bhutan",
        "Birmingham",
        "Bogota",
        "Bolivia",
        "Bonaire",
        "Bora Bora",
        "Boracay",
        "Borkum",
        "Bosn. & Herz.",
        "Botswana",
        "Bratislava",
        "Brazil",
        "Brunei",
        "Brussels",
        "Bucharest",
        "Budapest",
        "Buenos Aires",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cairo",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Canary Islands",
        "Canberra",
        "Cancun",
        "Cape Town",
        "Cape Verde",
        "Capri",
        "Caracas",
        "Cayman Isl.",
        "Central Africa",
        "Chad",
        "Chennai",
        "Chiang Mai",
        "Chicago",
        "Chile",
        "China",
        "Cologne",
        "Colombia",
        "Comoros",
        "Congo",
        "Cook Islands",
        "Copenhagen",
        "Corfu",
        "Corsica",
        "Costa Rica",
        "Cote D'Ivoire",
        "Crete",
        "Croatia",
        "Cuba",
        "Curacao",
        "Cyprus",
        "Czech",
        "Dalmatian Islands",
        "Delhi",
        "Denmark",
        "Denpasar",
        "Djibouti",
        "Dominica",
        "Dominican Rep.",
        "Dubai",
        "Dublin",
        "Dubrovnik",
        "Dusseldorf",
        "Easter Island",
        "Ecuador",
        "Edinburgh",
        "Egypt",
        "El Hierro",
        "El Salvador",
        "England",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Fakarava",
        "Faroe Islands",
        "Fehmarn",
        "Fiji",
        "Finland",
        "Florence",
        "Föhr",
        "France",
        "Frankfurt",
        "Fuerteventura",
        "Gabon",
        "Galapagos Islands",
        "Gambia",
        "Genoa",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Gili Islands",
        "Glasgow",
        "Gran Canaria",
        "Grand Cayman",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guangzhou",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Hamburg",
        "Hanoi",
        "Havana",
        "Hawaii",
        "Helsinki",
        "Hiva Oa",
        "Ho Chi Minh City",
        "Honduras",
        "Hong Kong",
        "Honolulu",
        "Huahine",
        "Hungary",
        "Hurghada",
        "Ibiza",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Isla de Providencia",
        "Isle of Skye",
        "Israel",
        "Istanbul",
        "Italy",
        "Jaipur",
        "Jakarta",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jerusalem",
        "Johannesburg",
        "Johor Bahru",
        "Jordan",
        "Juist",
        "Kaua'i",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kiev",
        "Ko Lanta",
        "Ko Pha-ngan",
        "Ko Phi Phi",
        "Ko Samui",
        "Ko Tao",
        "Kosovo",
        "Krabi",
        "Kuala Lumpur",
        "Kuwait",
        "Kyrgyzstan",
        "La Gomera",
        "La Palma",
        "Lagos",
        "Langeoog",
        "Langkawi",
        "Lanzarote",
        "Laos",
        "Las Vegas",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lima",
        "Lisbon ",
        "Lithuania",
        "Liverpool",
        "Ljubljana",
        "Lofoten Islands",
        "Lombok",
        "London",
        "Los Angeles",
        "Luxembourg",
        "Macedonia",
        "Macao",
        "Madagascar",
        "Madrid",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Mallorca",
        "Malta",
        "Manchester",
        "Manila",
        "Marrakesch",
        "Marseille",
        "Marshall Islands",
        "Martinique",
        "Maui",
        "Maupiti",
        "Mauritania",
        "Mauritius",
        "Mecca",
        "Melbourne",
        "Menorca",
        "Mexico",
        "Miami",
        "Micronesia",
        "Milan",
        "Milos",
        "Minsk",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Mo'orea",
        "Morocco",
        "Moscow",
        "Mozambique",
        "Mumbai",
        "Munich",
        "Murcia",
        "Myanmar",
        "Mykonos",
        "Nairobi",
        "Namibia",
        "Naples",
        "Nauru",
        "Naxos",
        "Nepal",
        "Netherlands",
        "New York City",
        "New Zealand",
        "Nicaragua",
        "Nice",
        "Niger",
        "Nigeria",
        "Nikosia",
        "Norderney",
        "North Korea",
        "Northern Ireland",
        "Norway",
        "Nuka Hiva",
        "Oman",
        "Orlando",
        "Osaka",
        "Oslo",
        "Pakistan",
        "Palawan",
        "Palau",
        "Palermo",
        "Palestine",
        "Palma",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Paris",
        "Pattaya",
        "Perhentian Islands",
        "Peru",
        "Philadelphia",
        "Philippines",
        "Phuket",
        "Poland",
        "Porto",
        "Portugal",
        "Prague",
        "Prince Edward Island",
        "Puerto Rico",
        "Qatar",
        "Raiatea",
        "Rangiroa",
        "Reykjavik",
        "Rhodes",
        "Riga",
        "Rio de Janeiro",
        "Riyadh",
        "Romania",
        "Rome",
        "Rotterdam",
        "Rügen",
        "Russia",
        "Rwanda",
        "Saint Petersburg",
        "Samoa",
        "San Blas Islands",
        "San Diego",
        "San Francisco",
        "San Marino",
        "Santiago",
        "Santorini",
        "Sao Paulo",
        "Sao Tome & Principe",
        "Sarajevo",
        "Sardinia",
        "Saudi Arabia",
        "Scotland",
        "Senegal",
        "Seoul",
        "Serbia",
        "Seville",
        "Seychelles",
        "Shanghai",
        "Shenzhen",
        "Sicily",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Sofia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Korea",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "St. Barths",
        "St. John",
        "St. Kitts and Nevis",
        "St. Lucia",
        "St. Maarten",
        "St. Vincent",
        "Stockholm",
        "Sudan",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Sydney",
        "Sylt",
        "Syria",
        "Tahiti",
        "Taipei",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Tel Aviv",
        "Tenerife",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokyo",
        "Tonga",
        "Toronto",
        "Trin. & Toba.",
        "Tunis",
        "Tunisia",
        "Turin",
        "Turkey",
        "Turkmenistan",
        "Turks & Caicos",
        "Tuvalu",
        "UAE",
        "Uganda",
        "Ukraine",
        "United Kingdom",
        "Uruguay",
        "USA",
        "Usedom",
        "Uzbekistan",
        "Valencia",
        "Vancouver",
        "Vanuatu",
        "Vatican City",
        "Venezuela",
        "Venice",
        "Vienna",
        "Vietnam",
        "Wales",
        "Warsaw",
        "Washington",
        "Whitsunday Islands",
        "Windhoek",
        "Yemen",
        "Zadar",
        "Zagreb",
        "Zambia",
        "Zanzibar",
        "Zimbabwe",
        "Zürich",
      ];
    } else {
      countryList = [
        "Abu Dhabi",
        "Amsterdam",
        "Antalya",
        "Antigua & Barbuda ",
        "Argentina ",
        "Aruba ",
        "Athens ",
        "Australia ",
        "Austria ",
        "Bahamas ",
        "Bali ",
        "Bangkok ",
        "Barbados ",
        "Barcelona ",
        "Belgium ",
        "Belize ",
        "Berlin ",
        "Bonaire ",
        "Bosn. & Herz. ",
        "Brazil ",
        "Brussels ",
        "Budapest ",
        "Bulgaria ",
        "Cambodia ",
        "Canada ",
        "Canary Islands ",
        "Cancun ",
        "Cape Town ",
        "Cape Verde ",
        "Chile ",
        "China ",
        "Cologne ",
        "Colombia ",
        "Copenhagen ",
        "Corfu ",
        "Costa Rica ",
        "Crete ",
        "Croatia ",
        "Cuba ",
        "Curacao ",
        "Cyprus ",
        "Czech ",
        "Denmark ",
        "Dominican Rep. ",
        "Dubai ",
        "Dublin ",
        "Dusseldorf ",
        "Edinburgh ",
        "Egypt ",
        "England ",
        "Estonia ",
        "Finland ",
        "Florence ",
        "France ",
        "Frankfurt ",
        "Fuerteventura ",
        "Germany ",
        "Gibraltar ",
        "Gran Canaria ",
        "Greece ",
        "Hamburg ",
        "Hawaii ",
        "Hong Kong ",
        "Hungary ",
        "Hurghada ",
        "Ibiza ",
        "Iceland ",
        "India ",
        "Indonesia ",
        "Ireland ",
        "Israel ",
        "Istanbul ",
        "Italy ",
        "Jamaica ",
        "Japan ",
        "Kenya ",
        "Ko Samui ",
        "Kuala Lumpur ",
        "Lanzarote ",
        "Las Vegas ",
        "Latvia ",
        "Lisbon ",
        "Liverpool ",
        "London ",
        "Los Angeles ",
        "Luxembourg ",
        "Madrid ",
        "Malaysia ",
        "Maldives ",
        "Mallorca ",
        "Malta ",
        "Marrakesch ",
        "Mauritius ",
        "Menorca ",
        "Mexico ",
        "Miami ",
        "Milan ",
        "Monaco ",
        "Montenegro ",
        "Morocco ",
        "Munich ",
        "Namibia ",
        "Netherlands ",
        "New York City ",
        "New Zealand ",
        "Norway ",
        "Orlando ",
        "Palma ",
        "Panama ",
        "Paris ",
        "Peru ",
        "Philippines ",
        "Poland ",
        "Porto ",
        "Portugal ",
        "Prague ",
        "Rhodes ",
        "Romania ",
        "Rome ",
        "Rotterdam ",
        "Rügen ",
        "Russia ",
        "San Francisco ",
        "Santorini ",
        "Sardinia ",
        "Scotland ",
        "Serbia ",
        "Seychelles ",
        "Sicily ",
        "Singapore ",
        "Slovakia ",
        "Slovenia ",
        "South Africa ",
        "South Korea ",
        "Spain ",
        "Sri Lanka ",
        "Stockholm ",
        "Sweden ",
        "Switzerland ",
        "Sydney ",
        "Sylt ",
        "Tenerife ",
        "Thailand ",
        "Toronto ",
        "Tunisia ",
        "Turkey ",
        "UAE ",
        "United Kingdom ",
        "USA ",
        "Valencia ",
        "Vancouver ",
        "Vatican City ",
        "Venice ",
        "Vienna ",
        "Vietnam ",
        "Wales ",
        "Zanzibar ",
        "Zürich",
      ];
    }
    countryList.forEach((i) =>
      countListWrapper.insertAdjacentHTML(
        "beforeend",
        `<li class="tokenVariant" data-park="${i}"><span class="tokenTitle">${i}<span class="add_plus add_country">+</span></span><span class="back_side"><span class="back_checkbox"><input type="checkbox" id="${i
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/-$/, "")
          .replace(/^-/, "")}" name="Backside" value="" class="add_back_side">
	<label for="${i
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "")
    .replace(
      /^-/,
      ""
    )}" class="back_label">Back side text<span class="extra_charge">&nbsp;+€2</span> </label></span><span class="back_input" style="display:none"><input type="text" placeholder="Back side text" maxlength="12" class="bacdside_box"></span></span></li>`
      )
    );

    const specialCharmList = [
      "Airplane",
      "Camper",
      "Compass",
      "Heart",
      "Mountain",
      "Turtle",
      "World",
      "Africa",
      "Antarctica",
      "Australia",
      "Asia",
      "Europe",
      "North America",
      "South America",
    ];
        // Generate unique id
    let guid = () => {
      let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      };
      //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
      return (
        s4() +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        s4() +
        s4()
      );
    };
    let limit = Number(localStorage.getItem("charmLimit"));
    let state = false;
    let exOptnsCt = 0;
    const ListWrapper = document.querySelector(".tokenData");
    const specialCharmWrapper = document.querySelector(".christmas_charms");
    const countryWrapper = document.querySelector(".line-item-property__field");
    const charmList = document.querySelector(".tokenData");
    const addTocartBtn = document.querySelector("#AddToCart");
    const duplicateBtn = document.querySelector('.custom_btn');
    const speCharmprice = document.querySelector('.specialCharmPrice');
    const addTocartBtnWrapper = addTocartBtn.parentElement;
    let productData = [];
    let specialCharmProductData = [];
    let finalItems = [];
    let charmCount = 0;
    const itemCountEl = document.querySelector(".itemCount");
    const charmDataEl = document.querySelector(".charmData");
    const addedcharmListEL = document.querySelector(".charmList");
    const keyChainColor = localStorage.getItem("keyChainColor");
    let variantSelector;
    let optionSelector;
    let dataSpecialCharmPrice = 0;
    let dataProductPrice = 0;
    const scrollIndicatorEl = document.querySelector(".scroll-indicator");
    let bundleId = guid();
    const initWrapperHeight = countListWrapper.clientHeight;
    let ProductJSON;
    // call the list filter plugin
    var options = {
      valueNames: [{ data: ["park"] }, { data: ["custom"] }],
    };

    var userList = new List("countryData", options);

    userList.on("searchComplete", function () {
      const addCustomText = `<li class="tokenVariant custom__text_item" data-park="" data-custom="Your text"><span class="tokenTitle"><input type="text" placeholder="Your text" maxlength="12" class="customTextInput"><span class="extra_charge">&nbsp;+€2</span><span class="add_plus add_country">+</span></span><span class="back_side"><span class="back_checkbox"><input type="checkbox" id="CustomText" name="Backside" value="" class="add_back_side"><label for="CustomText" class="back_label">Back side text<span class="extra_charge">&nbsp;+€2</span> </label></span><span class="back_input"style="display:none"><input type="text" placeholder="Back side text" maxlength="12" class="bacdside_box"></span></span></li>`;
      let wrapperHeight = countListWrapper.clientHeight;
      if (userList.matchingItems.length > 0) {
        const customItemEl = ListWrapper.querySelector(".custom__text_item");
        if (customItemEl) customItemEl.remove();
      } else {
        countListWrapper.insertAdjacentHTML("afterbegin", addCustomText);
      }

      wrapperHeight < initWrapperHeight
        ? (scrollIndicatorEl.style.cssText = "opacity:0;visibility:hidden")
        : (scrollIndicatorEl.style.cssText = "opacity:1;visibility:visible");
    });

    itemCountEl.textContent = charmCount + "/" + limit;
    addKeychainColor();
    updateImage();
    addTocartBtn.disabled = true;
    addfakeBtn();
    if (duplicateBtn) duplicateBtn.classList.add('disabled_btn');
    scrollIndicator(countListWrapper);
    scrollIndicator(specialCharmWrapper);

    
    function startApp() {
      const charmSelected = localStorage.getItem("charmSelected");
      const formWrapper = document.querySelector(".product-form");
      const prevPageUrl = localStorage.getItem("bundlePageUrl");
      const prevLinkEl = document.querySelector('.change_bundle');
      const btns = [...document.querySelectorAll('.custom_btn, .product-add')].forEach(el => el.style.visibility = 'visible');
      if (!charmSelected) {
        formWrapper.innerHTML = `<p class="start_collection_info">Please click <a href="/pages/charm-bundle">here</a> to start your collection</p>`;
        window.location.assign(`/pages/charm-bundle`);
        return false;
      }
      
      if (prevPageUrl && prevLinkEl) prevLinkEl.href = prevPageUrl;
      
      return true;
    }
    
    function prodJson(){
      let productJson = document.getElementById('product-json');
      if ( !productJson ) {
        return false;
      }

      var Product = productJson.innerHTML,
          Product = JSON.parse(Product || '{}');
      
      return Product;
    }
     prodJson();

    function addLinePptItem(charmData) {
      if (state === false) {
        
        charmData.sort((a, b) =>
          a.frontText
            .replace(/(<([^>]+)>)/gi, "")
            .localeCompare(b.frontText.replace(/(<([^>]+)>)/gi, ""))
        );

        // add sorted data to line propery selector
        charmData.forEach((el, i) => {
          const lineBackText =
            el.backText != "" ? `\nBacktext:${el.backText}` : "";

          // check if front text is a custom text.
          let lineFrontCustom = el.frontText.includes("custom_front")
            ? "&nbsp;(Custom text)"
            : "";
          //         let lineFrontSpecial = el.frontText.includes('christmas_charm') ? '&nbsp;(Special)' : '';
          const lineFrontText = el.frontText.replace(/(<([^>]+)>)/gi, "");

          charmDataEl.insertAdjacentHTML(
            "beforeend",
            `<textarea class="charminfo" id="lp_${
              el.id
            }" readonly name="properties[Charm ${
              i + 1
            }${lineFrontCustom}]">${lineFrontText}${lineBackText}</textarea>`
          );
        });

//         specialCharmData.forEach((el, i) => {
//           // check if front text is a custom text.
//           const lineFrontText = el.frontText.replace(/(<([^>]+)>)/gi, "");

//           charmDataEl.insertAdjacentHTML(
//             "beforeend",
//             `<textarea class="charminfo" id="lp_${
//               el.id
//             }" readonly name="properties[Special Charm ${
//               i + 1
//             }]">${lineFrontText}</textarea>`
//           );
//         });
      }
    }

    function goBack() {
      window.history.back();
    }
    function removeLinePptItem() {
      
      if (state == true) {
        const charmD = [...charmDataEl.querySelectorAll(".charminfo")];
        if (charmD.length > 0) charmD.forEach((i) => i.remove());
      }
      
    }

    function scrollIndicator(el) {
      el.addEventListener("scroll", function () {
        let topOffset = this.scrollTop;
        const scrollEl = el.parentElement.querySelector(".scroll-indicator");
        topOffset > 20
          ? (scrollEl.style.cssText = "opacity:0;visibility:hidden")
          : (scrollEl.style.cssText = "opacity:1;visibility:visible");
      });
    }

    function resetApp() {
      limit = Number(localStorage.getItem("charmLimit"));
      state = true;
      exOptnsCt = 0;
      productData = [];
      specialCharmProductData = [];
      charmCount = 0;
      addTocartBtn.disabled = true;
      addfakeBtn();
      bundleId = guid();
      if (duplicateBtn) duplicateBtn.classList.add('disabled_btn');
      charmListNofn();
      charmDataEl.innerHTML = "";
      itemCountEl.textContent = charmCount + "/" + limit;
      variantSelector = document.querySelector(".single-option-selector");
      [...charmList.querySelectorAll(".charm_item")].forEach((i) => i.remove());
      updateVariant(exOptnsCt, variantSelector);
      addKeychainColor();
      speCharmprice.innerHTML = '';
      
      dataSpecialCharmPrice = 0;
      
      updateCurrentvariantPrice();
      renderCurrPrice();
    }
    
    const countryMiniWrapper = document.querySelector('.country_charm_wrapper');
    
    if (countryMiniWrapper) {
      countryMiniWrapper.addEventListener('click', function(e){
        const dupBtn = e.target.closest('.dup_btn');
        if (!dupBtn) return; 
        if (state == false) addTocartBtn.click();
      })
    }

    // callback executed when canvas was found
    function handleCanvas(canvas) {
      variantSelector = canvas;
      state = true;
      optionSelector = document.querySelector('select[name="id"]');
      updateVariant(exOptnsCt, canvas);
    }

    function addfakeBtn() {
      if (addTocartBtnWrapper.querySelector(".fakeBtn")) return;
      const node = document.createElement("span");
      node.style.height = addTocartBtn.clientHeight + "px";
      node.style.width = addTocartBtn.clientWidth + "px";
      node.classList.add("fakeBtn");
      addTocartBtnWrapper.appendChild(node);
      if (duplicateBtn) {
        duplicateBtn.classList.add('disabled_btn');
        duplicateBtn.classList.remove('dup_btn');
      }
    }
   

    function addKeychainColor() {
      if (!keyChainColor) return;
      charmDataEl.insertAdjacentHTML(
        "beforeend",
        `<textarea id="keyChainColor" readonly name="properties[KEYCHAIN COLOR]">${keyChainColor
          .split("-")[1]
          .toUpperCase()}</textarea>
         <textarea id="_BundleId" readonly name="properties[_BundleId]">parent__${bundleId}</textarea>;
			`
      );
    }

    function updateImage() {
      if (!keyChainColor) return;
      let keyColorNo = Number(keyChainColor.split("-").pop());
      [
        ...document.querySelectorAll(".product-image-container .product_image"),
      ].forEach((el, i) => {
        if (i == keyColorNo) return;
        el.remove();
      });
    }

    function removefakeBtn() {
      const fakeBtn = document.querySelector(".fakeBtn")
      if (fakeBtn) fakeBtn.remove();
      if (duplicateBtn) {
        duplicateBtn.classList.remove('disabled_btn');
        duplicateBtn.classList.add('dup_btn');
      }
    }

    // set up the mutation observer
    var observer = new MutationObserver(function (mutations, me) {
      // `mutations` is an array of mutations that occurred
      // `me` is the MutationObserver instance
      var canvas = document.querySelector(".single-option-selector");
      if (canvas) {
        handleCanvas(canvas);
        me.disconnect(); // stop observing
        return;
      }
    });
    // start observing
    observer.observe(document, {
      childList: true,
      subtree: true,
    });

    // Product constructor
    const Product = function (id, frontText, backText, variantId = '',  price = 0) {
      this.id = id;
      this.frontText = frontText;
      this.backText = backText;
      this.variantId = variantId;
      this.price = price;
    };

    function charmListNofn() {
      const el = addedcharmListEL.querySelector(".charmListNofn");
      (productData.length > 0 || specialCharmProductData.length > 0)
        ? (el.style.display = "none")
        : (el.style.display = "block");
    }

    function updateVariant(count, canvasEl) {
      canvasEl[count].selected = "selected";
      canvasEl.dispatchEvent(new Event("change"));
    }

    function addExOptnCt(el, specialCharm) {
   //   if (specialCharm) exOptnsCt = exOptnsCt + 2;
      if (!specialCharm) {
        if (
          el.querySelector(".add_back_side").checked &&
          el.querySelector(".back_input input").value != ""
        )
          exOptnsCt++;
        if (el.querySelector(".customTextInput")) exOptnsCt++;
      }
    }

    function removeExOptnCt(el) {
    //  if (el.querySelector(".christmas_charm")) exOptnsCt = exOptnsCt - 2;
      if (el.querySelector(".charm_bck")) exOptnsCt--;
      if (el.querySelector(".custom_front")) exOptnsCt--;
    }

//     function valinput(el) {
//       if (
//         el.querySelector(".add_back_side").checked &&
//         el.querySelector(".back_input input").value == ""
//       ) {
//         el.style.border = "1px solid red";
//         return false;
//       }
//       if (
//         el.querySelector(".customTextInput") &&
//         el.querySelector(".customTextInput").value == ""
//       ) {
//         el.style.border = "1px solid red";
//         return false;
//       }
//       return true;
//     }

    function updateCharmCount(data) {
      charmCount = data.length;
    }

    function checkState() {
      charmCount === limit ? (state = false) : (state = true);
    }

    function clearItem(el, specialCharm) {
      el.style.borderColor = "#ddd";
      if (specialCharm) return;
      if (el.querySelector(".customTextInput"))
        el.querySelector(".customTextInput").value = "";
      el.querySelector(".back_input input").value = "";
      el.querySelector(".back_input").style.display = "none";
      el.querySelector(".add_back_side").checked = false;
    }

    // render charm count
    function rendercharmNumber() {
      itemCountEl.textContent = charmCount + "/" + limit;
    }

    function updateBtn() {
      if (charmCount === limit) {
        addTocartBtn.disabled = false;
        removefakeBtn();
      } else {
        addTocartBtn.disabled = true;
        addfakeBtn();
      }
    }

    // Create charmList object and push to the productData array
    function createData(el, specialCharm) {
      const id = guid();
      let frontText,variantId, price;
      
      if (specialCharm) {
        frontText = `<span class="christmas_charm">${el.dataset.park}</span>`;
        variantId = el.dataset.variant;
        price = el.dataset.price;
      }
      if (!specialCharm)
        frontText = el.querySelector(".customTextInput")
          ? '<span class="custom_front">' +
            el.querySelector(".customTextInput").value +
            "</span>"
          : el.dataset.park;
      let backText = "";

      if (!specialCharm)
        backText = el.querySelector(".back_input input").value;

      // Create object
      const data = new Product(id, frontText, backText, variantId, price);

      // Push to array
      specialCharm ? specialCharmProductData.push(data) : productData.push(data);
       
    }

    // Render CharmList Data on the frontend
    function renderItem(data) {
      const curData = data[data.length - 1];

      const backText =
        curData.backText != ""
          ? `<span class="charm_bck">&nbsp;|&nbsp;Backtext: ${curData.backText}</span>`
          : "";
      const charmItem = `<div class="charm_item">${curData.frontText}${backText}<span class="remove_item" id="${curData.id}">x</span></div>`;

      ListWrapper.insertAdjacentHTML("beforeend", charmItem);
    }

    function addNofn(el) {
      el.style.fontSize = "12px";
      el.textContent = "✓";
      el.style.backgroundColor = "#1c9666";
      setTimeout(function () {
        el.style.fontSize = null;
        el.textContent = "+";
        el.style.backgroundColor = null;
      }, 600);
    }

    function limitNofn(el) {
      el.style.backgroundColor = "red";
      el.style.fontSize = "12px";
      el.textContent = "Limit Reached!";

      setTimeout(function () {
        el.textContent = "+";
        el.style.fontSize = null;
        el.style.backgroundColor = null;
      }, 600);
    }
    
    
    
//     function renderSpecialCharmPrice(data, specialCharmSum) {
//       const sPrice = Shopify.formatMoney(specialCharmSum, ml_money_format);
//       if (!speCharmprice) return;

//       if (data.length > 0) {
//         speCharmprice.innerHTML = `+ ${sPrice} <small>(special charms price)</small>`;
//       }
//       else {
//         speCharmprice.innerHTML = '';
//       }
//     }

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
	
    function updateSpecialCharmPrice(data) {
      let specialCharmSum = 0;
      for (let i = 0; i < data.length; i++) {
        specialCharmSum += Number(data[i].price);
      }
      dataSpecialCharmPrice = specialCharmSum;
      
    };
    
    function updateCurrentvariantPrice(){
      
      let currentVariantId = optionSelector[exOptnsCt].value;
      let variantData = prodJson();
      const variant = variantData.variants.filter(currV => currV.id == currentVariantId);
      
      dataProductPrice =  variant[0].price;
    }
    
    function renderCurrPrice(){
      const price = dataProductPrice + dataSpecialCharmPrice;
      
      const formatPrice = Shopify.formatMoney(price, ml_money_format);
      
      document.querySelector('.product-price').innerHTML = formatPrice;
      
    } 
    
    // Open , focus and close backside text input box
    countryWrapper.addEventListener("click", function (e) {
      const el = e.target.closest(".add_back_side");
      if (!el) return;

      setTimeout(function () {
        if (el.checked) {
          el.parentElement.nextElementSibling.style.display = "block";
          el.parentElement.parentElement.querySelector(".bacdside_box").focus();
        } else {
          el.parentElement.nextElementSibling.style.display = "none";
          el.parentElement.parentElement.querySelector(".bacdside_box").blur();
        }
      }, 100);
    });

     // Add country to CharmList
     countryWrapper.addEventListener("click", function (e) {
      const el = e.target;
      const itemWrapper = el.closest(".tokenVariant");
      if (!itemWrapper) return;
      const specialCharm = itemWrapper.classList.contains("christmasVariant");

//       //quick validate input against the data removed because of translation
//       let correctData = false;

//       if (specialCharm) correctData = specialCharmList.includes(itemWrapper.dataset.park);
//       if (!specialCharm) correctData = countryList.includes(itemWrapper.dataset.park);
//       if (itemWrapper.querySelector(".customTextInput")) correctData = true;

//       if (!correctData) return;

      // Check the clicked element and validate backside text
      if (el.closest(".add_country") && valinput(itemWrapper, specialCharm)) {
        if (state || specialCharm) {
          // create the charm data
          createData(itemWrapper, specialCharm);

          addExOptnCt(itemWrapper, specialCharm);
          // update the charm count
          updateCharmCount(productData);
          
//          updateSpecialCharmPrice(specialCharmProductData);
          
          // Add notification
          addNofn(el);
          // clear the UI data on the added charm
          clearItem(itemWrapper, specialCharm);

          // udpate selected variant
          updateVariant(exOptnsCt, variantSelector);
          
          updateSpecialCharmPrice(specialCharmProductData);
          updateCurrentvariantPrice();
          renderCurrPrice();
          
          // Render charm item to charm list
          specialCharm ? renderItem(specialCharmProductData): renderItem(productData);
          // Render charm number
          rendercharmNumber();

          // Update State
          checkState();
          
          

          if (!specialCharm) addLinePptItem(productData);

          // Update Button
          updateBtn();

          charmListNofn();

        } else {
          // limit notification
          limitNofn(el);
        }
      }
    });

     // Remove charm from the list
     charmList.addEventListener("click", function (e) {
      const charmItem = e.target.closest(".remove_item");

      if (!charmItem) return; // Guard clause

      removeExOptnCt(charmItem.parentElement);
      updateVariant(exOptnsCt, variantSelector);

      const nCindex = productData.findIndex((charm) => charm.id == charmItem.id);
       
      const sCindex = specialCharmProductData.findIndex((charm) => charm.id == charmItem.id);
      
      
      const id = charmItem.id;

      if (nCindex != -1) productData.splice(nCindex, 1);
	  if (sCindex != -1) specialCharmProductData.splice(sCindex, 1);

      charmItem.parentElement.remove();

      //   charmDataEl.querySelector(`#lp_${id}`).remove();

      updateCharmCount(productData);
       
     

       updateSpecialCharmPrice(specialCharmProductData);
       updateCurrentvariantPrice();
       renderCurrPrice();
      // Render Charm
      rendercharmNumber();

      // update state
      checkState();

      setTimeout(() => {
         removeLinePptItem();         
	  })
      

      // Update Button
      updateBtn();

      //
      charmListNofn();
    });

    document.addEventListener("click", function (e) {
      const btn = e.target.closest(".fakeBtn") || e.target.closest('.disabled_btn');
      if (!btn) return;
      if (charmCount < limit && state == true) {
        const remainingCharm = limit - charmCount;
        alert(`Add ${remainingCharm} more country/city charms`);
      }
    });

    function addSpecialCharms(){
      if (!specialCharmProductData.length) return;
      specialCharmProductData.forEach(function(i,n){
        let variantId = i.variantId;
        let qty = 1;
        
        let specialCharmObj = {
          id: variantId,
          quantity: qty
        }
        
        finalItems.push(specialCharmObj);
		
        
      });
      
      var obj = finalItems.reduce((prev, curr) => {
          if (!prev[curr.id]) prev[curr.id] = 0; 
          prev[curr.id] += curr.quantity 
          return prev
        }, {}
      );

      var newObjArr = Object.keys(obj).map((key)=> ({id:key,quantity:obj[key],properties:{
            [`_BundleId`]: `${bundleId}`
          }}));

      

      let formData = {
        'items': newObjArr
      };

      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
       // resetApp();
        finalItems = [];
        return response.json();
      })
      .finally(()=> {
        ajaxCart.load();   
      }) 
      .catch((error) => {
        console.log('Error: ', error);
      });
    }

    return {
      reset: resetApp,
      goback: goBack,
      addSpecialCharm: addSpecialCharms
    };
  })();