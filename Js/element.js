

import Value from "./value.js";

export const Types = {
    Tab: "tab",
    Section: "section",
    Text: "single line of text",
    Column: "column",
    TwoOption: 'two options',
    OptionSet: 'option set',
    DecimalNumber: 'decimal number',
    MultipleLineOfText: 'multiple line of text',
    DateAndTime: 'date and time',
    FileUpload: 'file upload'
};

export const Categories = {Layout: "layout", FormControl: "formControl"};

export default class Element {
    id;
    name;
    customClass;
    style;
    typeContent;
    mode;
    value;
    elements = [];
    isrequired;
    isvisible;
    islocked;
    
    
    constructor(id, name, customClass, style, typeContent, mode,isrequired = false, ...params) {
        this.id = id;
        this.name = name;
        this.customClass = customClass;
        this.style = style;
        this.typeContent = typeContent;
        this.mode = mode;
        this.isrequired = isrequired;
        this.isvisible = true;
        this.islocked = false;
        if (params.length == 1 && params[0] != undefined && [Categories.FormControl].includes(typeContent._category)) {
            this.value = params[0]
            // console.log('value in element: ',params[0]) 
        }

    }

   
    get Value() {
        return this.value;
    }

    get Id() {
        return this.id;
    }

    get Name() {
        return this.name;
    }

    get CustomClass() {
        return this.customClass;
    }

    get Style() {
        return this.style;
    }

    get DesignContent() {
        return this.typeContent._designContent;
    }

    get PreviewContent() {
        return this.typeContent._previewContent;
    }

    get Mode() {
        return this.mode;
    }

    set Id(value) {
        this.id = value;
    }

    set Value(value) {
        this.value = value;
    }
    set Name(value) {
        this.name = value;
    }

    set CustomClass(value) {
        this.customClass = value;
    }

    set Style(value) {
        this.style = value;
    }

    set Mode(value) {
        this.mode = value;
    }

    get TypeContent() {
        return this.typeContent;
    }

    set TypeContent(value) {
        this.typeContent = value;
    }

    getElements() {
        return this.elements;
    }

    getNumOfElements() {
        return this.elements.length;
    }

    getElementByIndex(index) {
        return this.elements[index]
    }

    addElement(element) {
        this.elements.push(element);
        
    }

    clearElements() {
        this.elements = [];
        this.elements.length = 0;
    }

    popElement() {
        return this.elements.pop();
    }

    indexOfElement(id) {
        return this.elements.findIndex(ele => ele.Id === id);
    }

    removeElement(element) {
        this.elements.splice(this.elements.indexOf(element), 1);
    }

    renderDesignContent() {
        if (this.typeContent._category == 'layout') {
            const columns = this.elements.map((column) => {
                return column.renderDesignContent();
            });
            const design = this.typeContent._designContent.replace('<!--content-->', columns.join(''));
            return design;
        } else {

            return this.typeContent._designContent;
        }
    }

   
    renderPreviewContent() {
        if (this.typeContent._category == 'layout') {
            const columns = this.elements.map((column) => {
                return column.renderPreviewContent();
            });
            const preview = this.typeContent._previewContent.replace('<!--content-->', columns.join(''));
            return preview;
        } else {
            return this.typeContent._previewContent;
        }
    }

    render() {
        if (this.mode === 'create' || this.mode === 'update') {
            return this.renderDesignContent();
        } else {
            return this.renderPreviewContent();
        }
    }

    
    toSaveSchema(mapObject) {
        let objectSchema = {};
        let target = mapObject.find(obj => obj.id === this.id)
        if(this.typeContent._category === Categories.Layout){
            objectSchema = {
                id: this.Id,
                name: this.name,
                customClass: this.customClass,
                style: this.style,
                type: this.typeContent._type,
                category: this.typeContent._category,
                elements: this.elements.map(e => e.toSaveSchema(mapObject))
            };
        }else{
            objectSchema = target;
        }

        return objectSchema;
    }

}
