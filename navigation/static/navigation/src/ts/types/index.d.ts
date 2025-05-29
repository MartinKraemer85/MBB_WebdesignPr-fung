interface IDomNodeList {
    [key: string]: NodeListOf<HTMLElement>;
}

interface IHtmlList {
    [key: string]: HTMLElement;
}

interface SliderData {
    articles: HTMLCollectionOf<HTMLElement>;
    counter: number;
}

interface ISlider {
    [key: string]: SliderData;
}