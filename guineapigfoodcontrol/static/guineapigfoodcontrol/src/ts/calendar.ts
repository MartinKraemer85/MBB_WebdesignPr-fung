// #region variables initialisation


const domHTMLElements: IDomHTMLElement = {
}

declare var htmx: any;

// #endregion

// #region Events and functions
const addDomFunctions = (eventhandler = {}) => {
    Object.keys(eventhandler).forEach(funcName => {
        (window as any)[funcName] = (eventhandler as any)[funcName];
    });
};

const searchFoodItems = (searchValue: string) => {
    var foodItem = document.getElementsByClassName("food-item");
    console.log(searchValue);

    Array.from(foodItem).filter(e => {
        var foodItemName = e.firstElementChild as HTMLElement;

        if (!foodItemName) return;

        const innerText = foodItemName.innerText.toLocaleLowerCase();
        const search = searchValue.toLocaleLowerCase();

        const includes = innerText.includes(search);
        (e as HTMLElement).style.display = includes ? "block" : "none";
    })
}

const toggleFoodPanel = () => {
    // Toggle the panel for the fooditems
    // When the device is very small, but high, the panel is open from the start
    // this script removes the auto-open class and toggles the open class 
    // to make sure you can close the panel on the first interaction with the
    // drag-handle
    domHTMLElements.foodPanel.classList.remove("auto-open");
    domHTMLElements.foodPanel.classList.toggle('open');
}

// #region init
const domEventHandler = {
    handleOpenModalBtnClick: (): void => domHTMLElements.addItemModal.classList.remove("hidden"),
    handleguineapigfoodcontrolClick: (el: HTMLElement, day: string, month: string, year: string): void => {
        const newUrl = `/guineapigfoodcontrol/guineapigfoodcontrol/${year}/${month}/${day}/`;
        history.pushState({}, "", newUrl);  // change url to current clicked guineapigfoodcontrol Element
        // open Modal
        if (domHTMLElements.selectedDateField instanceof HTMLInputElement) {
            domHTMLElements.selectedDateField.value = `${year}/${month}/${day}/`;
        }
    },
    handleCloseModalBtnClick: (): void => domHTMLElements.addItemModal.classList.add("hidden"),
    handleOverlayClick: (event: MouseEvent) => {
        if (event.target === domHTMLElements.addItemModal) {
            domHTMLElements.addItemModal.classList.add("hidden");
        }
    },
    searchFoodItems: (element: HTMLInputElement) => searchFoodItems(element.value),
    toggleFoodPanel: () => toggleFoodPanel()
};



const domMapping = () => {
    domHTMLElements.addItemModal = document.getElementById("addItemModal") as HTMLElement;
    domHTMLElements.selectedDateField = document.getElementById("selectedDateField") as HTMLInputElement;
    domHTMLElements.foodPanel = document.getElementById('foodPanel') as HTMLElement;
    domHTMLElements.dragHandel = document.getElementById('dragHandle') as HTMLElement;
};

const init = () => {
    domMapping();
    addDomFunctions(domEventHandler);

    // simulate the initial click when the Site is entered, to load the food-items,
    // if availeble
    const radioBtnSelectedDay = document.querySelector('input[name="selected_day"]:checked') as HTMLElement;
    const currentDay = radioBtnSelectedDay.parentElement;

    currentDay?.click();
};

document.addEventListener("DOMContentLoaded", () => {
    init();

    document.body.addEventListener("htmx:afterSwap", function (evt: CustomEvent) {
        // optional check for the guineapigfoodcontrol
        if (evt.detail.target && evt.detail.target.id === "main") {
            init(); //after a month swap, call the init again to add all functions to the DOM again
        }
    });
});


// #endregion