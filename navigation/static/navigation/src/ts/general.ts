"use strict";


const IntersectionObserverElements: IDomNodeList = {};

const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.5 // at least 50% visible
};

export const addDomFunctions = (eventhandler = {}) => {
    Object.keys(eventhandler).forEach(funcName => {
        (window as any)[funcName] = (eventhandler as any)[funcName];
    });
}

// Used to check which article is the last one that was scrolled over
export const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        // get the chevron with the id as target
        const chevron = document.querySelector(`.chevron a[href="#${id}"]`)?.parentElement;

        if (entry.isIntersecting) {
            if (IntersectionObserverElements.chevrons) IntersectionObserverElements.chevrons.forEach(c => c.classList.remove('active'));
            if (chevron) chevron.classList.add('active');
        }
    });
}, observerOptions);

export const addIntersectionArticle = () => {
    const article = document.querySelectorAll('article[id]');
    article.forEach(article => {
        observer.observe(article);
    });
    IntersectionObserverElements.chevrons = document.querySelectorAll('aside .chevron');
}
