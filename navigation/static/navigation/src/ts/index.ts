// =======================
// General footer / navigation functions
// =======================
import { addDomFunctions } from "./general"
const handleSocialClick = (el: HTMLImageElement) => {
    alert(`Wir sind gerade mal 2 Jahre alt!\n\ wir dürfen noch nicht auf ${el.dataset.social!.toUpperCase()} herumgeistern!`)
}


const setActiveNavigation = () => {
    const filename = window.location.pathname.split("/").pop();
    const link = document.querySelector(`.navigation a[href="./${filename}"]`)?.parentElement
    if (link) link.classList.add("active");
}

const footerEventHandler = {
    handleSocialClick: (el: HTMLImageElement) => handleSocialClick(el)
}

document.addEventListener("DOMContentLoaded", () => {
    addDomFunctions(footerEventHandler);
    setActiveNavigation();
});
