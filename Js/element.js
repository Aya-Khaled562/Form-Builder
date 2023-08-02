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
    File: 'file'
};
export const Categories = {Layout: "layout", FormControl: "formControl"};

export default class Element {
    #id;
    #name;
    #customClass;
    #style;
    #typeContent;
    #mode;
    #required;
    #readOnly;
    #visible;
    #elements = [];
    #optionsSetValues = null;
    #collapse;

    constructor(obj) {
        this.#id = obj.id ?? null;
        this.#name = obj.name ?? null;
        this.#customClass = obj.customClass ?? null;
        this.#style = obj.style ?? null;
        this.#typeContent = obj.typeContent ?? null;
        this.#mode = obj.mode ?? null;
        this.#required = obj.required ?? false;
        this.#readOnly = obj.readOnly ?? false;
        this.#visible = obj.visible ?? true;
        this.#collapse = obj.collapse ?? false;
        this.#optionsSetValues = obj.optionsSetValues ?? null;
    }

    get Collapse() {
        return this.#collapse;
    }

    set Collapse(value) {
        this.#collapse = value;
    }

    get OptionsSetValues() {
        return this.#optionsSetValues;
    }

    get Required() {
        return this.#required;
    }

    set Required(value) {
        this.#required = value;
    }

    get ReadOnly() {
        return this.#readOnly;
    }

    set ReadOnly(value) {
        this.#readOnly = value;
    }

    get Visible() {
        return this.#visible;
    }

    set Visible(value) {
        this.#visible = value;
    }

    get Id() {
        return this.#id;
    }

    get Name() {
        return this.#name;
    }

    get CustomClass() {
        return this.#customClass;
    }

    get Style() {
        return this.#style;
    }

    get DesignContent() {
        return this.#typeContent._designContent;
    }

    get PreviewContent() {
        return this.#typeContent._previewContent;
    }

    get Mode() {
        return this.#mode;
    }

    set Id(value) {
        this.#id = value;
    }

    set Name(value) {
        this.#name = value;
    }

    set CustomClass(value) {
        this.#customClass = value;
    }

    set Style(value) {
        this.#style = value;
    }

    set Mode(value) {
        this.#mode = value;
    }

    get TypeContent() {
        return this.#typeContent;
    }

    set TypeContent(value) {
        this.#typeContent = value;
    }

    getElements() {
        return this.#elements;
    }

    getNumOfElements() {
        return this.#elements.length;
    }

    getElementByIndex(index) {
        return this.#elements[index]
    }

    addElement(element) {
        this.#elements.push(element);
    }

    clearElements() {
        this.#elements = [];
        this.#elements.length = 0;
    }

    popElement() {
        return this.#elements.pop();
    }

    indexOfElement(id) {
        return this.#elements.findIndex(ele => ele.Id === id);
    }

    removeElement(element) {
        this.#elements.splice(this.#elements.indexOf(element), 1);
    }

    renderDesignContent() {
        if (this.#typeContent._category == 'layout') {
            const columns = this.#elements.map((column) => {
                return column.renderDesignContent();
            });
            const design = this.#typeContent._designContent.replace('<!--content-->', columns.join(''));
            return design;
        } else {

            return this.#typeContent._designContent;
        }
    }

   
    renderPreviewContent() {
        if (this.#typeContent._category == 'layout') {
            const columns = this.#elements.map((column) => {
                return column.renderPreviewContent();
            });
            const preview = this.#typeContent._previewContent.replace('<!--content-->', columns.join(''));
            return preview;
        } else {
            return this.#typeContent._previewContent;
        }
    }

    render() {
        if (this.#mode === 'create' || this.#mode === 'update') {
            return this.renderDesignContent();
        } else {
            return this.renderPreviewContent();
        }
    }

    toSaveSchema() {
        let objectSchema = {
            id: this.Id,
            name: this.#name,
            customClass: this.#customClass,
            style: this.#style,
            type: this.#typeContent._type,
            category: this.#typeContent._category,
            required: this.#required,
            readOnly: this.#readOnly,
            visible: this.#visible,
            elements: this.#elements.map(e => e.toSaveSchema())
        };

        if (this.#optionsSetValues != null) {
            objectSchema.optionsSetValues = this.#optionsSetValues;
            console.log()

        }
        return objectSchema;
    }

}
