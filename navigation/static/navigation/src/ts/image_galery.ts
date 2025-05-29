"use strict";
import { addDomFunctions } from "./general";


const elements: IHtmlList = {};

const domEventHandler = {
    handleImageClick: (el: HTMLImageElement) => {
        setTimeout(() => {
            elements.modal.classList.remove("hidden");

            const modalImage = document.createElement("img");
            modalImage.src = el.src;
            modalImage.alt = el.alt;

            modalImage.style.pointerEvents = "none";
            modalImage.classList.add("modal-img");
            modalImage.onmouseover = null;
            modalImage.onclick = null;

            // Modal-Inhalt ersetzen
            elements.modalImg.innerHTML = ""; // Clear previous image
            elements.modalImg.appendChild(modalImage);
        }, 100);

    },
    handleCloseModalBtnClick: () => elements.modal.classList.add("hidden"),
    handleOverlayClick: (e: Event) => {
        if (e.target === elements.modal) {
            elements.modal.classList.add("hidden");
        }
    },
}

const domMapping = () => {
    elements.modal = document.getElementById("modal") as HTMLElement;
    elements.modalImg = document.getElementById("modal-img") as HTMLElement;
};

// =======================
// Init Function
// =======================

const init = () => {
    domMapping();
    console.log("test");

    addDomFunctions(domEventHandler);
};

// =======================
// DOM Ready Handler
// =======================

document.addEventListener("DOMContentLoaded", () => {
    init();
});