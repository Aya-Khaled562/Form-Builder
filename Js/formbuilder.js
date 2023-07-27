import AndroidElementFactory from "./android_element_factory.js";
import {Types} from "./element.js";
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
    #Tabs
    #tabAfterRender
    #sectionsBeforRender
    #sectionAfterRender
    #columnsAfterRender
    #columnsBeforRender
    #activeTab
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
        this.#Tabs = [];
        this.#tabAfterRender = [];
        this.#sectionsBeforRender= [];
        this.#sectionAfterRender = [];
        this.#columnsAfterRender = [];
        this.#columnsBeforRender = [];
        this.#activeTab = null;
        this.#entity = null;
        this.#json = json;
        this.#platformFactory = this.createPlatformFactory(this.#platform);// html or android
        this.ElementContent();
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
        // console.log('elements map', this.#elementsMap)
    }

    getElementFromMap(id) {
        return this.#elementsMap.get(id);
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

    getMode() {
        return this.#mode;
    }

    getElementByIndex(index) {
        return this.#elements[index];
    }

    setTab(tab){
        this.#Tabs.push(tab);
        console.log('Tabs',this.#Tabs);
    }

    getTabById(tabId){
        return this.#Tabs.find(tab=> tab.Id == tabId);
    }

    setActiveTab(tabId){
        this.#activeTab = this.getTabById(tabId);
    }

    getActiveTab(){
        return this.#activeTab;
    }

    setSectionBeforRender(section){
        this.#sectionsBeforRender.push(section);
    }

    getSectionBeforRender(){
        return this.#sectionsBeforRender;
    }

    setSectionAfterRender(section){
        this.#sectionAfterRender.push(section);
    }
    getSectionAfterRender(){
        return this.#sectionAfterRender;
    }
    setColumnsBeforeRender(column){

        this.#columnsBeforRender.push(column) ;
    }


    getSectionBeforeRenderById(id) {
        return this.#sectionsBeforRender.find((section) => section.Id === id);
    }

    setTabAfterRender(tab){
        this.#tabAfterRender.push(tab);
    }

    addSectionToTab(section){
        let targetId = '';
        if(this.#activeTab){
            const target = this.#activeTab.getElementByIndex(0);
            target.addElement(section);
            targetId = target.Id;
        }else{
            const targetTab = this.#Tabs[this.#Tabs.length-1];
            console.log('target tab: ', targetTab)
            const targetCol = targetTab.getElementByIndex(0);
            console.log('target col: ',targetCol);
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
        this.#Tabs.forEach(t => {
          const tabElement = document.getElementById(`${t.Id}`);
          if (t.Id === tabId) {
            if (tabElement.style.borderColor === 'green') {
              tabElement.style.borderColor = 'red';
              this.#activeTab = t;
            } else {
              tabElement.style.borderColor = 'green';
              this.#activeTab = null;
            }
          } else {
            tabElement.style.borderColor = 'green';
          }
        });
        console.log('active', this.#activeTab);
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

    handleDragAndDrop() {
        const formContainer = document.getElementById('formContainer');

        formContainer.addEventListener('dragstart', (e) => {
            this.dragAfterRender = e.target;
            if (e.target.classList.contains('section')) {
                this.dragBeforeRender = this.getSectionBeforeRenderById(e.target.id);
                e.target.style.opacity = '0.5';
            }
            else if(e.target.classList.contains('field')){
                if(e.target.classList.contains('newField')){
                    this.targetField = this.#entity.fields.find(field => field.name === this.dragAfterRender.id);
                    this.dragBeforeRender = this.build(this.targetField.type, `${this.targetField.name}`, `${this.targetField.displayName}`, 'py-3', 'border: 1px solid green', this.targetField.options);
                    this.addElementToMap(this.dragBeforeRender);
                }else{
                    this.dragBeforeRender = this.getFeildBeforeRender(e.target.id);
                    console.log('oldField' , this.dragBeforeRender);
                }
                e.target.style.opacity = '0.5';
            }

            console.log('dragstart' , e.target);
        });
    
        formContainer.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('section') || e.target.classList.contains('field') || e.target.classList.contains('tab')) {
                if (this.dragAfterRender) {
                    this.dragAfterRender.style.opacity = '1';
                    this.dragAfterRender = null;
                    console.log('dragend');
                }
            }
        });
    
        formContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            if ((e.target.classList.contains('coltab') && this.dragAfterRender.classList.contains('section')) ||
                (e.target.classList.contains('colsec')&& this.dragAfterRender.classList.contains('field')) ) 
            {
                e.target.style.borderBottom = '3px solid blue';
                console.log('dragover');
            }
            
        });
    
        formContainer.addEventListener('dragleave', (e) => {
            if (e.target.classList.contains('coltab') && this.dragAfterRender.classList.contains('section')) {
                e.target.style.borderBottom = '1px solid orange';
                console.log('dragleave');
            }
            else if (e.target.classList.contains('colsec') && this.dragAfterRender.classList.contains('field')) {
                e.target.style.borderBottom = '1px solid blue';
                console.log('dragleave field');
            }
        });
    
        formContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            let targetColId = e.target.id;
            let newColBeforRender = this.#columnsBeforRender.find(col => col.Id === targetColId);
            let oldParentColAfterRender = this.dragAfterRender.parentNode;
            let oldParentColBeforeRender = this.#columnsBeforRender.find(col => col.Id === oldParentColAfterRender.id)

            if(oldParentColAfterRender.classList.contains('colsec') || oldParentColAfterRender.classList.contains('coltab') ) {
                oldParentColBeforeRender = this.#columnsBeforRender.find(col => col.Id === oldParentColAfterRender.id);
                oldParentColBeforeRender.removeElement(this.dragBeforeRender);
            }
                
            if (e.target.classList.contains('coltab') && this.dragAfterRender.classList.contains('section')) {
                newColBeforRender.addElement(this.dragBeforeRender);
                e.target.style.borderBottom = '1px solid orange';
                e.target.append(this.dragAfterRender);
                console.log('drop');
            }

            else if (e.target.classList.contains('colsec')&& this.dragAfterRender.classList.contains('field')) {
                newColBeforRender.addElement(this.dragBeforeRender);
                e.target.style.borderBottom = '1px solid blue';
                if(this.dragAfterRender.classList.contains('newField')) {
                    this.dragAfterRender.classList.remove('newField');
                    const div = document.createElement('div');
                    div.innerHTML = this.dragBeforeRender.render()
                    oldParentColAfterRender.removeChild(this.dragAfterRender);
                    this.targetField.active = false;
                    e.target.append(div.firstChild);
                    addAllEventsToElement(this.dragAfterRender.id)
                }else{
                    
                    e.target.style.borderBottom = '1px solid blue';
                    e.target.append(this.dragAfterRender);

                }

            }
            
        });
    
        
    }

   async ElementContent(){
        switch(this.#mode){
            case 'create':
                this.load();
                this.addDesignContent();
                this.getEntity();
                break;
            case 'update':
                this.load();
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
                            // switch (control.type) {
                            //     case Types.Text:
                            //         formControl = this.#platformFactory.createSingleLineOfText(control.id, control.name, control.customClass, control.style, this.#mode);
                            //         console.log('formControl', formControl)
                            //         break;
                            // }

                            formControl = this.build(control.type, control.id, control.name, control.customClass, control.style, control.optionsSetValues);
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


            this.#Tabs.push(newTab);
            this.#elements.push(newTab);
            this.addElementToMap(newTab);
        });


    }

    addDesignContent() {
        document.getElementById(this.#parentId).innerHTML = this.#elements.map((tab) => tab.render()).join("");
        this.#elementsMap.forEach((el) => {
            if (Object.values(Types).includes(el.TypeContent._type)) {
                addAllEventsToElement(el.Id);
            }
        });

        this.addClickOnTab()
    }


    addClickOnTab(){
        this.#Tabs.forEach(t => {
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
            case 'single line of text':
                const text = this.#platformFactory.createSingleLineOfText(id, name, customClass, style, this.#mode);
                this.addElementToMap(text);
                return text;
            case 'option set':
                console.log('params', params);
                const optionSet = this.#platformFactory.createOptionSet(id, name, customClass, style, this.#mode, params[0]);
                this.addElementToMap(optionSet)
                return optionSet;
            case 'two options':
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

    async getEntity(){
        this.#entity = await this.readJson();
        let entityDesign = `<div style="background-color: gray;"><h5 class="py-2">${this.#entity.entity_name}</h5>`

        this.#entity.fields.forEach(field=>{
            if(field.active === true)
                entityDesign += `<div class="border py-2 px-1 field newField" style="background-color: white;" draggable="true" id='${field.name}'> ${field.displayName}</div>`;
        });
        entityDesign += `</div>`;

        document.getElementById('entity').innerHTML = entityDesign;
    }

    toSaveSchema() {
        return {
            platform: this.#platform,
            mode: this.#mode,
            entity: "",
            description: "",
            elements: this.#elements.map(e => e.toSaveSchema())
        }
    }

}
