export class IHtmlElement{
    #id;
    #name;
    #CustomClass;
    #style;
    #htmlContent;
    #mode;

    constructor(){
        if(this.constructor = IHtmlElement){
            throw new Error("Abstract Class")
        }
    }

    get Id(){
        return this.#id;
    }
    get Name(){
        return this.#name;
    }
    get CustomClass(){
        return this.#CustomClass;
    }
    get Style(){
        return this.#style;
    }
    get HtmlCotent(){
        return this.#htmlContent;
    }
    get Mode(){
        return this.#mode;
    }
    set Id(value){
        this.#id = value;
    }
    set Name(value){
        this.#name = value;
    } 
    set CustomClass(value){
        this.#CustomClass = value;
    }
    set Style(value){
        this.#style = value;
    }
    set HtmlCotent(value){
        this.#htmlContent = value;
    }

    set Mode(value){
        this.#mode = value
    }

}


class ILayoutHtmlElement extends IHtmlElement{
    constructor(){
        
    }
}

