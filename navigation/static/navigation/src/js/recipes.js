/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./navigation/static/navigation/src/ts/general.ts":
/*!********************************************************!*\
  !*** ./navigation/static/navigation/src/ts/general.ts ***!
  \********************************************************/
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
/*!********************************************************!*\
  !*** ./navigation/static/navigation/src/ts/recipes.ts ***!
  \********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _general__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./general */ "./navigation/static/navigation/src/ts/general.ts");


const elements = {};
const toggleRecipeVisibility = (el, show) => {
    el.classList.toggle("show-recipe", show);
    el.classList.toggle("hide-recipe", !show);
};
const sliderLeft = (slider) => {
    toggleRecipeVisibility(slider.articles[slider.counter], false);
    slider.counter--;
    if (slider.counter < 0)
        slider.counter = slider.articles.length - 1;
    toggleRecipeVisibility(slider.articles[slider.counter], true);
};
const sliderRight = (slider) => {
    toggleRecipeVisibility(slider.articles[slider.counter], false);
    slider.counter++;
    if (slider.counter >= slider.articles.length)
        slider.counter = 0;
    toggleRecipeVisibility(slider.articles[slider.counter], true);
};
const domMapping = () => {
    const momoSlider = document.getElementById("momo-slider");
    elements.momo = { articles: momoSlider.children, counter: 0 };
    const bocchiSlider = document.getElementById("bocchi-slider");
    elements.bocchi = { articles: bocchiSlider.children, counter: 0 };
    const bertramSlider = document.getElementById("bertram-slider");
    elements.bertram = { articles: bertramSlider.children, counter: 0 };
    // Intersection elements
    (0,_general__WEBPACK_IMPORTED_MODULE_0__.addIntersectionArticle)();
};
// =======================
// general stuff
// =======================
const equalizeRecipeHeights = () => {
    const cards = document.querySelectorAll('.content-wrapper');
    let maxHeight = 0;
    console.log(cards);
    cards.forEach(card => {
        card.style.minHeight = 'auto'; // reset
        const height = card.offsetHeight;
        if (height > maxHeight)
            maxHeight = height;
    });
    cards.forEach(card => {
        card.style.minHeight = `${maxHeight}px`;
    });
    console.log("resize");
};
// =======================
// Init Function
// =======================
const hideSliderCards = (articles) => Array.from(articles).forEach((element, index) => {
    index > 0 ? element.classList.add("hide-recipe") : element.classList.add("show-recipe");
});
const init = () => {
    domMapping();
    // initial slider setting
    hideSliderCards(elements.momo.articles);
    hideSliderCards(elements.bocchi.articles);
    hideSliderCards(elements.bertram.articles);
    document.querySelectorAll('.nav-chevron.left').forEach(el => {
        el.addEventListener('click', () => {
            const name = el.getAttribute('name');
            if (name === 'momo') {
                sliderLeft(elements.momo);
            }
            if (name === 'bocchi') {
                sliderLeft(elements.bocchi);
            }
            if (name === 'bertram') {
                sliderLeft(elements.bertram);
            }
        });
    });
    document.querySelectorAll('.nav-chevron.right').forEach(el => {
        el.addEventListener('click', () => {
            const name = el.getAttribute('name');
            if (name === 'momo') {
                sliderRight(elements.momo);
            }
            if (name === 'bocchi') {
                sliderRight(elements.bocchi);
            }
            if (name === 'bertram') {
                sliderRight(elements.bertram);
            }
        });
    });
};
// =======================
// DOM Ready Handler
// =======================
document.addEventListener("DOMContentLoaded", () => {
    init();
});
window.addEventListener('load', equalizeRecipeHeights);
window.addEventListener('resize', equalizeRecipeHeights);

})();

/******/ })()
;