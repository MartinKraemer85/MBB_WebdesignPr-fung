"use strict";
import { addDomFunctions } from "./general";


const elements: IHtmlList = {};
var imageList: HTMLCollection = { "item": {}, "length": 0 } as HTMLCollection;

const domEventHandler = {
    handleImageClick: (el: HTMLImageElement) => {
        setTimeout(() => {
            const slider = elements.slider as ISliderImgData;

            for (let i = 0; i < imageList.length; i++) {
                if (imageList[i] === el) {
                    slider.counter = i;
                    break;
                }
            }

            const modal = elements.modal as HTMLElement;
            var modalImage = elements.modalImage as HTMLElement;
            modal.classList.remove("hidden");

            // create new Image 
            const modalImageNew = document.createElement("img");
            modalImageNew.src = el.src;
            modalImageNew.alt = el.alt;

            modalImageNew.style.pointerEvents = "none";
            modalImageNew.classList.add("modal-img");
            modalImageNew.onmouseover = null;
            modalImageNew.onclick = null;

            // Replace Modal content
            modalImage.innerHTML = ""; // Clear previous image
            modalImage.appendChild(modalImageNew);
        }, 100);
    },
    handleOverlayClick: (e: Event) => {
        if (e.target === elements.modal) {
            elements.modal.classList.add("hidden");
        }
    },
    chevronLeft: () => {
        const slider = elements.slider as ISliderImgData;
        slider.counter--;
        if (slider.counter < 0) slider.counter = slider.imageCount - 1;
        const currentImage = slider.images[slider.counter] as HTMLImageElement;

        const modalImage = elements.modalImage as HTMLElement;
        modalImage.innerHTML = ""; // Clear previous image
        modalImage.appendChild(cloneNode(currentImage));
    },
    chevronRight: () => {
        const slider = elements.slider as ISliderImgData;

        slider.counter--;
        if (slider.counter < 0) slider.counter = slider.imageCount - 1;
        const currentImage = slider.images[slider.counter] as HTMLImageElement;
        const modalImage = elements.modalImage as HTMLElement;

        modalImage.innerHTML = ""; // Clear previous image
        modalImage.appendChild(cloneNode(currentImage));
    }
}

const domMapping = () => {
    elements.modal = document.getElementById("modal") as HTMLElement;
    elements.modalImage = document.getElementById("modal-img") as HTMLElement;
    var images = document.getElementById("image-wrapper") as HTMLElement;
    imageList = images.children;
    elements.slider = { images: images.children, counter: 0, imageCount: images.children.length } as ISliderImgData;
};


const cloneNode = (image: HTMLImageElement) => {
    const clonedImage = image.cloneNode(true) as HTMLImageElement;
    clonedImage.classList.add("modal-img");
    clonedImage.style.pointerEvents = "none";
    clonedImage.onmouseover = null;
    clonedImage.onclick = null;

    return clonedImage;
}


// =======================
// Init Function
// =======================

const init = () => {
    domMapping();
    addDomFunctions(domEventHandler);
};

// =======================
// DOM Ready Handler
// =======================

document.addEventListener("DOMContentLoaded", () => {
    init();
});