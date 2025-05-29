interface IDomNodeList {
    [key: string]: NodeListOf<HTMLElement>;
}



interface IHtmlList {
    [key: string]: HTMLElement | ISliderImgData
}


interface ISliderImgData {
    images: HTMLCollection,
    counter: number,
    imageCount: number
}

interface ISliderImg {
    [key: string]: ISliderImgData;
}
interface ISliderRecipiesData {
    articles: HTMLCollectionOf<HTMLElement>,
    counter: number,
}

interface ISliderRecipie {
    [key: string]: ISliderRecipiesData;
}