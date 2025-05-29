/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/*!**************************************************!*\
  !*** ./website/static/website/src/ts/general.ts ***!
  \**************************************************/
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

/******/ })()
;