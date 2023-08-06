import AndroidElementFactory from "./android_element_factory.js";
import {Categories, Types} from "./element.js";
import HtmlElementFactory from "./html_element_factory.js";
import {addAllEventsToElement, fieldIsRequired} from "./ElementEventHandlers.js";
import {createElementFactoryPropertiesObj} from "./Utils.js";
import Element from "./element.js";

export default class FormBuilder {
    #platform;
    #mode;
    #entity;
    #elements;
    #elementsMap;
    #platformFactory
    #parentId
    #sectionsBeforRender
    #columnsBeforRender
    #activeElement
    dragBeforeRender = null;
    dragAfterRender = null;
    newField = null;
    #json;
    #fields
    constructor(json,mode, parentId) {
        this.#platform = json.platform;
        this.#mode = mode;
        this.#elementsMap = new Map();
        this.#elements = [];
        this.#parentId = parentId;
        this.#sectionsBeforRender= [];
        this.#columnsBeforRender = [];
        this.#activeElement = null;
        this.#entity = null;
        this.#json = json;
        this.#fields = [];
        this.#platformFactory = this.createPlatformFactory(this.#platform);
        this.ElementContent();
    }

    get Entity(){
        return this.#entity;
    }
    get ParentId() {
        return this.#parentId;
    }

    getPlatformFactory() {
        return this.#platformFactory;
    }

    getElements() {
        return this.#elements;
    }

    addElementToMap(element) {
        this.#elementsMap.set(element.Id, element);
    }

    getElementFromMap(id) {
        return this.#elementsMap.get(id);
    }

    addElement(element) {
        this.#elements.push(element);
    }
    get Fields() {
        return this.#fields;
    }

    removeElement(elementId) {  // this method should be refactored.
        let element = this.#elementsMap.get(elementId);

        if (element == null)
            return;

        this.#elementsMap.delete(elementId);

        if (element.TypeContent._type == Types.Tab) {
            this.#elements = this.#elements.filter((el) => el.Id != elementId);
            element.getElements().forEach(tabCol => {
                tabCol.getElements().forEach(sec => {
                    sec.getElements().forEach(secCol => {
                        secCol.getElements().forEach(control => {
                            console.log(this.#entity.fields)
                            console.log(element.Id)
                            let field = this.#entity.fields.find(field => field.id == control.Id);
                            if (field) {
                                document.getElementById('entity').children[0].innerHTML += `<div class="border py-2 px-1 field newField" style="background-color: white;" draggable="true" id='${field.name}'> ${field.displayName}</div>`;
                            }
                        });
                    })
                });
            });

        } else if (element.TypeContent._type == Types.Section || element.TypeContent._category == Categories.FormControl) {
            let colId = document.getElementById(elementId).parentElement.id;
            let column = this.#columnsBeforRender.find(col => col.Id == colId);
            column.removeElement(elementId);

            if (element.TypeContent._type == Types.Section) {
                element.getElements().forEach(secCol => {
                    secCol.getElements().forEach(control => {
                        console.log(this.#entity.fields)
                        console.log(element.Id)
                        let field = this.#entity.fields.find(field => field.id == control.Id);
                        if (field) {
                            document.getElementById('entity').children[0].innerHTML += `<div class="border py-2 px-1 field newField" style="background-color: white;" draggable="true" id='${field.name}'> ${field.displayName}</div>`;
                        }
                    });
                });
            } else {
                let field = this.#entity.fields.find(field => field.name == element.Id);
                if (field) {
                    document.getElementById('entity').children[0].innerHTML += `<div class="border py-2 px-1 field newField" style="background-color: white;" draggable="true" id='${field.name}'> ${field.displayName}</div>`;
                }
            }
        }


    }

    setPlatform(platform) {
        this.#platform = platform;
    }

    setMode(mode) {
        this.#mode = mode;
    }

    getMode() {
        return this.#mode;
    }

    getElementByIndex(index) {
        return this.#elements[index];
    }
    getTabById(tabId) {
        return this.#elements.find(tab => tab.Id == tabId);
    }

    setActiveElement(elementId) {
        this.#activeElement = this.#elementsMap.get(elementId);
    }

    getActiveElement() {
        return this.#activeElement;
    }

    setSectionBeforRender(section) {
        this.#sectionsBeforRender.push(section);
    }

    getSectionBeforRender() {
        return this.#sectionsBeforRender;
    }

    setColumnsBeforeRender(column){
        this.#columnsBeforRender.push(column) ;
    }


    getSectionBeforeRenderById(id) {
        return this.#sectionsBeforRender.find((section) => section.Id === id);
    }

    get ColumnsBeforRender(){
        return this.#columnsBeforRender;
    }

    addSectionToTab(section) {
        let targetId = '';
        if (this.#activeElement && this.#activeElement.TypeContent._type == Types.Tab) {
            const target = this.#activeElement.getElementByIndex(0);
            target.addElement(section);
            targetId = target.Id;
        } else {
            const targetTab = this.#elements[this.#elements.length - 1];
            console.log('target tab: ', targetTab)
            const targetCol = targetTab.getElementByIndex(0);
            console.log('target col: ', targetCol);
            targetCol.addElement(section);
            targetId = targetCol.Id;
        }
        return targetId;
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

    handleTabClick(tabId) {
        this.#elements.forEach(t => {
          const tabElement = document.getElementById(`${t.Id}`);
          if (t.Id === tabId) {
            if (tabElement.style.borderColor === 'green') {
                tabElement.style.borderColor = 'red';
                this.#activeElement = t;
            } else {
                tabElement.style.borderColor = 'green';
                this.#activeElement = null;
            }
          } else {
              tabElement.style.borderColor = 'green';
          }
        });
        console.log('active', this.#activeElement);
    }

    getFeildBeforeRender(id){
        let oldfields = [];
        this.#sectionsBeforRender.forEach(sec => {
            sec.getElements().forEach(col => {
                col.getElements().forEach(feild => {
                    oldfields.push(feild);
                })
            })
        });
        console.log('oldfields func', oldfields);
        return oldfields.find(field => field.Id === id);
    }

   async ElementContent(){
        switch(this.#mode){
            case 'create':
            case 'update':
                this.load();
                console.log('elements: ', this.#elements);
                document.getElementById(this.#parentId).innerHTML = this.#elements.map((tab) => tab.render()).join("");

                this.addDesignContent();

                this.getEntity();
                break;
            case 'preview':
            case 'custom':
                this.load();
                document.getElementById(this.#parentId).innerHTML = this.#elements.map((tab) => tab.render()).join("");
                this.addPreviewEvents();
                break;
            default:
                throw new Error(`Invalid mode ${this.#mode}`);
        }
    }

    load() {
        const formTabs = this.#json.elements;
        console.log('form tab: ', this.#json.elements)
        formTabs.forEach((tab) => {
            console.log('tab in load', tab);
            tab.mode = this.#mode;
            const newTab = this.build(Types.Tab, createElementFactoryPropertiesObj(tab.id, tab.name, "col py-2", tab.style,this.#mode)); 
            tab.elements.forEach((tabColumn) => {
                tabColumn.mode = this.#mode;
                const newTabCol = this.build(Types.Column, createElementFactoryPropertiesObj(tabColumn.id, tabColumn.name, 'coltab col py-1 my-1 mx-1 ', tabColumn.style, this.#mode));
                tabColumn.elements.forEach((section) => {
                    section.mode = this.#mode;
                    const newSection = this.build(Types.Section,section);                    section.elements.forEach((column) => {
                        column.mode = column;
                        const newSectionCol = this.build(Types.Column, createElementFactoryPropertiesObj(column.id, column.name, 'colsec col py-2 px-1 my-1 mx-1 ', column.style, this.#mode));
                        // console.log('new section col', newSectionCol)
                        column.elements.forEach((control) => {
                            let formControl = null;
                            console.log('control', control)
                            formControl = this.build(control.type, control);
                            this.#fields.push(formControl);
                            newSectionCol.addElement(formControl);
                            // this.addElementToMap(formControl);
                        });
                        this.#columnsBeforRender.push(newSectionCol);
                        newSection.addElement(newSectionCol);
                    });
                    this.#sectionsBeforRender.push(newSection);
                    newTabCol.addElement(newSection);
                    // this.addElementToMap(newSection);
                });
                this.#columnsBeforRender.push(newTabCol);
                newTab.addElement(newTabCol);
            });
            // this.#elements.push(newTab);
            // this.addElementToMap(newTab);
        });
    }

    addDesignContent() {
        // document.getElementById(this.#parentId).innerHTML = this.#elements.map((tab) => tab.render()).join("");
        this.#elementsMap.forEach((el) => {
            if (Object.values(Types).includes(el.TypeContent._type)) {
                addAllEventsToElement(el.Id, this);
            }

        });

    }

    build(type, obj) {
        // console.log("mode in build", this.#mode)
        // console.log('obj: ', obj);
        obj.mode = this.#mode;
        // console.log('object in build method', obj)
        switch (type) {
            case 'tab':
                // const tab = this.#platformFactory.createTab(obj);
                // console.log('type content: ', obj)
                // this.#elements.push(tab);
                // this.addElementToMap(tab)
                // return tab;

                const tabTypeContent = this.#platformFactory.createTab(obj);
                obj.typeContent = tabTypeContent;
                obj.collapse = true;
                const tab = new Element(obj);
                this.#elements.push(tab);
                this.addElementToMap(tab);
                return tab;

            case 'section':
                // const section = this.#platformFactory.createSection(obj);
                // this.addElementToMap(section)
                // return section;

                const sectionTypeContent = this.#platformFactory.createSection(obj);
                obj.typeContent = sectionTypeContent;
                const section = new Element(obj);
                this.addElementToMap(section)
                return section;

            case 'column':
                // const column = this.#platformFactory.createColumn(obj);
                // return column;
                const columnTypeContent = this.#platformFactory.createColumn(obj);
                obj.typeContent = columnTypeContent;
                const column = new Element(obj);
                return column;

            case 'single line of text':
                // const text = this.#platformFactory.createSingleLineOfText(obj);
                // this.addElementToMap(text);
                // return text;

                const textTypeContent = this.#platformFactory.createSingleLineOfText(obj);
                obj.typeContent = textTypeContent;
                const text = new Element(obj);
                this.addElementToMap(text);
                return text;

            case 'option set':
                // console.log('params', obj);
                // const optionSet = this.#platformFactory.createOptionSet(obj);
                // this.addElementToMap(optionSet)
                // return optionSet;

                const optionSetTypeContent = this.#platformFactory.createOptionSet(obj);
                obj.typeContent = optionSetTypeContent;
                const optionSet = new Element(obj);
                this.addElementToMap(optionSet)
                return optionSet;

            case 'two options':
                // const twoOptions = this.#platformFactory.createTwoOptions(obj);
                // this.addElementToMap(twoOptions)
                // return twoOptions;

                const twoOptionsTypeContent = this.#platformFactory.createTwoOptions(obj);
                obj.typeContent = twoOptionsTypeContent;
                const twoOptions = new Element(obj);
                this.addElementToMap(twoOptions)
                return twoOptions;

            case 'decimal number':
                // const decimalNumber = this.#platformFactory.createDecimalNumber(obj);
                // this.addElementToMap(decimalNumber)
                // return decimalNumber;

                const decimalNumberTypeContent = this.#platformFactory.createDecimalNumber(obj);
                obj.typeContent = decimalNumberTypeContent;
                const decimalNumber = new Element(obj);
                this.addElementToMap(decimalNumber)
                return decimalNumber;

            case 'multiple line of text':
                // const multipleLineOfText = this.#platformFactory.createMultipleLineOfText(obj);
                // this.addElementToMap(multipleLineOfText)
                // return multipleLineOfText;

                const multipleLineOfTextTypeContent = this.#platformFactory.createMultipleLineOfText(obj);
                obj.typeContent = multipleLineOfTextTypeContent;
                const multipleLineOfText = new Element(obj);
                this.addElementToMap(multipleLineOfText)
                return multipleLineOfText;

            case 'date and time':
                // const dateAndTime = this.#platformFactory.createDateAndTime(obj);
                // this.addElementToMap(dateAndTime)
                // return dateAndTime;

                const dateAndTimeTypeContent = this.#platformFactory.createDateAndTime(obj);
                obj.typeContent = dateAndTimeTypeContent;
                const dateAndTime = new Element(obj);
                this.addElementToMap(dateAndTime)
                return dateAndTime;
        }

    }

    async readJson() {
        try{
            const response = await fetch('../files/entity.json');
            if(!response)
                throw new Error("Can't read entity");
            const entity = await response.json();
            return entity;

        }catch(error){
            console.error('Error reading entity', error);
        }
    }

    async getEntity() {
        this.#entity = await this.readJson();
        let entityDesign = `<div style="background-color: gray;"><h5 class="py-2">${this.#entity.entity_name}</h5>`

        this.#elementsMap.forEach(element => {
            if (Object.values(Types).includes(element.TypeContent._type) && element.TypeContent._category == Categories.FormControl) {
                let field = this.#entity.fields.find(field => field.name === element.Id);
                field.active = false;
            }
        })

        this.#entity.fields.forEach(field => {
            if (field.active === true)
                entityDesign += `<div class="border py-2 px-1 field newField" style="background-color: white;" draggable="true" id='${field.name}'> ${field.displayName}</div>`;
        });
        entityDesign += `</div>`;

        document.getElementById('entity').innerHTML = entityDesign;


    }

    compareEntityWithForm(){
        let compareResult = []
        this.#elements.forEach(tab => {
            tab.getElements().forEach(colTab => {
                colTab.getElements().forEach(sec=>{
                    sec.getElements().forEach(colSec=>{
                        colSec.getElements().forEach(field=>{
                            // console.log('field', field)
                            const feildFromEntity = this.#entity.fields.find(entityField=> entityField.name === field.Id);
                            // console.log('feildFromEntity', feildFromEntity)
                            const mergedObject = {};
                            const excludedFieldKeys = ['typeContent', 'mode','options', 'elements']

                            for(let key in field){
                                if(!mergedObject.hasOwnProperty(key) && !excludedFieldKeys.includes(key)){
                                    mergedObject[key] = field[key];
                                }
                            }
                            for(let key in feildFromEntity){
                                if(!mergedObject.hasOwnProperty(key) && !excludedFieldKeys.includes(key)){
                                    mergedObject[key] = feildFromEntity[key];
                                }else{
                                    if(typeof feildFromEntity[key] === 'boolean' && !excludedFieldKeys.includes(key) && feildFromEntity[key] === true){
                                        mergedObject[key] = feildFromEntity[key];
                                    }

                                }
                            }
                            // console.log('mergedObject: ', mergedObject);
                            compareResult.push(mergedObject);
                        })
                    })
                })
            })
        });

        return compareResult;
    }

    toSaveSchema() {
        const compareResult =  this.compareEntityWithForm();
        // console.log('compareResult: ',compareResult)

        return {
            platform: this.#platform,
            mode: this.#mode,
            entity: "",
            description: "",
            elements: this.#elements.map(e => e.toSaveSchema(compareResult))
        }
    }

    addPreviewEvents() {
        this.#elementsMap.forEach((el) => {
            let controlElm = document.getElementById(el.Id);

            //required
            if (el.TypeContent._category == Categories.FormControl) {
                if (el.Required) {
                    controlElm.addEventListener('blur', fieldIsRequired);
                }
            }

            // if (el.TypeContent._type == Types.Tab){
            //     console.log(controlElm)
            //     controlElm.addEventListener('click', rotateIcon)
            // }


        });

    }

}
