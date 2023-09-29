/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets/scripts/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/SharePlace.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/SharePlace.js":
/*!***************************!*\
  !*** ./src/SharePlace.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _UI_Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI/Modal */ \"./src/UI/Modal.js\");\n/* harmony import */ var _UI_Map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI/Map */ \"./src/UI/Map.js\");\n/* harmony import */ var _Utility_Location__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utility/Location */ \"./src/Utility/Location.js\");\n\n\n\nclass PlaceFinder {\n  constructor() {\n    const addressForm = document.querySelector('form');\n    const locateUserBtn = document.getElementById('locate-btn');\n    this.shareBtn = document.getElementById('share-btn');\n    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));\n    this.shareBtn.addEventListener('click', this.sharePlaceHandler);\n    addressForm.addEventListener('submit', this.findAddressHandler.bind(this));\n  }\n  sharePlaceHandler() {\n    const shareLinkInputElement = document.getElementById('share-link');\n    if (!navigator.Clipboard) {\n      shareLinkInputElement.select();\n      return;\n    }\n    navigator.clipboard.writeText(shareLinkInputElement.value).then(() => {\n      alert('Copied into clipboard!');\n    }).catch(err => {\n      console.log(err);\n      shareLinkInputElement.select();\n    });\n  }\n  selectPlace(coordinates, address) {\n    if (this.map) {\n      this.map.render(coordinates);\n    } else {\n      this.map = new _UI_Map__WEBPACK_IMPORTED_MODULE_1__[\"Map\"](coordinates);\n    }\n    this.shareBtn.disabled = false;\n    const shareLinkInputElement = document.getElementById('share-link');\n    shareLinkInputElement.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;\n  }\n  locateUserHandler() {\n    if (!navigator.geolocation) {\n      alert('Location feature is not available');\n      return;\n    }\n    const modal = new _UI_Modal__WEBPACK_IMPORTED_MODULE_0__[\"Modal\"]('loading-modal-content', 'Loading Location - Please Wait');\n    modal.show();\n    navigator.geolocation.getCurrentPosition(async successResult => {\n      const coordinates = {\n        lat: successResult.coords.latitude,\n        lng: successResult.coords.longitude\n      };\n      const address = await Object(_Utility_Location__WEBPACK_IMPORTED_MODULE_2__[\"getAddressFromCoords\"])(coordinates);\n      modal.hide();\n      console.log(coordinates);\n      this.selectPlace(coordinates, address);\n    }, error => {\n      modal.hide();\n      alert('Could not locate you. Enter manually');\n    });\n  }\n  async findAddressHandler(event) {\n    event.preventDefault();\n    const address = event.target.querySelector('input').value;\n    if (!address || address.trim().length === 0) {\n      alert('Invalid address entered - Please try again');\n      return;\n    }\n    const modal = new _UI_Modal__WEBPACK_IMPORTED_MODULE_0__[\"Modal\"]('loading-modal-content', 'Loading Location - Please Wait');\n    modal.show();\n    try {\n      const coordinates = await Object(_Utility_Location__WEBPACK_IMPORTED_MODULE_2__[\"getCoordsFromAddress\"])(address);\n      this.selectPlace(coordinates, address);\n    } catch (err) {\n      alert(err.message);\n    }\n    modal.hide();\n  }\n}\nnew PlaceFinder();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvU2hhcmVQbGFjZS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9TaGFyZVBsYWNlLmpzP2Q1YTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kYWwgfSBmcm9tIFwiLi9VSS9Nb2RhbFwiXG5pbXBvcnQgeyBNYXAgfSBmcm9tIFwiLi9VSS9NYXBcIlxuaW1wb3J0IHsgZ2V0Q29vcmRzRnJvbUFkZHJlc3MsIGdldEFkZHJlc3NGcm9tQ29vcmRzIH0gZnJvbSBcIi4vVXRpbGl0eS9Mb2NhdGlvblwiXG5cbmNsYXNzIFBsYWNlRmluZGVyIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBjb25zdCBhZGRyZXNzRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKVxuICAgICAgICBjb25zdCBsb2NhdGVVc2VyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvY2F0ZS1idG4nKVxuICAgICAgICB0aGlzLnNoYXJlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlLWJ0bicpXG5cbiAgICAgICAgbG9jYXRlVXNlckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMubG9jYXRlVXNlckhhbmRsZXIuYmluZCh0aGlzKSlcbiAgICAgICAgdGhpcy5zaGFyZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2hhcmVQbGFjZUhhbmRsZXIpXG4gICAgICAgIGFkZHJlc3NGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuZmluZEFkZHJlc3NIYW5kbGVyLmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgc2hhcmVQbGFjZUhhbmRsZXIoKXtcbiAgICAgICAgY29uc3Qgc2hhcmVMaW5rSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlLWxpbmsnKVxuICAgICAgICBpZighbmF2aWdhdG9yLkNsaXBib2FyZCl7XG4gICAgICAgICAgICBzaGFyZUxpbmtJbnB1dEVsZW1lbnQuc2VsZWN0KClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoc2hhcmVMaW5rSW5wdXRFbGVtZW50LnZhbHVlKVxuICAgICAgICAudGhlbigoKT0+e1xuICAgICAgICAgICAgYWxlcnQoJ0NvcGllZCBpbnRvIGNsaXBib2FyZCEnKVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICBzaGFyZUxpbmtJbnB1dEVsZW1lbnQuc2VsZWN0KClcbiAgICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgc2VsZWN0UGxhY2UoY29vcmRpbmF0ZXMsIGFkZHJlc3Mpe1xuICAgICAgICBpZih0aGlzLm1hcCl7XG4gICAgICAgICAgICB0aGlzLm1hcC5yZW5kZXIoY29vcmRpbmF0ZXMpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5tYXAgPSBuZXcgTWFwKGNvb3JkaW5hdGVzKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaGFyZUJ0bi5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICAgIGNvbnN0IHNoYXJlTGlua0lucHV0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZS1saW5rJylcbiAgICAgICAgc2hhcmVMaW5rSW5wdXRFbGVtZW50LnZhbHVlID0gYCR7bG9jYXRpb24ub3JpZ2lufS9teS1wbGFjZT9hZGRyZXNzPSR7ZW5jb2RlVVJJKGFkZHJlc3MpfSZsYXQ9JHtjb29yZGluYXRlcy5sYXR9JmxuZz0ke2Nvb3JkaW5hdGVzLmxuZ31gXG4gICAgfVxuXG4gICAgbG9jYXRlVXNlckhhbmRsZXIoKXtcbiAgICAgICAgaWYoIW5hdmlnYXRvci5nZW9sb2NhdGlvbil7XG4gICAgICAgICAgICBhbGVydCgnTG9jYXRpb24gZmVhdHVyZSBpcyBub3QgYXZhaWxhYmxlJylcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBtb2RhbCA9IG5ldyBNb2RhbCgnbG9hZGluZy1tb2RhbC1jb250ZW50JywgJ0xvYWRpbmcgTG9jYXRpb24gLSBQbGVhc2UgV2FpdCcpXG4gICAgICAgIG1vZGFsLnNob3coKVxuXG4gICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oYXN5bmMgc3VjY2Vzc1Jlc3VsdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IHtcbiAgICAgICAgICAgICAgICBsYXQ6IHN1Y2Nlc3NSZXN1bHQuY29vcmRzLmxhdGl0dWRlLFxuICAgICAgICAgICAgICAgIGxuZzogc3VjY2Vzc1Jlc3VsdC5jb29yZHMubG9uZ2l0dWRlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgZ2V0QWRkcmVzc0Zyb21Db29yZHMoY29vcmRpbmF0ZXMpXG4gICAgICAgICAgICBtb2RhbC5oaWRlKClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UGxhY2UoY29vcmRpbmF0ZXMsIGFkZHJlc3MpXG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIG1vZGFsLmhpZGUoKVxuICAgICAgICAgICAgYWxlcnQoJ0NvdWxkIG5vdCBsb2NhdGUgeW91LiBFbnRlciBtYW51YWxseScpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYXN5bmMgZmluZEFkZHJlc3NIYW5kbGVyKGV2ZW50KXtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjb25zdCBhZGRyZXNzID0gZXZlbnQudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWVcbiAgICAgICAgaWYoIWFkZHJlc3MgfHwgYWRkcmVzcy50cmltKCkubGVuZ3RoID09PSAwKXtcbiAgICAgICAgICAgIGFsZXJ0KCdJbnZhbGlkIGFkZHJlc3MgZW50ZXJlZCAtIFBsZWFzZSB0cnkgYWdhaW4nKVxuICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1vZGFsID0gbmV3IE1vZGFsKCdsb2FkaW5nLW1vZGFsLWNvbnRlbnQnLCAnTG9hZGluZyBMb2NhdGlvbiAtIFBsZWFzZSBXYWl0JylcbiAgICAgICAgbW9kYWwuc2hvdygpXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gYXdhaXQgZ2V0Q29vcmRzRnJvbUFkZHJlc3MoYWRkcmVzcylcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UGxhY2UoY29vcmRpbmF0ZXMsIGFkZHJlc3MpXG4gICAgICAgIH1jYXRjaChlcnIpe1xuICAgICAgICAgICAgYWxlcnQoZXJyLm1lc3NhZ2UpXG4gICAgICAgIH1cbiAgICAgICAgbW9kYWwuaGlkZSgpXG4gICAgfVxufVxuXG5uZXcgUGxhY2VGaW5kZXIoKVxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/SharePlace.js\n");

/***/ }),

/***/ "./src/UI/Map.js":
/*!***********************!*\
  !*** ./src/UI/Map.js ***!
  \***********************/
/*! exports provided: Map */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Map\", function() { return Map; });\nclass Map {\n  constructor(coords) {\n    // this.coordinates = coords\n    this.render(coords);\n  }\n  render(coordinates) {\n    if (!google) {\n      alert('Could not load maps library - please try again later');\n      return;\n    }\n    const map = new google.maps.Map(document.getElementById('map'), {\n      center: coordinates,\n      zoom: 16\n    });\n    new google.maps.Marker({\n      position: coordinates,\n      map: map\n    });\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvVUkvTWFwLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL1VJL01hcC5qcz9iNTc5Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBNYXAge1xuICAgIGNvbnN0cnVjdG9yKGNvb3Jkcyl7XG4gICAgICAgIC8vIHRoaXMuY29vcmRpbmF0ZXMgPSBjb29yZHNcbiAgICAgICAgdGhpcy5yZW5kZXIoY29vcmRzKVxuICAgIH1cblxuICAgIHJlbmRlcihjb29yZGluYXRlcykge1xuICAgICAgICBpZighZ29vZ2xlKXtcbiAgICAgICAgICAgIGFsZXJ0KCdDb3VsZCBub3QgbG9hZCBtYXBzIGxpYnJhcnkgLSBwbGVhc2UgdHJ5IGFnYWluIGxhdGVyJylcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIHtcbiAgICAgICAgICAgIGNlbnRlcjogY29vcmRpbmF0ZXMsIFxuICAgICAgICAgICAgem9vbTogMTZcbiAgICAgICAgfSlcblxuICAgICAgICBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBjb29yZGluYXRlcywgXG4gICAgICAgICAgICBtYXA6IG1hcFxuICAgICAgICB9KVxuICAgIH1cbn1cblxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/UI/Map.js\n");

/***/ }),

/***/ "./src/UI/Modal.js":
/*!*************************!*\
  !*** ./src/UI/Modal.js ***!
  \*************************/
/*! exports provided: Modal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Modal\", function() { return Modal; });\nclass Modal {\n  constructor(contentId, fallbackText) {\n    this.fallbackText = fallbackText;\n    this.contentTemplateEl = document.getElementById(contentId);\n    this.modalTemplateEl = document.getElementById('modal-template');\n  }\n  show() {\n    //will return a boolean value, true if the 'content' property exists\n    if ('content' in document.createElement('template')) {\n      const modalElements = document.importNode(this.modalTemplateEl.content, true);\n      this.modalElement = modalElements.querySelector('.modal');\n      this.backdropElement = modalElements.querySelector('.backdrop');\n      const contentElement = document.importNode(this.contentTemplateEl.content, true);\n      this.modalElement.appendChild(contentElement);\n      document.body.insertAdjacentElement('afterbegin', this.modalElement);\n      document.body.insertAdjacentElement('afterbegin', this.backdropElement);\n    } else {\n      alert(this.fallbackText);\n    }\n  }\n  hide() {\n    if (this.modalElement) {\n      document.body.removeChild(this.modalElement);\n      document.body.removeChild(this.backdropElement);\n      this.modalElement = null;\n      this.backdropElement = null;\n    }\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvVUkvTW9kYWwuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvVUkvTW9kYWwuanM/MjcwMiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTW9kYWwge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRlbnRJZCwgZmFsbGJhY2tUZXh0KXtcbiAgICAgICAgdGhpcy5mYWxsYmFja1RleHQgPSBmYWxsYmFja1RleHRcbiAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRlbnRJZClcbiAgICAgICAgdGhpcy5tb2RhbFRlbXBsYXRlRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtdGVtcGxhdGUnKVxuICAgIH1cblxuICAgIHNob3coKXtcbiAgICAgICAgLy93aWxsIHJldHVybiBhIGJvb2xlYW4gdmFsdWUsIHRydWUgaWYgdGhlICdjb250ZW50JyBwcm9wZXJ0eSBleGlzdHNcbiAgICAgICAgaWYoJ2NvbnRlbnQnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJykpe1xuICAgICAgICAgICAgY29uc3QgbW9kYWxFbGVtZW50cyA9IGRvY3VtZW50LmltcG9ydE5vZGUodGhpcy5tb2RhbFRlbXBsYXRlRWwuY29udGVudCwgdHJ1ZSlcbiAgICAgICAgICAgIHRoaXMubW9kYWxFbGVtZW50ID0gbW9kYWxFbGVtZW50cy5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKVxuICAgICAgICAgICAgdGhpcy5iYWNrZHJvcEVsZW1lbnQgPSBtb2RhbEVsZW1lbnRzLnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpXG4gICAgICAgICAgICBjb25zdCBjb250ZW50RWxlbWVudCA9IGRvY3VtZW50LmltcG9ydE5vZGUodGhpcy5jb250ZW50VGVtcGxhdGVFbC5jb250ZW50LCB0cnVlKVxuXG4gICAgICAgICAgICB0aGlzLm1vZGFsRWxlbWVudC5hcHBlbmRDaGlsZChjb250ZW50RWxlbWVudClcblxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyYmVnaW4nLCB0aGlzLm1vZGFsRWxlbWVudClcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgdGhpcy5iYWNrZHJvcEVsZW1lbnQpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgYWxlcnQodGhpcy5mYWxsYmFja1RleHQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICBpZih0aGlzLm1vZGFsRWxlbWVudCl7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMubW9kYWxFbGVtZW50KVxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLmJhY2tkcm9wRWxlbWVudClcbiAgICAgICAgICAgIHRoaXMubW9kYWxFbGVtZW50ID0gbnVsbFxuICAgICAgICAgICAgdGhpcy5iYWNrZHJvcEVsZW1lbnQgPSBudWxsXG4gICAgICAgIH1cbiAgICB9XG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/UI/Modal.js\n");

/***/ }),

/***/ "./src/Utility/Location.js":
/*!*********************************!*\
  !*** ./src/Utility/Location.js ***!
  \*********************************/
/*! exports provided: getAddressFromCoords, getCoordsFromAddress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAddressFromCoords\", function() { return getAddressFromCoords; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCoordsFromAddress\", function() { return getCoordsFromAddress; });\nconst GOOGLE_API_KEY = 'AIzaSyAIsKXv5yAgjUFUdb2Ie8MY1InLBdIbc1A';\nasync function getAddressFromCoords(coords) {\n  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_KEY}`);\n  if (!response.ok) {\n    throw new Error('Failed to fetch address. Please try again.');\n  }\n  const data = await response.json();\n  if (data.error_message) {\n    throw new Error(data.error_message);\n  }\n  const address = data.results[0].formatted_address;\n  return address;\n}\nasync function getCoordsFromAddress(address) {\n  const urlAddress = encodeURI(address);\n  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`);\n  if (!response.ok) {\n    throw new Error('Failed to fetch coordinates. Please try again.');\n  }\n  const data = await response.json();\n  if (data.error_message) {\n    throw new Error(data.error_message);\n  }\n  const coordinates = data.results[0].geometry.location;\n  return coordinates;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvVXRpbGl0eS9Mb2NhdGlvbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9VdGlsaXR5L0xvY2F0aW9uLmpzPzQyZGUiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgR09PR0xFX0FQSV9LRVkgPSAnQUl6YVN5QUlzS1h2NXlBZ2pVRlVkYjJJZThNWTFJbkxCZEliYzFBJ1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWRkcmVzc0Zyb21Db29yZHMoY29vcmRzKXtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZ2VvY29kZS9qc29uP2xhdGxuZz0ke2Nvb3Jkcy5sYXR9LCR7Y29vcmRzLmxuZ30ma2V5PSR7R09PR0xFX0FQSV9LRVl9YClcbiAgICBpZighcmVzcG9uc2Uub2spe1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBhZGRyZXNzLiBQbGVhc2UgdHJ5IGFnYWluLicpXG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICBpZihkYXRhLmVycm9yX21lc3NhZ2Upe1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5lcnJvcl9tZXNzYWdlKVxuICAgIH1cbiAgICBjb25zdCBhZGRyZXNzID0gZGF0YS5yZXN1bHRzWzBdLmZvcm1hdHRlZF9hZGRyZXNzXG4gICAgcmV0dXJuIGFkZHJlc3Ncbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENvb3Jkc0Zyb21BZGRyZXNzKGFkZHJlc3Mpe1xuICAgIGNvbnN0IHVybEFkZHJlc3MgPSBlbmNvZGVVUkkoYWRkcmVzcylcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZ2VvY29kZS9qc29uP2FkZHJlc3M9JHt1cmxBZGRyZXNzfSZrZXk9JHtHT09HTEVfQVBJX0tFWX1gKVxuICAgIGlmKCFyZXNwb25zZS5vayl7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZldGNoIGNvb3JkaW5hdGVzLiBQbGVhc2UgdHJ5IGFnYWluLicpXG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICBpZihkYXRhLmVycm9yX21lc3NhZ2Upe1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5lcnJvcl9tZXNzYWdlKVxuICAgIH1cblxuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZGF0YS5yZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uXG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzXG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/Utility/Location.js\n");

/***/ })

/******/ });