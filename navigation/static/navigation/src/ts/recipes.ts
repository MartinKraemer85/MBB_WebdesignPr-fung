
"use strict";
import { addIntersectionArticle } from "./general";

const elements: ISlider = {}

const toggleRecipeVisibility = (el: HTMLElement, show: boolean): void => {
    el.classList.toggle("show-recipe", show);
    el.classList.toggle("hide-recipe", !show);
};

const sliderLeft = (slider: SliderData): void => {
    toggleRecipeVisibility(slider.articles[slider.counter], false);

    slider.counter--;
    if (slider.counter < 0) slider.counter = slider.articles.length - 1;

    toggleRecipeVisibility(slider.articles[slider.counter], true);
};

const sliderRight = (slider: SliderData): void => {
    toggleRecipeVisibility(slider.articles[slider.counter], false);

    slider.counter++;
    if (slider.counter >= slider.articles.length) slider.counter = 0;

    toggleRecipeVisibility(slider.articles[slider.counter], true);
};

const domMapping = () => {
    const momoSlider = document.getElementById("momo-slider") as HTMLElement;
    elements.momo = { articles: momoSlider.children as HTMLCollectionOf<HTMLElement>, counter: 0 };

    const bocchiSlider = document.getElementById("bocchi-slider") as HTMLElement;
    elements.bocchi = { articles: bocchiSlider.children as HTMLCollectionOf<HTMLElement>, counter: 0 };

    const bertramSlider = document.getElementById("bertram-slider") as HTMLElement;
    elements.bertram = { articles: bertramSlider.children as HTMLCollectionOf<HTMLElement>, counter: 0 };

    // Intersection elements
    addIntersectionArticle();
};

// =======================
// general stuff
// =======================
const equalizeRecipeHeights = () => {
    const cards = document.querySelectorAll('.content-wrapper') as NodeListOf<HTMLElement>;
    let maxHeight = 0;
    console.log(cards);

    cards.forEach(card => {
        card.style.minHeight = 'auto'; // reset
        const height = card.offsetHeight;
        if (height > maxHeight) maxHeight = height;
    });

    cards.forEach(card => {
        card.style.minHeight = `${maxHeight}px`;
    });
    console.log("resize");

};


// =======================
// Init Function
// =======================

const hideSliderCards = (articles: HTMLCollectionOf<HTMLElement>) => Array.from(articles).forEach((element, index) => {
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