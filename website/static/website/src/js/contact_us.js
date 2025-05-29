/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./website/static/website/src/ts/general.ts":
/*!**************************************************!*\
  !*** ./website/static/website/src/ts/general.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addDomFunctions: () => (/* binding */ addDomFunctions),
/* harmony export */   addIntersectionArticle: () => (/* binding */ addIntersectionArticle),
/* harmony export */   observer: () => (/* binding */ observer)
/* harmony export */ });

const IntersectionObserverElements = {};
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // at least 50% visible
};
const addDomFunctions = (eventhandler = {}) => {
    Object.keys(eventhandler).forEach(funcName => {
        window[funcName] = eventhandler[funcName];
    });
};
// Used to check which article is the last one that was scrolled over
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        var _a;
        const id = entry.target.getAttribute('id');
        // get the chevron with the id as target
        const chevron = (_a = document.querySelector(`.chevron a[href="#${id}"]`)) === null || _a === void 0 ? void 0 : _a.parentElement;
        if (entry.isIntersecting) {
            if (IntersectionObserverElements.chevrons)
                IntersectionObserverElements.chevrons.forEach(c => c.classList.remove('active'));
            if (chevron)
                chevron.classList.add('active');
        }
    });
}, observerOptions);
const addIntersectionArticle = () => {
    const article = document.querySelectorAll('article[id]');
    article.forEach(article => {
        observer.observe(article);
    });
    IntersectionObserverElements.chevrons = document.querySelectorAll('aside .chevron');
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************************************!*\
  !*** ./website/static/website/src/ts/contact_us.ts ***!
  \*****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _general__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./general */ "./website/static/website/src/ts/general.ts");


const domEventHandler = {
    handleFormSubmit: (e) => {
        e.preventDefault();
        alert("Email wurde gesendet, alsbald werden wir uns melden");
    },
};
// =======================
// Init Function
// =======================
const init = () => {
    (0,_general__WEBPACK_IMPORTED_MODULE_0__.addDomFunctions)(domEventHandler);
};
// =======================
// DOM Ready Handler
// =======================
document.addEventListener("DOMContentLoaded", () => {
    init();
});

})();

/******/ })()
;