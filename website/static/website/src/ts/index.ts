// =======================
// General footer / navigation functions
// =======================
import { addDomFunctions } from "./general"
const handleSocialClick = (el: HTMLImageElement) => {
    alert(`Wir sind gerade mal 2 Jahre alt!\n\ wir dürfen noch nicht auf ${el.dataset.social!.toUpperCase()} herumgeistern!`)
}


const setActiveNavigation = () => {
    const filename = window.location.pathname.split("/").pop();

    if (window.location.pathname?.startsWith("/guineapigfoodcontrol")) {
        const link = document.querySelector(`.submenu_parent a`)

        if (link) link.classList.add("active");
    }

    const link = document.querySelector(`.navigation a[href="/${filename}"]`)?.parentElement

    if (link) link.classList.add("active");
    if (!link) {
        const link = document.querySelector(`.submenu a[href="${window.location.pathname}"]`)?.parentElement

        if (link) link.classList.add("active");

    }
}

const footerEventHandler = {
    handleSocialClick: (el: HTMLImageElement) => handleSocialClick(el)
}

document.addEventListener("DOMContentLoaded", () => {
    addDomFunctions(footerEventHandler);
    setActiveNavigation();
});
