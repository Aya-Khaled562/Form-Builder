import AndroidElementFactory from "./platforms/android_element_factory.js";
import {Categories, Types} from "./Element/element.js";
import HtmlElementFactory from "./platforms/html_element_factory.js";
import {addAllEventsToElement, fieldIsRequired, fieldMaxAndMinLen, validatePattern, showLookupLoadMoreRecordsModal} from "./Utilities/ElementEventHandlers.js";
import Element from "./Element/element.js";
import Value from "./Element/value.js";

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
    requiredFields = [];
    constructor(json,mode, parentId , entity = null) {
        this.#platform = json.platform;
        this.#mode = mode;
        this.#elementsMap = new Map();
        this.#elements = [];
        this.#parentId = parentId;
        this.#sectionsBeforRender= [];
        this.#columnsBeforRender = [];
        this.#activeElement = null;
        this.#entity = entity;
        this.#json = json;
        this.#fields = [];
        // console.log('mode: formbuilder: ',mode );
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

        console.log('element to be removed', element);
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
                            let field = this.#entity.attributeSchemas.find(field => field.id == control.Id);
                            if (field) {
                                document.getElementById('FieldList').innerHTML += `<div class="border py-2 px-1 field newField" style="background-color: white;" draggable="true" id='${field.id}'><img src="img/ico_18_attributes.gif"> ${field.displayName}</div>`;
                            }
                        });
                    })
                });
            });

        } else if (element.TypeContent._type == Types.Section || element.TypeContent._category == Categories.FormControl) {
            let colId = document.getElementById(elementId).parentElement.id;
            let column = this.#columnsBeforRender.find(col => col.Id == colId);
            console.log('columns to be removed', column);

            column.removeElement(elementId);

            if (element.TypeContent._type == Types.Section) {
                element.getElements().forEach(secCol => {
                    secCol.getElements().forEach(control => {
                        console.log(this.#entity.attributeSchemas)
                        console.log(element.Id)
                        let field = this.#entity.attributeSchemas.find(field => field.id == control.Id);
                        if (field) {
                            document.getElementById('FieldList').innerHTML += `<div class="border py-2 px-1 field newField" style="background-color: white;" draggable="true" id='${field.id}'><img src="img/ico_18_attributes.gif"> ${field.displayName}</div>`;
                        }
                    });
                });
            } else {
                let field = this.#entity.attributeSchemas.find(field => field.id == element.Id);
                if (field) {
                    console.log('field to be removed', field);

                    document.getElementById('FieldList').innerHTML += `<div class="border py-2 px-1 field newField" style="background-color: white;" draggable="true" id='${field.id}'><img src="img/ico_18_attributes.gif"> ${field.displayName}</div>`;
                    console.log('entity to insert field',  document.getElementById('FieldList'));
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

    getColumnsBeforeRender(){
        return this.#columnsBeforRender;
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
            // console.log('target tab: ', targetTab)
            const targetCol = targetTab.getElementByIndex(0);
            // console.log('target col: ', targetCol);
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
        // console.log('active', this.#activeElement);
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
                this.#entity.attributeSchemas.forEach(field =>{
                    if(field.isRequired){
                        this.requiredFields.push(field);
                    }
                }); 

                if(this.requiredFields.length > 0){
                    this.drawRequiredFields();
                }

                // console.log('elements after push required fields: ', this.#elements);

                document.getElementById(this.#parentId).innerHTML += this.#elements.map((tab) => tab.render()).join("");

                this.addDesignContent();

                this.getEntity();
                break;
            case 'preview':
            case 'custom':
                this.load();
                // console.log('after loading at prievew');
                // console.log(this.#elements);
                document.getElementById(this.#parentId).innerHTML += this.#elements.map((tab) => tab.render()).join("");
                this.addPreviewEvents();
                break;
            default:
                throw new Error(`Invalid mode ${this.#mode}`);
        }
    }

    drawRequiredFields(){
        this.getElements().forEach(tab => {
            tab.getElements().forEach(coltab=>{
                coltab.getElements().forEach(sec=>{
                    sec.getElements().forEach(colsec=>{
                        this.requiredFields.forEach(field=>{
                            let value = new Value('', field.type,  field.lookup || field.options || {})
                            let obj = {
                                customClass: 'py-3',
                                style: 'border: 1px dashed #6d6e70',
                                id: field.id,
                                name: field.name,
                                displayName: field.displayName,
                                type: field.type,
                                value: value,
                                isRequired: field.isRequired,
                                minLen: field.minLen,
                                maxLen: field.maxLen,
                                pattern: field.pattern
                            }
                            console.log('object at draw required elements', obj);

                            let fieldElement = this.build(field.type , obj)
                            colsec.addElement(fieldElement);
                            this.addElementToMap(fieldElement)
                        });
                        // console.log('colsec', colsec);
                    });
                });
            });
        });
    }

    load() {
        const formTabs = this.#json.elements;
        // console.log('formTabs', formTabs);
        formTabs.forEach((tab) => {
            tab.mode = this.#mode;
            // const newTab = this.build(Types.Tab, createElementFactoryPropertiesObj(tab.id, tab.name, "col py-2", tab.style,this.#mode)); 
            const newTab = this.build(Types.Tab, tab); // need to be handled
            // console.log('1 tab: ', newTab);

            tab.elements.forEach((tabColumn) => {
                tabColumn.mode = this.#mode;
                // tabColumn.customClass = 'coltab col py-1 my-1 mx-1';
                // const newTabCol = this.build(Types.Column, createElementFactoryPropertiesObj(tabColumn.id, tabColumn.name, 'coltab col py-1 my-1 mx-1', tabColumn.style, this.#mode));
                const newTabCol = this.build(Types.Column, tabColumn);
                // console.log('2) colTab : ' , newTab);
                tabColumn.elements.forEach((section) => {
                    section.mode = this.#mode;
                    const newSection = this.build(Types.Section,section); 
                    // console.log('3) section: ' , newSection);                   
                    section.elements.forEach((column) => {
                        // column.mode = column;
                        column.mode =  this.#mode;
                        // const newSectionCol = this.build(Types.Column, createElementFactoryPropertiesObj(column.id, column.name, 'colsec col py-2 px-1 my-1 mx-1 ', column.style, this.#mode));
                        const newSectionCol = this.build(Types.Column,column);
                        // console.log('4) columnSection : ' , newSectionCol);
                        


                        column.elements.forEach((control) => {
                            let formControl = null;
                            // control.labelPosition = section.labelPosition;
                            formControl = this.build(control.type, control);
                            // console.log('5) control ', formControl);
                            // console.log('form control', formControl);
                            this.#fields.push(formControl);
                            
                            newSectionCol.addElement(formControl);
                            // console.log('------------------------');
                        
                        });



                        this.#columnsBeforRender.push(newSectionCol);
                        newSection.addElement(newSectionCol);
                    });
                    
                    this.#sectionsBeforRender.push(newSection);
                    newTabCol.addElement(newSection);
                });
                this.#columnsBeforRender.push(newTabCol);
                newTab.addElement(newTabCol);
            });
        });
        // console.log('elements after loading', this.#elements);
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
        obj.mode = this.#mode;
        switch (type) {
            case 'tab':
                const tabTypeContent = this.#platformFactory.createTab(obj);
                obj.typeContent = tabTypeContent;
                obj.collapse = true;
                const tab = new Element(obj);
                this.#elements.push(tab);
                this.addElementToMap(tab);
                return tab;

            case 'section':
                const sectionTypeContent = this.#platformFactory.createSection(obj);
                obj.typeContent = sectionTypeContent;
                const section = new Element(obj);
                this.addElementToMap(section)
                return section;

            case 'column':
                const columnTypeContent = this.#platformFactory.createColumn(obj);
                obj.typeContent = columnTypeContent;
                const column = new Element(obj);
                return column;

            case 'single line of text':
                const textTypeContent = this.#platformFactory.createSingleLineOfText(obj);
                obj.typeContent = textTypeContent;
                const text = new Element(obj);
                this.addElementToMap(text);
                return text;

            case 'option set':
                const optionSetTypeContent = this.#platformFactory.createOptionSet(obj);
                obj.typeContent = optionSetTypeContent;
                const optionSet = new Element(obj);
                this.addElementToMap(optionSet)
                return optionSet;

            case 'two options':
                const twoOptionsTypeContent = this.#platformFactory.createTwoOptions(obj);
                obj.typeContent = twoOptionsTypeContent;
                const twoOptions = new Element(obj);
                this.addElementToMap(twoOptions)
                return twoOptions;

            case 'decimal number':
                const decimalNumberTypeContent = this.#platformFactory.createDecimalNumber(obj);
                obj.typeContent = decimalNumberTypeContent;
                const decimalNumber = new Element(obj);
                this.addElementToMap(decimalNumber)
                return decimalNumber;

            case 'multiple line of text':
                const multipleLineOfTextTypeContent = this.#platformFactory.createMultipleLineOfText(obj);
                obj.typeContent = multipleLineOfTextTypeContent;
                const multipleLineOfText = new Element(obj);
                this.addElementToMap(multipleLineOfText)
                return multipleLineOfText;

            case 'date and time':
                const dateAndTimeTypeContent = this.#platformFactory.createDateAndTime(obj);
                obj.typeContent = dateAndTimeTypeContent;
                const dateAndTime = new Element(obj);
                this.addElementToMap(dateAndTime)
                return dateAndTime;
            case 'email': 
                obj.typeContent =  this.#platformFactory.createEmail(obj);;
                const email = new Element(obj);
                this.addElementToMap(email)
                 return email;
            case 'password':
                obj.typeContent = this.#platformFactory.createPassword(obj);
                const password = new Element(obj);
                this.addElementToMap(password);
                return password;

            case 'phone number':
                obj.typeContent = this.#platformFactory.createPhoneNumber(obj);
                const phone = new Element(obj);
                this.addElementToMap(phone);
                return phone;

            case 'file upload':
                obj.typeContent = this.#platformFactory.createFileUpload(obj);
                const file = new Element(obj);
                this.addElementToMap(file);
                return file;

            case 'image':
                obj.typeContent = this.#platformFactory.createImage(obj);
                const image = new Element(obj);
                this.addElementToMap(image);
                return image;
            case 'lookup':
                obj.typeContent = this.#platformFactory.createLookup(obj);

                console.log('lookup obj at build', obj);

                const lookup = new Element(obj);
                console.log('lookup element at build', lookup);
                console.log('lookup element value at build', lookup.value);

                this.addElementToMap(lookup);
                return lookup;
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
        let entityDesign = `<div id="rightSideTitle"><h5>${this.#entity.entityName}<img src="img/ico_form_assistexpanded.png"/></h5><div id="FieldList">`
        this.#elementsMap.forEach(element => {
            if (Object.values(Types).includes(element.TypeContent._type) && element.TypeContent._category == Categories.FormControl) {
                let field = this.#entity.attributeSchemas.find(field => field.id === element.Id);
                // field.active = false;
            }
        })
        this.#entity.attributeSchemas.forEach(field => {
            // if (field.active === true)
            if (field.isRequired === false){
                entityDesign += `<div class="field newField" style="background-color: white;" draggable="true" id='${field.id}'><img src="img/ico_18_attributes.gif"/> ${field.displayName}</div>`;
            }
        });

        entityDesign += `</div></div>`;
        document.getElementById('entity').innerHTML = entityDesign;
       

    }

    compareEntityWithForm(){
        let compareResult = []
        this.#elements.forEach(tab => {
            tab.getElements().forEach(colTab => {
                colTab.getElements().forEach(sec=>{
                    sec.getElements().forEach(colSec=>{
                        colSec.getElements().forEach(field=>{
                            // console.log('field in compare', field)
                            const feildFromEntity = this.#entity.attributeSchemas.find(entityField=> entityField.id === field.Id);
                            // console.log('feildFromEntity in compare', feildFromEntity)

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
        console.log('elements: ', this.#elements)
        const compareResult =  this.compareEntityWithForm();
        console.log('compareResult: ',compareResult)

        return {
            platform: this.#platform,
            mode: this.#mode,
            entity: "",
            description: "",
            elements: this.#elements.map(e => e.toSaveSchema(compareResult))
        }
    }


    lookupSearchClicked(lookupElement){
        return async function(e){

            let lookupFieldElm = $(`#${lookupElement.Id}`);
            console.log('heree lookup', lookupElement);
            // get views from server
          // console.log(this.getViewData());
          let viewData = [];
          if (!lookupElement.value.source.selectedData){
              const form = await fetch(`http://localhost:5032/api/EntitySchemas/viewData?viewName=${lookupElement.value.source.lookFor}`);
               viewData =  await form.json();

               if (lookupFieldElm.val().trim() != ''){
                    viewData = viewData.filter(item => item.name.toLowerCase().indexOf(lookupFieldElm.val().toLowerCase()) != -1);
               }

          }else {
            viewData.push(lookupElement.value.source.selectedData);
          }

           console.log(viewData);

           let lookupListElm = $(`#${lookupElement.Id}_lookup_list`);

           if (lookupListElm){
            lookupListElm.html('');
            viewData.forEach(viewItem => {

                let listItem = `<a href="#" class="list-group-item list-group-item-action"  data-id="${viewItem.id}" data-name="${viewItem.name}" aria-current="true">
                <p class="mb-1" data-id="${viewItem.id}" data-name="${viewItem.name}">${viewItem.name}</p>
                <p class="mb-1" data-id="${viewItem.id}" data-name="${viewItem.name}">${viewItem.place}</p>
            </a>`;


               lookupListElm.append(listItem);
           });

           lookupListElm.append(`<a href="#" class="list-group-item list-group-item-action loadMore" id="${lookupElement.id}_loadMore" aria-current="true">
           <p class="mb-1">Load More</p>
       </a>`);


           }
           lookupListElm.children().each(function(index, listItem){

            if (listItem.id == `${lookupElement.id}_loadMore`){
                $(listItem).on('click', showLookupLoadMoreRecordsModal(lookupElement));
                return;
            }

            $(listItem).on('click', function(e){
                let lookupFieldElm = $(`#${lookupElement.Id}`);
                if (lookupFieldElm){
                    console.log(lookupFieldElm);
                    console.log(e.target.parentElement);

                    lookupFieldElm.val( e.target.getAttribute('data-name'));
                    lookupFieldElm.attr('data-value', e.target.getAttribute('data-id'));
                    lookupElement.value.source.selectedData =  viewData.find(item => item.id == e.target.getAttribute('data-id'));


                    console.log(e.target.getAttribute('data-name'));
                }
                lookupListElm.toggleClass('d-none');

            });
           });

           lookupListElm.append(`<a class="d-flex justify-content-between list-group-item list-group-item-action results bg-light" id="${lookupElement.id}_results" aria-current="true">
           <p class="mb-1">${viewData.length} results</p>
           <div class="mb-1" id="${lookupElement.Id}_new" style="cursor: pointer;"><i class="fa-solid fa-plus"></i> New</div>
       </a>`);

           if (lookupListElm.has('d-none')){
            lookupListElm.removeClass('d-none');
           };
        }
    }

    addPreviewEvents() {
        this.#elementsMap.forEach((el) => {
            let controlElm = document.getElementById(el.Id);
           
            if (el.TypeContent._category == Categories.FormControl) {
                if (el.isRequired) {
                    controlElm.addEventListener('blur', fieldIsRequired);
                }
                if (el.pattern){
                    controlElm.addEventListener('blur', validatePattern(el));
                }
                //controlElm.addEventListener('blur', fieldMaxAndMinLen(el));
                
                if (el.TypeContent._type == Types.Lookup){
                    console.log(this.#entity);
                    // let fieldSchema = this.#entity.attributeSchemas.find(field => field.id === el.Id);
                    //console.log('elelement ', el);
                    // console.log('field schema ', fieldSchema);
                    // //console.log('next element sibling',controlElm.nextElementSibling);
                    // let value = new Value('',Types.Lookup ,fieldSchema.lookup);
                    // el.Value = value;
                    // console.log('lookup element dddd',el.Value);
                    controlElm.nextElementSibling.addEventListener('click',  this.lookupSearchClicked(el))
                }
            }
        });

    }


    mapData(data){
        this.#elements.forEach(tab => {
            tab.getElements().forEach(colTab => {
                colTab.getElements().forEach(sec=>{
                    sec.getElements().forEach(colSec=>{
                        colSec.getElements().forEach(field=>{
                            if(data.hasOwnProperty(field.name)){
                                let value = data[field.name];
                                if(field.name === 'image'){
                                    value = null;
                                }
                                field.Value = value;
                                document.getElementById(`${field.id}`).value = value;
                                if(field.name === 'startDate'){
                                    let dateFromBackend = value.split('T')[0];
                                    document.getElementById(`${field.id}`).value = dateFromBackend;
                                }
                            }
                        })
                    })
                })
            })
        });
    }

}
