export class IHtmlElement{
    #id;
    #name;
    #customClass;
    #style;
    #designContent;
    #previewContent
    #mode;

    constructor(id, name, customClass, style){
        if(this.constructor == IHtmlElement){
            throw new Error("Abstract Class")
        }

        this.#id = id;
        this.#name = name;
        this.#customClass = customClass;
        this.#style = style;
        this.#mode = false;

    }

    toString(){
        return this.Mode? this.PreviewContent : this.DesignContent;
    }
    get Id(){
        return this.#id;
    }
    get Name(){
        return this.#name;
    }
    get CustomClass(){
        return this.#customClass;
    }
    get Style(){
        return this.#style;
    }
    get DesignContent(){
        return this.#designContent;
    }
    get PreviewContent(){
        return this.#previewContent;
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
        this.#customClass = value;
    }
    set Style(value){
        this.#style = value;
    }
    set DesignContent(value){
        this.#designContent = value;
    }
    set PreviewContent(value){
        this.#previewContent = value;
    }

    set Mode(value){
        this.#mode = value
    }

}


class ILayoutHtmlElement extends IHtmlElement {
    #cols;
    #collabsed;
    #htmlElements;

    constructor(id, name, customClass, style, cols, collabsed) {
        super(id, name, customClass, style);
        if (this.constructor == ILayoutHtmlElement) {
            throw new Error("ILayoutHtmlElement is abstract class");
        }
        this.#cols = cols;
        this.#collabsed = collabsed;
        this.#htmlElements = [];
    }

    get Cols() {
        return this.#cols;
    }

    get Collabsed() {
        return this.#collabsed;
    };

    get HtmlElements() {
        return this.#htmlElements;
    }

    set Cols(value) {
        this.#cols = value;
    }

    set Collabsed(value) {
        this.#collabsed = value;
    }

    addElement(ele) {
        this.#htmlElements.push(ele);
    }
}

class NonLayoutElement extends IHtmlElement {
    #required;

    constructor(isRequired, _id, _name, _customClass, _style){
        super(_id, _name, _customClass, _style);
        this.Required = isRequired;
    }


    get Required(){
        return this.#required;
    }

    set Required(value){
        this.#required = value;
    }
}

class Tap extends ILayoutHtmlElement {
    constructor(id, name, customClass, style, cols, collabsed) {
        super(id, name, customClass, style, cols, collabsed);
    }
}
class TextElement extends NonLayoutElement {

    constructor(isRequired, _id, _name, _customClass, _style) {
        super(isRequired, _id, _name, _customClass, _style);
        super.DesignContent = `<div class="mb-3">
                                <label for="formGroupExampleInput2" class="form-label">Another label</label>
                                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
                              </div>`
        super.PreviewContent = `<div class="mb-3">
                                <label for="formGroupExampleInput2" class="form-label">Another label</label>
                                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
                              </div>`
    }
}

class Section extends ILayoutHtmlElement{
    constructor(id, name, customClass , style,cols , collabsed){
        super(id, name, customClass, style, cols, collabsed);
    }
}



