
export default class Element {
    #id;
    #name;
    #customClass;
    #style;
    #typeContent;
    #mode;
    #elements = [];

    constructor(id, name, customClass, style, typeContent, mode) {
        this.#id = id;
        this.#name = name;
        this.#customClass = customClass;
        this.#style = style;
        this.#typeContent = typeContent;
        this.#mode = mode;
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

    getNumOfElements() {
        return this.#elements.length;
    }

    addElement(element) {
        this.#elements.push(element);
    }

    renderDesignContent() {
        if (this.#typeContent._type === 'tab') {
            const columns = this.#elements.map((column) => {
                return `<div class="container  px-3 py-3 mx-3 my-3" style="border: 2px solid red">${column.renderDesignContent()}</div>`;
            });
            return `<div class="col  px-3 py-3 mx-3 my-3">${columns.join('')}</div>`;
        } else if (this.#typeContent._type === 'section') {
            const fields = this.#elements.map((field) => {
                return field.renderDesignContent();
            });
            return `<div class="col px-3 py-3 mx-3 my-3" style = "border: 2px solid yellow">${fields.join('')}</div>`;
        } else {
            return this.#typeContent._designContent;
        }
    }

    renderPreviewContent() {
        if (this.#typeContent._type === 'tab') {
            const columns = this.#elements.map((column) => {
                return `<div class="container  px-3 py-3 mx-3 my-3" style="border: 2px solid red">${column.renderPreviewContent()}</div>`;
            });
            return `<div class="col  px-3 py-3 mx-3 my-3">${columns.join('')}</div>`;
        } else if (this.#typeContent._type === 'section') {
            const fields = this.#elements.map((field) => {
                return field.renderPreviewContent();
            });
            return `<div class="col px-3 py-3 mx-3 my-3" style = "border: 2px solid yellow">${fields.join('')}</div>`;
        } else {
            return this.#typeContent._previewContent;
        }
    }

}