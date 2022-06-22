let limit = Number(localStorage.getItem("charmLimit"));
let state = false;
let exOptnsCt = 0;
const ListWrapper = document.querySelector(".tokenData");
const countryWrapper = document.querySelector(".line-item-property__field");
const charmList = document.querySelector(".tokenData");
const addTocartBtn = document.querySelector("#AddToCart");
const addTocartBtnWrapper = addTocartBtn.parentElement;
let productData = [];
let charmCount = 0;
const itemCountEl = document.querySelector(".itemCount");
const charmDataEl = document.querySelector(".charmData");
const addedcharmListEL = document.querySelector(".charmList");
const keyChainColor = localStorage.getItem("keyChainColor");
let variantSelector = "";
const scrollIndicatorEl = document.querySelector(".scroll-indicator");
const countListWrapper = document.querySelector(".tokensList");
const collectionType = localStorage.getItem("collectionType");
const customText = `<li class="tokenVariant" data-park="" data-custom=""><span class="tokenTitle"><input type="text" placeholder="Your text" maxlength="12" class="customTextInput"><span class="extra_charge">&nbsp;+€2</span><span class="add_plus add_country">+</span></span><span class="back_side"><span class="back_checkbox"><input type="checkbox" id="CustomText" name="Backside" value="" class="add_back_side"><label for="CustomText" class="back_label">Back side text<span class="extra_charge">&nbsp;+€2</span> </label></span><span class="back_input"style="display:none"><input type="text" placeholder="Back side text" maxlength="12" class="bacdside_box"></span></span></li>`;
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

const initWrapperHeight = countListWrapper.clientHeight;

////////////////////////////////////////////////
// charm data
class Product {
  constructor(id, frontText, backText) {
    this.id = id;
    this.frontText = frontText;
    this.backText = backText;
  }
}

/////////////////////////////////////////////
// app
class App {
  constructor() {

    const startApplication = this.init();
    if (!startApplication) return; // Guard clause
    countryWrapper.addEventListener("click", this.addCharm.bind(this));
    charmList.addEventListener("click", this.removeCharm.bind(this));
    document.addEventListener("click", this.buttonClick.bind(this));
    countryWrapper.addEventListener("click", this.backSide.bind(this));
    itemCountEl.textContent = charmCount + "/" + limit;
    this.addKeychainColor();
    this.updateImage();
    addTocartBtn.disabled = true;
    this.addfakeBtn();
    this.scrollIndicator();
    
    countListWrapper.insertAdjacentHTML("beforeend", customText);
    
    // callback executed when canvas was found
    let handleCanvas = (canvas) => {
      variantSelector = canvas;
      state = true;
      this.updateVariant(exOptnsCt, canvas);
    };

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
  }
  init() {
    const charmSelected = localStorage.getItem("charmSelected");
    const formWrapper = document.querySelector(".product-form");
    if (!charmSelected) {
      formWrapper.innerHTML = `<p class="start_collection_info">Please click <a href="/pages/charm-bundle">here</a> to start your collection</p>`;
      window.location.assign(`/pages/charm-bundle`);
      return false;
    }
    return true;
  }
  guid() {
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
  }
  addCharm(e) {
    const el = e.target;
    const itemWrapper = el.closest(".tokenVariant");
    // Check the clicked element and validate backside text
    if (el.closest(".add_country") && this.valinput(itemWrapper)) {
      if (state) {
        // create the charm data
        this.createData(itemWrapper);

        this.addExOptnCt(itemWrapper);
        // update the charm count
        this.updateCharmCount(productData);
        // Add notification
        this.addNofn(el);
        // clear the UI data on the added charm
        this.clearItem(itemWrapper);

        // udpate selected variant
        this.updateVariant(exOptnsCt, variantSelector);
        // Render charm item to charm list
        this.renderItem(productData);
        // Render charm number
        this.rendercharmNumber();

        // Update State
        this.checkState();

        this.addLinePptItem(productData);

        // Update Button
        this.updateBtn();

        this.charmListNofn();
      } else {
        // limit notification
        this.limitNofn(el);
      }
    }
  }
  removeCharm(e) {
    const charmItem = e.target.closest(".remove_item");

    if (!charmItem) return; // Guard clause

    this.removeExOptnCt(charmItem.parentElement);
    this.updateVariant(exOptnsCt, variantSelector);

    const index = productData.findIndex((charm) => charm.id == charmItem.id);
    //    const id = charmItem.id;
    productData.splice(index, 1);
    charmItem.parentElement.remove();
    this.updateCharmCount(productData);
    this.rendercharmNumber();

    // update state
    this.checkState();

    this.removeLinePptItem();

    // Update Button
    this.updateBtn();

    //
    this.charmListNofn();
  }
  addKeychainColor() {
    if (!keyChainColor) return;
    charmDataEl.insertAdjacentHTML(
      "beforeend",
      `<textarea id="keyChainColor" readonly name="properties[KEYCHAIN COLOR]">${keyChainColor
        .split("-")[1]
        .toUpperCase()}</textarea>`
    );
  }
  backSide(e) {
    const el = e.target.closest(".add_back_side");
    if (!el) return;

    setTimeout(() => {
      if (el.checked) {
        el.parentElement.nextElementSibling.style.display = "block";
        el.parentElement.parentElement.querySelector(".bacdside_box").focus();
      } else {
        el.parentElement.nextElementSibling.style.display = "none";
        el.parentElement.parentElement.querySelector(".bacdside_box").blur();
      }
    }, 100);
  }
  scrollIndicator() {
    countListWrapper.addEventListener("scroll", function () {
      let topOffset = this.scrollTop;
      topOffset > 20
        ? (scrollIndicatorEl.style.cssText = "opacity:0;visibility:hidden")
        : (scrollIndicatorEl.style.cssText = "opacity:1;visibility:visible");
    });
  }
  removefakeBtn() {
    document.querySelector(".fakeBtn").remove();
  }
  addfakeBtn() {
    if (addTocartBtnWrapper.querySelector(".fakeBtn")) return;
    const node = document.createElement("span");
    node.style.height = addTocartBtn.clientHeight + "px";
    node.style.width = addTocartBtn.clientWidth + "px";
    node.classList.add("fakeBtn");
    addTocartBtnWrapper.appendChild(node);
  }
  buttonClick(e) {
    const btn = e.target.closest(".fakeBtn");
    if (!btn) return;
    if (charmCount < limit && state == true) {
      const remainingCharm = limit - charmCount;
      alert(`Add ${remainingCharm} more charm(s) to continue`);
    }
  }
  removeLinePptItem() {
    const charmD = [...charmDataEl.querySelectorAll(".charminfo")];
    if (charmD.length > 0) charmD.forEach((i) => i.remove());
  }
  removeExOptnCt(el) {
    if (el.querySelector(".charm_bck")) exOptnsCt--;
    if (el.querySelector(".custom_front")) exOptnsCt--;
  }

  limitNofn(el) {
    el.style.backgroundColor = "red";
    el.style.fontSize = "12px";
    el.textContent = "Limit Reached!";

    setTimeout(function () {
      el.textContent = "+";
      el.style.fontSize = null;
      el.style.backgroundColor = null;
    }, 600);
  }
  updateImage() {
    if (!keyChainColor) return;
    let keyColorNo = Number(keyChainColor.split("-").pop());
    [
      ...document.querySelectorAll(".product-image-container .product_image"),
    ].forEach((el, i) => {
      if (i == keyColorNo) return;
      el.remove();
    });
  }
  charmListNofn() {
    const el = addedcharmListEL.querySelector(".charmListNofn");
    productData.length > 0
      ? (el.style.display = "none")
      : (el.style.display = "block");
  }
  updateBtn() {
    if (charmCount === limit) {
      addTocartBtn.disabled = false;
      this.removefakeBtn();
    } else {
      addTocartBtn.disabled = true;
      this.addfakeBtn();
    }
  }
  addLinePptItem(charmData) {
    if (state === false) {
      //sort data
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
    }
  }
  checkState() {
    charmCount === limit ? (state = false) : (state = true);
  }
  rendercharmNumber() {
    itemCountEl.textContent = charmCount + "/" + limit;
  }
  renderItem(data) {
    const curData = data[data.length - 1];
    const backText =
      curData.backText != ""
        ? `<span class="charm_bck">&nbsp;|&nbsp;Backtext: ${curData.backText}</span>`
        : "";
    const charmItem = `<div class="charm_item">${curData.frontText}${backText}<span class="remove_item" id="${curData.id}">x</span></div>`;
    ListWrapper.insertAdjacentHTML("beforeend", charmItem);
  }
  updateVariant(count, canvasEl) {
    canvasEl[count].selected = "selected";
    canvasEl.dispatchEvent(new Event("change"));
  }
  clearItem(el) {
    if (el.querySelector(".customTextInput"))
      el.querySelector(".customTextInput").value = "";
    el.querySelector(".back_input input").value = "";
    el.querySelector(".back_input").style.display = "none";
    el.querySelector(".add_back_side").checked = false;
    el.style.borderColor = "#ddd";
  }
  addNofn(el) {
    el.style.fontSize = "12px";
    el.textContent = "✓";
    el.style.backgroundColor = "#1c9666";
    setTimeout(function () {
      el.style.fontSize = null;
      el.textContent = "+";
      el.style.backgroundColor = null;
    }, 600);
  }
  updateCharmCount(data) {
    charmCount = data.length;
  }
  createData(el) {
    const id = this.guid();
    const frontText = el.querySelector(".customTextInput")
      ? '<span class="custom_front">' +
        el.querySelector(".customTextInput").value +
        "</span>"
      : el.dataset.park;
    const backText = el.querySelector(".back_input input").value;

    // Create object
    const data = new Product(id, frontText, backText);

    // Push to array
    productData.push(data);
  }
  addExOptnCt(el) {
    if (
      el.querySelector(".add_back_side").checked &&
      el.querySelector(".back_input input").value != ""
    )
      exOptnsCt++;
    if (el.querySelector(".customTextInput")) exOptnsCt++;
  }
  valinput(el) {
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
  }
  goBack() {
    window.history.back();
  }

  resetApp() {
    limit = Number(localStorage.getItem("charmLimit"));
    state = true;
    exOptnsCt = 0;
    productData = [];
    charmCount = 0;
    addTocartBtn.disabled = true;
    this.addfakeBtn();
    this.charmListNofn();
    charmDataEl.innerHTML = "";
    itemCountEl.textContent = charmCount + "/" + limit;
    variantSelector = document.querySelector(".single-option-selector");
    [...charmList.querySelectorAll(".charm_item")].forEach((i) => i.remove());
    this.updateVariant(exOptnsCt, variantSelector);
    this.addKeychainColor();
  }
}
const app = new App();

options = {
  valueNames: [{ data: ["park"] }, { data: ["custom"] }],
};

userList = new List("countryData", options);  

userList.on("searchComplete", function(){
  
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
