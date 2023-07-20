import AndroidElementFactory from "./android_element_factory.js";
import Element from "./element.js";
import HtmlElementFactory from "./html_element_factory.js";

export default class FormBuilder {
    #platform;
    #mode;
    #elements;
    #platformFactory
    #parentId

    constructor(platform, mode, parentId) {
        this.#platform = platform;
        this.#mode = mode;
        this.#elements = [];
        this.#parentId = parentId;
        this.#platformFactory = this.createPlatformFactory(this.#platform);// html or android
        this.ElementContent(this.#parentId);
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

    ElementContent(parentId){
        console.log("parentId",parentId)
        switch(this.#mode){
            case 'create':
                const tap = this.#platformFactory.createTab('Id1', "Tap", "col py-2", "border: 1px dashed green; margin:10px", this.#mode, 2);
                const render=  tap.renderDesignContent();
                document.getElementById(parentId).innerHTML = render;
                break;
            case 'update':
                break;
            case 'preview':
                break;
            default:
                throw new Error(`Invalid mode ${this.#mode}`);
        }
    }

    // build() {
    //     const renderedElements = this.#elements.map((element) => {
    //         switch(true){
    //             case this.#platform==='html'&& !this.#mode:
    //                 return element.renderDesignContent();
    //             case this.#platform==='html' && this.#mode:
    //                 return element.renderPreviewContent();
    //             default:
    //                 throw new Error(`Invalid platform: ${this.#platform}`);
                
    //         }
    //     });

    //     return renderedElements.join('');
    // }
}
