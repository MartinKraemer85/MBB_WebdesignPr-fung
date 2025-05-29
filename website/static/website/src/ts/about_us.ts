"use strict";

import { addIntersectionArticle } from "./general";


// =======================
// Init Function
// =======================

const init = () => {
    addIntersectionArticle();
};

// =======================
// DOM Ready Handler
// =======================

document.addEventListener("DOMContentLoaded", () => {
    init();
});