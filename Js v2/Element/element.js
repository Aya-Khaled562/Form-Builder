
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
    FileUpload: 'file upload',
    Password: 'password',
    Radio: 'radio button',
    Checkbox: 'checkbox button',
    Email: 'email',
    PhoneNumber: 'phone number',
    Image: 'image',
    Currency: 'currency',
    WholeNumber: 'whole number'
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
    isRequired;
    readOnly;
    visible;
    elements = [];
    optionsSetValues = null;
    collapse;
    isLocked;
    showLabel;
    labelPosition;
    labelAlignment;
    maxLen;
    minLen;
    displayName

    constructor(obj) {
        this.id = obj.id ?? null;
        this.name = obj.name ?? null;
        this.customClass = obj.customClass ?? null;
        this.style = obj.style ?? null;
        this.typeContent = obj.typeContent ?? null;
        this.mode = obj.mode ?? null;
        this.isRequired = obj.isRequired ?? false;
        this.readOnly = obj.readOnly ?? false;
        this.visible = obj.visible ?? true;
        this.collapse = obj.collapse ?? true;
        this.value = obj.value;
        this.isLocked = obj.isLocked ?? false;
        this.showLabel = obj.showLabel ?? true;
        this.labelPosition = obj.labelPosition ?? false;
        this.minLen = obj.minLen ?? null;
        this.maxLen = obj.maxLen ?? null;
        this.pattern = obj.pattern ?? null;
        this.labelAlignment = obj.labelAlignment ?? null;
        this.displayName = obj.displayName ?? null;
    }

    get Collapse() {
        return this.collapse;
    }

    set Collapse(value) {
        this.collapse = value;
    }

    get Value() {
        return this.value;
    }

    get Required() {
        return this.isRequired;
    }

    set Required(value) {
        this.isRequired = value;
    }

    get ReadOnly() {
        return this.readOnly;
    }

    set ReadOnly(value) {
        this.readOnly = value;
    }

    set DisplayName(value){
        this.displayName = value;
    }
    
    get DisplayName(){
        return this.displayName;
    }

    get Visible() {
        return this.visible;
    }

    set Visible(value) {
        this.visible = value;
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
        // console.log('this element', this);

        if (this.mode === 'create' || this.mode === 'update') {
            return this.renderDesignContent();
        } else {
            return this.renderPreviewContent();
        }

    }


    toSaveSchema(mapObject) {
        let objectSchema = {};
        // console.log('mapObject', mapObject)
        let target = mapObject.find(obj => obj.id === this.id)
        // console.log('target in to Schema:', target);
        if(this.TypeContent._category === Categories.Layout){
            objectSchema = {
                id: this.Id,
                name: this.name,
                customClass: this.customClass,
                style: this.style,
                type: this.typeContent._type,
                category: this.typeContent._category,
                isRequired: this.isRequired,
                readOnly: this.readOnly,
                visible: this.visible,
                showLabel: this.showLabel,
                labelPosition: this.labelPosition,
                minLen: this.minLen,
                maxLen: this.maxLen,
                pattern: this.pattern,
                elements: this.elements.map(e => e.toSaveSchema(mapObject))
            };
        }else{
            // console.log('to schema elment', this);
            objectSchema = target;
            //objectSchema.type = this.TypeContent._type;
        }

        return objectSchema;
    }

}
