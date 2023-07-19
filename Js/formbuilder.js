import AndroidElementFactory from "./android_element_factory";
import Element from "./element";
import HtmlElementFactory from "./html_element_factory";

export default class FormBuilder {
    #platform;
    #mode;
    #elements;

    constructor(platform, mode) {
        this.#platform = platform;
        this.#mode = mode;
        this.#elements = [];

        this.createPlatformFactory(this.#platform);
    }

    addElement(element) {
        this.#elements.push(element);
    }

    setPlatform(platform) {
        this.#platform = platform;
    }

    setMode(mode) {
        this.#mode = mode;
    }

    getElementByIndex(index) {
        return this.#elements[index];
    }

    createPlatformFactory(platform){
        if(platform === 'html'){
            return new HtmlElementFactory();
        }else if(platform === 'android'){
            return new AndroidElementFactory();
        }else{
            throw new Error(`Invalid platform: ${platform}`);
        }
    }

    ElementContent(mode, elements){
        if(mode){
            const renderedElements = this.#elements.map((element) => {
                
            });
        }
    }

    build() {
        const renderedElements = this.#elements.map((element) => {
            switch(true){
                case this.#platform==='html'&& !this.#mode:
                    return element.renderDesignContent();
                case this.#platform==='html' && this.#mode:
                    return element.renderPreviewContent();
                default:
                    throw new Error(`Invalid platform: ${this.#platform}`);
                
            }
        });

        return renderedElements.join('');
    }
}
