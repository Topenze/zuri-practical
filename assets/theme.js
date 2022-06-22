window.theme = window.theme || {};

(function polyfillNodeList(){
  /* For IE 11+ Nodelist forEach Function */
  if (window.NodeList && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = function (callback, thisArg) {
          thisArg = thisArg || window;
          for (var i = 0; i < this.length; i++) {
              callback.call(thisArg, this[i], i, this);
          }
      };
  }
})();


(function vendorDrawerCart(){
  /* Jonathan Snook - MIT License - https://github.com/snookca/prepareTransition */
  (function(a){a.fn.prepareTransition=function(){return this.each(function(){var b=a(this);b.one("TransitionEnd webkitTransitionEnd transitionend oTransitionEnd",function(){b.removeClass("is-transitioning")});var c=["transition-duration","-moz-transition-duration","-webkit-transition-duration","-o-transition-duration"];var d=0;a.each(c,function(a,c){d=parseFloat(b.css(c))||d});if(d!=0){b.addClass("is-transitioning");b[0].offsetWidth}})}})(jQuery);

  /* replaceUrlParam - http://stackoverflow.com/questions/7171099/how-to-replace-url-parameter-with-javascript-jquery */
  function replaceUrlParam(e,r,a){var n=new RegExp("("+r+"=).*?(&|$)"),c=e;return c=e.search(n)>=0?e.replace(n,"$1"+a+"$2"):c+(c.indexOf("?")>0?"&":"?")+r+"="+a};

  // Timber functions
  window.timber = window.timber || {};

  timber.cacheSelectors = function () {
    timber.cache = {
      // General
      $html                    : $('html'),
      $body                    : $('body')
    };
  };

  timber.init = function () {
    timber.cacheSelectors();
    timber.drawersInit();
  };

  timber.drawersInit = function () {
    timber.RightDrawer = new timber.Drawers('CartDrawer', 'right', {
      'onDrawerOpen': ajaxCart.load
    });
  };

  timber.getHash = function () {
    return window.location.hash;
  };


  /*============================================================================
    Drawer modules
    - Docs http://shopify.github.io/Timber/#drawers
  ==============================================================================*/
  timber.Drawers = (function () {
    var Drawer = function (id, position, options) {
      var defaults = {
        close: '.js-drawer-close',
        open: '.js-drawer-open-' + position,
        openClass: 'js-drawer-open',
        dirOpenClass: 'js-drawer-open-' + position
      };

      this.$nodes = {
        parent: $('body, html'),
        page: $('#PageContainer'),
        moved: $('.is-moved-by-drawer')
      };

      this.config = $.extend(defaults, options);
      this.position = position;

      this.$drawer = $('#' + id);

      if (!this.$drawer.length) {
        return false;
      }

      this.drawerIsOpen = false;
      this.init();
    };

    Drawer.prototype.init = function () {
      $(this.config.open).on('click', $.proxy(this.open, this));
      this.$drawer.find(this.config.close).on('click', $.proxy(this.close, this));
    };

    Drawer.prototype.open = function (evt) {
      // Keep track if drawer was opened from a click, or called by another function
      var externalCall = false;

      // Prevent following href if link is clicked
      if (evt) {
        evt.preventDefault();
      } else {
        externalCall = true;
      }

      // Without this, the drawer opens, the click event bubbles up to $nodes.page
      // which closes the drawer.
      if (evt && evt.stopPropagation) {
        evt.stopPropagation();
        // save the source of the click, we'll focus to this on close
        this.$activeSource = $(evt.currentTarget);
      }

      if (this.drawerIsOpen && !externalCall) {
        return this.close();
      }

      // Add is-transitioning class to moved elements on open so drawer can have
      // transition for close animation
      this.$nodes.moved.addClass('is-transitioning');
      this.$drawer.prepareTransition();

      this.$nodes.parent.addClass(this.config.openClass + ' ' + this.config.dirOpenClass);
      this.drawerIsOpen = true;

      // Set focus on drawer
      this.trapFocus(this.$drawer, 'drawer_focus');

      // Run function when draw opens if set
      if (this.config.onDrawerOpen && typeof(this.config.onDrawerOpen) == 'function') {
        if (!externalCall) {
          this.config.onDrawerOpen();
        }
      }

      if (this.$activeSource && this.$activeSource.attr('aria-expanded')) {
        this.$activeSource.attr('aria-expanded', 'true');
      }

      // Lock scrolling on mobile
      this.$nodes.page.on('touchmove.drawer', function () {
        return false;
      });

      this.$nodes.page.on('click.drawer', $.proxy(function () {
        this.close();
        return false;
      }, this));
    };

    Drawer.prototype.close = function () {
      if (!this.drawerIsOpen) { // don't close a closed drawer
        return;
      }

      // deselect any focused form elements
      $(document.activeElement).trigger('blur');

      // Ensure closing transition is applied to moved elements, like the nav
      this.$nodes.moved.prepareTransition({ disableExisting: true });
      this.$drawer.prepareTransition({ disableExisting: true });

      this.$nodes.parent.removeClass(this.config.dirOpenClass + ' ' + this.config.openClass);

      this.drawerIsOpen = false;

      // Remove focus on drawer
      this.removeTrapFocus(this.$drawer, 'drawer_focus');

      this.$nodes.page.off('.drawer');
    };

    Drawer.prototype.trapFocus = function ($container, eventNamespace) {
      var eventName = eventNamespace ? 'focusin.' + eventNamespace : 'focusin';

      $container.attr('tabindex', '-1');

      $container.focus();

      $(document).on(eventName, function (evt) {
        if ($container[0] !== evt.target && !$container.has(evt.target).length) {
          $container.focus();
        }
      });
    };

    Drawer.prototype.removeTrapFocus = function ($container, eventNamespace) {
      var eventName = eventNamespace ? 'focusin.' + eventNamespace : 'focusin';

      $container.removeAttr('tabindex');
      $(document).off(eventName);
    };

    return Drawer;
  })();

  // Initialize Timber's JS on docready
  $(timber.init);
})();


(function vendorAOS(){
  /**
   * *******************************************************
   * AOS (Animate on scroll) - wowjs alternative
   * made to animate elements on scroll in both directions
   * *******************************************************
   */
  !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.AOS=t():e.AOS=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="dist/",t(0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=n(1),a=(o(r),n(6)),u=o(a),c=n(7),f=o(c),s=n(8),d=o(s),l=n(9),p=o(l),m=n(10),b=o(m),v=n(11),y=o(v),g=n(14),h=o(g),w=[],k=!1,x={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,startEvent:"DOMContentLoaded",throttleDelay:99,debounceDelay:50,disableMutationObserver:!1},j=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(e&&(k=!0),k)return w=(0,y.default)(w,x),(0,b.default)(w,x.once),w},O=function(){w=(0,h.default)(),j()},_=function(){w.forEach(function(e,t){e.node.removeAttribute("data-aos"),e.node.removeAttribute("data-aos-easing"),e.node.removeAttribute("data-aos-duration"),e.node.removeAttribute("data-aos-delay")})},S=function(e){return e===!0||"mobile"===e&&p.default.mobile()||"phone"===e&&p.default.phone()||"tablet"===e&&p.default.tablet()||"function"==typeof e&&e()===!0},z=function(e){x=i(x,e),w=(0,h.default)();var t=document.all&&!window.atob;return S(x.disable)||t?_():(document.querySelector("body").setAttribute("data-aos-easing",x.easing),document.querySelector("body").setAttribute("data-aos-duration",x.duration),document.querySelector("body").setAttribute("data-aos-delay",x.delay),"DOMContentLoaded"===x.startEvent&&["complete","interactive"].indexOf(document.readyState)>-1?j(!0):"load"===x.startEvent?window.addEventListener(x.startEvent,function(){j(!0)}):document.addEventListener(x.startEvent,function(){j(!0)}),window.addEventListener("resize",(0,f.default)(j,x.debounceDelay,!0)),window.addEventListener("orientationchange",(0,f.default)(j,x.debounceDelay,!0)),window.addEventListener("scroll",(0,u.default)(function(){(0,b.default)(w,x.once)},x.throttleDelay)),x.disableMutationObserver||(0,d.default)("[data-aos]",O),w)};e.exports={init:z,refresh:j,refreshHard:O}},function(e,t){},,,,,function(e,t){(function(t){"use strict";function n(e,t,n){function o(t){var n=b,o=v;return b=v=void 0,k=t,g=e.apply(o,n)}function r(e){return k=e,h=setTimeout(s,t),_?o(e):g}function a(e){var n=e-w,o=e-k,i=t-n;return S?j(i,y-o):i}function c(e){var n=e-w,o=e-k;return void 0===w||n>=t||n<0||S&&o>=y}function s(){var e=O();return c(e)?d(e):void(h=setTimeout(s,a(e)))}function d(e){return h=void 0,z&&b?o(e):(b=v=void 0,g)}function l(){void 0!==h&&clearTimeout(h),k=0,b=w=v=h=void 0}function p(){return void 0===h?g:d(O())}function m(){var e=O(),n=c(e);if(b=arguments,v=this,w=e,n){if(void 0===h)return r(w);if(S)return h=setTimeout(s,t),o(w)}return void 0===h&&(h=setTimeout(s,t)),g}var b,v,y,g,h,w,k=0,_=!1,S=!1,z=!0;if("function"!=typeof e)throw new TypeError(f);return t=u(t)||0,i(n)&&(_=!!n.leading,S="maxWait"in n,y=S?x(u(n.maxWait)||0,t):y,z="trailing"in n?!!n.trailing:z),m.cancel=l,m.flush=p,m}function o(e,t,o){var r=!0,a=!0;if("function"!=typeof e)throw new TypeError(f);return i(o)&&(r="leading"in o?!!o.leading:r,a="trailing"in o?!!o.trailing:a),n(e,t,{leading:r,maxWait:t,trailing:a})}function i(e){var t="undefined"==typeof e?"undefined":c(e);return!!e&&("object"==t||"function"==t)}function r(e){return!!e&&"object"==("undefined"==typeof e?"undefined":c(e))}function a(e){return"symbol"==("undefined"==typeof e?"undefined":c(e))||r(e)&&k.call(e)==d}function u(e){if("number"==typeof e)return e;if(a(e))return s;if(i(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=i(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(l,"");var n=m.test(e);return n||b.test(e)?v(e.slice(2),n?2:8):p.test(e)?s:+e}var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f="Expected a function",s=NaN,d="[object Symbol]",l=/^\s+|\s+$/g,p=/^[-+]0x[0-9a-f]+$/i,m=/^0b[01]+$/i,b=/^0o[0-7]+$/i,v=parseInt,y="object"==("undefined"==typeof t?"undefined":c(t))&&t&&t.Object===Object&&t,g="object"==("undefined"==typeof self?"undefined":c(self))&&self&&self.Object===Object&&self,h=y||g||Function("return this")(),w=Object.prototype,k=w.toString,x=Math.max,j=Math.min,O=function(){return h.Date.now()};e.exports=o}).call(t,function(){return this}())},function(e,t){(function(t){"use strict";function n(e,t,n){function i(t){var n=b,o=v;return b=v=void 0,O=t,g=e.apply(o,n)}function r(e){return O=e,h=setTimeout(s,t),_?i(e):g}function u(e){var n=e-w,o=e-O,i=t-n;return S?x(i,y-o):i}function f(e){var n=e-w,o=e-O;return void 0===w||n>=t||n<0||S&&o>=y}function s(){var e=j();return f(e)?d(e):void(h=setTimeout(s,u(e)))}function d(e){return h=void 0,z&&b?i(e):(b=v=void 0,g)}function l(){void 0!==h&&clearTimeout(h),O=0,b=w=v=h=void 0}function p(){return void 0===h?g:d(j())}function m(){var e=j(),n=f(e);if(b=arguments,v=this,w=e,n){if(void 0===h)return r(w);if(S)return h=setTimeout(s,t),i(w)}return void 0===h&&(h=setTimeout(s,t)),g}var b,v,y,g,h,w,O=0,_=!1,S=!1,z=!0;if("function"!=typeof e)throw new TypeError(c);return t=a(t)||0,o(n)&&(_=!!n.leading,S="maxWait"in n,y=S?k(a(n.maxWait)||0,t):y,z="trailing"in n?!!n.trailing:z),m.cancel=l,m.flush=p,m}function o(e){var t="undefined"==typeof e?"undefined":u(e);return!!e&&("object"==t||"function"==t)}function i(e){return!!e&&"object"==("undefined"==typeof e?"undefined":u(e))}function r(e){return"symbol"==("undefined"==typeof e?"undefined":u(e))||i(e)&&w.call(e)==s}function a(e){if("number"==typeof e)return e;if(r(e))return f;if(o(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=o(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(d,"");var n=p.test(e);return n||m.test(e)?b(e.slice(2),n?2:8):l.test(e)?f:+e}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c="Expected a function",f=NaN,s="[object Symbol]",d=/^\s+|\s+$/g,l=/^[-+]0x[0-9a-f]+$/i,p=/^0b[01]+$/i,m=/^0o[0-7]+$/i,b=parseInt,v="object"==("undefined"==typeof t?"undefined":u(t))&&t&&t.Object===Object&&t,y="object"==("undefined"==typeof self?"undefined":u(self))&&self&&self.Object===Object&&self,g=v||y||Function("return this")(),h=Object.prototype,w=h.toString,k=Math.max,x=Math.min,j=function(){return g.Date.now()};e.exports=n}).call(t,function(){return this}())},function(e,t){"use strict";function n(e,t){var n=window.document,r=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,a=new r(o);i=t,a.observe(n.documentElement,{childList:!0,subtree:!0,removedNodes:!0})}function o(e){e&&e.forEach(function(e){var t=Array.prototype.slice.call(e.addedNodes),n=Array.prototype.slice.call(e.removedNodes),o=t.concat(n).filter(function(e){return e.hasAttribute&&e.hasAttribute("data-aos")}).length;o&&i()})}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){};t.default=n},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(){return navigator.userAgent||navigator.vendor||window.opera||""}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,a=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,u=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,c=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,f=function(){function e(){n(this,e)}return i(e,[{key:"phone",value:function(){var e=o();return!(!r.test(e)&&!a.test(e.substr(0,4)))}},{key:"mobile",value:function(){var e=o();return!(!u.test(e)&&!c.test(e.substr(0,4)))}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}}]),e}();t.default=new f},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t,n){var o=e.node.getAttribute("data-aos-once");t>e.position?e.node.classList.add("aos-animate"):"undefined"!=typeof o&&("false"===o||!n&&"true"!==o)&&e.node.classList.remove("aos-animate")},o=function(e,t){var o=window.pageYOffset,i=window.innerHeight;e.forEach(function(e,r){n(e,i+o,t)})};t.default=o},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(12),r=o(i),a=function(e,t){return e.forEach(function(e,n){e.node.classList.add("aos-init"),e.position=(0,r.default)(e.node,t.offset)}),e};t.default=a},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(13),r=o(i),a=function(e,t){var n=0,o=0,i=window.innerHeight,a={offset:e.getAttribute("data-aos-offset"),anchor:e.getAttribute("data-aos-anchor"),anchorPlacement:e.getAttribute("data-aos-anchor-placement")};switch(a.offset&&!isNaN(a.offset)&&(o=parseInt(a.offset)),a.anchor&&document.querySelectorAll(a.anchor)&&(e=document.querySelectorAll(a.anchor)[0]),n=(0,r.default)(e).top,a.anchorPlacement){case"top-bottom":break;case"center-bottom":n+=e.offsetHeight/2;break;case"bottom-bottom":n+=e.offsetHeight;break;case"top-center":n+=i/2;break;case"bottom-center":n+=i/2+e.offsetHeight;break;case"center-center":n+=i/2+e.offsetHeight/2;break;case"top-top":n+=i;break;case"bottom-top":n+=e.offsetHeight+i;break;case"center-top":n+=e.offsetHeight/2+i}return a.anchorPlacement||a.offset||isNaN(t)||(o=t),n+o};t.default=a},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){for(var t=0,n=0;e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)t+=e.offsetLeft-("BODY"!=e.tagName?e.scrollLeft:0),n+=e.offsetTop-("BODY"!=e.tagName?e.scrollTop:0),e=e.offsetParent;return{top:n,left:t}};t.default=n},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){return e=e||document.querySelectorAll("[data-aos]"),Array.prototype.map.call(e,function(e){return{node:e}})};t.default=n}])});
})();
(function vendorParallax(){
  /*!
   * parallax.js v1.5.0 (http://pixelcog.github.io/parallax.js/)
   * @copyright 2016 PixelCog, Inc.
   * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
   */

  (function ( $, window, document, undefined ) {

    // Polyfill for requestAnimationFrame
    // via: https://gist.github.com/paulirish/1579671

    (function() {
      var lastTime = 0;
      var vendors = ['ms', 'moz', 'webkit', 'o'];
      for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
      }

      if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() { callback(currTime + timeToCall); },
            timeToCall);
          lastTime = currTime + timeToCall;
          return id;
        };

      if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
        };
    }());


    // Parallax Constructor

    function Parallax(element, options) {
      var self = this;

      if (typeof options == 'object') {
        delete options.refresh;
        delete options.render;
        $.extend(this, options);
      }

      this.$element = $(element);

      if (!this.imageSrc && this.$element.is('img')) {
        this.imageSrc = this.$element.attr('src');
      }

      var positions = (this.position + '').toLowerCase().match(/\S+/g) || [];

      if (positions.length < 1) {
        positions.push('center');
      }
      if (positions.length == 1) {
        positions.push(positions[0]);
      }

      if (positions[0] == 'top' || positions[0] == 'bottom' || positions[1] == 'left' || positions[1] == 'right') {
        positions = [positions[1], positions[0]];
      }

      if (this.positionX !== undefined) positions[0] = this.positionX.toLowerCase();
      if (this.positionY !== undefined) positions[1] = this.positionY.toLowerCase();

      self.positionX = positions[0];
      self.positionY = positions[1];

      if (this.positionX != 'left' && this.positionX != 'right') {
        if (isNaN(parseInt(this.positionX))) {
          this.positionX = 'center';
        } else {
          this.positionX = parseInt(this.positionX);
        }
      }

      if (this.positionY != 'top' && this.positionY != 'bottom') {
        if (isNaN(parseInt(this.positionY))) {
          this.positionY = 'center';
        } else {
          this.positionY = parseInt(this.positionY);
        }
      }

      this.position =
        this.positionX + (isNaN(this.positionX)? '' : 'px') + ' ' +
        this.positionY + (isNaN(this.positionY)? '' : 'px');

      if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        if (this.imageSrc && this.iosFix && !this.$element.is('img')) {
          this.$element.css({
            backgroundImage: 'url("' + this.imageSrc + '")',
            backgroundSize: 'cover',
            backgroundPosition: this.position
          });
        }
        return this;
      }

      if (navigator.userAgent.match(/(Android)/)) {
        if (this.imageSrc && this.androidFix && !this.$element.is('img')) {
          this.$element.css({
            backgroundImage: 'url("' + this.imageSrc + '")',
            backgroundSize: 'cover',
            backgroundPosition: this.position
          });
        }
        return this;
      }

      this.$mirror = $('<div />').prependTo(this.mirrorContainer);

      var slider = this.$element.find('>.parallax-slider');
      var sliderExisted = false;

      if (slider.length == 0)
        this.$slider = $('<img />').prependTo(this.$mirror);
      else {
        this.$slider = slider.prependTo(this.$mirror)
        sliderExisted = true;
      }

      this.$mirror.addClass('parallax-mirror').css({
        visibility: 'hidden',
        zIndex: this.zIndex,
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden'
      });

      this.$slider.addClass('parallax-slider').one('load', function() {
        if (!self.naturalHeight || !self.naturalWidth) {
          self.naturalHeight = this.naturalHeight || this.height || 1;
          self.naturalWidth  = this.naturalWidth  || this.width  || 1;
        }
        self.aspectRatio = self.naturalWidth / self.naturalHeight;

        Parallax.isSetup || Parallax.setup();
        Parallax.sliders.push(self);
        Parallax.isFresh = false;
        Parallax.requestRender();
      });

      if (!sliderExisted)
        this.$slider[0].src = this.imageSrc;

      if (this.naturalHeight && this.naturalWidth || this.$slider[0].complete || slider.length > 0) {
        this.$slider.trigger('load');
      }

    }


    // Parallax Instance Methods

    $.extend(Parallax.prototype, {
      speed:    0.1,
      bleed:    2,
      zIndex:   1,
      iosFix:   true,
      androidFix: true,
      position: 'center',
      overScrollFix: true,
      mirrorContainer: 'body',

      refresh: function() {
        this.boxWidth        = this.$element.outerWidth();
        this.boxHeight       = this.$element.outerHeight() + this.bleed * 2;
        this.boxOffsetTop    = this.$element.offset().top - this.bleed;
        this.boxOffsetLeft   = this.$element.offset().left;
        this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;

        var winHeight = Parallax.winHeight;
        var docHeight = Parallax.docHeight;
        var maxOffset = Math.min(this.boxOffsetTop, docHeight - winHeight);
        var minOffset = Math.max(this.boxOffsetTop + this.boxHeight - winHeight, 0);
        var imageHeightMin = this.boxHeight + (maxOffset - minOffset) * (1 - this.speed) | 0;
        var imageOffsetMin = (this.boxOffsetTop - maxOffset) * (1 - this.speed) | 0;
        var margin;

        if (imageHeightMin * this.aspectRatio >= this.boxWidth) {
          this.imageWidth    = imageHeightMin * this.aspectRatio | 0;
          this.imageHeight   = imageHeightMin;
          this.offsetBaseTop = imageOffsetMin;

          margin = this.imageWidth - this.boxWidth;

          if (this.positionX == 'left') {
            this.offsetLeft = 0;
          } else if (this.positionX == 'right') {
            this.offsetLeft = - margin;
          } else if (!isNaN(this.positionX)) {
            this.offsetLeft = Math.max(this.positionX, - margin);
          } else {
            this.offsetLeft = - margin / 2 | 0;
          }
        } else {
          this.imageWidth    = this.boxWidth;
          this.imageHeight   = this.boxWidth / this.aspectRatio | 0;
          this.offsetLeft    = 0;

          margin = this.imageHeight - imageHeightMin;

          if (this.positionY == 'top') {
            this.offsetBaseTop = imageOffsetMin;
          } else if (this.positionY == 'bottom') {
            this.offsetBaseTop = imageOffsetMin - margin;
          } else if (!isNaN(this.positionY)) {
            this.offsetBaseTop = imageOffsetMin + Math.max(this.positionY, - margin);
          } else {
            this.offsetBaseTop = imageOffsetMin - margin / 2 | 0;
          }
        }
      },

      render: function() {
        var scrollTop    = Parallax.scrollTop;
        var scrollLeft   = Parallax.scrollLeft;
        var overScroll   = this.overScrollFix ? Parallax.overScroll : 0;
        var scrollBottom = scrollTop + Parallax.winHeight;

        if (this.boxOffsetBottom > scrollTop && this.boxOffsetTop <= scrollBottom) {
          this.visibility = 'visible';
          this.mirrorTop = this.boxOffsetTop  - scrollTop;
          this.mirrorLeft = this.boxOffsetLeft - scrollLeft;
          this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed);
        } else {
          this.visibility = 'hidden';
        }

        this.$mirror.css({
          transform: 'translate3d('+this.mirrorLeft+'px, '+(this.mirrorTop - overScroll)+'px, 0px)',
          visibility: this.visibility,
          height: this.boxHeight,
          width: this.boxWidth
        });

        this.$slider.css({
          transform: 'translate3d('+this.offsetLeft+'px, '+this.offsetTop+'px, 0px)',
          position: 'absolute',
          height: this.imageHeight,
          width: this.imageWidth,
          maxWidth: 'none'
        });
      }
    });


    // Parallax Static Methods

    $.extend(Parallax, {
      scrollTop:    0,
      scrollLeft:   0,
      winHeight:    0,
      winWidth:     0,
      docHeight:    1 << 30,
      docWidth:     1 << 30,
      sliders:      [],
      isReady:      false,
      isFresh:      false,
      isBusy:       false,

      setup: function() {
        if (this.isReady) return;

        var self = this;

        var $doc = $(document), $win = $(window);

        var loadDimensions = function() {
          Parallax.winHeight = $win.height();
          Parallax.winWidth  = $win.width();
          Parallax.docHeight = $doc.height();
          Parallax.docWidth  = $doc.width();
        };

        var loadScrollPosition = function() {
          var winScrollTop  = $win.scrollTop();
          var scrollTopMax  = Parallax.docHeight - Parallax.winHeight;
          var scrollLeftMax = Parallax.docWidth  - Parallax.winWidth;
          Parallax.scrollTop  = Math.max(0, Math.min(scrollTopMax,  winScrollTop));
          Parallax.scrollLeft = Math.max(0, Math.min(scrollLeftMax, $win.scrollLeft()));
          Parallax.overScroll = Math.max(winScrollTop - scrollTopMax, Math.min(winScrollTop, 0));
        };

        $win.on('resize.px.parallax load.px.parallax', function() {
            loadDimensions();
            self.refresh();
            Parallax.isFresh = false;
            Parallax.requestRender();
          })
          .on('scroll.px.parallax load.px.parallax', function() {
            loadScrollPosition();
            Parallax.requestRender();
          });

        loadDimensions();
        loadScrollPosition();

        this.isReady = true;

        var lastPosition = -1;

        function frameLoop() {
          if (lastPosition == window.pageYOffset) {   // Avoid overcalculations
            window.requestAnimationFrame(frameLoop);
            return false;
          } else lastPosition = window.pageYOffset;

          self.render();
          window.requestAnimationFrame(frameLoop);
        }

        frameLoop();
      },

      configure: function(options) {
        if (typeof options == 'object') {
          delete options.refresh;
          delete options.render;
          $.extend(this.prototype, options);
        }
      },

      refresh: function() {
        $.each(this.sliders, function(){ this.refresh(); });
        this.isFresh = true;
      },

      render: function() {
        this.isFresh || this.refresh();
        $.each(this.sliders, function(){ this.render(); });
      },

      requestRender: function() {
        var self = this;
        self.render();
        self.isBusy = false;
      },
      destroy: function(el){
        var i,
            parallaxElement = $(el).data('px.parallax');
        parallaxElement.$mirror.remove();
        for(i=0; i < this.sliders.length; i+=1){
          if(this.sliders[i] == parallaxElement){
            this.sliders.splice(i, 1);
          }
        }
        $(el).data('px.parallax', false);
        if(this.sliders.length === 0){
          $(window).off('scroll.px.parallax resize.px.parallax load.px.parallax');
          this.isReady = false;
          Parallax.isSetup = false;
        }
      }
    });


    // Parallax Plugin Definition

    function Plugin(option) {
      return this.each(function () {
        var $this = $(this);
        var options = typeof option == 'object' && option;

        if (this == window || this == document || $this.is('body')) {
          Parallax.configure(options);
        }
        else if (!$this.data('px.parallax')) {
          options = $.extend({}, $this.data(), options);
          $this.data('px.parallax', new Parallax(this, options));
        }
        else if (typeof option == 'object')
        {
          $.extend($this.data('px.parallax'), options);
        }
        if (typeof option == 'string') {
          if(option == 'destroy'){
              Parallax.destroy(this);
          }else{
            Parallax[option]();
          }
        }
      });
    }

    var old = $.fn.parallax;

    $.fn.parallax             = Plugin;
    $.fn.parallax.Constructor = Parallax;


    // Parallax No Conflict

    $.fn.parallax.noConflict = function () {
      $.fn.parallax = old;
      return this;
    };


    // Parallax Data-API

    $( function () {
      $('[data-parallax="scroll"]').parallax();
    });

  }(jQuery, window, document));
})();
(function vendorInfiniteScroll() {
  /*!
   * Infinite Scroll PACKAGED v3.0.5
   * Automatically add next page
   *
   * Licensed GPLv3 for open source use
   * or Infinite Scroll Commercial License for commercial use
   *
   * https://infinite-scroll.com
   * Copyright 2018 Metafizzy
   */

  !function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,r,l){function a(t,e,n){var o,r="$()."+i+'("'+e+'")';return t.each(function(t,a){var h=l.data(a,i);if(!h)return void s(i+" not initialized. Cannot call methods, i.e. "+r);var c=h[e];if(!c||"_"==e.charAt(0))return void s(r+" is not a valid method");var u=c.apply(h,n);o=void 0===o?u:o}),void 0!==o?o:t}function h(t,e){t.each(function(t,n){var o=l.data(n,i);o?(o.option(e),o._init()):(o=new r(n,e),l.data(n,i,o))})}l=l||e||t.jQuery,l&&(r.prototype.option||(r.prototype.option=function(t){l.isPlainObject(t)&&(this.options=l.extend(!0,this.options,t))}),l.fn[i]=function(t){if("string"==typeof t){var e=o.call(arguments,1);return a(this,t,e)}return h(this,t),this},n(l))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,r=t.console,s="undefined"==typeof r?function(){}:function(t){r.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return n.indexOf(e)==-1&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return n!=-1&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){i=i.slice(0),e=e||[];for(var n=this._onceEvents&&this._onceEvents[t],o=0;o<i.length;o++){var r=i[o],s=n&&n[r];s&&(this.off(t,r),delete n[r]),r.apply(this,e)}return this}},e.allOff=function(){delete this._events,delete this._onceEvents},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],o=n+"MatchesSelector";if(t[o])return o}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e};var n=Array.prototype.slice;i.makeArray=function(t){if(Array.isArray(t))return t;if(null===t||void 0===t)return[];var e="object"==typeof t&&"number"==typeof t.length;return e?n.call(t):[t]},i.removeFrom=function(t,e){var i=t.indexOf(e);i!=-1&&t.splice(i,1)},i.getParent=function(t,i){for(;t.parentNode&&t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),r=0;r<i.length;r++)o.push(i[r])}}),o},i.debounceMethod=function(t,e,i){i=i||100;var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];clearTimeout(t);var e=arguments,r=this;this[o]=setTimeout(function(){n.apply(r,e),delete r[o]},i)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var o=t.console;return i.htmlInit=function(e,n){i.docReady(function(){var r=i.toDashed(n),s="data-"+r,l=document.querySelectorAll("["+s+"]"),a=document.querySelectorAll(".js-"+r),h=i.makeArray(l).concat(i.makeArray(a)),c=s+"-options",u=t.jQuery;h.forEach(function(t){var i,r=t.getAttribute(s)||t.getAttribute(c);try{i=r&&JSON.parse(r)}catch(l){return void(o&&o.error("Error parsing "+s+" on "+t.className+": "+l))}var a=new e(t,i);u&&u.data(t,n,a)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("infinite-scroll/js/core",["ev-emitter/ev-emitter","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("fizzy-ui-utils")):t.InfiniteScroll=e(t,t.EvEmitter,t.fizzyUIUtils)}(window,function(t,e,i){function n(t,e){var s=i.getQueryElement(t);if(!s)return void console.error("Bad element for InfiniteScroll: "+(s||t));if(t=s,t.infiniteScrollGUID){var l=r[t.infiniteScrollGUID];return l.option(e),l}this.element=t,this.options=i.extend({},n.defaults),this.option(e),o&&(this.$element=o(this.element)),this.create()}var o=t.jQuery,r={};n.defaults={},n.create={},n.destroy={};var s=n.prototype;i.extend(s,e.prototype);var l=0;s.create=function(){var t=this.guid=++l;this.element.infiniteScrollGUID=t,r[t]=this,this.pageIndex=1,this.loadCount=0,this.updateGetPath();var e=this.getPath&&this.getPath();if(!e)return void console.error("Disabling InfiniteScroll");this.updateGetAbsolutePath(),this.log("initialized",[this.element.className]),this.callOnInit();for(var i in n.create)n.create[i].call(this)},s.option=function(t){i.extend(this.options,t)},s.callOnInit=function(){var t=this.options.onInit;t&&t.call(this,this)},s.dispatchEvent=function(t,e,i){this.log(t,i);var n=e?[e].concat(i):i;if(this.emitEvent(t,n),o&&this.$element){t+=".infiniteScroll";var r=t;if(e){var s=o.Event(e);s.type=t,r=s}this.$element.trigger(r,i)}};var a={initialized:function(t){return"on "+t},request:function(t){return"URL: "+t},load:function(t,e){return(t.title||"")+". URL: "+e},error:function(t,e){return t+". URL: "+e},append:function(t,e,i){return i.length+" items. URL: "+e},last:function(t,e){return"URL: "+e},history:function(t,e){return"URL: "+e},pageIndex:function(t,e){return"current page determined to be: "+t+" from "+e}};s.log=function(t,e){if(this.options.debug){var i="[InfiniteScroll] "+t,n=a[t];n&&(i+=". "+n.apply(this,e)),console.log(i)}},s.updateMeasurements=function(){this.windowHeight=t.innerHeight;var e=this.element.getBoundingClientRect();this.top=e.top+t.pageYOffset},s.updateScroller=function(){var e=this.options.elementScroll;if(!e)return void(this.scroller=t);if(this.scroller=e===!0?this.element:i.getQueryElement(e),!this.scroller)throw"Unable to find elementScroll: "+e},s.updateGetPath=function(){var t=this.options.path;if(!t)return void console.error("InfiniteScroll path option required. Set as: "+t);var e=typeof t;if("function"==e)return void(this.getPath=t);var i="string"==e&&t.match("");return i?void this.updateGetPathTemplate(t):void this.updateGetPathSelector(t)},s.updateGetPathTemplate=function(t){this.getPath=function(){var e=this.pageIndex+1;return t.replace("",e)}.bind(this);var e=t.replace("","(\\d\\d?\\d?)"),i=new RegExp(e),n=location.href.match(i);n&&(this.pageIndex=parseInt(n[1],10),this.log("pageIndex",[this.pageIndex,"template string"]))};var h=[/^(.*?\/?page\/?)(\d\d?\d?)(.*?$)/,/^(.*?\/?\?page=)(\d\d?\d?)(.*?$)/,/(.*?)(\d\d?\d?)(?!.*\d)(.*?$)/];return s.updateGetPathSelector=function(t){var e=document.querySelector(t);if(!e)return void console.error("Bad InfiniteScroll path option. Next link not found: "+t);for(var i,n,o=e.getAttribute("href"),r=0;o&&r<h.length;r++){n=h[r];var s=o.match(n);if(s){i=s.slice(1);break}}return i?(this.isPathSelector=!0,this.getPath=function(){var t=this.pageIndex+1;return i[0]+t+i[2]}.bind(this),this.pageIndex=parseInt(i[1],10)-1,void this.log("pageIndex",[this.pageIndex,"next link"])):void console.error("InfiniteScroll unable to parse next link href: "+o)},s.updateGetAbsolutePath=function(){var t=this.getPath(),e=t.match(/^http/)||t.match(/^\//);if(e)return void(this.getAbsolutePath=this.getPath);var i=location.pathname,n=i.substring(0,i.lastIndexOf("/"));this.getAbsolutePath=function(){return n+"/"+this.getPath()}},n.create.hideNav=function(){var t=i.getQueryElement(this.options.hideNav);t&&(t.style.display="none",this.nav=t)},n.destroy.hideNav=function(){this.nav&&(this.nav.style.display="")},s.destroy=function(){this.allOff();for(var t in n.destroy)n.destroy[t].call(this);delete this.element.infiniteScrollGUID,delete r[this.guid],o&&this.$element&&o.removeData(this.element,"infiniteScroll")},n.throttle=function(t,e){e=e||200;var i,n;return function(){var o=+new Date,r=arguments,s=function(){i=o,t.apply(this,r)}.bind(this);i&&o<i+e?(clearTimeout(n),n=setTimeout(s,e)):s()}},n.data=function(t){t=i.getQueryElement(t);var e=t&&t.infiniteScrollGUID;return e&&r[e]},n.setJQuery=function(t){o=t},i.htmlInit(n,"infinite-scroll"),s._init=function(){},o&&o.bridget&&o.bridget("infiniteScroll",n),n}),function(t,e){"function"==typeof define&&define.amd?define("infinite-scroll/js/page-load",["./core"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./core")):e(t,t.InfiniteScroll)}(window,function(t,e){function i(t){for(var e=document.createDocumentFragment(),i=0;t&&i<t.length;i++)e.appendChild(t[i]);return e}function n(t){for(var e=t.querySelectorAll("script"),i=0;i<e.length;i++){var n=e[i],r=document.createElement("script");o(n,r),r.innerHTML=n.innerHTML,n.parentNode.replaceChild(r,n)}}function o(t,e){for(var i=t.attributes,n=0;n<i.length;n++){var o=i[n];e.setAttribute(o.name,o.value)}}function r(t,e,i,n){var o=new XMLHttpRequest;o.open("GET",t,!0),o.responseType=e||"",o.setRequestHeader("X-Requested-With","XMLHttpRequest"),o.onload=function(){if(200==o.status)i(o.response);else{var t=new Error(o.statusText);n(t)}},o.onerror=function(){var e=new Error("Network error requesting "+t);n(e)},o.send()}var s=e.prototype;return e.defaults.loadOnScroll=!0,e.defaults.checkLastPage=!0,e.defaults.responseType="document",e.create.pageLoad=function(){this.canLoad=!0,this.on("scrollThreshold",this.onScrollThresholdLoad),this.on("load",this.checkLastPage),this.options.outlayer&&this.on("append",this.onAppendOutlayer)},s.onScrollThresholdLoad=function(){this.options.loadOnScroll&&this.loadNextPage()},s.loadNextPage=function(){if(!this.isLoading&&this.canLoad){var t=this.getAbsolutePath();this.isLoading=!0;var e=function(e){this.onPageLoad(e,t)}.bind(this),i=function(e){this.onPageError(e,t)}.bind(this);r(t,this.options.responseType,e,i),this.dispatchEvent("request",null,[t])}},s.onPageLoad=function(t,e){return this.options.append||(this.isLoading=!1),this.pageIndex++,this.loadCount++,this.dispatchEvent("load",null,[t,e]),this.appendNextPage(t,e),t},s.appendNextPage=function(t,e){var n=this.options.append,o="document"==this.options.responseType;if(o&&n){var r=t.querySelectorAll(n),s=i(r),l=function(){this.appendItems(r,s),this.isLoading=!1,this.dispatchEvent("append",null,[t,e,r])}.bind(this);this.options.outlayer?this.appendOutlayerItems(s,l):l()}},s.appendItems=function(t,e){t&&t.length&&(e=e||i(t),n(e),this.element.appendChild(e))},s.appendOutlayerItems=function(i,n){var o=e.imagesLoaded||t.imagesLoaded;return o?void o(i,n):(console.error("[InfiniteScroll] imagesLoaded required for outlayer option"),void(this.isLoading=!1))},s.onAppendOutlayer=function(t,e,i){this.options.outlayer.appended(i)},s.checkLastPage=function(t,e){var i=this.options.checkLastPage;if(i){var n=this.options.path;if("function"==typeof n){var o=this.getPath();if(!o)return void this.lastPageReached(t,e)}var r;if("string"==typeof i?r=i:this.isPathSelector&&(r=n),r&&t.querySelector){var s=t.querySelector(r);s||this.lastPageReached(t,e)}}},s.lastPageReached=function(t,e){this.canLoad=!1,this.dispatchEvent("last",null,[t,e])},s.onPageError=function(t,e){return this.isLoading=!1,this.canLoad=!1,this.dispatchEvent("error",null,[t,e]),t},e.create.prefill=function(){if(this.options.prefill){var t=this.options.append;if(!t)return void console.error("append option required for prefill. Set as :"+t);this.updateMeasurements(),this.updateScroller(),this.isPrefilling=!0,this.on("append",this.prefill),this.once("error",this.stopPrefill),this.once("last",this.stopPrefill),this.prefill()}},s.prefill=function(){var t=this.getPrefillDistance();this.isPrefilling=t>=0,this.isPrefilling?(this.log("prefill"),this.loadNextPage()):this.stopPrefill()},s.getPrefillDistance=function(){return this.options.elementScroll?this.scroller.clientHeight-this.scroller.scrollHeight:this.windowHeight-this.element.clientHeight},s.stopPrefill=function(){this.log("stopPrefill"),this.off("append",this.prefill)},e}),function(t,e){"function"==typeof define&&define.amd?define("infinite-scroll/js/scroll-watch",["./core","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./core"),require("fizzy-ui-utils")):e(t,t.InfiniteScroll,t.fizzyUIUtils)}(window,function(t,e,i){var n=e.prototype;return e.defaults.scrollThreshold=400,e.create.scrollWatch=function(){this.pageScrollHandler=this.onPageScroll.bind(this),this.resizeHandler=this.onResize.bind(this);var t=this.options.scrollThreshold,e=t||0===t;e&&this.enableScrollWatch()},e.destroy.scrollWatch=function(){this.disableScrollWatch()},n.enableScrollWatch=function(){this.isScrollWatching||(this.isScrollWatching=!0,this.updateMeasurements(),this.updateScroller(),this.on("last",this.disableScrollWatch),this.bindScrollWatchEvents(!0))},n.disableScrollWatch=function(){this.isScrollWatching&&(this.bindScrollWatchEvents(!1),delete this.isScrollWatching)},n.bindScrollWatchEvents=function(e){var i=e?"addEventListener":"removeEventListener";this.scroller[i]("scroll",this.pageScrollHandler),t[i]("resize",this.resizeHandler)},n.onPageScroll=e.throttle(function(){var t=this.getBottomDistance();t<=this.options.scrollThreshold&&this.dispatchEvent("scrollThreshold")}),n.getBottomDistance=function(){return this.options.elementScroll?this.getElementBottomDistance():this.getWindowBottomDistance()},n.getWindowBottomDistance=function(){var e=this.top+this.element.clientHeight,i=t.pageYOffset+this.windowHeight;return e-i},n.getElementBottomDistance=function(){var t=this.scroller.scrollHeight,e=this.scroller.scrollTop+this.scroller.clientHeight;return t-e},n.onResize=function(){this.updateMeasurements()},i.debounceMethod(e,"onResize",150),e}),function(t,e){"function"==typeof define&&define.amd?define("infinite-scroll/js/history",["./core","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./core"),require("fizzy-ui-utils")):e(t,t.InfiniteScroll,t.fizzyUIUtils)}(window,function(t,e,i){var n=e.prototype;e.defaults.history="replace";var o=document.createElement("a");return e.create.history=function(){if(this.options.history){o.href=this.getAbsolutePath();var t=o.origin||o.protocol+"//"+o.host,e=t==location.origin;return e?void(this.options.append?this.createHistoryAppend():this.createHistoryPageLoad()):void console.error("[InfiniteScroll] cannot set history with different origin: "+o.origin+" on "+location.origin+" . History behavior disabled.")}},n.createHistoryAppend=function(){this.updateMeasurements(),this.updateScroller(),this.scrollPages=[{top:0,path:location.href,title:document.title}],this.scrollPageIndex=0,this.scrollHistoryHandler=this.onScrollHistory.bind(this),this.unloadHandler=this.onUnload.bind(this),this.scroller.addEventListener("scroll",this.scrollHistoryHandler),this.on("append",this.onAppendHistory),this.bindHistoryAppendEvents(!0)},n.bindHistoryAppendEvents=function(e){var i=e?"addEventListener":"removeEventListener";this.scroller[i]("scroll",this.scrollHistoryHandler),t[i]("unload",this.unloadHandler)},n.createHistoryPageLoad=function(){this.on("load",this.onPageLoadHistory)},e.destroy.history=n.destroyHistory=function(){var t=this.options.history&&this.options.append;t&&this.bindHistoryAppendEvents(!1)},n.onAppendHistory=function(t,e,i){if(i&&i.length){var n=i[0],r=this.getElementScrollY(n);o.href=e,this.scrollPages.push({top:r,path:o.href,title:t.title})}},n.getElementScrollY=function(t){return this.options.elementScroll?this.getElementElementScrollY(t):this.getElementWindowScrollY(t)},n.getElementWindowScrollY=function(e){var i=e.getBoundingClientRect();return i.top+t.pageYOffset},n.getElementElementScrollY=function(t){return t.offsetTop-this.top},n.onScrollHistory=function(){for(var t,e,i=this.getScrollViewY(),n=0;n<this.scrollPages.length;n++){var o=this.scrollPages[n];if(o.top>=i)break;t=n,e=o}t!=this.scrollPageIndex&&(this.scrollPageIndex=t,this.setHistory(e.title,e.path))},i.debounceMethod(e,"onScrollHistory",150),n.getScrollViewY=function(){return this.options.elementScroll?this.scroller.scrollTop+this.scroller.clientHeight/2:t.pageYOffset+this.windowHeight/2},n.setHistory=function(t,e){var i=this.options.history,n=i&&history[i+"State"];n&&(history[i+"State"](null,t,e),this.options.historyTitle&&(document.title=t),this.dispatchEvent("history",null,[t,e]))},n.onUnload=function(){var e=this.scrollPageIndex;if(0!==e){var i=this.scrollPages[e],n=t.pageYOffset-i.top+this.top;this.destroyHistory(),scrollTo(0,n)}},n.onPageLoadHistory=function(t,e){this.setHistory(t.title,e)},e}),function(t,e){"function"==typeof define&&define.amd?define("infinite-scroll/js/button",["./core","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./core"),require("fizzy-ui-utils")):e(t,t.InfiniteScroll,t.fizzyUIUtils)}(window,function(t,e,i){function n(t,e){this.element=t,this.infScroll=e,this.clickHandler=this.onClick.bind(this),this.element.addEventListener("click",this.clickHandler),e.on("request",this.disable.bind(this)),e.on("load",this.enable.bind(this)),e.on("error",this.hide.bind(this)),e.on("last",this.hide.bind(this))}return e.create.button=function(){var t=i.getQueryElement(this.options.button);if(t)return void(this.button=new n(t,this))},e.destroy.button=function(){this.button&&this.button.destroy()},n.prototype.onClick=function(t){t.preventDefault(),this.infScroll.loadNextPage()},n.prototype.enable=function(){this.element.removeAttribute("disabled")},n.prototype.disable=function(){this.element.disabled="disabled"},n.prototype.hide=function(){this.element.style.display="none"},n.prototype.destroy=function(){this.element.removeEventListener("click",this.clickHandler)},e.Button=n,e}),function(t,e){"function"==typeof define&&define.amd?define("infinite-scroll/js/status",["./core","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./core"),require("fizzy-ui-utils")):e(t,t.InfiniteScroll,t.fizzyUIUtils)}(window,function(t,e,i){function n(t){r(t,"none")}function o(t){r(t,"block")}function r(t,e){t&&(t.style.display=e)}var s=e.prototype;return e.create.status=function(){var t=i.getQueryElement(this.options.status);t&&(this.statusElement=t,this.statusEventElements={request:t.querySelector(".infinite-scroll-request"),error:t.querySelector(".infinite-scroll-error"),last:t.querySelector(".infinite-scroll-last")},this.on("request",this.showRequestStatus),this.on("error",this.showErrorStatus),this.on("last",this.showLastStatus),this.bindHideStatus("on"))},s.bindHideStatus=function(t){var e=this.options.append?"append":"load";this[t](e,this.hideAllStatus)},s.showRequestStatus=function(){this.showStatus("request")},s.showErrorStatus=function(){this.showStatus("error")},s.showLastStatus=function(){this.showStatus("last"),this.bindHideStatus("off")},s.showStatus=function(t){o(this.statusElement),this.hideStatusEventElements();var e=this.statusEventElements[t];o(e)},s.hideAllStatus=function(){n(this.statusElement),this.hideStatusEventElements()},s.hideStatusEventElements=function(){for(var t in this.statusEventElements){var e=this.statusEventElements[t];n(e)}},e}),function(t,e){"function"==typeof define&&define.amd?define(["infinite-scroll/js/core","infinite-scroll/js/page-load","infinite-scroll/js/scroll-watch","infinite-scroll/js/history","infinite-scroll/js/button","infinite-scroll/js/status"],e):"object"==typeof module&&module.exports&&(module.exports=e(require("./core"),require("./page-load"),require("./scroll-watch"),require("./history"),require("./button"),require("./status")))}(window,function(t){return t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("imagesloaded/imagesloaded",["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}("undefined"!=typeof window?window:this,function(t,e){function i(t,e){for(var i in e)t[i]=e[i];return t}function n(t){if(Array.isArray(t))return t;var e="object"==typeof t&&"number"==typeof t.length;return e?h.call(t):[t]}function o(t,e,r){if(!(this instanceof o))return new o(t,e,r);var s=t;return"string"==typeof t&&(s=document.querySelectorAll(t)),s?(this.elements=n(s),this.options=i({},this.options),"function"==typeof e?r=e:i(this.options,e),r&&this.on("always",r),this.getImages(),l&&(this.jqDeferred=new l.Deferred),void setTimeout(this.check.bind(this))):void a.error("Bad element for imagesLoaded "+(s||t))}function r(t){this.img=t}function s(t,e){this.url=t,this.element=e,this.img=new Image}var l=t.jQuery,a=t.console,h=Array.prototype.slice;o.prototype=Object.create(e.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),this.options.background===!0&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&c[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=t.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var c={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,t),n=i.exec(e.backgroundImage)}},o.prototype.addImage=function(t){var e=new r(t);this.images.push(e)},o.prototype.addBackground=function(t,e){var i=new s(t,e);this.images.push(i)},o.prototype.check=function(){function t(t,i,n){setTimeout(function(){e.progress(t,i,n)})}var e=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(e){e.once("progress",t),e.check()}):void this.complete()},o.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,t,e)},o.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},r.prototype=Object.create(e.prototype),r.prototype.check=function(){var t=this.getIsImageComplete();return t?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},r.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},r.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var t=this.getIsImageComplete();t&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},o.makeJQueryPlugin=function(e){e=e||t.jQuery,e&&(l=e,l.fn.imagesLoaded=function(t,e){var i=new o(this,t,e);return i.jqDeferred.promise(l(this))})},o.makeJQueryPlugin(),o});
})();
(function vendorFlexSlider() {
  /*
   * jQuery FlexSlider v2.6.3
   * Copyright 2012 WooThemes
   * Contributing Author: Tyler Smith
   */!function($){var e=!0;$.flexslider=function(t,a){var n=$(t);n.vars=$.extend({},$.flexslider.defaults,a);var i=n.vars.namespace,s=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,r=("ontouchstart"in window||s||window.DocumentTouch&&document instanceof DocumentTouch)&&n.vars.touch,o="click touchend MSPointerUp keyup",l="",c,d="vertical"===n.vars.direction,u=n.vars.reverse,v=n.vars.itemWidth>0,p="fade"===n.vars.animation,m=""!==n.vars.asNavFor,f={};$.data(t,"flexslider",n),f={init:function(){n.animating=!1,n.currentSlide=parseInt(n.vars.startAt?n.vars.startAt:0,10),isNaN(n.currentSlide)&&(n.currentSlide=0),n.animatingTo=n.currentSlide,n.atEnd=0===n.currentSlide||n.currentSlide===n.last,n.containerSelector=n.vars.selector.substr(0,n.vars.selector.search(" ")),n.slides=$(n.vars.selector,n),n.container=$(n.containerSelector,n),n.count=n.slides.length,n.syncExists=$(n.vars.sync).length>0,"slide"===n.vars.animation&&(n.vars.animation="swing"),n.prop=d?"top":"marginLeft",n.args={},n.manualPause=!1,n.stopped=!1,n.started=!1,n.startTimeout=null,n.transitions=!n.vars.video&&!p&&n.vars.useCSS&&function(){var e=document.createElement("div"),t=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var a in t)if(void 0!==e.style[t[a]])return n.pfx=t[a].replace("Perspective","").toLowerCase(),n.prop="-"+n.pfx+"-transform",!0;return!1}(),n.ensureAnimationEnd="",""!==n.vars.controlsContainer&&(n.controlsContainer=$(n.vars.controlsContainer).length>0&&$(n.vars.controlsContainer)),""!==n.vars.manualControls&&(n.manualControls=$(n.vars.manualControls).length>0&&$(n.vars.manualControls)),""!==n.vars.customDirectionNav&&(n.customDirectionNav=2===$(n.vars.customDirectionNav).length&&$(n.vars.customDirectionNav)),n.vars.randomize&&(n.slides.sort(function(){return Math.round(Math.random())-.5}),n.container.empty().append(n.slides)),n.doMath(),n.setup("init"),n.vars.controlNav&&f.controlNav.setup(),n.vars.directionNav&&f.directionNav.setup(),n.vars.keyboard&&(1===$(n.containerSelector).length||n.vars.multipleKeyboard)&&$(document).bind("keyup",function(e){var t=e.keyCode;if(!n.animating&&(39===t||37===t)){var a=39===t?n.getTarget("next"):37===t?n.getTarget("prev"):!1;n.flexAnimate(a,n.vars.pauseOnAction)}}),n.vars.mousewheel&&n.bind("mousewheel",function(e,t,a,i){e.preventDefault();var s=0>t?n.getTarget("next"):n.getTarget("prev");n.flexAnimate(s,n.vars.pauseOnAction)}),n.vars.pausePlay&&f.pausePlay.setup(),n.vars.slideshow&&n.vars.pauseInvisible&&f.pauseInvisible.init(),n.vars.slideshow&&(n.vars.pauseOnHover&&n.hover(function(){n.manualPlay||n.manualPause||n.pause()},function(){n.manualPause||n.manualPlay||n.stopped||n.play()}),n.vars.pauseInvisible&&f.pauseInvisible.isHidden()||(n.vars.initDelay>0?n.startTimeout=setTimeout(n.play,n.vars.initDelay):n.play())),m&&f.asNav.setup(),r&&n.vars.touch&&f.touch(),(!p||p&&n.vars.smoothHeight)&&$(window).bind("resize orientationchange focus",f.resize),n.find("img").attr("draggable","false"),setTimeout(function(){n.vars.start(n)},200)},asNav:{setup:function(){n.asNav=!0,n.animatingTo=Math.floor(n.currentSlide/n.move),n.currentItem=n.currentSlide,n.slides.removeClass(i+"active-slide").eq(n.currentItem).addClass(i+"active-slide"),s?(t._slider=n,n.slides.each(function(){var e=this;e._gesture=new MSGesture,e._gesture.target=e,e.addEventListener("MSPointerDown",function(e){e.preventDefault(),e.currentTarget._gesture&&e.currentTarget._gesture.addPointer(e.pointerId)},!1),e.addEventListener("MSGestureTap",function(e){e.preventDefault();var t=$(this),a=t.index();$(n.vars.asNavFor).data("flexslider").animating||t.hasClass("active")||(n.direction=n.currentItem<a?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction,!1,!0,!0))})})):n.slides.on(o,function(e){e.preventDefault();var t=$(this),a=t.index(),s=t.offset().left-$(n).scrollLeft();0>=s&&t.hasClass(i+"active-slide")?n.flexAnimate(n.getTarget("prev"),!0):$(n.vars.asNavFor).data("flexslider").animating||t.hasClass(i+"active-slide")||(n.direction=n.currentItem<a?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){n.manualControls?f.controlNav.setupManual():f.controlNav.setupPaging()},setupPaging:function(){var e="thumbnails"===n.vars.controlNav?"control-thumbs":"control-paging",t=1,a,s;if(n.controlNavScaffold=$('<ol class="'+i+"control-nav "+i+e+'"></ol>'),n.pagingCount>1)for(var r=0;r<n.pagingCount;r++){s=n.slides.eq(r),void 0===s.attr("data-thumb-alt")&&s.attr("data-thumb-alt","");var c=""!==s.attr("data-thumb-alt")?c=' alt="'+s.attr("data-thumb-alt")+'"':"";if(a="thumbnails"===n.vars.controlNav?'<img src="'+s.attr("data-thumb")+'"'+c+"/>":'<a href="#">'+t+"</a>","thumbnails"===n.vars.controlNav&&!0===n.vars.thumbCaptions){var d=s.attr("data-thumbcaption");""!==d&&void 0!==d&&(a+='<span class="'+i+'caption">'+d+"</span>")}n.controlNavScaffold.append("<li>"+a+"</li>"),t++}n.controlsContainer?$(n.controlsContainer).append(n.controlNavScaffold):n.append(n.controlNavScaffold),f.controlNav.set(),f.controlNav.active(),n.controlNavScaffold.delegate("a, img",o,function(e){if(e.preventDefault(),""===l||l===e.type){var t=$(this),a=n.controlNav.index(t);t.hasClass(i+"active")||(n.direction=a>n.currentSlide?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction))}""===l&&(l=e.type),f.setToClearWatchedEvent()})},setupManual:function(){n.controlNav=n.manualControls,f.controlNav.active(),n.controlNav.bind(o,function(e){if(e.preventDefault(),""===l||l===e.type){var t=$(this),a=n.controlNav.index(t);t.hasClass(i+"active")||(a>n.currentSlide?n.direction="next":n.direction="prev",n.flexAnimate(a,n.vars.pauseOnAction))}""===l&&(l=e.type),f.setToClearWatchedEvent()})},set:function(){var e="thumbnails"===n.vars.controlNav?"img":"a";n.controlNav=$("."+i+"control-nav li "+e,n.controlsContainer?n.controlsContainer:n)},active:function(){n.controlNav.removeClass(i+"active").eq(n.animatingTo).addClass(i+"active")},update:function(e,t){n.pagingCount>1&&"add"===e?n.controlNavScaffold.append($('<li><a href="#">'+n.count+"</a></li>")):1===n.pagingCount?n.controlNavScaffold.find("li").remove():n.controlNav.eq(t).closest("li").remove(),f.controlNav.set(),n.pagingCount>1&&n.pagingCount!==n.controlNav.length?n.update(t,e):f.controlNav.active()}},directionNav:{setup:function(){var e=$('<ul class="'+i+'direction-nav"><li class="'+i+'nav-prev"><a class="'+i+'prev" href="#">'+n.vars.prevText+'</a></li><li class="'+i+'nav-next"><a class="'+i+'next" href="#">'+n.vars.nextText+"</a></li></ul>");n.customDirectionNav?n.directionNav=n.customDirectionNav:n.controlsContainer?($(n.controlsContainer).append(e),n.directionNav=$("."+i+"direction-nav li a",n.controlsContainer)):(n.append(e),n.directionNav=$("."+i+"direction-nav li a",n)),f.directionNav.update(),n.directionNav.bind(o,function(e){e.preventDefault();var t;""!==l&&l!==e.type||(t=$(this).hasClass(i+"next")?n.getTarget("next"):n.getTarget("prev"),n.flexAnimate(t,n.vars.pauseOnAction)),""===l&&(l=e.type),f.setToClearWatchedEvent()})},update:function(){var e=i+"disabled";1===n.pagingCount?n.directionNav.addClass(e).attr("tabindex","-1"):n.vars.animationLoop?n.directionNav.removeClass(e).removeAttr("tabindex"):0===n.animatingTo?n.directionNav.removeClass(e).filter("."+i+"prev").addClass(e).attr("tabindex","-1"):n.animatingTo===n.last?n.directionNav.removeClass(e).filter("."+i+"next").addClass(e).attr("tabindex","-1"):n.directionNav.removeClass(e).removeAttr("tabindex")}},pausePlay:{setup:function(){var e=$('<div class="'+i+'pauseplay"><a href="#"></a></div>');n.controlsContainer?(n.controlsContainer.append(e),n.pausePlay=$("."+i+"pauseplay a",n.controlsContainer)):(n.append(e),n.pausePlay=$("."+i+"pauseplay a",n)),f.pausePlay.update(n.vars.slideshow?i+"pause":i+"play"),n.pausePlay.bind(o,function(e){e.preventDefault(),""!==l&&l!==e.type||($(this).hasClass(i+"pause")?(n.manualPause=!0,n.manualPlay=!1,n.pause()):(n.manualPause=!1,n.manualPlay=!0,n.play())),""===l&&(l=e.type),f.setToClearWatchedEvent()})},update:function(e){"play"===e?n.pausePlay.removeClass(i+"pause").addClass(i+"play").html(n.vars.playText):n.pausePlay.removeClass(i+"play").addClass(i+"pause").html(n.vars.pauseText)}},touch:function(){function e(e){e.stopPropagation(),n.animating?e.preventDefault():(n.pause(),t._gesture.addPointer(e.pointerId),T=0,c=d?n.h:n.w,f=Number(new Date),l=v&&u&&n.animatingTo===n.last?0:v&&u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:v&&n.currentSlide===n.last?n.limit:v?(n.itemW+n.vars.itemMargin)*n.move*n.currentSlide:u?(n.last-n.currentSlide+n.cloneOffset)*c:(n.currentSlide+n.cloneOffset)*c)}function a(e){e.stopPropagation();var a=e.target._slider;if(a){var n=-e.translationX,i=-e.translationY;return T+=d?i:n,m=T,y=d?Math.abs(T)<Math.abs(-n):Math.abs(T)<Math.abs(-i),e.detail===e.MSGESTURE_FLAG_INERTIA?void setImmediate(function(){t._gesture.stop()}):void((!y||Number(new Date)-f>500)&&(e.preventDefault(),!p&&a.transitions&&(a.vars.animationLoop||(m=T/(0===a.currentSlide&&0>T||a.currentSlide===a.last&&T>0?Math.abs(T)/c+2:1)),a.setProps(l+m,"setTouch"))))}}function i(e){e.stopPropagation();var t=e.target._slider;if(t){if(t.animatingTo===t.currentSlide&&!y&&null!==m){var a=u?-m:m,n=a>0?t.getTarget("next"):t.getTarget("prev");t.canAdvance(n)&&(Number(new Date)-f<550&&Math.abs(a)>50||Math.abs(a)>c/2)?t.flexAnimate(n,t.vars.pauseOnAction):p||t.flexAnimate(t.currentSlide,t.vars.pauseOnAction,!0)}r=null,o=null,m=null,l=null,T=0}}var r,o,l,c,m,f,g,h,S,y=!1,x=0,b=0,T=0;s?(t.style.msTouchAction="none",t._gesture=new MSGesture,t._gesture.target=t,t.addEventListener("MSPointerDown",e,!1),t._slider=n,t.addEventListener("MSGestureChange",a,!1),t.addEventListener("MSGestureEnd",i,!1)):(g=function(e){n.animating?e.preventDefault():(window.navigator.msPointerEnabled||1===e.touches.length)&&(n.pause(),c=d?n.h:n.w,f=Number(new Date),x=e.touches[0].pageX,b=e.touches[0].pageY,l=v&&u&&n.animatingTo===n.last?0:v&&u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:v&&n.currentSlide===n.last?n.limit:v?(n.itemW+n.vars.itemMargin)*n.move*n.currentSlide:u?(n.last-n.currentSlide+n.cloneOffset)*c:(n.currentSlide+n.cloneOffset)*c,r=d?b:x,o=d?x:b,t.addEventListener("touchmove",h,!1),t.addEventListener("touchend",S,!1))},h=function(e){x=e.touches[0].pageX,b=e.touches[0].pageY,m=d?r-b:r-x,y=d?Math.abs(m)<Math.abs(x-o):Math.abs(m)<Math.abs(b-o);var t=500;(!y||Number(new Date)-f>t)&&(e.preventDefault(),!p&&n.transitions&&(n.vars.animationLoop||(m/=0===n.currentSlide&&0>m||n.currentSlide===n.last&&m>0?Math.abs(m)/c+2:1),n.setProps(l+m,"setTouch")))},S=function(e){if(t.removeEventListener("touchmove",h,!1),n.animatingTo===n.currentSlide&&!y&&null!==m){var a=u?-m:m,i=a>0?n.getTarget("next"):n.getTarget("prev");n.canAdvance(i)&&(Number(new Date)-f<550&&Math.abs(a)>50||Math.abs(a)>c/2)?n.flexAnimate(i,n.vars.pauseOnAction):p||n.flexAnimate(n.currentSlide,n.vars.pauseOnAction,!0)}t.removeEventListener("touchend",S,!1),r=null,o=null,m=null,l=null},t.addEventListener("touchstart",g,!1))},resize:function(){!n.animating&&n.is(":visible")&&(v||n.doMath(),p?f.smoothHeight():v?(n.slides.width(n.computedW),n.update(n.pagingCount),n.setProps()):d?(n.viewport.height(n.h),n.setProps(n.h,"setTotal")):(n.vars.smoothHeight&&f.smoothHeight(),n.newSlides.width(n.computedW),n.setProps(n.computedW,"setTotal")))},smoothHeight:function(e){if(!d||p){var t=p?n:n.viewport;e?t.animate({height:n.slides.eq(n.animatingTo).innerHeight()},e):t.innerHeight(n.slides.eq(n.animatingTo).innerHeight())}},sync:function(e){var t=$(n.vars.sync).data("flexslider"),a=n.animatingTo;switch(e){case"animate":t.flexAnimate(a,n.vars.pauseOnAction,!1,!0);break;case"play":t.playing||t.asNav||t.play();break;case"pause":t.pause()}},uniqueID:function(e){return e.filter("[id]").add(e.find("[id]")).each(function(){var e=$(this);e.attr("id",e.attr("id")+"_clone")}),e},pauseInvisible:{visProp:null,init:function(){var e=f.pauseInvisible.getHiddenProp();if(e){var t=e.replace(/[H|h]idden/,"")+"visibilitychange";document.addEventListener(t,function(){f.pauseInvisible.isHidden()?n.startTimeout?clearTimeout(n.startTimeout):n.pause():n.started?n.play():n.vars.initDelay>0?setTimeout(n.play,n.vars.initDelay):n.play()})}},isHidden:function(){var e=f.pauseInvisible.getHiddenProp();return e?document[e]:!1},getHiddenProp:function(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}},setToClearWatchedEvent:function(){clearTimeout(c),c=setTimeout(function(){l=""},3e3)}},n.flexAnimate=function(e,t,a,s,o){if(n.vars.animationLoop||e===n.currentSlide||(n.direction=e>n.currentSlide?"next":"prev"),m&&1===n.pagingCount&&(n.direction=n.currentItem<e?"next":"prev"),!n.animating&&(n.canAdvance(e,o)||a)&&n.is(":visible")){if(m&&s){var l=$(n.vars.asNavFor).data("flexslider");if(n.atEnd=0===e||e===n.count-1,l.flexAnimate(e,!0,!1,!0,o),n.direction=n.currentItem<e?"next":"prev",l.direction=n.direction,Math.ceil((e+1)/n.visible)-1===n.currentSlide||0===e)return n.currentItem=e,n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),!1;n.currentItem=e,n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),e=Math.floor(e/n.visible)}if(n.animating=!0,n.animatingTo=e,t&&n.pause(),n.vars.before(n),n.syncExists&&!o&&f.sync("animate"),n.vars.controlNav&&f.controlNav.active(),v||n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),n.atEnd=0===e||e===n.last,n.vars.directionNav&&f.directionNav.update(),e===n.last&&(n.vars.end(n),n.vars.animationLoop||n.pause()),p)r?(n.slides.eq(n.currentSlide).css({opacity:0,zIndex:1}),n.slides.eq(e).css({opacity:1,zIndex:2}),n.wrapup(c)):(n.slides.eq(n.currentSlide).css({zIndex:1}).animate({opacity:0},n.vars.animationSpeed,n.vars.easing),n.slides.eq(e).css({zIndex:2}).animate({opacity:1},n.vars.animationSpeed,n.vars.easing,n.wrapup));else{var c=d?n.slides.filter(":first").height():n.computedW,g,h,S;v?(g=n.vars.itemMargin,S=(n.itemW+g)*n.move*n.animatingTo,h=S>n.limit&&1!==n.visible?n.limit:S):h=0===n.currentSlide&&e===n.count-1&&n.vars.animationLoop&&"next"!==n.direction?u?(n.count+n.cloneOffset)*c:0:n.currentSlide===n.last&&0===e&&n.vars.animationLoop&&"prev"!==n.direction?u?0:(n.count+1)*c:u?(n.count-1-e+n.cloneOffset)*c:(e+n.cloneOffset)*c,n.setProps(h,"",n.vars.animationSpeed),n.transitions?(n.vars.animationLoop&&n.atEnd||(n.animating=!1,n.currentSlide=n.animatingTo),n.container.unbind("webkitTransitionEnd transitionend"),n.container.bind("webkitTransitionEnd transitionend",function(){clearTimeout(n.ensureAnimationEnd),n.wrapup(c)}),clearTimeout(n.ensureAnimationEnd),n.ensureAnimationEnd=setTimeout(function(){n.wrapup(c)},n.vars.animationSpeed+100)):n.container.animate(n.args,n.vars.animationSpeed,n.vars.easing,function(){n.wrapup(c)})}n.vars.smoothHeight&&f.smoothHeight(n.vars.animationSpeed)}},n.wrapup=function(e){p||v||(0===n.currentSlide&&n.animatingTo===n.last&&n.vars.animationLoop?n.setProps(e,"jumpEnd"):n.currentSlide===n.last&&0===n.animatingTo&&n.vars.animationLoop&&n.setProps(e,"jumpStart")),n.animating=!1,n.currentSlide=n.animatingTo,n.vars.after(n)},n.animateSlides=function(){!n.animating&&e&&n.flexAnimate(n.getTarget("next"))},n.pause=function(){clearInterval(n.animatedSlides),n.animatedSlides=null,n.playing=!1,n.vars.pausePlay&&f.pausePlay.update("play"),n.syncExists&&f.sync("pause")},n.play=function(){n.playing&&clearInterval(n.animatedSlides),n.animatedSlides=n.animatedSlides||setInterval(n.animateSlides,n.vars.slideshowSpeed),n.started=n.playing=!0,n.vars.pausePlay&&f.pausePlay.update("pause"),n.syncExists&&f.sync("play")},n.stop=function(){n.pause(),n.stopped=!0},n.canAdvance=function(e,t){var a=m?n.pagingCount-1:n.last;return t?!0:m&&n.currentItem===n.count-1&&0===e&&"prev"===n.direction?!0:m&&0===n.currentItem&&e===n.pagingCount-1&&"next"!==n.direction?!1:e!==n.currentSlide||m?n.vars.animationLoop?!0:n.atEnd&&0===n.currentSlide&&e===a&&"next"!==n.direction?!1:!n.atEnd||n.currentSlide!==a||0!==e||"next"!==n.direction:!1},n.getTarget=function(e){return n.direction=e,"next"===e?n.currentSlide===n.last?0:n.currentSlide+1:0===n.currentSlide?n.last:n.currentSlide-1},n.setProps=function(e,t,a){var i=function(){var a=e?e:(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo,i=function(){if(v)return"setTouch"===t?e:u&&n.animatingTo===n.last?0:u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:n.animatingTo===n.last?n.limit:a;switch(t){case"setTotal":return u?(n.count-1-n.currentSlide+n.cloneOffset)*e:(n.currentSlide+n.cloneOffset)*e;case"setTouch":return u?e:e;case"jumpEnd":return u?e:n.count*e;case"jumpStart":return u?n.count*e:e;default:return e}}();return-1*i+"px"}();n.transitions&&(i=d?"translate3d(0,"+i+",0)":"translate3d("+i+",0,0)",a=void 0!==a?a/1e3+"s":"0s",n.container.css("-"+n.pfx+"-transition-duration",a),n.container.css("transition-duration",a)),n.args[n.prop]=i,(n.transitions||void 0===a)&&n.container.css(n.args),n.container.css("transform",i)},n.setup=function(e){if(p)n.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"}),"init"===e&&(r?n.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+n.vars.animationSpeed/1e3+"s ease",zIndex:1}).eq(n.currentSlide).css({opacity:1,zIndex:2}):0==n.vars.fadeFirstSlide?n.slides.css({opacity:0,display:"block",zIndex:1}).eq(n.currentSlide).css({zIndex:2}).css({opacity:1}):n.slides.css({opacity:0,display:"block",zIndex:1}).eq(n.currentSlide).css({zIndex:2}).animate({opacity:1},n.vars.animationSpeed,n.vars.easing)),n.vars.smoothHeight&&f.smoothHeight();else{var t,a;"init"===e&&(n.viewport=$('<div class="'+i+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(n).append(n.container),n.cloneCount=0,n.cloneOffset=0,u&&(a=$.makeArray(n.slides).reverse(),n.slides=$(a),n.container.empty().append(n.slides))),n.vars.animationLoop&&!v&&(n.cloneCount=2,n.cloneOffset=1,"init"!==e&&n.container.find(".clone").remove(),n.container.append(f.uniqueID(n.slides.first().clone().addClass("clone")).attr("aria-hidden","true")).prepend(f.uniqueID(n.slides.last().clone().addClass("clone")).attr("aria-hidden","true"))),n.newSlides=$(n.vars.selector,n),t=u?n.count-1-n.currentSlide+n.cloneOffset:n.currentSlide+n.cloneOffset,d&&!v?(n.container.height(200*(n.count+n.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){n.newSlides.css({display:"block"}),n.doMath(),n.viewport.height(n.h),n.setProps(t*n.h,"init")},"init"===e?100:0)):(n.container.width(200*(n.count+n.cloneCount)+"%"),n.setProps(t*n.computedW,"init"),setTimeout(function(){n.doMath(),n.newSlides.css({width:n.computedW,marginRight:n.computedM,"float":"left",display:"block"}),n.vars.smoothHeight&&f.smoothHeight()},"init"===e?100:0))}v||n.slides.removeClass(i+"active-slide").eq(n.currentSlide).addClass(i+"active-slide"),n.vars.init(n)},n.doMath=function(){var e=n.slides.first(),t=n.vars.itemMargin,a=n.vars.minItems,i=n.vars.maxItems;n.w=void 0===n.viewport?n.width():n.viewport.width(),n.h=e.height(),n.boxPadding=e.outerWidth()-e.width(),v?(n.itemT=n.vars.itemWidth+t,n.itemM=t,n.minW=a?a*n.itemT:n.w,n.maxW=i?i*n.itemT-t:n.w,n.itemW=n.minW>n.w?(n.w-t*(a-1))/a:n.maxW<n.w?(n.w-t*(i-1))/i:n.vars.itemWidth>n.w?n.w:n.vars.itemWidth,n.visible=Math.floor(n.w/n.itemW),n.move=n.vars.move>0&&n.vars.move<n.visible?n.vars.move:n.visible,n.pagingCount=Math.ceil((n.count-n.visible)/n.move+1),n.last=n.pagingCount-1,n.limit=1===n.pagingCount?0:n.vars.itemWidth>n.w?n.itemW*(n.count-1)+t*(n.count-1):(n.itemW+t)*n.count-n.w-t):(n.itemW=n.w,n.itemM=t,n.pagingCount=n.count,n.last=n.count-1),n.computedW=n.itemW-n.boxPadding,n.computedM=n.itemM},n.update=function(e,t){n.doMath(),v||(e<n.currentSlide?n.currentSlide+=1:e<=n.currentSlide&&0!==e&&(n.currentSlide-=1),n.animatingTo=n.currentSlide),n.vars.controlNav&&!n.manualControls&&("add"===t&&!v||n.pagingCount>n.controlNav.length?f.controlNav.update("add"):("remove"===t&&!v||n.pagingCount<n.controlNav.length)&&(v&&n.currentSlide>n.last&&(n.currentSlide-=1,n.animatingTo-=1),f.controlNav.update("remove",n.last))),n.vars.directionNav&&f.directionNav.update()},n.addSlide=function(e,t){var a=$(e);n.count+=1,n.last=n.count-1,d&&u?void 0!==t?n.slides.eq(n.count-t).after(a):n.container.prepend(a):void 0!==t?n.slides.eq(t).before(a):n.container.append(a),n.update(t,"add"),n.slides=$(n.vars.selector+":not(.clone)",n),n.setup(),n.vars.added(n)},n.removeSlide=function(e){var t=isNaN(e)?n.slides.index($(e)):e;n.count-=1,n.last=n.count-1,isNaN(e)?$(e,n.slides).remove():d&&u?n.slides.eq(n.last).remove():n.slides.eq(e).remove(),n.doMath(),n.update(t,"remove"),n.slides=$(n.vars.selector+":not(.clone)",n),n.setup(),n.vars.removed(n)},f.init()},$(window).blur(function(t){e=!1}).focus(function(t){e=!0}),$.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7e3,animationSpeed:600,initDelay:0,randomize:!1,fadeFirstSlide:!0,thumbCaptions:!1,pauseOnAction:!0,pauseOnHover:!1,pauseInvisible:!0,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",customDirectionNav:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:!0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){},init:function(){}},$.fn.flexslider=function(e){if(void 0===e&&(e={}),"object"==typeof e)return this.each(function(){var t=$(this),a=e.selector?e.selector:".slides > li",n=t.find(a);1===n.length&&e.allowOneSlide===!1||0===n.length?(n.fadeIn(400),e.start&&e.start(t)):void 0===t.data("flexslider")&&new $.flexslider(this,e)});var t=$(this).data("flexslider");switch(e){case"play":t.play();break;case"pause":t.pause();break;case"stop":t.stop();break;case"next":t.flexAnimate(t.getTarget("next"),!0);break;case"prev":case"previous":t.flexAnimate(t.getTarget("prev"),!0);break;default:"number"==typeof e&&t.flexAnimate(e,!0)}}}(jQuery);

})();
(function vendorSlickSlider() {
  /*
       _ _      _       _
   ___| (_) ___| | __  (_)___
  / __| | |/ __| |/ /  | / __|
  \__ \ | | (__|   < _ | \__ \
  |___/_|_|\___|_|\_(_)/ |___/
                     |__/

   Version: 1.9.0
    Author: Ken Wheeler
   Website: http://kenwheeler.github.io
      Docs: http://kenwheeler.github.io/slick
      Repo: http://github.com/kenwheeler/slick
    Issues: http://github.com/kenwheeler/slick/issues

   */
  (function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)})(function(i){"use strict";var e=window.Slick||{};e=function(){function e(e,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(e),appendDots:i(e),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(e),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(e).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,"undefined"!=typeof document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=t++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}var t=0;return e}(),e.prototype.activateADA=function(){var i=this;i.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):o===!0?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&i.options.adaptiveHeight===!0&&i.options.vertical===!1){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),s.options.rtl===!0&&s.options.vertical===!1&&(e=-e),s.transformsEnabled===!1?s.options.vertical===!1?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):s.cssTransitions===!1?(s.options.rtl===!0&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),s.options.vertical===!1?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),s.options.vertical===!1?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this,o=t.getNavTarget();null!==o&&"object"==typeof o&&o.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};e.options.fade===!1?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,e.options.fade===!1?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(i.options.infinite===!1&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1===0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;e.options.arrows===!0&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),e.options.infinite!==!0&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(o.options.dots===!0&&o.slideCount>o.options.slidesToShow){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),e.options.centerMode!==!0&&e.options.swipeToSlide!==!0||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.options.draggable===!0&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>0){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(r.originalSettings.mobileFirst===!1?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),e===!0&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),e===!0&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,e===!0&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||l===!1||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!==0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t,o=this;if(e=o.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var s in e){if(i<e[s]){i=t;break}t=e[s]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),e.options.accessibility===!0&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),e.options.arrows===!0&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),e.options.accessibility===!0&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),e.options.accessibility===!0&&e.$list.off("keydown.slick",e.keyHandler),e.options.focusOnSelect===!0&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>0&&(i=e.$slides.children().children(),i.removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){var e=this;e.shouldClick===!1&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",e.options.fade===!1?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;t.cssTransitions===!1?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;e.cssTransitions===!1?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick","*",function(t){var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&o.is(":focus")&&(e.focussed=!0,e.autoPlay())},0)}).on("blur.slick","*",function(t){i(this);e.options.pauseOnFocus&&(e.focussed=!1,e.autoPlay())})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){var i=this;return i.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(i.options.infinite===!0)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(i.options.centerMode===!0)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),n.options.infinite===!0?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,n.options.vertical===!0&&n.options.centerMode===!0&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!==0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),n.options.centerMode===!0&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:n.options.centerMode===!0&&n.options.infinite===!0?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:n.options.centerMode===!0&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=n.options.vertical===!1?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,n.options.variableWidth===!0&&(o=n.slideCount<=n.options.slidesToShow||n.options.infinite===!1?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=n.options.rtl===!0?o[0]?(n.$slideTrack.width()-o[0].offsetLeft-o.width())*-1:0:o[0]?o[0].offsetLeft*-1:0,n.options.centerMode===!0&&(o=n.slideCount<=n.options.slidesToShow||n.options.infinite===!1?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=n.options.rtl===!0?o[0]?(n.$slideTrack.width()-o[0].offsetLeft-o.width())*-1:0:o[0]?o[0].offsetLeft*-1:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){var e=this;return e.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(e.options.infinite===!1?i=e.slideCount:(t=e.options.slidesToScroll*-1,o=e.options.slidesToScroll*-1,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o,s,n=this;return s=n.options.centerMode===!0?Math.floor(n.$list.width()/2):0,o=n.swipeLeft*-1+s,n.options.swipeToSlide===!0?(n.$slideTrack.find(".slick-slide").each(function(e,s){var r,l,d;if(r=i(s).outerWidth(),l=s.offsetLeft,n.options.centerMode!==!0&&(l+=r/2),d=l+r,o<d)return t=s,!1}),e=Math.abs(i(t).attr("data-slick-index")-n.currentSlide)||1):n.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){var t=this;t.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),t.options.accessibility===!0&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);if(i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),s!==-1){var n="slick-slide-control"+e.instanceUid+s;i("#"+n).length&&i(this).attr({"aria-describedby":n})}}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.options.focusOnChange?e.$slides.eq(s).attr({tabindex:"0"}):e.$slides.eq(s).removeAttr("tabindex");e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),i.options.accessibility===!0&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;e.options.dots===!0&&e.slideCount>e.options.slidesToShow&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),e.options.accessibility===!0&&e.$dots.on("keydown.slick",e.keyHandler)),e.options.dots===!0&&e.options.pauseOnDotsHover===!0&&e.slideCount>e.options.slidesToShow&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),e.options.accessibility===!0&&e.$list.on("keydown.slick",e.keyHandler),e.options.focusOnSelect===!0&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),i.options.dots===!0&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&e.options.accessibility===!0?e.changeSlide({data:{message:e.options.rtl===!0?"next":"previous"}}):39===i.keyCode&&e.options.accessibility===!0&&e.changeSlide({data:{message:e.options.rtl===!0?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||r.$slider.attr("data-sizes"),n=document.createElement("img");n.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),r.$slider.trigger("lazyLoaded",[r,e,t])})},n.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),r.$slider.trigger("lazyLoadError",[r,e,t])},n.src=t})}var t,o,s,n,r=this;if(r.options.centerMode===!0?r.options.infinite===!0?(s=r.currentSlide+(r.options.slidesToShow/2+1),n=s+r.options.slidesToShow+2):(s=Math.max(0,r.currentSlide-(r.options.slidesToShow/2+1)),n=2+(r.options.slidesToShow/2+1)+r.currentSlide):(s=r.options.infinite?r.options.slidesToShow+r.currentSlide:r.currentSlide,n=Math.ceil(s+r.options.slidesToShow),r.options.fade===!0&&(s>0&&s--,n<=r.slideCount&&n++)),t=r.$slider.find(".slick-slide").slice(s,n),"anticipated"===r.options.lazyLoad)for(var l=s-1,d=n,a=r.$slider.find(".slick-slide"),c=0;c<r.options.slidesToScroll;c++)l<0&&(l=r.slideCount-1),t=t.add(a.eq(l)),t=t.add(a.eq(d)),l--,d++;e(t),r.slideCount<=r.options.slidesToShow?(o=r.$slider.find(".slick-slide"),e(o)):r.currentSlide>=r.slideCount-r.options.slidesToShow?(o=r.$slider.find(".slick-cloned").slice(0,r.options.slidesToShow),e(o)):0===r.currentSlide&&(o=r.$slider.find(".slick-cloned").slice(r.options.slidesToShow*-1),e(o))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){var i=this;i.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;if(!t.unslicked&&(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),t.options.accessibility===!0&&(t.initADA(),t.options.focusOnChange))){var o=i(t.$slides.get(t.currentSlide));o.attr("tabindex",0).focus()}},e.prototype.prev=e.prototype.slickPrev=function(){var i=this;i.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),r=document.createElement("img"),r.onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),l.options.adaptiveHeight===!0&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),e.options.focusOnSelect===!0&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;return"boolean"==typeof i?(e=i,i=e===!0?0:o.slideCount-1):i=e===!0?--i:i,!(o.slideCount<1||i<0||i>o.slideCount-1)&&(o.unload(),t===!0?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,void o.reinit())},e.prototype.setCSS=function(i){var e,t,o=this,s={};o.options.rtl===!0&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,o.transformsEnabled===!1?o.$slideTrack.css(s):(s={},o.cssTransitions===!1?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;i.options.vertical===!1?i.options.centerMode===!0&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),i.options.centerMode===!0&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),i.options.vertical===!1&&i.options.variableWidth===!1?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):i.options.variableWidth===!0?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();i.options.variableWidth===!1&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,t.options.rtl===!0?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&i.options.adaptiveHeight===!0&&i.options.vertical===!1){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":"undefined"!=typeof arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),i.options.fade===!1?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=i.options.vertical===!0?"top":"left",
  "top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||i.options.useCSS===!0&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&i.animType!==!1&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&i.animType!==!1},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),n.options.centerMode===!0){var r=n.options.slidesToShow%2===0?1:0;e=Math.floor(n.options.slidesToShow/2),n.options.infinite===!0&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=n.options.infinite===!0?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(s.options.fade===!0&&(s.options.centerMode=!1),s.options.infinite===!0&&s.options.fade===!1&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=s.options.centerMode===!0?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));return s||(s=0),t.slideCount<=t.options.slidesToShow?void t.slideHandler(s,!1,!0):void t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(a.animating===!0&&a.options.waitForAnimate===!0||a.options.fade===!0&&a.currentSlide===i))return e===!1&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,a.options.infinite===!1&&a.options.centerMode===!1&&(i<0||i>a.getDotCount()*a.options.slidesToScroll)?void(a.options.fade===!1&&(o=a.currentSlide,t!==!0&&a.slideCount>a.options.slidesToShow?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o))):a.options.infinite===!1&&a.options.centerMode===!0&&(i<0||i>a.slideCount-a.options.slidesToScroll)?void(a.options.fade===!1&&(o=a.currentSlide,t!==!0&&a.slideCount>a.options.slidesToShow?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o))):(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!==0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!==0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=a.getNavTarget(),l=l.slick("getSlick"),l.slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide)),a.updateDots(),a.updateArrows(),a.options.fade===!0?(t!==!0?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight()):void(t!==!0&&a.slideCount>a.options.slidesToShow?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)))},e.prototype.startLoad=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),i.options.dots===!0&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),o=Math.round(180*t/Math.PI),o<0&&(o=360-Math.abs(o)),o<=45&&o>=0?s.options.rtl===!1?"left":"right":o<=360&&o>=315?s.options.rtl===!1?"left":"right":o>=135&&o<=225?s.options.rtl===!1?"right":"left":s.options.verticalSwiping===!0?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(o.touchObject.edgeHit===!0&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(e.options.swipe===!1||"ontouchend"in document&&e.options.swipe===!1||e.options.draggable===!1&&i.type.indexOf("mouse")!==-1))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,e.options.verticalSwiping===!0&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(l.options.verticalSwiping===!0&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(l.options.rtl===!1?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),l.options.verticalSwiping===!0&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,l.options.infinite===!1&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),l.options.vertical===!1?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,l.options.verticalSwiping===!0&&(l.swipeLeft=e+o*s),l.options.fade!==!0&&l.options.touchMove!==!1&&(l.animating===!0?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;return t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow?(t.touchObject={},!1):(void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,void(t.dragging=!0))},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i,e=this;i=Math.floor(e.options.slidesToShow/2),e.options.arrows===!0&&e.slideCount>e.options.slidesToShow&&!e.options.infinite&&(e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===e.currentSlide?(e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):e.currentSlide>=e.slideCount-e.options.slidesToShow&&e.options.centerMode===!1?(e.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):e.currentSlide>=e.slideCount-1&&e.options.centerMode===!0&&(e.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||"undefined"==typeof s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),"undefined"!=typeof t)return t;return o}});
})();
(function vendorSticky() {
  /* Sticky-kit v1.1.3 | MIT | Leaf Corcoran 2015 | http://leafo.net */
  (function(){var c,f;c=window.jQuery;f=c(window);c.fn.stick_in_parent=function(b){var A,w,J,n,B,K,p,q,L,k,E,t;null==b&&(b={});t=b.sticky_class;B=b.inner_scrolling;E=b.recalc_every;k=b.parent;q=b.offset_top;p=b.spacer;w=b.bottoming;null==q&&(q=0);null==k&&(k=void 0);null==B&&(B=!0);null==t&&(t="is_stuck");A=c(document);null==w&&(w=!0);L=function(a){var b;return window.getComputedStyle?(a=window.getComputedStyle(a[0]),b=parseFloat(a.getPropertyValue("width"))+parseFloat(a.getPropertyValue("margin-left"))+
  parseFloat(a.getPropertyValue("margin-right")),"border-box"!==a.getPropertyValue("box-sizing")&&(b+=parseFloat(a.getPropertyValue("border-left-width"))+parseFloat(a.getPropertyValue("border-right-width"))+parseFloat(a.getPropertyValue("padding-left"))+parseFloat(a.getPropertyValue("padding-right"))),b):a.outerWidth(!0)};J=function(a,b,n,C,F,u,r,G){var v,H,m,D,I,d,g,x,y,z,h,l;if(!a.data("sticky_kit")){a.data("sticky_kit",!0);I=A.height();g=a.parent();null!=k&&(g=g.closest(k));if(!g.length)throw"failed to find stick parent";
  v=m=!1;(h=null!=p?p&&a.closest(p):c("<div />"))&&h.css("position",a.css("position"));x=function(){var d,f,e;if(!G&&(I=A.height(),d=parseInt(g.css("border-top-width"),10),f=parseInt(g.css("padding-top"),10),b=parseInt(g.css("padding-bottom"),10),n=g.offset().top+d+f,C=g.height(),m&&(v=m=!1,null==p&&(a.insertAfter(h),h.detach()),a.css({position:"",top:"",width:"",bottom:""}).removeClass(t),e=!0),F=a.offset().top-(parseInt(a.css("margin-top"),10)||0)-q,u=a.outerHeight(!0),r=a.css("float"),h&&h.css({width:L(a),
  height:u,display:a.css("display"),"vertical-align":a.css("vertical-align"),"float":r}),e))return l()};x();if(u!==C)return D=void 0,d=q,z=E,l=function(){var c,l,e,k;if(!G&&(e=!1,null!=z&&(--z,0>=z&&(z=E,x(),e=!0)),e||A.height()===I||x(),e=f.scrollTop(),null!=D&&(l=e-D),D=e,m?(w&&(k=e+u+d>C+n,v&&!k&&(v=!1,a.css({position:"fixed",bottom:"",top:d}).trigger("sticky_kit:unbottom"))),e<F&&(m=!1,d=q,null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),h.detach()),c={position:"",width:"",top:""},a.css(c).removeClass(t).trigger("sticky_kit:unstick")),
  B&&(c=f.height(),u+q>c&&!v&&(d-=l,d=Math.max(c-u,d),d=Math.min(q,d),m&&a.css({top:d+"px"})))):e>F&&(m=!0,c={position:"fixed",top:d},c.width="border-box"===a.css("box-sizing")?a.outerWidth()+"px":a.width()+"px",a.css(c).addClass(t),null==p&&(a.after(h),"left"!==r&&"right"!==r||h.append(a)),a.trigger("sticky_kit:stick")),m&&w&&(null==k&&(k=e+u+d>C+n),!v&&k)))return v=!0,"static"===g.css("position")&&g.css({position:"relative"}),a.css({position:"absolute",bottom:b,top:"auto"}).trigger("sticky_kit:bottom")},
  y=function(){x();return l()},H=function(){G=!0;f.off("touchmove",l);f.off("scroll",l);f.off("resize",y);c(document.body).off("sticky_kit:recalc",y);a.off("sticky_kit:detach",H);a.removeData("sticky_kit");a.css({position:"",bottom:"",top:"",width:""});g.position("position","");if(m)return null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),h.remove()),a.removeClass(t)},f.on("touchmove",l),f.on("scroll",l),f.on("resize",y),c(document.body).on("sticky_kit:recalc",y),a.on("sticky_kit:detach",H),setTimeout(l,
  0)}};n=0;for(K=this.length;n<K;n++)b=this[n],J(c(b));return this}}).call(this);

  /**
   * sticky-sidebar - A JavaScript plugin for making smart and high performance.
   * @version v3.3.1
   * @link https://github.com/abouolia/sticky-sidebar
   * @author Ahmed Bouhuolia
   * @license The MIT License (MIT)
  **/
  !function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.StickySidebar=e()}(this,function(){"use strict";"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;function t(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function e(t,e){return t(e={exports:{}},e.exports),e.exports}var i=e(function(t,e){(function(t){Object.defineProperty(t,"__esModule",{value:!0});var l,n,e=function(){function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}}(),i=(l=".stickySidebar",n={topSpacing:0,bottomSpacing:0,containerSelector:!1,innerWrapperSelector:".inner-wrapper-sticky",stickyClass:"is-affixed",resizeSensor:!0,minWidth:!1},function(){function c(t){var e=this,i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,c),this.options=c.extend(n,i),this.sidebar="string"==typeof t?document.querySelector(t):t,void 0===this.sidebar)throw new Error("There is no specific sidebar element.");this.sidebarInner=!1,this.container=this.sidebar.parentElement,this.affixedType="STATIC",this.direction="down",this.support={transform:!1,transform3d:!1},this._initialized=!1,this._reStyle=!1,this._breakpoint=!1,this.dimensions={translateY:0,maxTranslateY:0,topSpacing:0,lastTopSpacing:0,bottomSpacing:0,lastBottomSpacing:0,sidebarHeight:0,sidebarWidth:0,containerTop:0,containerHeight:0,viewportHeight:0,viewportTop:0,lastViewportTop:0},["handleEvent"].forEach(function(t){e[t]=e[t].bind(e)}),this.initialize()}return e(c,[{key:"initialize",value:function(){var i=this;if(this._setSupportFeatures(),this.options.innerWrapperSelector&&(this.sidebarInner=this.sidebar.querySelector(this.options.innerWrapperSelector),null===this.sidebarInner&&(this.sidebarInner=!1)),!this.sidebarInner){var t=document.createElement("div");for(t.setAttribute("class","inner-wrapper-sticky"),this.sidebar.appendChild(t);this.sidebar.firstChild!=t;)t.appendChild(this.sidebar.firstChild);this.sidebarInner=this.sidebar.querySelector(".inner-wrapper-sticky")}if(this.options.containerSelector){var e=document.querySelectorAll(this.options.containerSelector);if((e=Array.prototype.slice.call(e)).forEach(function(t,e){t.contains(i.sidebar)&&(i.container=t)}),!e.length)throw new Error("The container does not contains on the sidebar.")}"function"!=typeof this.options.topSpacing&&(this.options.topSpacing=parseInt(this.options.topSpacing)||0),"function"!=typeof this.options.bottomSpacing&&(this.options.bottomSpacing=parseInt(this.options.bottomSpacing)||0),this._widthBreakpoint(),this.calcDimensions(),this.stickyPosition(),this.bindEvents(),this._initialized=!0}},{key:"bindEvents",value:function(){window.addEventListener("resize",this,{passive:!0,capture:!1}),window.addEventListener("scroll",this,{passive:!0,capture:!1}),this.sidebar.addEventListener("update"+l,this),this.options.resizeSensor&&"undefined"!=typeof ResizeSensor&&(new ResizeSensor(this.sidebarInner,this.handleEvent),new ResizeSensor(this.container,this.handleEvent))}},{key:"handleEvent",value:function(t){this.updateSticky(t)}},{key:"calcDimensions",value:function(){if(!this._breakpoint){var t=this.dimensions;t.containerTop=c.offsetRelative(this.container).top,t.containerHeight=this.container.clientHeight,t.containerBottom=t.containerTop+t.containerHeight,t.sidebarHeight=this.sidebarInner.offsetHeight,t.sidebarWidth=this.sidebarInner.offsetWidth,t.viewportHeight=window.innerHeight,t.maxTranslateY=t.containerHeight-t.sidebarHeight,this._calcDimensionsWithScroll()}}},{key:"_calcDimensionsWithScroll",value:function(){var t=this.dimensions;t.sidebarLeft=c.offsetRelative(this.sidebar).left,t.viewportTop=document.documentElement.scrollTop||document.body.scrollTop,t.viewportBottom=t.viewportTop+t.viewportHeight,t.viewportLeft=document.documentElement.scrollLeft||document.body.scrollLeft,t.topSpacing=this.options.topSpacing,t.bottomSpacing=this.options.bottomSpacing,"function"==typeof t.topSpacing&&(t.topSpacing=parseInt(t.topSpacing(this.sidebar))||0),"function"==typeof t.bottomSpacing&&(t.bottomSpacing=parseInt(t.bottomSpacing(this.sidebar))||0),"VIEWPORT-TOP"===this.affixedType?t.topSpacing<t.lastTopSpacing&&(t.translateY+=t.lastTopSpacing-t.topSpacing,this._reStyle=!0):"VIEWPORT-BOTTOM"===this.affixedType&&t.bottomSpacing<t.lastBottomSpacing&&(t.translateY+=t.lastBottomSpacing-t.bottomSpacing,this._reStyle=!0),t.lastTopSpacing=t.topSpacing,t.lastBottomSpacing=t.bottomSpacing}},{key:"isSidebarFitsViewport",value:function(){var t=this.dimensions,e="down"===this.scrollDirection?t.lastBottomSpacing:t.lastTopSpacing;return this.dimensions.sidebarHeight+e<this.dimensions.viewportHeight}},{key:"observeScrollDir",value:function(){var t=this.dimensions;if(t.lastViewportTop!==t.viewportTop){var e="down"===this.direction?Math.min:Math.max;t.viewportTop===e(t.viewportTop,t.lastViewportTop)&&(this.direction="down"===this.direction?"up":"down")}}},{key:"getAffixType",value:function(){this._calcDimensionsWithScroll();var t=this.dimensions,e=t.viewportTop+t.topSpacing,i=this.affixedType;return e<=t.containerTop||t.containerHeight<=t.sidebarHeight?(t.translateY=0,i="STATIC"):i="up"===this.direction?this._getAffixTypeScrollingUp():this._getAffixTypeScrollingDown(),t.translateY=Math.max(0,t.translateY),t.translateY=Math.min(t.containerHeight,t.translateY),t.translateY=Math.round(t.translateY),t.lastViewportTop=t.viewportTop,i}},{key:"_getAffixTypeScrollingDown",value:function(){var t=this.dimensions,e=t.sidebarHeight+t.containerTop,i=t.viewportTop+t.topSpacing,n=t.viewportBottom-t.bottomSpacing,o=this.affixedType;return this.isSidebarFitsViewport()?t.sidebarHeight+i>=t.containerBottom?(t.translateY=t.containerBottom-e,o="CONTAINER-BOTTOM"):i>=t.containerTop&&(t.translateY=i-t.containerTop,o="VIEWPORT-TOP"):t.containerBottom<=n?(t.translateY=t.containerBottom-e,o="CONTAINER-BOTTOM"):e+t.translateY<=n?(t.translateY=n-e,o="VIEWPORT-BOTTOM"):t.containerTop+t.translateY<=i&&0!==t.translateY&&t.maxTranslateY!==t.translateY&&(o="VIEWPORT-UNBOTTOM"),o}},{key:"_getAffixTypeScrollingUp",value:function(){var t=this.dimensions,e=t.sidebarHeight+t.containerTop,i=t.viewportTop+t.topSpacing,n=t.viewportBottom-t.bottomSpacing,o=this.affixedType;return i<=t.translateY+t.containerTop?(t.translateY=i-t.containerTop,o="VIEWPORT-TOP"):t.containerBottom<=n?(t.translateY=t.containerBottom-e,o="CONTAINER-BOTTOM"):this.isSidebarFitsViewport()||t.containerTop<=i&&0!==t.translateY&&t.maxTranslateY!==t.translateY&&(o="VIEWPORT-UNBOTTOM"),o}},{key:"_getStyle",value:function(t){if(void 0!==t){var e={inner:{},outer:{}},i=this.dimensions;switch(t){case"VIEWPORT-TOP":e.inner={position:"fixed",top:i.topSpacing,left:i.sidebarLeft-i.viewportLeft,width:i.sidebarWidth};break;case"VIEWPORT-BOTTOM":e.inner={position:"fixed",top:"auto",left:i.sidebarLeft,bottom:i.bottomSpacing,width:i.sidebarWidth};break;case"CONTAINER-BOTTOM":case"VIEWPORT-UNBOTTOM":var n=this._getTranslate(0,i.translateY+"px");e.inner=n?{transform:n}:{position:"absolute",top:i.translateY,width:i.sidebarWidth}}switch(t){case"VIEWPORT-TOP":case"VIEWPORT-BOTTOM":case"VIEWPORT-UNBOTTOM":case"CONTAINER-BOTTOM":e.outer={height:i.sidebarHeight,position:"relative"}}return e.outer=c.extend({height:"",position:""},e.outer),e.inner=c.extend({position:"relative",top:"",left:"",bottom:"",width:"",transform:""},e.inner),e}}},{key:"stickyPosition",value:function(t){if(!this._breakpoint){t=this._reStyle||t||!1,this.options.topSpacing,this.options.bottomSpacing;var e=this.getAffixType(),i=this._getStyle(e);if((this.affixedType!=e||t)&&e){var n="affix."+e.toLowerCase().replace("viewport-","")+l;for(var o in c.eventTrigger(this.sidebar,n),"STATIC"===e?c.removeClass(this.sidebar,this.options.stickyClass):c.addClass(this.sidebar,this.options.stickyClass),i.outer){var s="number"==typeof i.outer[o]?"px":"";this.sidebar.style[o]=i.outer[o]+s}for(var r in i.inner){var a="number"==typeof i.inner[r]?"px":"";this.sidebarInner.style[r]=i.inner[r]+a}var p="affixed."+e.toLowerCase().replace("viewport-","")+l;c.eventTrigger(this.sidebar,p)}else this._initialized&&(this.sidebarInner.style.left=i.inner.left);this.affixedType=e}}},{key:"_widthBreakpoint",value:function(){window.innerWidth<=this.options.minWidth?(this._breakpoint=!0,this.affixedType="STATIC",this.sidebar.removeAttribute("style"),c.removeClass(this.sidebar,this.options.stickyClass),this.sidebarInner.removeAttribute("style")):this._breakpoint=!1}},{key:"updateSticky",value:function(){var t,e=this,i=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this._running||(this._running=!0,t=i.type,requestAnimationFrame(function(){switch(t){case"scroll":e._calcDimensionsWithScroll(),e.observeScrollDir(),e.stickyPosition();break;case"resize":default:e._widthBreakpoint(),e.calcDimensions(),e.stickyPosition(!0)}e._running=!1}))}},{key:"_setSupportFeatures",value:function(){var t=this.support;t.transform=c.supportTransform(),t.transform3d=c.supportTransform(!0)}},{key:"_getTranslate",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0;return this.support.transform3d?"translate3d("+t+", "+e+", "+i+")":!!this.support.translate&&"translate("+t+", "+e+")"}},{key:"destroy",value:function(){window.removeEventListener("resize",this,{capture:!1}),window.removeEventListener("scroll",this,{capture:!1}),this.sidebar.classList.remove(this.options.stickyClass),this.sidebar.style.minHeight="",this.sidebar.removeEventListener("update"+l,this);var t={inner:{},outer:{}};for(var e in t.inner={position:"",top:"",left:"",bottom:"",width:"",transform:""},t.outer={height:"",position:""},t.outer)this.sidebar.style[e]=t.outer[e];for(var i in t.inner)this.sidebarInner.style[i]=t.inner[i];this.options.resizeSensor&&"undefined"!=typeof ResizeSensor&&(ResizeSensor.detach(this.sidebarInner,this.handleEvent),ResizeSensor.detach(this.container,this.handleEvent))}}],[{key:"supportTransform",value:function(t){var i=!1,e=t?"perspective":"transform",n=e.charAt(0).toUpperCase()+e.slice(1),o=document.createElement("support").style;return(e+" "+["Webkit","Moz","O","ms"].join(n+" ")+n).split(" ").forEach(function(t,e){if(void 0!==o[t])return i=t,!1}),i}},{key:"eventTrigger",value:function(t,e,i){try{var n=new CustomEvent(e,{detail:i})}catch(t){(n=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,i)}t.dispatchEvent(n)}},{key:"extend",value:function(t,e){var i={};for(var n in t)void 0!==e[n]?i[n]=e[n]:i[n]=t[n];return i}},{key:"offsetRelative",value:function(t){var e={left:0,top:0};do{var i=t.offsetTop,n=t.offsetLeft;isNaN(i)||(e.top+=i),isNaN(n)||(e.left+=n),t="BODY"===t.tagName?t.parentElement:t.offsetParent}while(t);return e}},{key:"addClass",value:function(t,e){c.hasClass(t,e)||(t.classList?t.classList.add(e):t.className+=" "+e)}},{key:"removeClass",value:function(t,e){c.hasClass(t,e)&&(t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," "))}},{key:"hasClass",value:function(t,e){return t.classList?t.classList.contains(e):new RegExp("(^| )"+e+"( |$)","gi").test(t.className)}},{key:"defaults",get:function(){return n}}]),c}());t.default=i,window.StickySidebar=i})(e)});return t(i),t(e(function(t,e){(function(t){var e,s=(e=t)&&e.__esModule?e:{default:e};!function(){if("undefined"!=typeof window){var n=window.$||window.jQuery||window.Zepto,o="stickySidebar";if(n){n.fn.stickySidebar=function(i){return this.each(function(){var t=n(this),e=n(this).data(o);if(e||(e=new s.default(this,"object"==typeof i&&i),t.data(o,e)),"string"==typeof i){if(void 0===e[i]&&-1===["destroy","updateSticky"].indexOf(i))throw new Error('No method named "'+i+'"');e[i]()}})},n.fn.stickySidebar.Constructor=s.default;var t=n.fn.stickySidebar;n.fn.stickySidebar.noConflict=function(){return n.fn.stickySidebar=t,this}}}}()})(i)}))});
})();
(function vendorShifter() {
  // Shifter update
  !function(a,b){"use strict";function k(c){d||(f=a.extend({},i,c||{}),f.$html=a("html"),f.$body=a("body"),f.$shifts=a([o(g.page),o(g.header)].join(", ")),f.$nav=a(o(g.navigation)),f.$shifts.length>0&&f.$nav.length>0&&(d=!0,f.$body.on(h.click,o(g.handle),m),void 0!==b.matchMedia&&(f.mediaQuery=b.matchMedia("(max-width:"+(f.maxWidth===1/0?"100000px":f.maxWidth)+")"),f.mediaQuery.addListener(l),l())))}function l(){f.mediaQuery.matches?j.enable():j.disable()}function m(a){a.preventDefault(),a.stopPropagation(),e||(f.$body.hasClass(g.isOpen)?j.close():j.open()),"touchstart"===a.type&&(e=!0,setTimeout(n,500))}function n(){e=!1}function o(a){return"."+a}var c="shifter",d=!1,e=!1,f={},g={handle:"shifter-handle",page:"shifter-page",header:"shifter-header",navigation:"shifter-navigation",isEnabled:"shifter-enabled",isOpen:"shifter-open"},h={click:"touchstart."+c+" click."+c},i={maxWidth:"980px"},j={close:function(){d&&(f.$html.removeClass(g.isOpen),f.$body.removeClass(g.isOpen),f.$shifts.off(o(c)),f.$nav.find("input").trigger("blur"))},enable:function(){d&&f.$body.addClass(g.isEnabled)},destroy:function(){d&&(f.$html.removeClass(g.isOpen),f.$body.removeClass([g.isEnabled,g.isOpen].join(" ")).off(h.click),void 0!==b.matchMedia&&f.mediaQuery.removeListener(l),f={},d=!1)},disable:function(){d&&(j.close(),f.$body.removeClass(g.isEnabled))},open:function(){d&&(f.$html.addClass(g.isOpen),f.$body.addClass(g.isOpen),f.$shifts.one(h.click,m))}};a[c]=function(a){return j[a]?j[a].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof a&&a?this:k.apply(this,arguments)}}(jQuery,window);
})();
(function vendorZoom() {
  /*!
  	Zoom 1.7.15
  	license: MIT
  	http://www.jacklmoore.com/zoom
  */
  (function($){var defaults={url:false,callback:false,target:false,duration:120,on:"mouseover",touch:true,onZoomIn:false,onZoomOut:false,magnify:1};$.zoom=function(target,source,img,magnify){var targetHeight,targetWidth,sourceHeight,sourceWidth,xRatio,yRatio,offset,$target=$(target),position=$target.css("position"),$source=$(source);$target.css("position",/(absolute|fixed)/.test(position)?position:"relative");$target.css("overflow","hidden");img.style.width=img.style.height="";$(img).addClass("zoomImg").css({position:"absolute",top:0,left:0,opacity:0,width:img.width*magnify,height:img.height*magnify,border:"none",maxWidth:"none",maxHeight:"none"}).appendTo(target);return{init:function(){targetWidth=$target.outerWidth();targetHeight=$target.outerHeight();if(source===$target[0]){sourceWidth=targetWidth;sourceHeight=targetHeight}else{sourceWidth=$source.outerWidth();sourceHeight=$source.outerHeight()}xRatio=(img.width-targetWidth)/sourceWidth;yRatio=(img.height-targetHeight)/sourceHeight;offset=$source.offset()},move:function(e){var left=e.pageX-offset.left,top=e.pageY-offset.top;top=Math.max(Math.min(top,sourceHeight),0);left=Math.max(Math.min(left,sourceWidth),0);img.style.left=left*-xRatio+"px";img.style.top=top*-yRatio+"px"}}};$.fn.zoom=function(options){return this.each(function(){var settings=$.extend({},defaults,options||{}),target=settings.target||this,source=this,$source=$(source),$target=$(target),img=document.createElement("img"),$img=$(img),mousemove="mousemove.zoom",clicked=false,touched=false,$urlElement;if(!settings.url){$urlElement=$source.find("img");if($urlElement[0]){settings.url=$urlElement.data("src")||$urlElement.attr("src")}if(!settings.url){return}}(function(){var position=$target.css("position");var overflow=$target.css("overflow");$source.one("zoom.destroy",function(){$source.off(".zoom");$target.css("position",position);$target.css("overflow",overflow);$img.remove()})})();img.onload=function(){var zoom=$.zoom(target,source,img,settings.magnify);function start(e){zoom.init();zoom.move(e);$img.stop().fadeTo($.support.opacity?settings.duration:0,1,$.isFunction(settings.onZoomIn)?settings.onZoomIn.call(img):false)}function stop(){$img.stop().fadeTo(settings.duration,0,$.isFunction(settings.onZoomOut)?settings.onZoomOut.call(img):false)}if(settings.on==="grab"){$source.on("mousedown.zoom",function(e){if(e.which===1){$(document).one("mouseup.zoom",function(){stop();$(document).off(mousemove,zoom.move)});start(e);$(document).on(mousemove,zoom.move);e.preventDefault()}})}else if(settings.on==="click"){$source.on("click.zoom",function(e){if(clicked){return}else{clicked=true;start(e);$(document).on(mousemove,zoom.move);$(document).one("click.zoom",function(){stop();clicked=false;$(document).off(mousemove,zoom.move)});return false}})}else if(settings.on==="toggle"){$source.on("click.zoom",function(e){if(clicked){stop()}else{start(e)}clicked=!clicked})}else if(settings.on==="mouseover"){zoom.init();$source.on("mouseenter.zoom",start).on("mouseleave.zoom",stop).on(mousemove,zoom.move)}if(settings.touch){$source.on("touchstart.zoom",function(e){e.preventDefault();if(touched){touched=false;stop()}else{touched=true;start(e.originalEvent.touches[0]||e.originalEvent.changedTouches[0])}}).on("touchmove.zoom",function(e){e.preventDefault();zoom.move(e.originalEvent.touches[0]||e.originalEvent.changedTouches[0])}).on("touchend.zoom",function(e){e.preventDefault();if(touched){touched=false;stop()}})}if($.isFunction(settings.callback)){settings.callback.call(img)}};img.src=settings.url})};$.fn.zoom.defaults=defaults})(window.jQuery);
})();
(function vendorStickyBits() {
  /**
    stickybits - Stickybits is a lightweight alternative to `position: sticky` polyfills
    @version v3.6.1
    @link https://github.com/dollarshaveclub/stickybits#readme
    @author Jeff Wainwright <yowainwright@gmail.com> (https://jeffry.in)
    @license MIT
  **/
  !function(t,s){"object"==typeof exports&&"undefined"!=typeof module?module.exports=s():"function"==typeof define&&define.amd?define(s):(t=t||self).stickybits=s()}(this,function(){"use strict";var e=function(){function t(t,s){var e=void 0!==s?s:{};this.version="3.6.1",this.userAgent=window.navigator.userAgent||"no `userAgent` provided by the browser",this.props={customStickyChangeNumber:e.customStickyChangeNumber||null,noStyles:e.noStyles||!1,stickyBitStickyOffset:e.stickyBitStickyOffset||0,parentClass:e.parentClass||"js-stickybit-parent",scrollEl:"string"==typeof e.scrollEl?document.querySelector(e.scrollEl):e.scrollEl||window,stickyClass:e.stickyClass||"js-is-sticky",stuckClass:e.stuckClass||"js-is-stuck",stickyChangeClass:e.stickyChangeClass||"js-is-sticky--change",useStickyClasses:e.useStickyClasses||!1,useFixed:e.useFixed||!1,useGetBoundingClientRect:e.useGetBoundingClientRect||!1,verticalPosition:e.verticalPosition||"top"},this.props.positionVal=this.definePosition()||"fixed",this.instances=[];var i=this.props,n=i.positionVal,o=i.verticalPosition,r=i.noStyles,a=i.stickyBitStickyOffset,l=i.useStickyClasses,c="top"!==o||r?"":a+"px",u="fixed"!==n?n:"";this.els="string"==typeof t?document.querySelectorAll(t):t,"length"in this.els||(this.els=[this.els]);for(var f=0;f<this.els.length;f++){var p=this.els[f];if(p.style[o]=c,p.style.position=u,"fixed"===n||l){var h=this.addInstance(p,this.props);this.instances.push(h)}}}var s=t.prototype;return s.definePosition=function(){var t;if(this.props.useFixed)t="fixed";else{for(var s=["","-o-","-webkit-","-moz-","-ms-"],e=document.head.style,i=0;i<s.length;i+=1)e.position=s[i]+"sticky";t=e.position?e.position:"fixed",e.position=""}return t},s.addInstance=function(t,s){var e=this,i={el:t,parent:t.parentNode,props:s};this.isWin=this.props.scrollEl===window;var n=this.isWin?window:this.getClosestParent(i.el,i.props.scrollEl);return this.computeScrollOffsets(i),i.parent.className+=" "+s.parentClass,i.state="default",i.stateContainer=function(){return e.manageState(i)},n.addEventListener("scroll",i.stateContainer),i},s.getClosestParent=function(t,s){var e=s,i=t;if(i.parentElement===e)return e;for(;i.parentElement!==e;)i=i.parentElement;return e},s.getTopPosition=function(t){if(this.props.useGetBoundingClientRect)return t.getBoundingClientRect().top+(this.props.scrollEl.pageYOffset||document.documentElement.scrollTop);for(var s=0;s=t.offsetTop+s,t=t.offsetParent;);return s},s.computeScrollOffsets=function(t){var s=t,e=s.props,i=s.el,n=s.parent,o=!this.isWin&&"fixed"===e.positionVal,r="bottom"!==e.verticalPosition,a=o?this.getTopPosition(e.scrollEl):0,l=o?this.getTopPosition(n)-a:this.getTopPosition(n),c=null!==e.customStickyChangeNumber?e.customStickyChangeNumber:i.offsetHeight,u=l+n.offsetHeight;return s.offset=a+e.stickyBitStickyOffset,s.stickyStart=r?l-s.offset:0,s.stickyChange=s.stickyStart+c,s.stickyStop=r?u-(i.offsetHeight+s.offset):u-window.innerHeight,s},s.toggleClasses=function(t,s,e){var i=t,n=i.className.split(" ");e&&-1===n.indexOf(e)&&n.push(e);var o=n.indexOf(s);-1!==o&&n.splice(o,1),i.className=n.join(" ")},s.manageState=function(t){var s=t,e=s.el,i=s.props,n=s.state,o=s.stickyStart,r=s.stickyChange,a=s.stickyStop,l=e.style,c=i.noStyles,u=i.positionVal,f=i.scrollEl,p=i.stickyClass,h=i.stickyChangeClass,d=i.stuckClass,y=i.verticalPosition,k="bottom"!==y,m=function(t){t()},g=this.isWin&&(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame)||m,v=this.toggleClasses,C=this.isWin?window.scrollY||window.pageYOffset:f.scrollTop,S=k&&C<=o&&("sticky"===n||"stuck"===n),w=a<=C&&"sticky"===n;o<C&&C<a&&("default"===n||"stuck"===n)?(s.state="sticky",g(function(){v(e,d,p),l.position=u,c||(l.bottom="",l[y]=i.stickyBitStickyOffset+"px")})):S?(s.state="default",g(function(){v(e,p),v(e,d),"fixed"===u&&(l.position="")})):w&&(s.state="stuck",g(function(){v(e,p,d),"fixed"!==u||c||(l.top="",l.bottom="0",l.position="absolute")}));var b=r<=C&&C<=a;return C<r/2||a<C?g(function(){v(e,h)}):b&&g(function(){v(e,"stub",h)}),s},s.update=function(t){void 0===t&&(t=null);for(var s=0;s<this.instances.length;s+=1){var e=this.instances[s];if(this.computeScrollOffsets(e),t)for(var i in t)e.props[i]=t[i]}return this},s.removeInstance=function(t){var s=t.el,e=t.props,i=this.toggleClasses;s.style.position="",s.style[e.verticalPosition]="",i(s,e.stickyClass),i(s,e.stuckClass),i(s.parentNode,e.parentClass)},s.cleanup=function(){for(var t=0;t<this.instances.length;t+=1){var s=this.instances[t];s.props.scrollEl.removeEventListener("scroll",s.stateContainer),this.removeInstance(s)}this.manageState=!1,this.instances=[]},t}();return function(t,s){return new e(t,s)}});
})();
(function vendorOffCanvas() {
  /*! js-Offcanvas - v1.2.9 - 2019-03-06
  jQuery Accesible Offcanvas Panels
   * https://github.com/vmitsaras/js-offcanvas
   * Copyright (c) 2019 Vasileios Mitsaras (@vmitsaras)
   * MIT License */
  !function(a){"use strict";var b=a.utils||{};b.classes={hiddenVisually:"u-hidden-visually",modifier:"--",isActive:"is-active",isClosed:"is-closed",isOpen:"is-open",isClicked:"is-clicked",isAnimating:"is-animating",isVisible:"is-visible",hidden:"u-hidden"},b.keyCodes={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38},b.a11yclick=function(a){var c=a.charCode||a.keyCode,d=a.type;return"click"===d||"keydown"===d&&(c===b.keyCodes.SPACE||c===b.keyCodes.ENTER||void 0)},b.a11yclickBind=function(a,c,d){a.on("click."+d+" keydown."+d,function(e){b.a11yclick(e)&&(e.preventDefault(e),c&&"function"==typeof c&&c.call(),a.trigger("clicked."+d))})},b.supportTransition="transition"in document.documentElement.style||"WebkitTransition"in document.documentElement.style,b.whichTransitionEvent=function(){var a=document.createElement("fakeelement"),b={transition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(var c in b)if(void 0!==a.style[c])return b[c]},b.transEndEventName=b.whichTransitionEvent(),b.onEndTransition=function(a,c){var d=function(a){if(b.supportTransition){if(a.target!=this)return;this.removeEventListener(b.transEndEventName,d)}c&&"function"==typeof c&&c.call()};b.supportTransition?a.addEventListener(b.transEndEventName,d):d()},b.createModifierClass=function(a,c){return a+b.classes.modifier+c},b.cssModifiers=function(a,c,d){for(var e=a.split(","),f=0,g=e.length;f<g;f++)c.push(b.createModifierClass(d,e[f].trim()))},b.getMetaOptions=function(a,b,c){var d="data-"+b,e=d+"-options",f=a.getAttribute(d)||a.getAttribute(e);try{return f&&JSON.parse(f)||{}}catch(g){return void(console&&console.error("Error parsing "+d+" on "+a.className+": "+g))}},a.utils=b}(this),function(a,b){"use strict";var c="trab-tab",d=c+"-component";a.componentNamespace=a.componentNamespace||{};var e=a.componentNamespace.TrapTabKey=function(a,c){if(!a)throw new Error("Element required to initialize object");this.element=a,this.$element=b(a),c=c||{},this.options=b.extend({},this.defaults,c)};e.prototype.init=function(){this.$element.data(d)||this.$element.data(d,this)},e.prototype.bindTrap=function(){var a=this;this.$element.on("keydown."+c,function(b){a._trapTabKey(a.$element,b)})},e.prototype.unbindTrap=function(){this.$element.off("keydown."+c)},e.prototype.giveFocus=function(){var a=this,b=a.options,c=a.$element.find("*"),d=a.$element.find("[data-focus]");d.length?d.first().focus():c.filter(b.focusableElementsString).filter(":visible").first().focus()},e.prototype._trapTabKey=function(a,b){var c=this,d=c.options;if(9==b.which){var e,f=a.find("*");e=f.filter(d.focusableElementsString).filter(":visible");var g;g=jQuery(":focus");var h;h=e.length;var i;i=e.index(g),b.shiftKey?0==i&&(e.get(h-1).focus(),b.preventDefault()):i==h-1&&(e.get(0).focus(),b.preventDefault())}},e.prototype.defaults={focusableElementsString:"a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]"},e.defaults=e.prototype.defaults}(this,jQuery),function(a,b){"use strict";var c="button",d=c+"-component",e=a.utils,f={iconOnly:"icon-only",withIcon:"icon",toggleState:"toggle-state",showHide:"visible-on-active"};a.componentNamespace=a.componentNamespace||{};var g=a.componentNamespace.Button=function(a,d){if(!a)throw new Error("Element required to initialize object");this.element=a,this.$element=b(a),this.options=d=d||{},this.metadata=e.getMetaOptions(this.element,c),this.options=b.extend({},this.defaults,this.metadata,d)};g.prototype.init=function(){this.$element.data(d)||(this.$element.data(d,this),this.hasTitle=!!this.$element.attr("title"),this.$element.trigger("beforecreate."+c),this.isPressed=!1,this.isExpanded=!1,this._create())},g.prototype._create=function(){var a=this.options,d=[a.baseClass+"__text"];this._buttonClasses=[a.baseClass],null===a.label&&(a.label=this.$element.html()),a.wrapText&&(this.$buttonText=b("<span></span>").html(a.label).appendTo(this.$element.empty())),a.icon&&(this.$buttonIcon=b("<span class='"+a.iconFamily+" "+e.createModifierClass(a.iconFamily,a.icon)+"'></span>").prependTo(this.$element),this._buttonClasses.push(e.createModifierClass(a.baseClass,f.withIcon)),a.iconActive&&(a.toggle=!0,this.$buttonIconActive=b("<span class='"+a.iconFamily+" "+e.createModifierClass(a.iconFamily,a.iconActive)+" "+e.createModifierClass(a.iconFamily,f.showHide)+"'></span>").insertAfter(this.$buttonIcon),this._buttonClasses.push(e.createModifierClass(a.baseClass,f.toggleState))),a.hideText&&(d.push(e.classes.hiddenVisually),this._buttonClasses.push(e.createModifierClass(a.baseClass,f.iconOnly)))),a.modifiers&&e.cssModifiers(a.modifiers,this._buttonClasses,a.baseClass),a.wrapText&&this.$buttonText.addClass(d.join(" ")),a.textActive&&a.wrapText&&(a.toggle=!0,d.push(e.createModifierClass(a.baseClass+"__text",f.showHide)),this._buttonClasses.push(e.createModifierClass(a.baseClass,f.toggleState)),this.$buttonTextActive=b("<span></span>").addClass(d.join(" ")).html(a.textActive).insertAfter(this.$buttonText),this.$element.attr("aria-live","polite")),this.$element.addClass(this._buttonClasses.join(" ")),a.role&&this.$element.attr("role",a.role),a.controls&&this.controls(a.controls),a.pressed&&this._isPressed(a.pressed),a.expanded&&(this.isPressed=!0,this._isExpanded(a.expanded)),this.hasTitle||!a.hideText||a.hideTitle||this.$element.attr("title",this.$element.text()),this.$element.trigger("create."+c)},g.prototype._isPressed=function(a){this.isPressed=a,this.$element.attr("aria-pressed",a)[a?"addClass":"removeClass"](e.classes.isActive)},g.prototype._isExpanded=function(a){this.isExpanded=a,this.$element.attr("aria-expanded",a)[a?"addClass":"removeClass"](e.classes.isActive)},g.prototype.controls=function(a){this.$element.attr("aria-controls",a)},g.prototype.destroy=function(){var a=this.options;if(this.$element.removeData(d).removeAttr("role").removeAttr("aria-pressed").removeAttr("aria-expanded").removeAttr("aria-controls").removeClass(this._buttonClasses.join(" ")).removeClass(e.classes.isActive).off("."+c),this.options.icon&&this.$element.find('[class^="'+this.options.iconFamily+'"]').remove(),a.wrapText){var b=this.$buttonText.html();this.$element.empty().html(b)}this.element=null,this.$element=null},g.prototype.defaults={baseClass:"c-button",role:"button",label:null,modifiers:null,controls:null,textActive:null,wrapText:!0,hideText:!1,hideTitle:!1,icon:null,iconActive:null,iconFamily:"o-icon",iconPosition:null,pressed:!1,expanded:!1},g.defaults=g.prototype.defaults}(this,jQuery),function(a,b){"use strict";var c="jsButton",d=".js-button";b.fn[c]=function(){return this.each(function(){new window.componentNamespace.Button(this).init()})},b(document).bind("enhance",function(a){b(b(a.target).is(d)&&a.target).add(d,a.target).filter(d)[c]()})}(this,jQuery),function(a,b){"use strict";var c="offcanvas",d=c+"-component",e=a.utils,f=document;a.componentNamespace=a.componentNamespace||{};var g=a.componentNamespace.Offcanvas=function(a,d){if(!a)throw new Error("Element required to initialize object");this.element=a,this.$element=b(a),this.options=d=d||{},this.metadata=e.getMetaOptions(this.element,c),this.options=b.extend({},this.defaults,this.metadata,d),this.isOpen=!1,this.onOpen=this.options.onOpen,this.onClose=this.options.onClose,this.onInit=this.options.onInit};g.prototype.init=function(){this.$element.data(d)||(this.$element.data(d,this),this.$element.trigger("beforecreate."+c),this._addAttributes(),this._initTrigger(),this._createModal(),this._trapTabKey(),this._closeButton(),this.onInit&&"function"==typeof this.onInit&&this.onInit.call(this.element),this.$element.trigger("create."+c))},g.prototype._addAttributes=function(){var c=this.options,d={tabindex:"-1","aria-hidden":!this.isOpen};c.role&&(d.role=c.role),this._panelClasses=[c.baseClass,e.classes.isClosed],a.utils.supportTransition||this._panelClasses.push(e.createModifierClass(c.baseClass,c.supportNoTransitionsClass)),e.cssModifiers(c.modifiers,this._panelClasses,c.baseClass),this.$element.attr(d).addClass(this._panelClasses.join(" ")),this.$content=b("."+c.contentClass),this._contentOpenClasses=[],e.cssModifiers(c.modifiers,this._contentOpenClasses,c.contentClass),this._modalOpenClasses=[c.modalClass,e.classes.isClosed],e.cssModifiers(c.modifiers,this._modalOpenClasses,c.modalClass),this._bodyOpenClasses=[c.bodyModifierClass+"--visible"],e.cssModifiers(c.modifiers,this._bodyOpenClasses,c.bodyModifierClass),c.modifiers.toLowerCase().indexOf("reveal")>=0?this.transitionElement=this.$content[0]:this.transitionElement=this.element},g.prototype._createModal=function(){var a=this,d=a.$element.parent();this.options.modal&&(this.$modal=b("<div></div>").on("mousedown."+c,function(){a.close()}).appendTo(d),this.$modal.addClass(this._modalOpenClasses.join(" ")))},g.prototype._trapTabKey=function(){this.trapTabKey=new a.componentNamespace.TrapTabKey(this.element),this.trapTabKey.init()},g.prototype._trapTabEscKey=function(){var a=this;b(f).on("keyup."+c,function(c){var d=c.keyCode||c.which;if(d===e.keyCodes.ESCAPE&&a.isOpen){if(b("input").is(":focus"))return;a.close()}})},g.prototype._closeButton=function(){function b(){d.close()}var d=this,f=d.options;this.$closeBtn=this.$element.find("."+f.closeButtonClass),this.$closeBtn.length&&(this.closeBtn=new a.componentNamespace.Button(this.$closeBtn[0]),this.closeBtn.init(),this.closeBtn.controls(this.$element.attr("id")),e.a11yclickBind(this.$closeBtn,b,c))},g.prototype.open=function(){var a=this,d=a.options;this.isOpen||(d.resize&&this.resize(),f.activeElement&&(this.lastFocus=f.activeElement),this.isOpen=!0,b("html, body").addClass(this._bodyOpenClasses.join(" ")),this._addClasses(this.$element,this.isOpen,!0),this._addClasses(this.$content,this.isOpen,!0),d.modal&&(this._addClasses(this.$modal,this.isOpen,!0),this.$modal.addClass(e.createModifierClass(d.modalClass,"opening"))),this.$element.attr("aria-hidden","false").addClass(e.createModifierClass(d.baseClass,"opening")).trigger("opening."+c),this.$content.addClass(this._contentOpenClasses.join(" ")),e.onEndTransition(this.transitionElement,function(){a.trapTabKey.giveFocus(),a.trapTabKey.bindTrap(),a._addClasses(a.$element,a.isOpen,!1),a._addClasses(a.$content,a.isOpen,!1),d.modal&&(a._addClasses(a.$modal,a.isOpen,!1),a.$modal.removeClass(e.createModifierClass(d.modalClass,"opening"))),a.$element.removeClass(e.createModifierClass(d.baseClass,"opening"))}),this.$trigger&&this.$trigger.button._isExpanded(!0),this.onOpen&&"function"==typeof this.onOpen&&this.onOpen.call(this.$element),this.$element.trigger("open."+c),this._trapTabEscKey())},g.prototype.close=function(){var d=this,g=d.options;this.isOpen&&(this.isOpen=!1,this._addClasses(this.$element,this.isOpen,!0),this._addClasses(this.$content,this.isOpen,!0),this.options.modal&&(this._addClasses(this.$modal,this.isOpen,!0),this.$modal.addClass(e.createModifierClass(g.modalClass,"closing"))),this.$element.attr("aria-hidden","true").addClass(e.createModifierClass(g.baseClass,"closing")).trigger("closing."+c),this.trapTabKey.unbindTrap(),d.$trigger&&d.$trigger.button._isExpanded(!1),e.onEndTransition(this.transitionElement,function(){d._addClasses(d.$element,d.isOpen,!1),d._addClasses(d.$content,d.isOpen,!1),d.options.modal&&(d._addClasses(d.$modal,d.isOpen,!1),d.$modal.removeClass(e.createModifierClass(g.modalClass,"closing"))),d.$content.removeClass(d._contentOpenClasses.join(" ")),d.$element.removeClass(e.createModifierClass(g.baseClass,"closing")),b("html, body").removeClass(d._bodyOpenClasses.join(" ")),d.lastFocus&&d.lastFocus.focus()}),this.onClose&&"function"==typeof this.onClose&&this.onClose.call(this.element),this.$element.trigger("close."+c),b(f).off("keyup."+c),b(a).off("."+c))},g.prototype._addClasses=function(a,b,c){b?c?a.removeClass(e.classes.isClosed).addClass(e.classes.isAnimating).addClass(e.classes.isOpen):a.removeClass(e.classes.isAnimating):c?a.removeClass(e.classes.isOpen).addClass(e.classes.isAnimating):a.addClass(e.classes.isClosed).removeClass(e.classes.isAnimating)},g.prototype.toggle=function(){this[this.isOpen?"close":"open"]()},g.prototype.resize=function(){function d(){g=!1}function e(){g||i(d),g=!0}function f(){e(),h.$element.trigger("resizing."+c),h.options.resize&&h.close()}var g,h=this,i=function(){return a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||function(b){a.setTimeout(b,1e3/60)}}();b(a).on("resize."+c+" orientationchange."+c,f)},g.prototype._initTrigger=function(){var c=this,d=c.options,e=this.$element.attr("id");d.triggerButton&&(this.$triggerBtn=b(d.triggerButton),new a.componentNamespace.OffcanvasTrigger(this.$triggerBtn[0],{offcanvas:e}).init())},g.prototype.setButton=function(a){this.$element.data(d+"-trigger",a)},g.prototype.destroy=function(){this.$element.trigger("destroy."+c),this.isOpen&&this.close(),this.$element.removeData().removeClass(this._panelClasses.join(" ")).removeAttr("tabindex").removeAttr("aria-hidden"),this.$triggerBtn&&this.$triggerBtn.removeData("offcanvas-trigger-component").off(".offcanvas").off(".offcanvas-trigger").data("button-component").destroy(),this.$element.off("."+c),b(f).off("."+c),b(a).off("."+c)},g.prototype.defaults={role:"dialog",modifiers:"left,overlay",baseClass:"c-offcanvas",modalClass:"c-offcanvas-bg",contentClass:"c-offcanvas-content-wrap",closeButtonClass:"js-offcanvas-close",bodyModifierClass:"has-offcanvas",supportNoTransitionsClass:"support-no-transitions",resize:!1,triggerButton:null,modal:!0,onOpen:null,onClose:null,onInit:null},g.defaults=g.prototype.defaults}(this,jQuery),function(a,b){"use strict";var c="offcanvas",d=".js-"+c;b.fn[c]=function(b){return this.each(function(){new a.componentNamespace.Offcanvas(this,b).init()})},b(a.document).on("enhance",function(a){b(b(a.target).is(d)&&a.target).add(d,a.target).filter(d)[c]()})}(this,jQuery),function(a,b){"use strict";var c="offcanvas-trigger",d=c+"-component",e=a.utils;a.componentNamespace=a.componentNamespace||{};var f=a.componentNamespace.OffcanvasTrigger=function(a,c){if(!a)throw new Error("Element required to initialize object");this.element=a,this.$element=b(a),this.options=c=c||{},this.options=b.extend({},this.defaults,c)};f.prototype.init=function(){this.$element.data(d)||(this.$element.data(d,this),this._create())},f.prototype._create=function(){if(this.options.offcanvas=this.options.offcanvas||this.$element.attr("data-offcanvas-trigger"),this.$offcanvas=b("#"+this.options.offcanvas),this.offcanvas=this.$offcanvas.data("offcanvas-component"),!this.offcanvas)throw new Error("Offcanvas Element not found");this.button=new a.componentNamespace.Button(this.element),this.button.init(),this.button.controls(this.options.offcanvas),this.button._isExpanded(!1),this._bindbehavior()},f.prototype._bindbehavior=function(){function a(){b.offcanvas.toggle()}var b=this;this.offcanvas.setButton(b),e.a11yclickBind(this.$element,a,c)},f.prototype.defaults={offcanvas:null}}(this,jQuery),function(a,b){"use strict";var c="offcanvasTrigger",d="[data-offcanvas-trigger],.js-"+c;b.fn[c]=function(b){return this.each(function(){new a.componentNamespace.OffcanvasTrigger(this,b).init()})},b(a.document).on("enhance",function(a){b(b(a.target).is(d)&&a.target).add(d,a.target).filter(d)[c]()})}(this,jQuery);
})();
(function vendorThrottleDebounce() {
  /*
   * jQuery throttle / debounce - v1.1 - 3/7/2010
   * http://benalman.com/projects/jquery-throttle-debounce-plugin/
   *
   * Copyright (c) 2010 "Cowboy" Ben Alman
   * Dual licensed under the MIT and GPL licenses.
   * http://benalman.com/about/license/
   */
  (function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);
})();
(function vendorLodash(){
  // lodash.core.min.js

  /**
   * @license
   * lodash 4.5.1 (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
   * Build: `lodash core -o ./dist/lodash.core.js`
   */
  ;(function(){function n(n,t){for(var r=-1,e=t.length,u=n.length;++r<e;)n[u+r]=t[r];return n}function t(n,t,r){for(var e=-1,u=n.length;++e<u;){var o=n[e],i=t(o);if(null!=i&&(c===an?i===i:r(i,c)))var c=i,f=o}return f}function r(n,t,r){var e;return r(n,function(n,r,u){return t(n,r,u)?(e=n,false):void 0}),e}function e(n,t,r,e,u){return u(n,function(n,u,o){r=e?(e=false,n):t(r,n,u,o)}),r}function u(n,t){return O(t,function(t){return n[t]})}function o(n){return n&&n.Object===Object?n:null}function i(n){return vn[n];
  }function c(n){var t=false;if(null!=n&&typeof n.toString!="function")try{t=!!(n+"")}catch(r){}return t}function f(n,t){return n=typeof n=="number"||hn.test(n)?+n:-1,n>-1&&0==n%1&&(null==t?9007199254740991:t)>n}function a(n){if(Y(n)&&!Pn(n)){if(n instanceof l)return n;if(En.call(n,"__wrapped__")){var t=new l(n.__wrapped__,n.__chain__);return t.__actions__=N(n.__actions__),t}}return new l(n)}function l(n,t){this.__wrapped__=n,this.__actions__=[],this.__chain__=!!t}function p(n,t,r,e){var u;return(u=n===an)||(u=xn[r],
  u=(n===u||n!==n&&u!==u)&&!En.call(e,r)),u?t:n}function s(n){return X(n)?Fn(n):{}}function h(n,t,r){if(typeof n!="function")throw new TypeError("Expected a function");return setTimeout(function(){n.apply(an,r)},t)}function v(n,t){var r=true;return $n(n,function(n,e,u){return r=!!t(n,e,u)}),r}function y(n,t){var r=[];return $n(n,function(n,e,u){t(n,e,u)&&r.push(n)}),r}function _(t,r,e,u){u||(u=[]);for(var o=-1,i=t.length;++o<i;){var c=t[o];r>0&&Y(c)&&L(c)&&(e||Pn(c)||K(c))?r>1?_(c,r-1,e,u):n(u,c):e||(u[u.length]=c);
  }return u}function g(n,t){return n&&qn(n,t,en)}function b(n,t){return y(t,function(t){return Q(n[t])})}function j(n,t,r,e,u){return n===t?true:null==n||null==t||!X(n)&&!Y(t)?n!==n&&t!==t:m(n,t,j,r,e,u)}function m(n,t,r,e,u,o){var i=Pn(n),f=Pn(t),a="[object Array]",l="[object Array]";i||(a=kn.call(n),"[object Arguments]"==a&&(a="[object Object]")),f||(l=kn.call(t),"[object Arguments]"==l&&(l="[object Object]"));var p="[object Object]"==a&&!c(n),f="[object Object]"==l&&!c(t);return!(l=a==l)||i||p?2&u||(a=p&&En.call(n,"__wrapped__"),
  f=f&&En.call(t,"__wrapped__"),!a&&!f)?l?(o||(o=[]),(a=J(o,function(t){return t[0]===n}))&&a[1]?a[1]==t:(o.push([n,t]),t=(i?I:q)(n,t,r,e,u,o),o.pop(),t)):false:r(a?n.value():n,f?t.value():t,e,u,o):$(n,t,a)}function d(n){var t=typeof n;return"function"==t?n:null==n?cn:("object"==t?x:A)(n)}function w(n){n=null==n?n:Object(n);var t,r=[];for(t in n)r.push(t);return r}function O(n,t){var r=-1,e=L(n)?Array(n.length):[];return $n(n,function(n,u,o){e[++r]=t(n,u,o)}),e}function x(n){var t=en(n);return function(r){
    var e=t.length;if(null==r)return!e;for(r=Object(r);e--;){var u=t[e];if(!(u in r&&j(n[u],r[u],an,3)))return false}return true}}function E(n,t){return n=Object(n),P(t,function(t,r){return r in n&&(t[r]=n[r]),t},{})}function A(n){return function(t){return null==t?an:t[n]}}function k(n,t,r){var e=-1,u=n.length;for(0>t&&(t=-t>u?0:u+t),r=r>u?u:r,0>r&&(r+=u),u=t>r?0:r-t>>>0,t>>>=0,r=Array(u);++e<u;)r[e]=n[e+t];return r}function N(n){return k(n,0,n.length)}function S(n,t){var r;return $n(n,function(n,e,u){return r=t(n,e,u),
      !r}),!!r}function T(t,r){return P(r,function(t,r){return r.func.apply(r.thisArg,n([t],r.args))},t)}function F(n,t,r,e){r||(r={});for(var u=-1,o=t.length;++u<o;){var i=t[u],c=e?e(r[i],n[i],i,r,n):n[i],f=r,a=f[i];En.call(f,i)&&(a===c||a!==a&&c!==c)&&(c!==an||i in f)||(f[i]=c)}return r}function R(n){return V(function(t,r){var e=-1,u=r.length,o=u>1?r[u-1]:an,o=typeof o=="function"?(u--,o):an;for(t=Object(t);++e<u;){var i=r[e];i&&n(t,i,e,o)}return t})}function B(n){return function(){var t=arguments,r=s(n.prototype),t=n.apply(r,t);
  return X(t)?t:r}}function D(n,t,r){function e(){for(var o=-1,i=arguments.length,c=-1,f=r.length,a=Array(f+i),l=this&&this!==wn&&this instanceof e?u:n;++c<f;)a[c]=r[c];for(;i--;)a[c++]=arguments[++o];return l.apply(t,a)}if(typeof n!="function")throw new TypeError("Expected a function");var u=B(n);return e}function I(n,t,r,e,u,o){var i=-1,c=1&u,f=n.length,a=t.length;if(f!=a&&!(2&u&&a>f))return false;for(a=true;++i<f;){var l=n[i],p=t[i];if(void 0!==an){a=false;break}if(c){if(!S(t,function(n){return l===n||r(l,n,e,u,o);
  })){a=false;break}}else if(l!==p&&!r(l,p,e,u,o)){a=false;break}}return a}function $(n,t,r){switch(r){case"[object Boolean]":case"[object Date]":return+n==+t;case"[object Error]":return n.name==t.name&&n.message==t.message;case"[object Number]":return n!=+n?t!=+t:n==+t;case"[object RegExp]":case"[object String]":return n==t+""}return false}function q(n,t,r,e,u,o){var i=2&u,c=en(n),f=c.length,a=en(t).length;if(f!=a&&!i)return false;for(var l=f;l--;){var p=c[l];if(!(i?p in t:En.call(t,p)))return false}for(a=true;++l<f;){
    var p=c[l],s=n[p],h=t[p];if(void 0!==an||s!==h&&!r(s,h,e,u,o)){a=false;break}i||(i="constructor"==p)}return a&&!i&&(r=n.constructor,e=t.constructor,r!=e&&"constructor"in n&&"constructor"in t&&!(typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)&&(a=false)),a}function z(n){var t=n?n.length:an;if(W(t)&&(Pn(n)||nn(n)||K(n))){n=String;for(var r=-1,e=Array(t);++r<t;)e[r]=n(r);t=e}else t=null;return t}function C(n){var t=n&&n.constructor,t=Q(t)&&t.prototype||xn;return n===t}function G(n){
      return n?n[0]:an}function J(n,t){return r(n,d(t),$n)}function M(n,t){return $n(n,typeof t=="function"?t:cn)}function P(n,t,r){return e(n,d(t),r,3>arguments.length,$n)}function U(n,t){var r;if(typeof t!="function")throw new TypeError("Expected a function");return n=Un(n),function(){return 0<--n&&(r=t.apply(this,arguments)),1>=n&&(t=an),r}}function V(n){var t;if(typeof n!="function")throw new TypeError("Expected a function");return t=In(t===an?n.length-1:Un(t),0),function(){for(var r=arguments,e=-1,u=In(r.length-t,0),o=Array(u);++e<u;)o[e]=r[t+e];
  for(u=Array(t+1),e=-1;++e<t;)u[e]=r[e];return u[t]=o,n.apply(this,u)}}function H(n,t){return n>t}function K(n){return Y(n)&&L(n)&&En.call(n,"callee")&&(!Rn.call(n,"callee")||"[object Arguments]"==kn.call(n))}function L(n){return null!=n&&!(typeof n=="function"&&Q(n))&&W(zn(n))}function Q(n){return n=X(n)?kn.call(n):"","[object Function]"==n||"[object GeneratorFunction]"==n}function W(n){return typeof n=="number"&&n>-1&&0==n%1&&9007199254740991>=n}function X(n){var t=typeof n;return!!n&&("object"==t||"function"==t);
  }function Y(n){return!!n&&typeof n=="object"}function Z(n){return typeof n=="number"||Y(n)&&"[object Number]"==kn.call(n)}function nn(n){return typeof n=="string"||!Pn(n)&&Y(n)&&"[object String]"==kn.call(n)}function tn(n,t){return t>n}function rn(n){return typeof n=="string"?n:null==n?"":n+""}function en(n){var t=C(n);if(!t&&!L(n))return Dn(Object(n));var r,e=z(n),u=!!e,e=e||[],o=e.length;for(r in n)!En.call(n,r)||u&&("length"==r||f(r,o))||t&&"constructor"==r||e.push(r);return e}function un(n){for(var t=-1,r=C(n),e=w(n),u=e.length,o=z(n),i=!!o,o=o||[],c=o.length;++t<u;){
    var a=e[t];i&&("length"==a||f(a,c))||"constructor"==a&&(r||!En.call(n,a))||o.push(a)}return o}function on(n){return n?u(n,en(n)):[]}function cn(n){return n}function fn(t,r,e){var u=en(r),o=b(r,u);null!=e||X(r)&&(o.length||!u.length)||(e=r,r=t,t=this,o=b(r,en(r)));var i=X(e)&&"chain"in e?e.chain:true,c=Q(t);return $n(o,function(e){var u=r[e];t[e]=u,c&&(t.prototype[e]=function(){var r=this.__chain__;if(i||r){var e=t(this.__wrapped__);return(e.__actions__=N(this.__actions__)).push({func:u,args:arguments,
  thisArg:t}),e.__chain__=r,e}return u.apply(t,n([this.value()],arguments))})}),t}var an,ln=1/0,pn=/[&<>"'`]/g,sn=RegExp(pn.source),hn=/^(?:0|[1-9]\d*)$/,vn={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"},yn={"function":true,object:true},_n=yn[typeof exports]&&exports&&!exports.nodeType?exports:an,gn=yn[typeof module]&&module&&!module.nodeType?module:an,bn=gn&&gn.exports===_n?_n:an,jn=o(yn[typeof self]&&self),mn=o(yn[typeof window]&&window),dn=o(yn[typeof this]&&this),wn=o(_n&&gn&&typeof global=="object"&&global)||mn!==(dn&&dn.window)&&mn||jn||dn||Function("return this")(),On=Array.prototype,xn=Object.prototype,En=xn.hasOwnProperty,An=0,kn=xn.toString,Nn=wn._,Sn=wn.Reflect,Tn=Sn?Sn.f:an,Fn=Object.create,Rn=xn.propertyIsEnumerable,Bn=wn.isFinite,Dn=Object.keys,In=Math.max,$n=function(n,t){
      return function(r,e){if(null==r)return r;if(!L(r))return n(r,e);for(var u=r.length,o=t?u:-1,i=Object(r);(t?o--:++o<u)&&false!==e(i[o],o,i););return r}}(g),qn=function(n){return function(t,r,e){var u=-1,o=Object(t);e=e(t);for(var i=e.length;i--;){var c=e[n?i:++u];if(false===r(o[c],c,o))break}return t}}();Tn&&!Rn.call({valueOf:1},"valueOf")&&(w=function(n){n=Tn(n);for(var t,r=[];!(t=n.next()).done;)r.push(t.value);return r});var zn=A("length"),Cn=V(function(t,r){return Pn(t)||(t=null==t?[]:[Object(t)]),_(r,1),
      n(N(t),on)}),Gn=V(function(n,t,r){return D(n,t,r)}),Jn=V(function(n,t){return h(n,1,t)}),Mn=V(function(n,t,r){return h(n,Vn(t)||0,r)}),Pn=Array.isArray,Un=Number,Vn=Number,Hn=R(function(n,t){F(t,en(t),n)}),Kn=R(function(n,t){F(t,un(t),n)}),Ln=R(function(n,t,r,e){F(t,un(t),n,e)}),Qn=V(function(n){return n.push(an,p),Ln.apply(an,n)}),Wn=V(function(n,t){return null==n?{}:E(n,_(t,1))}),Xn=d;l.prototype=s(a.prototype),l.prototype.constructor=l,a.assignIn=Kn,a.before=U,a.bind=Gn,a.chain=function(n){return n=a(n),
      n.__chain__=true,n},a.compact=function(n){return y(n,Boolean)},a.concat=Cn,a.create=function(n,t){var r=s(n);return t?Hn(r,t):r},a.defaults=Qn,a.defer=Jn,a.delay=Mn,a.filter=function(n,t){return y(n,d(t))},a.flatten=function(n){return n&&n.length?_(n,1):[]},a.flattenDeep=function(n){return n&&n.length?_(n,ln):[]},a.iteratee=Xn,a.keys=en,a.map=function(n,t){return O(n,d(t))},a.matches=function(n){return x(Hn({},n))},a.mixin=fn,a.negate=function(n){if(typeof n!="function")throw new TypeError("Expected a function");
  return function(){return!n.apply(this,arguments)}},a.once=function(n){return U(2,n)},a.pick=Wn,a.slice=function(n,t,r){var e=n?n.length:0;return r=r===an?e:+r,e?k(n,null==t?0:+t,r):[]},a.sortBy=function(n,t){var r=0;return t=d(t),O(O(n,function(n,e,u){return{c:n,b:r++,a:t(n,e,u)}}).sort(function(n,t){var r;n:{r=n.a;var e=t.a;if(r!==e){var u=null===r,o=r===an,i=r===r,c=null===e,f=e===an,a=e===e;if(r>e&&!c||!i||u&&!f&&a||o&&a){r=1;break n}if(e>r&&!u||!a||c&&!o&&i||f&&i){r=-1;break n}}r=0}return r||n.b-t.b;
  }),A("c"))},a.tap=function(n,t){return t(n),n},a.thru=function(n,t){return t(n)},a.toArray=function(n){return L(n)?n.length?N(n):[]:on(n)},a.values=on,a.extend=Kn,fn(a,a),a.clone=function(n){return X(n)?Pn(n)?N(n):F(n,en(n)):n},a.escape=function(n){return(n=rn(n))&&sn.test(n)?n.replace(pn,i):n},a.every=function(n,t,r){return t=r?an:t,v(n,d(t))},a.find=J,a.forEach=M,a.has=function(n,t){return null!=n&&En.call(n,t)},a.head=G,a.identity=cn,a.indexOf=function(n,t,r){var e=n?n.length:0;r=typeof r=="number"?0>r?In(e+r,0):r:0,
      r=(r||0)-1;for(var u=t===t;++r<e;){var o=n[r];if(u?o===t:o!==o)return r}return-1},a.isArguments=K,a.isArray=Pn,a.isBoolean=function(n){return true===n||false===n||Y(n)&&"[object Boolean]"==kn.call(n)},a.isDate=function(n){return Y(n)&&"[object Date]"==kn.call(n)},a.isEmpty=function(n){if(L(n)&&(Pn(n)||nn(n)||Q(n.splice)||K(n)))return!n.length;for(var t in n)if(En.call(n,t))return false;return true},a.isEqual=function(n,t){return j(n,t)},a.isFinite=function(n){return typeof n=="number"&&Bn(n)},a.isFunction=Q,a.isNaN=function(n){
      return Z(n)&&n!=+n},a.isNull=function(n){return null===n},a.isNumber=Z,a.isObject=X,a.isRegExp=function(n){return X(n)&&"[object RegExp]"==kn.call(n)},a.isString=nn,a.isUndefined=function(n){return n===an},a.last=function(n){var t=n?n.length:0;return t?n[t-1]:an},a.max=function(n){return n&&n.length?t(n,cn,H):an},a.min=function(n){return n&&n.length?t(n,cn,tn):an},a.noConflict=function(){return wn._===this&&(wn._=Nn),this},a.noop=function(){},a.reduce=P,a.result=function(n,t,r){return t=null==n?an:n[t],
      t===an&&(t=r),Q(t)?t.call(n):t},a.size=function(n){return null==n?0:(n=L(n)?n:en(n),n.length)},a.some=function(n,t,r){return t=r?an:t,S(n,d(t))},a.uniqueId=function(n){var t=++An;return rn(n)+t},a.each=M,a.first=G,fn(a,function(){var n={};return g(a,function(t,r){En.call(a.prototype,r)||(n[r]=t)}),n}(),{chain:false}),a.VERSION="4.5.1",$n("pop join replace reverse split push shift sort splice unshift".split(" "),function(n){var t=(/^(?:replace|split)$/.test(n)?String.prototype:On)[n],r=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",e=/^(?:pop|join|replace|shift)$/.test(n);
  a.prototype[n]=function(){var n=arguments;return e&&!this.__chain__?t.apply(this.value(),n):this[r](function(r){return t.apply(r,n)})}}),a.prototype.toJSON=a.prototype.valueOf=a.prototype.value=function(){return T(this.__wrapped__,this.__actions__)},(mn||jn||{})._=a,typeof define=="function"&&typeof define.amd=="object"&&define.amd? define(function(){return a}):_n&&gn?(bn&&((gn.exports=a)._=a),_n._=a):wn._=a}).call(this);
})();
(function vendorPlaceholder(){
  // Placeholder
    !function(e,a,t){function l(e){var a={},l=/^jQuery\d+$/;return t.each(e.attributes,function(e,t){t.specified&&!l.test(t.name)&&(a[t.name]=t.value)}),a}function r(e,l){var r=this,o=t(r);if(r.value==o.attr("placeholder")&&o.hasClass("placeholder"))if(o.data("placeholder-password")){if(o=o.hide().next().show().attr("id",o.removeAttr("id").data("placeholder-id")),e===!0)return o[0].value=l;o.focus()}else r.value="",o.removeClass("placeholder"),r==a.activeElement&&r.select()}function o(){var e,a=this,o=t(a),d=this.id;if(""==a.value){if("password"==a.type){if(!o.data("placeholder-textinput")){try{e=o.clone().attr({type:"text"})}catch(c){e=t("<input>").attr(t.extend(l(this),{type:"text"}))}e.removeAttr("name").data({"placeholder-password":!0,"placeholder-id":d}).bind("focus.placeholder",r),o.data({"placeholder-textinput":e,"placeholder-id":d}).before(e)}o=o.removeAttr("id").hide().prev().attr("id",d).show()}o.addClass("placeholder"),o[0].value=o.attr("placeholder")}else o.removeClass("placeholder")}var d,c,n="placeholder"in a.createElement("input"),i="placeholder"in a.createElement("textarea"),h=t.fn,u=t.valHooks;n&&i?(c=h.placeholder=function(){return this},c.input=c.textarea=!0):(c=h.placeholder=function(){var e=this;return e.filter((n?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":r,"blur.placeholder":o}).data("placeholder-enabled",!0).trigger("blur.placeholder"),e},c.input=n,c.textarea=i,d={get:function(e){var a=t(e);return a.data("placeholder-enabled")&&a.hasClass("placeholder")?"":e.value},set:function(e,l){var d=t(e);return d.data("placeholder-enabled")?(""==l?(e.value=l,e!=a.activeElement&&o.call(e)):d.hasClass("placeholder")?r.call(e,!0,l)||(e.value=l):e.value=l,d):e.value=l}},n||(u.input=d),i||(u.textarea=d),t(function(){t(a).delegate("form","submit.placeholder",function(){var e=t(".placeholder",this).each(r);setTimeout(function(){e.each(o)},10)})}),t(e).bind("beforeunload.placeholder",function(){t(".placeholder").each(function(){this.value=""})}))}(this,document,jQuery);
})();
(function helperCookie(){
  // cookie
    !function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){function n(e){return u.raw?e:encodeURIComponent(e)}function o(e){return u.raw?e:decodeURIComponent(e)}function i(e){return n(u.json?JSON.stringify(e):String(e))}function r(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(c," ")),u.json?JSON.parse(e):e}catch(n){}}function t(n,o){var i=u.raw?n:r(n);return e.isFunction(o)?o(i):i}var c=/\+/g,u=e.cookie=function(r,c,a){if(void 0!==c&&!e.isFunction(c)){if(a=e.extend({},u.defaults,a),"number"==typeof a.expires){var d=a.expires,f=a.expires=new Date;f.setTime(+f+864e5*d)}return document.cookie=[n(r),"=",i(c),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}for(var s=r?void 0:{},p=document.cookie?document.cookie.split("; "):[],m=0,v=p.length;v>m;m++){var x=p[m].split("="),k=o(x.shift()),l=x.join("=");if(r&&r===k){s=t(l,c);break}r||void 0===(l=t(l))||(s[k]=l)}return s};u.defaults={},e.removeCookie=function(n,o){return void 0===e.cookie(n)?!1:(e.cookie(n,"",e.extend({},o,{expires:-1})),!e.cookie(n))}});
})();


window.theme = window.theme || {};

/*============================================================================
  Section Loading
==============================================================================*/
theme.Sections = function Sections() {
  this.constructors = {};
  this.instances = [];

  $(document)
    .on('shopify:section:load', this._onSectionLoad.bind(this))
    .on('shopify:section:unload', this._onSectionUnload.bind(this))
    .on('shopify:section:select', this._onSelect.bind(this))
    .on('shopify:section:deselect', this._onDeselect.bind(this))
    .on('shopify:block:select', this._onBlockSelect.bind(this))
    .on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};
theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
  _createInstance: function(container, constructor) {
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');

    constructor = constructor || this.constructors[type];

    if (_.isUndefined(constructor)) {
      return;
    }

    var instance = _.assignIn(new constructor(container), {
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },

  _onSectionLoad: function(evt) {
    var container = $('[data-section-id]', evt.target)[0];
    if (container) {
      this._createInstance(container);
    }
  },

  _onSectionUnload: function(evt) {
    this.instances = _.filter(this.instances, function(instance) {
      var isEventInstance = (instance.id === evt.originalEvent.detail.sectionId);

      if (isEventInstance) {
        if (_.isFunction(instance.onUnload)) {
          instance.onUnload(evt);
        }
      }

      return !isEventInstance;
    });
  },

  _onSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.originalEvent.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onSelect)) {
      instance.onSelect(evt);
    }
  },

  _onDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.originalEvent.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onDeselect)) {
      instance.onDeselect(evt);
    }
  },

  _onBlockSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.originalEvent.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockSelect)) {
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.originalEvent.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockDeselect)) {
      instance.onBlockDeselect(evt);
    }
  },

  register: function(type, constructor) {
    this.constructors[type] = constructor;

    $('[data-section-type=' + type + ']').each(function(index, container) {
      this._createInstance(container, constructor);
    }.bind(this));
  }
});


/*============================================================================
  Other
==============================================================================*/
  var mobile = window.matchMedia('(max-width: 740px)');
  var tablet = window.matchMedia('(max-width: 979px) and (min-width: 741px)');
  var desktop = window.matchMedia('(min-width: 980px)');

$(document).ready(function(){
  (function animationAOS() {
    /* Initiate AOS Scrolling after Lazysizes loads */
    document.addEventListener('lazybeforeunveil', function(e){
      AOS.init({ disable: 'mobile' });
    });

    Events.on("editor:section:select", function() {
      AOS.init();
    });
  })();

  (function scrollUp(){
   $(window).scroll(function(){
     if ($(this).scrollTop() > 100) {
       $('.scrollup').fadeIn();
     } else {
       $('.scrollup').fadeOut();
     }
   });

   $('.scrollup').click(function(){
     $("html, body").animate({ scrollTop: 0 }, 600);
     return false;
   });
  })();

  (function helperPlaceholder(){
    // Help old browsers with placeholders for inputs
    $('input, textarea').placeholder();
  })();

  (function helperResponsiveTables(){
    $('.rte table').wrap('<div class="rte__table-wrapper"></div>');
  })();

  (function productQuickView() {
   $('[data-fancybox^="quick-view"]').fancybox({
      type : 'ajax',
      toolbar: false,
      infobar: false,
      arrows: false,
      baseClass: 'quickview-popup',
      afterShow: function () {
       var context = document.querySelector(".product-quick-view");
        Events.trigger("quickview:load", context);
      }
    });
  })();

  // Sidebar Toggle for screens below 980px wide
  var $Sidebar = $("#sidebar");
  $(document).on("click.toggleNav touch.toggleNav", ".show", function(){
    $Sidebar.toggleClass("open");
  });


  
  

  (function productSocialShare() {
    $(window).on('load resize orientationchange', function() {
      if ($(window).width() > 980) {
        var HHeight = $('header').height();
        var OffSet = Number(HHeight) + Number(20);

        $(".share-icons").stick_in_parent({
          parent: '.product-page',
          offset_top: OffSet
        });
      }
    });
  })();

});

/*============================================================================
  Product Modules
==============================================================================*/
var Events = new EventEmitter3();

Events.trigger = Events.emit; // trigger alias

theme.ProductForm = function (context, events, Product) {
  var $context = $(context);

  var config = JSON.parse(context.dataset.productForm || '{}');

  (function quantity_controls() {
    var element = context.querySelector(".product-quantity");

    if ( !element ) {
      return false;
    }

    events.on("quantitycontrol:plus", function() {
      var quantity = element.value;
      var max = element.max;

      if ( parseInt(quantity) >= parseInt(max) ) {
        var $addButtoncontainer = $('.product-add');
        var msg = "Only" + "\xa0" + max + "\xa0" + "of this item is available";
        var soldOutMsg = "This item is soldout";

        if ( max > 0 ) {
          $addButtoncontainer.before('<div class="errors qty-error">' + msg + '</div>');
        } else {
          $addButtoncontainer.before('<div class="errors qty-error">' + soldOutMsg + '</div>');
        }

        setTimeout(function(){
          $('.qty-error').fadeOut();
          $('.qty-error').remove();
        }, 2000);
      } else {
        var quantity = parseInt(element.value) + 1;

        if ( quantity < 1 ) {
          return false;
        }

        element.value = quantity;
      }
    });
    events.on("quantitycontrol:minus", function() {
      var quantity = parseInt(element.value) - 1;

      if ( quantity < 1 ) {
        return false;
      }

      element.value = quantity;
    });

    ControlPlus();
    ControlMinus();

    function ControlPlus() {
      var element = context.querySelector(".quantity-control-up");

      if ( !element ) {
        return false;
      }

      element.addEventListener("click", function (event) {
        event.preventDefault();
        events.trigger("quantitycontrol:plus");
      });
    }
    function ControlMinus() {
      var element = context.querySelector(".quantity-control-down");

      if ( !element ) {
        return false;
      }

      element.addEventListener("click", function (event) {
        event.preventDefault();
        events.trigger("quantitycontrol:minus");
      });
    }

  })();

  if ( Product.variants.length == 1 ) {
    return false;
  }


  new Shopify.OptionSelectors("product-select-" + Product.id, {
    product: Product,
    onVariantSelected: function(variant, selector) {

      if ( !variant ) {
        events.trigger("variantunavailable");
        return;
      }

      if ( Product.variants.length == 1 ) {
        return;
      }

      events.trigger("variantchange", variant);

      events.trigger("variantchange:option1:" + variant.option1);
      events.trigger("variantchange:option2:" + variant.option2);
      events.trigger("variantchange:option3:" + variant.option3);

      if ( variant.featured_image ) {
        events.trigger("variantchange:image", variant.featured_image.id);
      }
    },
    enableHistoryState: config.enable_history
  });

  (function quantity_limit() {
    events.on("variantchange", function (variant, element) {
      var element = context.querySelector(".product-quantity");

      if ( !element ) {
        return false;
      }

      element.max = variant.inventory_quantity;

      if ( element.max < 1 ) {
        element.value = "0";
      } else {
        element.value = "1";
      }

    });
  })();

  (function single_option_selectors() {
    var elements = context.querySelectorAll(".single-option-selector");

    elements.forEach(Selector);

    function Selector(element, index) {
      var option_position = index + 1;

      events.on("swatch:change:" + option_position, change);

      function change(value) {
        $(element).val(value).trigger("change");
      }
    }
  })();

  (function swatches() {
    var elements = context.querySelectorAll("[type=radio]");

    var states = {
      sold_out: function (element) {
        element.parentElement.classList.add("soldout");
      },
      available: function (element) {
        element.parentElement.classList.remove("soldout");
      }
    };

    events.on("variantunavailable", set_unavailable);

    elements.forEach(Swatch);

    function set_unavailable() {
      var selected = {};

      var selected_elements = $(elements).filter(":checked").toArray();

      selected_elements.forEach(function (element) {
        var option = "option" + element.getAttribute("data-position");
        var value = element.value;

        selected[option] = value;
      });

      elements.forEach(function (element) {
        var available = false;

        var current_option = "option" + element.getAttribute("data-position");

        var current_value = element.value;

        var other_options = ["option1", "option2", "option3"].filter(function (option) {
          return selected[option] && option != current_option;
        });

        Product.variants.forEach(function (variant) {
          if ( !variant.available ) {
            return;
          }

          if ( variant[current_option] != current_value ) {
            return;
          }

          if ( variant[other_options[0]] == selected[other_options[0]] && variant[other_options[1]] == selected[other_options[1]] ) {
            available = true;
            return;
          }
        });

        if ( available ) {
          states.available(element);
        } else {
          states.sold_out(element);
        }
      });
    }

    function Swatch(element) {
      var option_position = element.getAttribute("data-position");

      var current_option = "option" + option_position;

      var other_options = ["option1", "option2", "option3"].filter(function (option) {
        return option != current_option;
      });

      element.addEventListener("change", function (event) {
        events.trigger("swatch:change:" + option_position, element.value);
      });

      events.on("variantchange:option" + option_position + ":" + element.value, select);

      events.on("variantchange", set_availability);

      function select() {
        element.checked = true;
      }

      function set_availability(current_variant) {
        var available = false;

        Product.variants.forEach(function (variant) {
          if ( !variant.available ) {
            return;
          }

          if ( variant[current_option] != element.value ) {
            return;
          }

          if ( variant[other_options[0]] != current_variant[other_options[0]] ) {
            return;
          }

          if ( variant[other_options[1]] != current_variant[other_options[1]] ) {
            return;
          }

          available = true;
        });

        if ( available ) {
          states.available(element);
        } else {
          states.sold_out(element);
        }
      }
    }
  })();

  (function price() {
    var element = context.querySelector(".product-price .money") || context.querySelector(".product-price");

    events.on("variantchange", function (variant) {
      var price = money(variant.price);

      if ( !variant.available ) {
        price = config.sold_out;
      }

      element.innerHTML = price;

      events.on("variantunavailable", function (variant) {
        price = config.unavailable;
        element.innerHTML = price;
      });
    });
  })();

  (function compare_price() {
    var element = context.querySelector(".was");

    if ( !element ) {
      return false;
    }

    events.on("variantchange", function (variant) {
      var price = "";

      if ( variant.compare_at_price > variant.price ) {
        var price = money(variant.compare_at_price);
      }

      if ( !variant.available ) {
        price = "";
      }

      element.innerHTML = '<span class="money">' + price + '</span>';
    });
  })();

  (function sku() {
    var element = context.querySelector(".variant_sku");

    if ( !element ) {
      return false;
    }

    events.on("variantchange", function (variant) {
      var variant_sku = variant.sku;
      element.innerHTML = variant_sku;
    });
    events.on("variantunavailable", function (variant) {
      var variant_sku = config.unavailable;
      element.innerHTML = variant_sku;
    });

  })();

  (function add_to_cart() {
    var element = context.querySelector(".add");

    events.on("variantchange", function (variant) {
      var text = config.button;
      var disabled = false;

      if ( !variant.available ) {
        text = config.sold_out;
        disabled = true;
      }

      element.value = text;
      element.disabled = disabled;
    });

    events.on("variantunavailable", function () {
      element.value = config.unavailable;
      element.disabled = true;
    });
  })();

  (function smart_payment_buttons() {
    var element = context.querySelector(".shopify-payment-button");

    if ( !element ) {
      return false;
    }

    events.on("", function (variant) {

      if ( !variant.available ) {
         element.style.display = 'none';
       } else {
         element.style.display = 'block';
       }

    });
  })();

  function money(cents) {
    if ( config.currency_switcher_enabled ) {
      var converted = Currency.convert(cents, defaultCurrency, Currency.currentCurrency);
      var format = Currency.moneyFormats[Currency.currentCurrency][Currency.format];
      return Currency.formatMoney(converted, format);
    } else {
      return Shopify.formatMoney(cents, config.money_format);
    }
  }

  (function back_in_stock() {
    var element = context.querySelector(".back_in_stock");
    if ( !element ) {
      return false;
    }
    events.on("variantchange", function (variant) {
      if ( !variant.available ) {
         element.style.display = 'block';
         document.getElementById("hidden_variant").value = 'SKU: ' + variant.sku;
         document.getElementById("hidden_title").value = 'Variant: ' + variant.title;
       } else {
         element.style.display = 'none';
       }
    });

    $(".back_in_stock").click(function(){
      event.stopPropagation();
      $(".back-in-stock-snippet").show();
    });
    $(".back-in-stock-snippet").click(function(){
        event.stopPropagation();
    });
    $(document).on("click", function () {
      $(".back-in-stock-snippet").hide();
    });

  })();

}

theme.StaticGallery = function (context, events, Product) {
  events.trigger = events.emit;
  var $context = $(context);

  var config = JSON.parse(context.dataset.galleryConfig || '{}');

  var mainCarousel = $(".product-image-container", context);
  var thumbnailCarousel = $(".thumbnail-slider", context);

  (function enlargePhoto() {
    // Create template for Facebook Button
    $.fancybox.defaults.btnTpl.fb = '<button data-fancybox-fb class="fancybox-button fancybox-button--fb" title="Facebook">' +
      '<svg viewBox="0 0 24 24">' +
      '<path d="M22.676 0H1.324C.594 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294h-3.13v-3.62h3.13V8.41c0-3.1 1.894-4.785 4.66-4.785 1.324 0 2.463.097 2.795.14v3.24h-1.92c-1.5 0-1.793.722-1.793 1.772v2.31h3.584l-.465 3.63h-3.12V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .594 23.408 0 22.676 0"/>' +
      '</svg>' +
      '</button>';

    // Create template for Twitter Button
    $.fancybox.defaults.btnTpl.tw = '<button data-fancybox-tw class="fancybox-button fancybox-button--tw" title="Twitter">' +
      '<svg viewBox="0 0 24 24">' +
      '<path d="M23.954 4.57c-.885.388-1.83.653-2.825.774 1.013-.61 1.793-1.574 2.162-2.723-.95.556-2.005.96-3.127 1.185-.896-.96-2.173-1.56-3.59-1.56-2.718 0-4.92 2.204-4.92 4.918 0 .39.044.765.126 1.124C7.69 8.094 4.067 6.13 1.64 3.16c-.427.723-.666 1.562-.666 2.476 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.06c0 2.386 1.693 4.375 3.946 4.828-.413.11-.85.17-1.296.17-.314 0-.615-.03-.916-.085.63 1.952 2.445 3.376 4.604 3.416-1.68 1.32-3.81 2.105-6.102 2.105-.39 0-.78-.022-1.17-.066 2.19 1.394 4.768 2.21 7.557 2.21 9.054 0 14-7.497 14-13.987 0-.21 0-.42-.016-.63.962-.69 1.8-1.56 2.46-2.548l-.046-.02z"/>' +
      '</svg>' +
      '</button>';

    // Make buttons clickable using event delegation
    $('body').on('click', '[data-fancybox-fb]', function() {
      window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(window.location.href)+"&t="+encodeURIComponent(document.title), '','left=0,top=0,width=600,height=300,menubar=no,toolbar=no,resizable=yes,scrollbars=yes');
    });

    $('body').on('click', '[data-fancybox-tw]', function() {
      window.open('http://twitter.com/share?url='+encodeURIComponent(window.location.href)+'&text='+encodeURIComponent(document.title), '', 'left=0,top=0,width=600,height=300,menubar=no,toolbar=no,resizable=yes,scrollbars=yes');
    });

    $('[data-fancybox="images"]').fancybox({
      loop: true,
      transitionDuration: 100,
      animationDuration: 500,
      animationEffect: "fade",
      buttons: [
        'fb',
        'tw',
        "zoom",
        "fullScreen",
        "slideShow",
        "thumbs",
        "close"
      ]
    });

  })();

  (function zoom() {
    var elements = context.querySelectorAll(".product-main-image");

    Events.on("mediaquery:desktop", enableZoom);
    Events.on("mediaquery:tablet", disableZoom);
    Events.on("mediaquery:mobile", disableZoom);
    Events.on("editor:section:select", function() {
      if ( desktop.matches ) {
        enableZoom();
      }
    });

    function enableZoom() {
     elements.forEach(function (element) {
       var src = element.querySelector("img"),
           src = src.getAttribute("data-zoom-src"),
           src = src.replace("{width}", "2000");

       $(element).zoom({ url: src });
     });
    }

    function disableZoom() {
      elements.forEach(function (element) {
        $(element).trigger('zoom.destroy');
      });
    }

  })();

  (function thumbnailSlider() {

    if ( config.thumbnailPosition === 'below' ) {
      var vertical = false;
      var nextarrow = '<a class="slick-next slick-arrow"><i class="la la-angle-right" aria-hidden="true"></i></a>'
      var prevarrow = '<a class="slick-prev slick-arrow"><i class="la la-angle-left" aria-hidden="true"></i></a>'
    } else {
      var vertical = true;
      var nextarrow = '<a class="slick-next slick-arrow"><i class="la la-angle-down" aria-hidden="true"></i></a>';
      var prevarrow = '<a class="slick-prev slick-arrow"><i class="la la-angle-up" aria-hidden="true"></i></a>';
    }

    var arrows = false;
    var dots = false;

    if ( config.sliderControls === 'arrows' ) {
      var arrows = true;
    } else if ( config.sliderControls === 'dots' ) {
      var dots = true;
    }

    Events.on("mediaquery:desktop", function() {
      if ( config.thumbnailLimit < 1 ) {
        disableThumbnailSlider();
      }
    });
    Events.on("editor:section:select", function() {
      if ( desktop.matches && config.thumbnailLimit > 1 ) {
        enableThumbnailSlider();
      }
    });

    $(window).on( 'load resize', enableThumbnailSlider);

    function enableThumbnailSlider() {

      $(thumbnailCarousel).not('.slick-initialized').slick({
        infinite: true,
        lazyLoad:"progressive",
        vertical: vertical,
        speed:600,
        arrows: arrows,
        nextArrow: nextarrow,
        prevArrow: prevarrow,
        dots: dots,
        slidesToShow: config.thumbnailLimit,
        slidesToScroll: 1,
        focusOnSelect: true,
        responsive: [{
          breakpoint: 980,
            settings: "unslick"
        }]
      });

      $(document).ready(function() {
        setTimeout(function() {
          thumbnailCarousel.hide().css('visibility','visible').fadeIn('slow');
        }, 200);
      });
    }

    function disableThumbnailSlider() {
     if( thumbnailCarousel.hasClass('slick-initialized') ) {
       $(thumbnailCarousel).slick('unslick');
     }
    }

  })();

  (function thumbnails() {
    var $elements = $(".product-thumbnail", context);

    $elements.on("click", function(event) {
      event.preventDefault();

      var id = this.dataset.imageId;

      select(id);

      events.trigger("thumbnail:click", id);
    });

    events.on("variantchange:image", select);

    function select(id) {
      var image = $elements.filter("[data-image-id=" + id + "]");

      if (!image.length) {
        return false;
      }

      $elements
        .removeClass("selected")
        .filter(image)
        .addClass("selected");
    }
  })();

  (function mainImages() {
    var $elements = $(".product-main-image", context);

    events
      .on("thumbnail:click", select)
      .on("variantchange:image", select);

    function select(id) {
      var image = $elements.filter("[data-image-id=" + id + "]");

      if ( !image.length ) {
        return false;
      }

      $elements
        .removeClass("selected")
        .hide()
        .filter(image)
        .addClass("selected")
        .show();
    };
  })();

  (function mobileSlider() {
    Events.on("mediaquery:desktop", function() {
      disableCarousel();
    });
    Events.on("mediaquery:tablet", function() {
      disableCarousel();
    });
    Events.on("mediaquery:mobile", function() {
      enableCarousel();
    });
    Events.on("editor:section:select", function() {
      if ( mobile.matches ) {
        enableCarousel();
      }
    });

    function enableCarousel() {
      $(mainCarousel).not('.slick-initialized').slick({
        infinite: true,
        mobileFirst: true,
        slidesToShow: 1,
        vertical: false,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
        nextArrow: '<a class="slick-next slick-arrow"><i class="la la-angle-right" aria-hidden="true"></i></a>',
        prevArrow: '<a class="slick-prev slick-arrow"><i class="la la-angle-left" aria-hidden="true"></i></a>',
        dots: false,
        rows: 1
      });

      setTimeout(function(){
        var trackHeight = $('.product-main-image', context).height();

        $(mainCarousel).height(trackHeight);
        $('.product-main-images .slick-track', context).height(trackHeight);
        $('.product-main-images .slick-list', context).height(trackHeight);
      }, 500);


      var $elements = $(".product-main-images .slick-slide", context);

      events.on("variantchange:image", select);

      function select(id) {
        var slide = $elements.find("[data-image-id=" + id + "]");
        var slideOriginal = slide.filter(".product-main-image.selected");
        var index = slideOriginal.closest('.slick-slide').data("slickIndex");

        $(mainCarousel).slick('slickGoTo', index);
      };
    }

    function disableCarousel() {
     if( mainCarousel.hasClass('slick-initialized') ) {
       $(mainCarousel).slick('unslick');
     }
    }

  })();
}

theme.ScrollGallery = function (context, events) {
  events.trigger = events.emit;
  var $context = $(context);

  var config = JSON.parse(context.dataset.galleryConfig || '{}');

  var mainCarousel = $(".product-image-container", context);

  (function mainImages() {
    Events.on("mediaquery:desktop", function() {
      enableScrollGallery();
      disableCarousel();
    });
    Events.on("mediaquery:mobile", enableCarousel);
    Events.on("mediaquery:tablet", enableCarousel);
    Events.on("editor:section:select", function() {
      if ( desktop.matches ) {
        enableScrollGallery();
        disableCarousel();
      } else {
      	enableCarousel();
      }
    });

    function enableCarousel() {
      var arrows = false;
  	  var dots = false;

      if ( config.sliderControls === 'arrows' ) {
        var arrows = true;
      } else if ( config.sliderControls === 'dots' ) {
        var dots = true;
      }


      $(mainCarousel).not('.slick-initialized').slick({
        infinite: true,
        mobileFirst: true,
        slidesToShow: 1,
        vertical: false,
        slidesToScroll: 1,
        fade: false,
        arrows: arrows,
        nextArrow: '<a class="slick-next slick-arrow"><i class="la la-angle-right" aria-hidden="true"></i></a>',
        prevArrow: '<a class="slick-prev slick-arrow"><i class="la la-angle-left" aria-hidden="true"></i></a>',
        dots: dots
      });

      var $elements = $(".slick-slide", context);

      events.on("variantchange:image", select);

      function select(id) {
        var slides = $elements.find("[data-image-id]");
        var slide = slides.filter("[data-image-id=" + id + "]");
        var index = slides.index(slide);
        $(mainCarousel).slick('slickGoTo', index-1);
      };
    }

    function disableCarousel() {
     if( mainCarousel.hasClass('slick-initialized') ) {
       $(mainCarousel).slick('unslick');
     }
    }

    function enableScrollGallery() {
      var $elements = $(".product-main-image", context);

      events.on("variantchange:image", select);

      function select(id) {
        var image = $elements.filter("[data-image-id=" + id + "]");

        if ( !image.length ) {
          return false;
        }

        $elements
        .removeClass("selected")
        .filter(image)
        .addClass("selected")

        if ( template === 'index' ) {
          var selectedImage = context.querySelector('.selected');
          selectedImage.scrollIntoView();
        } else {
          var headerHeight = document.querySelector('header').offsetHeight;
          $('html, body').animate({
            scrollTop: $('.selected').offset().top -headerHeight
          }, 'slow');
        }

      };

    }

  })();

  (function zoom() {
    var elements = context.querySelectorAll(".product-main-image");

    Events.on("mediaquery:desktop", enableZoom);
    Events.on("mediaquery:tablet", disableZoom);
    Events.on("mediaquery:mobile", disableZoom);
    Events.on("editor:section:select", function() {
      if ( desktop.matches ) {
        enableZoom();
      }
    });

    function enableZoom() {
     elements.forEach(function (element) {
       var src = element.querySelector("img"),
           src = src.getAttribute("data-zoom-src"),
           src = src.replace("{width}", "2000");

       $(element).zoom({ url: src });
     });
    }

    function disableZoom() {
      elements.forEach(function (element) {
        $(element).trigger('zoom.destroy');
      });
    }

  })();

  (function scrollForm() {
    $(window).on('load resize orientationchange', function() {
      if ($(window).width() > 980) {
        var HHeight = $('header').height();
        var OffSet = Number(HHeight) + Number(20);

        $("#sticky-item").stick_in_parent({
          parent: '#sticky-container',
          offset_top: OffSet
        });
      }
    });
  })();


  (function enlargePhoto() {
    // Create template for Facebook Button
    $.fancybox.defaults.btnTpl.fb = '<button data-fancybox-fb class="fancybox-button fancybox-button--fb" title="Facebook">' +
      '<svg viewBox="0 0 24 24">' +
      '<path d="M22.676 0H1.324C.594 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294h-3.13v-3.62h3.13V8.41c0-3.1 1.894-4.785 4.66-4.785 1.324 0 2.463.097 2.795.14v3.24h-1.92c-1.5 0-1.793.722-1.793 1.772v2.31h3.584l-.465 3.63h-3.12V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .594 23.408 0 22.676 0"/>' +
      '</svg>' +
      '</button>';

    // Create template for Twitter Button
    $.fancybox.defaults.btnTpl.tw = '<button data-fancybox-tw class="fancybox-button fancybox-button--tw" title="Twitter">' +
      '<svg viewBox="0 0 24 24">' +
      '<path d="M23.954 4.57c-.885.388-1.83.653-2.825.774 1.013-.61 1.793-1.574 2.162-2.723-.95.556-2.005.96-3.127 1.185-.896-.96-2.173-1.56-3.59-1.56-2.718 0-4.92 2.204-4.92 4.918 0 .39.044.765.126 1.124C7.69 8.094 4.067 6.13 1.64 3.16c-.427.723-.666 1.562-.666 2.476 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.06c0 2.386 1.693 4.375 3.946 4.828-.413.11-.85.17-1.296.17-.314 0-.615-.03-.916-.085.63 1.952 2.445 3.376 4.604 3.416-1.68 1.32-3.81 2.105-6.102 2.105-.39 0-.78-.022-1.17-.066 2.19 1.394 4.768 2.21 7.557 2.21 9.054 0 14-7.497 14-13.987 0-.21 0-.42-.016-.63.962-.69 1.8-1.56 2.46-2.548l-.046-.02z"/>' +
      '</svg>' +
      '</button>';

    // Make buttons clickable using event delegation
    $('body').on('click', '[data-fancybox-fb]', function() {
      window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(window.location.href)+"&t="+encodeURIComponent(document.title), '','left=0,top=0,width=600,height=300,menubar=no,toolbar=no,resizable=yes,scrollbars=yes');
    });

    $('body').on('click', '[data-fancybox-tw]', function() {
      window.open('http://twitter.com/share?url='+encodeURIComponent(window.location.href)+'&text='+encodeURIComponent(document.title), '', 'left=0,top=0,width=600,height=300,menubar=no,toolbar=no,resizable=yes,scrollbars=yes');
    });

    $('[data-fancybox="images"]').fancybox({
      loop : true,
      transitionDuration : 100,
      animationDuration : 500,
      animationEffect : "fade",
      buttons: [
        'fb',
        'tw',
        "zoom",
        "fullScreen",
        "slideShow",
        "thumbs",
        "close"
      ]
    });

  })();
}

theme.Product = (function () {
  function Product(container) {

    var events = new EventEmitter3();
        events.trigger = events.emit; // alias

   var productJson = document.getElementById('product-json');

   if ( !productJson ) {
     return false;
   }

   var Product = productJson.innerHTML,
       Product = JSON.parse(Product || '{}');

    container.querySelectorAll("[data-product-form]").forEach(function (context) {
      theme.ProductForm(context, events, Product);
    });

    container.querySelectorAll(("[data-static-gallery]")).forEach(function (context) {
      theme.StaticGallery(context, events, Product);
    });

    container.querySelectorAll(("[data-scroll-gallery]")).forEach(function (context) {
      theme.ScrollGallery(context, events);
    });
  }

  Product.prototype = _.assignIn({}, Product.prototype, {});

  return Product;
})();




/*============================================================================
  Header
==============================================================================*/
theme.Header = (function() {
  function Header(container) {

   (function searchPopup() {
     $('a#search_trigger').click(function(event){
         event.stopPropagation();
          $("#search_reveal").slideToggle("500");
          return false;
     });
     $("#search_reveal").on("click", function (event) {
         event.stopPropagation();
     });
     $(document).on("click", function () {
       $("#search_reveal").slideUp('500');
     });
   })();

   (function menuEdge() {
     /* Ensure that sub nav menus open to the left if any chance of offscreen overflow */
     $("ul.submenu li").on('mouseenter mouseleave', function (e) {
       if ($('ul', this).length) {
         var elm = $('ul:first', this);
         var off = elm.offset();
         var l = off.left;
         var w = elm.width();
         var docH = $("#PageContainer").height();
         var docW = $("#PageContainer").width();

         var isEntirelyVisible = (l + w <= docW);

         if (!isEntirelyVisible) {
             $(this).addClass('edge');
         } else {
             $(this).removeClass('edge');
         }
       }
     });
   })();

   (function enableStickyHeader() {
     var Heightcalculate = $('header').height();
     var stickyHeader = document.querySelector('header').dataset.sticky;
     var scrollHeader = $("header.scrollheader");

     $(window).scroll(function() {
       var scroll = $(window).scrollTop();
       if (scroll >= 1 && stickyHeader == 'true') {
         scrollHeader.removeClass('scrollheader').addClass("coverheader");
         $('#phantom').show();
         $('#phantom').css('height', Heightcalculate+'px');
       } else {
         scrollHeader.removeClass("coverheader").addClass('scrollheader');
         $('#phantom').hide();
       }
     });
   })();

    $(".has_sub_menu").hover(function(){
      $(this).attr('aria-expanded', function(index, attr){
        return attr == 'false' ? true : 'false';
      });
    });

    jQuery(window).trigger('resize').trigger('scroll');
  }
  Header.prototype = _.assignIn({}, Header.prototype, {});

  return Header;
})();

/*============================================================================
  Featured collection section
==============================================================================*/
theme.FeaturedCollection = (function() {
  function Carousel(container) {

    var $container = this.$container = $(container),
        $slideWrapper = $(".collection-carousel", container),
        grid = $slideWrapper.data('grid'),
        lazyImages = $slideWrapper.find('.reveal'),
        lazyCounter = 0;

    var sliderControls = document.querySelector(".collection-carousel");

    if (!sliderControls) {
      return false;
    }

    var sliderControls = sliderControls.dataset.sliderControls;

    var arrows = false;
    var dots = false;

    if (sliderControls === 'arrows') {
      var arrows = true;
    } else if (sliderControls === 'dots') {
      var dots = true;
    }

    function initCarousel() {
      $slideWrapper.not('.slick-initialized').slick({
        infinite: true,
        autoplaySpeed:4000,
        lazyLoad:"progressive",
        speed:600,
        arrows: arrows,
        nextArrow: '<a class="slick-next slick-arrow"><i class="la la-angle-right" aria-hidden="true"></i></a>',
        prevArrow: '<a class="slick-prev slick-arrow"><i class="la la-angle-left" aria-hidden="true"></i></a>',
        dots: dots,
        slidesToShow: grid,
        slidesToScroll: 2,
        responsive: [
          {
            breakpoint: 740,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
        ]
      });
    }
    initCarousel();

    $(document).on('shopify:section:load', function(event) {
      initCarousel();
    });

    $(document).on('shopify:section:unload', function(event) {
      var target = $(event.target);
      target.find('.collection-carousel').slick('destroy');
      $(document).off('.collection-carousel');
    });

  }
  return Carousel;
})();

/*============================================================================
  Flexslider
==============================================================================*/
theme.Slideshow = (function() {
  function Slideshow(container) {

    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var speed = $('.flexslider').data('speed');

    $('.flexslider').flexslider({
      animation: 'fade',
      slideshowSpeed: speed,
      animationSpeed: 600,
      directionNav: true,
      controlNav: true,
      pauseOnHover: true,
      pauseOnAction: true,
        prevText: "",
        nextText: ""
    });
  }
  return Slideshow;
})();

theme.Slideshow.prototype = _.assignIn({}, theme.Slideshow.prototype, {

  onBlockSelect: function(event) {

    // Ignore the cloned version
    var Slider = $(event.target).closest('.flexslider').data('flexslider');
    var $slide =  $(event.target);
    var slideIndex = $slide.data('flexslider-index');
    // Go to selected slide, pause autoplay

    console.log(slideIndex);

    Slider.flexslider(slideIndex);
    Slider.flexslider("pause");

  },
  onBlockDeselect: function() {
    var Slider = $(event.target).closest('.flexslider').data('flexslider');
    // Resume autoplay
    Slider.flexslider("play");

  }
});

/*============================================================================
  New Slideshow Section
==============================================================================*/
theme.newSlideshow = (function() {
  function Slideshow(container) {
    var slideWrapper = $(".main-slider"),
      iframes = slideWrapper.find('.embed-player'),
      lazyImages = slideWrapper.find('.slide-image'),
      lazyCounter = 0;

    var videoAudio = document.querySelector(".main-slider").dataset.videoAudio;
    var sliderControls = document.querySelector(".main-slider").dataset.sliderControls;

    // POST commands to YouTube or Vimeo API
    function postMessageToPlayer(player, command){
      if (player == null || command == null) return;
      player.contentWindow.postMessage(JSON.stringify(command), "*");
    }

    // When the slide is changing
    function playPauseVideo(slick, control){
      var currentSlide, slideType, startTime, player, video;

      currentSlide = slick.find(".slick-current");
      slideType = document.querySelector(".slick-current .item").dataset.slideType;
      player = currentSlide.find("iframe").get(0);
      startTime = currentSlide.data("video-start");

      if (videoAudio === 'off') {
        var audio = "mute"
      }

      if (slideType === "vimeo") {
        switch (control) {
          case "play":
            if ((startTime != null && startTime > 0 ) && !currentSlide.hasClass('started')) {
              currentSlide.addClass('started');
              postMessageToPlayer(player, {
                "method": "setCurrentTime",
                "value" : startTime
              });
            }
            postMessageToPlayer(player, {
              "method": "play",
              "value" : 1
            });
            break;
          case "pause":
            postMessageToPlayer(player, {
              "method": "pause",
              "value": 1
            });
            break;
        }
      } else if (slideType === "youtube") {
        switch (control) {
          case "play":
            postMessageToPlayer(player, {
              "event": "command",
              "func": audio
            });
            postMessageToPlayer(player, {
              "event": "command",
              "func": "playVideo"
            });
            break;
          case "pause":
            postMessageToPlayer(player, {
              "event": "command",
              "func": "pauseVideo"
            });
            break;
        }
      } else if (slideType === "video") {
        currentItem = document.querySelector(".slick-current .item");
        video = currentItem.querySelector("video");

        if (video != null) {
          if (control === "play"){
            video.play();
          } else {
            video.pause();
          }
        }
      }
    }

    // Resize player
    function resizePlayer(iframes, ratio) {
      if (!iframes[0]) return;
      var win = $(".main-slider"),
          width = win.width(),
          playerWidth,
          height = win.height(),
          playerHeight,
          ratio = ratio || 16/9;

      iframes.each(function(){
        var current = $(this);
        if (width / ratio < height) {
          playerWidth = Math.ceil(height * ratio);
          current.width(playerWidth).height(height).css({
            left: (width - playerWidth) / 2,
             top: 0
            });
        } else {
          playerHeight = Math.ceil(width / ratio);
          current.width(width).height(playerHeight).css({
            left: 0,
            top: (height - playerHeight) / 2
          });
        }
      });
    }

    // DOM Ready
    $(function() {
      // Initialize
      slideWrapper.on("init", function(slick){
        slick = $(slick.currentTarget);
        setTimeout(function(){
          playPauseVideo(slick,"play");
        }, 1000);
        resizePlayer(iframes, 16/9);
      });
      slideWrapper.on("beforeChange", function(event, slick) {
        slick = $(slick.$slider);
        playPauseVideo(slick,"pause");
      });
      slideWrapper.on("afterChange", function(event, slick) {
        slick = $(slick.$slider);
        playPauseVideo(slick,"play");
      });
      slideWrapper.on("lazyLoaded", function(event, slick, image, imageSource) {
        lazyCounter++;
        if (lazyCounter === lazyImages.length){
          lazyImages.addClass('show');
          // slideWrapper.slick("slickPlay");
        }
      });


      var arrows = false;
      var dots = false;

      if (sliderControls === 'arrows') {
        var arrows = true;
      } else if (sliderControls === 'dots') {
        var dots = true;
      }

      //start the slider
      slideWrapper.slick({
        // fade:true,
        autoplaySpeed:4000,
        lazyLoad:"progressive",
        speed:600,
        arrows: arrows,
        nextArrow: '<a class="slick-next slick-arrow"><i class="la la-angle-right" aria-hidden="true"></i></a>',
        prevArrow: '<a class="slick-prev slick-arrow"><i class="la la-angle-left" aria-hidden="true"></i></a>',
        dots: dots,
        cssEase:"cubic-bezier(0.87, 0.03, 0.41, 0.9)"
      });

    });

    // Resize event
    $(window).on("resize.slickVideoPlayer", function(){
      resizePlayer(iframes, 16/9);
    });

  }
  return Slideshow;
})();

theme.newSlideshow.prototype = _.assignIn({}, theme.newSlideshow.prototype, {

  onBlockSelect: function(event) {

    // Ignore the cloned version
    var Slider = $(event.target).closest('.main-slider');
    var $slide =  $(event.target);
    var slideIndex = $slide.data('slider-index');

    // // Go to selected slide, pause autoplay
    Slider.slick("slickGoTo", slideIndex);
    Slider.slick("slickPause");

  },
  onBlockDeselect: function() {
    var Slider = $(event.target).closest('.main-slider');
    Slider.slick("slickPlay");

  }
});

/*============================================================================
  Map Section
==============================================================================*/
theme.Maps = (function() {

  var errors = {
     address_no_results: "translation missing: en.general.map_errors.address_no_results",
     address_query_limit: "translation missing: en.general.map_errors.address_query_limit",
     address_error: "translation missing: en.general.map_errors.address_error",
     auth_error: "translation missing: en.general.map_errors.auth_error"
  };

  var google_api_loaded = false;

  function Map(container) {

    var events = new EventEmitter3();
    events.trigger = events.emit; // alias

    window.gm_authFailure = function () {
      google_api_loaded = false;

      if ( Shopify.designMode ) {
        events.trigger("gmauthfailure:themeeditor");
      } else {
        events.trigger("gmauthfailure");
      }
    };

    var config = container.querySelector("[data-map-config]").innerHTML,
        config = JSON.parse(config);

    if ( !config.api_key ) {
      return false;
    }

    (function section_container() {
      var element = container;

      events.on("gmauthfailure:themeeditor", error);
      events.on("map:error", error);

      function error() {
        element.classList.add("map-section-load-error");
      }
    })();

    (function background_image() {
      var element = container.querySelector("[data-bg-image]");

      events.on("gmauthfailure", show);

      function show() {
        element.classList.add("show-image");
      }
    })();

    (function overlay() {
      var element = container.querySelector("[data-map-overlay]");

      events.on("gmauthfailure:themeeditor", error);
      events.on("map:error", error);

      function error(message) {
        message = message || errors.auth_error;
        element.innerHTML = '<div class="map-section-error errors text-center">' + message + '</div>';
      }
    })();

    (function map() {
      var element = container.querySelector("[data-map]");

      events.on("ready", geolocate);

      function geolocate() {

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ address: config.address }, function(results, status) {

          if ( status == google.maps.GeocoderStatus.OK ) {
            render(results);
          } else {
            error(status);
          }
        });
      }

      function render(results) {
        element.innerHTML = "";

        var map = new google.maps.Map(element, {
          zoom: config.zoom,
          center: results[0].geometry.location,
          draggable: false,
          clickableIcons: false,
          scrollwheel: false,
          disableDoubleClickZoom: true,
          styles: config.styles,
          disableDefaultUI: true
        });

        var center = map.getCenter();

        new google.maps.Marker({
          map: map,
          position: center
        });

        google.maps.event.addDomListener(window, "resize", $.debounce(250, function () {
          google.maps.event.trigger(map, "resize");
          map.setCenter(center);
        }));

        $(document).on("shopify:section:unload", function () {
          google.maps.event.clearListeners(map, "resize");
        });
      }

      function error(status) {
        var message = errors.address_error;
        switch (status) {
          case 'ZERO_RESULTS':
            message = errors.address_no_results;
            break;
          case 'OVER_QUERY_LIMIT':
            message = errors.address_query_limit;
            break;
          case 'REQUEST_DENIED':
            message = errors.auth_error;
            break;
        }

        if ( Shopify.designMode ) {
          events.trigger("map:error", message);
        }
      }
    })();

    if ( google_api_loaded ) {
      events.trigger("ready");
    } else {
      $.getScript("https://maps.googleapis.com/maps/api/js?key=" + config.api_key, function () {
        google_api_loaded = true;
        events.trigger("ready");
      });
    }
  }

  Map.prototype = _.assignIn({}, Map.prototype, {});

  return Map;
})();

/*============================================================================
  Instagram feed
==============================================================================*/
theme.Instagram = (function() {
  function Instagram(container) {

    var $container = this.$container = $(container);
    var id = $container.attr('data-section-id');
    var instafeedEl = this.instagram = $('#instafeed-' + id);
    var instafeedId = this.instagram = 'instafeed-' + id;
    var template = $("#instagram-template").html();
    var limit = instafeedEl.attr('data-item-limit');

    var userFeed = new Instafeed({
      get: 'user',
      limit: limit,
      userId: 'self',
      target: instafeedId,
      accessToken: instafeedEl.attr('data-access-token'),
      resolution: 'standard_resolution',
      template: template
    });

    if( !_.isUndefined( userFeed.options.accessToken) ){
      userFeed.run();
    }
  }

  Instagram.prototype = _.assignIn({}, Instagram.prototype, {
    onSelect: function() {
      Instagram();
    }
  });

  return Instagram;

})();

/*============================================================================
  Parallax on index
==============================================================================*/
theme.Parallax = (function() {
  function Parallax(container) {

    var $container = this.$container = $(container);
    var id = $container.attr('data-section-id');

    // Parallax scrolling backgrounds edit to work with new theme editor, building bgset url based on data-bgset.
    var initParallaximage = function(ParallaxImages) {
      ParallaxImages.each(function () {
        var bgset = this.getAttribute("data-bgset").trim().split(",");

        var bgset_srcs = bgset.map(function (src) {
          return src.trim().split(" ")[0];
        });

        var bgset_widths = bgset.map(function (src) {
          return src.trim().split(" ")[1].replace("w","") + "px";
        });

        var src = null;

        bgset_widths.forEach(function (width, index) {
          if ( !src && matchMedia("(max-width: " + width + ")").matches ) {
            src = bgset_srcs[index];
          }
        });

        if ( !src ) {
          src = bgset_srcs[bgset_srcs.length - 1];
        }

        $(this).parallax({ imageSrc: src });
      });
    };

   // Intitate parallax, the reinitiate on resize of browser to update bgset url
    var parallax_images = $('.parallax-window');

    initParallaximage(parallax_images);

    window.addEventListener("resize", debounce(function () {
      parallax_images.parallax("destroy");
      initParallaximage(parallax_images);
    }, 1000));

    $(document).on('shopify:section:unload', function(event) {
      var target = $(event.target);
      target.find('.parallax-window').parallax('destroy');
      $(document).off('.parallax-window');
    });

    $(document).on('shopify:section:load', function(event) {
      initParallaximage($(event.target).find('.parallax-window'));
    });

  }
  Parallax.prototype = _.assignIn({}, Parallax.prototype, {});

  return Parallax;
})();

/*============================================================================
  Info slider
==============================================================================*/
theme.InfoSlider = (function() {
  function InfoSlider(container) {

    var speed = $('.info-bar-content').data('speed'),
        arrows = $('.info-bar-content').data('arrows'),
        autoplay = $('.info-bar-content').data('autoplay'),
        slidesshown = $('.info-bar-content').data('shown');

    var $textSlide = $('.info-bar-content');
    var initInfoSlider = function(Slideshow) {

      $textSlide.not('.slick-initialized').slick({
         mobileFirst: true,
         slidesToShow: 1,
         vertical: false,
         slidesToScroll: 1,
         autoplay: autoplay,
         autoplaySpeed: speed,
         arrows: arrows,
         fade: false,
         nextArrow: '<a class="slick-next slick-arrow"><i class="la la-angle-right" aria-hidden="true"></i></a>',
         prevArrow: '<a class="slick-prev slick-arrow"><i class="la la-angle-left" aria-hidden="true"></i></a>',
         dots: false,
         responsive: [
           {
             breakpoint: 740,
             settings: {
               slidesToShow: slidesshown,
               slidesToScroll: 1
             }
           }
         ]
     });

   };

  initInfoSlider($('.info-bar-content'));

  var trackHeight = $('.info-bar-content .slick-track').height();
  $('.info-bar-content .slick-slide').css('height',trackHeight + 'px' );

  $(document).on('shopify:section:unload', function(event) {
    if($textSlide.hasClass('slick-initialized')) {
      $textSlide.slick('unslick');
      $(document).off('.info-bar-content');
    }
  });

  $(document).on('shopify:section:load', function(event) {
    initInfoSlider($('.info-bar-content'));
  });

  }
  InfoSlider.prototype = _.assignIn({}, InfoSlider.prototype, {});

  return InfoSlider;
})();

/*============================================================================
  Accordion toggle on mobile navigation
==============================================================================*/
theme.mobileNav = (function() {
  function mobileNav(container) {
    $.shifter({
      maxWidth: Infinity
    });

    $('#accordion').find('.accordion-toggle').click(function(){
      //Expand or collapse this panel
      $(this).next().slideToggle('fast');
      $(this).toggleClass('open');

      $(this).attr('aria-expanded', function(index, attr){
          return attr == 'false' ? true : 'false';
      });

      //Hide the other panels
      $(".accordion-content").not($(this).next()).slideUp('fast');
    });

    $('#accordion').find('.accordion-toggle2').click(function(){
      //Expand or collapse this panel
      $(this).toggleClass('open');
      $(this).next().slideToggle('fast');
      $(this).attr('aria-expanded', function(index, attr){
          return attr == 'false' ? true : 'false';
      });
      //Hide the other panels
      $(".accordion-content2").not($(this).next()).slideUp('fast');
    });

  }

  return mobileNav;
})();

theme.mobileNav.prototype = _.assignIn({}, theme.mobileNav.prototype, {

  onSelect: function(event) {
    if (event.detail.load === false) {
      $.shifter("open");
    }
  },
  onDeselect: function(event) {
    $.shifter("close");
  }

});


/*============================================================================
  Collection
==============================================================================*/
theme.Collection = (function() {
  function Collection(container) {

    (function collectionFilters() {
      var filters = container.querySelectorAll('.filter');

      if ( !filters ) {
        return false;
      }

      filters.forEach(function(filter) {
        var button = filter.querySelector('.filter-menu');
        var list = filter.querySelector('ul.filter-list');

        button.addEventListener("click", function () {
          if (list.style.display === "block") {
            list.style.display = "none";
          } else {
            list.style.display = "block";
          }
        });

        $(document).on('click', function(event) {
          event.stopPropagation();
      		if (!$(event.target).closest('.filter').length) {
      			$( list ).hide( 400 );
      		}
      	});

        var listItems = filter.querySelectorAll('ul.filter-list li');
        if (listItems.length > 20) {
          list.classList.add("lg");
        }

        var listCurrentItems = filter.querySelectorAll('#full-width-filter ul.filter-list li.current a');
        var currentFilters = container.querySelector('#current-filters');
        if (listCurrentItems.length) {
          currentFilters.style.display = 'block';
          $( listCurrentItems ).clone().appendTo( currentFilters ).show(300);
        }
      })

      var listCurrentItems = container.querySelectorAll('#full-width-filter ul.filter-list li.current a');
      var currentFilters = container.querySelector('#current-filters');
      if (listCurrentItems.length < 1) {
        $( currentFilters ).hide(250);
      }

    })();

    (function mobileCollectionFilters() {
      var filters = container.querySelector('#full-width-filter');

      if ( !filters ) {
        return false;
      }

  //  var refine = container.querySelector('.show-filter').addEventListener("click", showFilters);
      function showFilters () {
        if (filters.style.display === "block") {
          filters.style.display = "none";
        } else {
          filters.style.display = "block";
        }
      }

    })();

    (function infiniteScroll() {
      function updateNextURL( doc ) {
        nextURL = $( doc ).find('.paginate_next').attr('href');
      }
      // get initial nextURL
      updateNextURL( document );
      var $container = $('.is_infinite').infiniteScroll({
        path: function() {
          return nextURL;
        },
        // options
        checkLastPage: '.paginate_next',
        append: '.is_infinite .product-index',
        hideNav: '#pagination',
        history: false
      });

      // update nextURL on page load
      $container.on( 'load.infiniteScroll', function( event, response ) {
        updateNextURL( response );
      });
    })();

    (function stickyFilters() {
      $(window).on('load resize orientationchange', function() {
        if ($(window).width() > 980) {
          var HHeight = $('header').height();
          var OffSet = Number(HHeight) + Number(10);

          $(".sidebar__inner").stick_in_parent({
            parent: '#sidebar',
            offset_top: OffSet
          });
        }
      });
    })();

  }
  Collection.prototype = _.assignIn({}, Collection.prototype, {});

  return Collection;
})();

/*============================================================================
  Featured Content
==============================================================================*/
theme.FeatContent = (function () {
  function Feature(container) {

    var events = new EventEmitter3();
    events.trigger = events.emit; // alias

    container.querySelectorAll(".featured-collection").forEach(function (context) {
      theme.FeaturedCollection(context, events);
    });
    container.querySelectorAll(".instagram-feed").forEach(function (context) {
      theme.Instagram(context, events);
    });

  }
  Feature.prototype = _.assignIn({}, Feature.prototype, {});

  return Feature;
})();

/*============================================================================
  Registering Index Sections
==============================================================================*/

$(document).ready(function() {
  var sections = new theme.Sections();
  sections.register('header-section', theme.Header);
  sections.register('slideshow-section', theme.Slideshow);
  sections.register('new-slideshow', theme.newSlideshow);
  sections.register('carousel-section', theme.FeaturedCollection);
  sections.register('product-section', theme.Product);
  sections.register('instagram', theme.Instagram);
  sections.register('mobile-navigation', theme.mobileNav);
  sections.register('collection-section', theme.Collection);
  sections.register('map', theme.Maps);
  sections.register('scrolling-announcements', theme.InfoSlider);
  sections.register('featured-content', theme.FeatContent);
  sections.register('parallax-section', theme.Parallax);
});

/*============================================================================
  Global Events
==============================================================================*/
$(document).ready(function(){
  var mobile = window.matchMedia('(max-width: 740px)');
  var tablet = window.matchMedia('(max-width: 979px) and (min-width: 741px)');
  var desktop = window.matchMedia('(min-width: 980px)');

  if ( mobile.matches ) {
    Events.trigger("mediaquery:mobile");
  }

  if ( tablet.matches ) {
    Events.trigger("mediaquery:tablet");
  }

  if (desktop.matches) {
    Events.trigger("mediaquery:desktop");
  }

  window.addEventListener("resize", function () {
    if ( mobile.matches ) {
      Events.trigger("mediaquery:mobile");
    }

    if ( tablet.matches ) {
      Events.trigger("mediaquery:tablet");
    }

    if ( desktop.matches ) {
      Events.trigger("mediaquery:desktop");
    }
  });

  document.addEventListener('shopify:section:select', function(event){
    Events.trigger("editor:section:select", event);
  });

  document.addEventListener('shopify:section:deselect', function(event){
    Events.trigger("editor:section:deselect", event);
  });

  document.addEventListener('shopify:section:load', function(event){
    Events.trigger("editor:section:load", event);
  });

  document.addEventListener('shopify:section:unload', function(event){
    Events.trigger("editor:section:unload", event);
  });

  document.addEventListener('shopify:block:select', function(event){
    Events.trigger("editor:block:select", event);
  });

  document.addEventListener('shopify:block:deselect', function(event){
    Events.trigger("editor:block:deselect", event);
  });

  document.addEventListener('lazyloaded', function(e){
    Events.trigger("lazyLoad:complete");
  });

});

/*============================================================================
  Debounce for window resizing
  - Added to prevent multiple calls, when using an event for resizing
==============================================================================*/

function debounce(fn, wait, immediate) {
    var timeout;

    wait || (wait = 100);

    return function () {
      var context = this, args = arguments;

      var later = function() {
        timeout = null;

        if ( !immediate ) {
          fn.apply(context, args);
        }
      };

      var callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if ( callNow ) {
        fn.apply(context, args);
      }
    };
  }


/* Log Theme Version */
log = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(console);
    return Function.prototype.bind.apply(console.log, args);
}

log("Icon Version 6.6.3 by Underground", {bar: 1})();
