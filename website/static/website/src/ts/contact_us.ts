"use strict";
import { addDomFunctions } from "./general";

const domEventHandler = {
    handleFormSubmit: (e: Event) => {
        e.preventDefault();
        alert("Email wurde gesendet, alsbald werden wir uns melden");
    },
}

// =======================
// Init Function
// =======================

const init = () => {
    addDomFunctions(domEventHandler);
};

// =======================
// DOM Ready Handler
// =======================

document.addEventListener("DOMContentLoaded", () => {
    init();
});