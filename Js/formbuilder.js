import AndroidElementFactory from "./android_element_factory.js";
import {Categories, Types} from "./element.js";
import HtmlElementFactory from "./html_element_factory.js";
import {addAllEventsToElement} from "./ElementEventHandlers.js";


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

    constructor(json, mode, parentId) {
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

    removeElement(elementId) {
        let element = this.#elementsMap.get(elementId);

        if (element == null)
            return;

        this.#elementsMap.delete(elementId);

        if (element.TypeContent._type == Types.Tab) {
            this.#elements = this.#elements.filter((el) => el.Id != elementId);
            this.#elements = this.#elements.filter((el) => el.Id != elementId);
        } else if (element.TypeContent._type == Types.Section || element.TypeContent._category == Categories.FormControl) {
            let colId = document.getElementById(elementId).parentElement.id;
            let column = this.#columnsBeforRender.find(col => col.Id == colId);
            column.removeElement(elementId);
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

    setTab(tab) {
        this.#elements.push(tab);
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
        let oldFeilds = [];
        this.#sectionsBeforRender.forEach(sec => {
            sec.getElements().forEach(col => {
                col.getElements().forEach(feild => {
                    oldFeilds.push(feild);
                })
            })
        });
        console.log('oldFeilds func', oldFeilds);
        return oldFeilds.find(field => field.Id === id);
    }

   async ElementContent(){
        switch(this.#mode){
            case 'create':
            case 'update':
                this.load();
                document.getElementById(this.#parentId).innerHTML = this.#elements.map((tab) => tab.render()).join("");

                this.addDesignContent();
                this.getEntity();
                break;
            case 'preview':
                this.load();
                document.getElementById(this.#parentId).innerHTML = this.#elements.map((tab) => tab.render()).join("");
                break;
            default:
                throw new Error(`Invalid mode ${this.#mode}`);
        }
    }

    load() {
        const formTabs = this.#json.elements;
        formTabs.forEach((tab) => {
            const newTab = this.#platformFactory.createTab(tab.id, tab.name, tab.customClass, tab.style, this.#mode);
            tab.elements.forEach((tabColumn) => {
                const newTabCol = this.#platformFactory.createColumn(tabColumn.id, tabColumn.name, 'coltab col py-1 my-1 mx-1 ', tabColumn.style, this.#mode);
                tabColumn.elements.forEach((section) => {
                    const newSection = this.#platformFactory.createSection(section.id, section.name, section.customClass, section.style, this.#mode);
                    section.elements.forEach((column) => {
                        const newSectionCol = this.#platformFactory.createColumn(column.id, column.name, 'colsec col py-2 px-1 my-1 mx-1 ', column.style, this.#mode);

                        column.elements.forEach((control) => {
                            let formControl = null;
                            console.log('control: ' , control)
                            formControl = this.build(control.type, control.id, control.name, control.customClass, control.style, control.value);
                            newSectionCol.addElement(formControl);
                            this.addElementToMap(formControl);

                        });
                        this.#columnsBeforRender.push(newSectionCol);
                        newSection.addElement(newSectionCol);
                    });
                    this.#sectionsBeforRender.push(newSection);
                    newTabCol.addElement(newSection);
                    this.addElementToMap(newSection);
                });
                this.#columnsBeforRender.push(newTabCol);
                newTab.addElement(newTabCol);
            });
            this.#elements.push(newTab);
            this.addElementToMap(newTab);
        });
    }

    addDesignContent() {
        // document.getElementById(this.#parentId).innerHTML = this.#elements.map((tab) => tab.render()).join("");
        this.#elementsMap.forEach((el) => {
            if (Object.values(Types).includes(el.TypeContent._type)) {
                addAllEventsToElement(el.Id, this);
            }
        });

        //this.addClickOnTab()
    }


    addClickOnTab(){
        this.#elements.forEach(t => {
            const target = document.getElementById(`${t.Id}`);
            target.addEventListener('click', ()=> {
                this.handleTabClick(t.Id)
            });
        });
    }


    build(type, id, name, customClass, style, ...params) {

        switch (type) {
            case 'tab':
                const tab = this.#platformFactory.createTab(id, name, customClass, style, this.#mode);
                this.setTab(tab);
                this.#elements.push(tab);
                this.addElementToMap(tab)
                return tab;
            case 'section':
                const section = this.#platformFactory.createSection(id, name, customClass, style, this.#mode);
                this.addElementToMap(section)
                return section;
            case 'column':
                const column = this.#platformFactory.createColumn(id, name, customClass, style, this.#mode);
                return column;
            
            //new Type
            case 'file upload':
                const file = this.#platformFactory.createFileUpload(id, name, customClass, style, this.#mode);
                this.addElementToMap(file);
                return file;
 
            case 'single line of text':
                const text = this.#platformFactory.createSingleLineOfText(id, name, customClass, style, this.#mode);
                this.addElementToMap(text);
                return text;
            case 'option set':
                console.log('option set: ', params[0]);
                const optionSet = this.#platformFactory.createOptionSet(id, name, customClass, style, this.#mode, params[0]);
                this.addElementToMap(optionSet)
                return optionSet;
            case 'two options':
                console.log('two options : ', params[0])
                const twoOptions = this.#platformFactory.createTwoOptions(id, name, customClass, style, this.#mode, params[0]);
                this.addElementToMap(twoOptions)
                return twoOptions;
            case 'decimal number':
                const decimalNumber = this.#platformFactory.createDecimalNumber(id, name, customClass, style, this.#mode);
                this.addElementToMap(decimalNumber)
                return decimalNumber;
            case 'multiple line of text':
                const multipleLineOfText = this.#platformFactory.createMultipleLineOfText(id, name, customClass, style, this.#mode);
                this.addElementToMap(multipleLineOfText)
                return multipleLineOfText;
            case 'date and time':
                const dateAndTime = this.#platformFactory.createDateAndTime(id, name, customClass, style, this.#mode);
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

    toSaveSchema() {
        console.log("aksdfj: ", this.#elements.map(e => e.toSaveSchema()))
        return {
            platform: this.#platform,
            mode: this.#mode,
            entity: "",
            description: "",
            elements: this.#elements.map(e => e.toSaveSchema())
        }
    }

}
