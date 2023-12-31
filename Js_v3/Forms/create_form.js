import FormBuilder from "../formbuilder.js";
// import '.../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
// import {Types , Categories} from "../Element/element.js";
import {Types , Categories} from "../Element/element.js";
import {addAllEventsToElement, handleDragAndDrop} from "../Utilities/ElementEventHandlers.js";
import {createElementFactoryPropertiesObj,download,getJson} from "../Utilities/Utils.js";

export default class CreateForm {
    jsonData;
    mode;
    builder;
    entity;
    toggler;

    constructor(jsonData, mode, entity) {
        this.tabCounter = 0;
        this.secCounter = 2;
        this.coltabCounter = 0;
        this.colsecCounter = 0;
        this.jsonData = jsonData;
        this.mode = mode; 
        this.builder = null;  
        this.entity = entity;
        this.toggler = false;
    }

    initialize(){
        this.builder = new FormBuilder(this.jsonData,this.mode,'form', this.entity);
        this.initializeUI();
        return this.jsonData;
    }

    initializeUI() {
        document.getElementById("addTabWith1Col").addEventListener("click", () => this.addTab('col'));
        document.getElementById("addTabWith2Col1").addEventListener("click", () => this.addTab('col-7', 'col-4'));
        document.getElementById("addTabWith2Col2").addEventListener("click", () => this.addTab('col-4','col-7'));
        document.getElementById("addTabWith2Col3").addEventListener("click", () => this.addTab('col','col'));
        document.getElementById("addTabWith3Col1").addEventListener("click", () => this.addTab('col', 'col', 'col'));
        document.getElementById("addTabWith3Col2").addEventListener("click", () => this.addTab('col-3', 'col-5', 'col-3'));
        document.getElementById("addSectionWith1Col").addEventListener("click", () => this.addSection(1));
        document.getElementById("addSectionWith2Col").addEventListener("click", () => this.addSection(2));
        document.getElementById("addSectionWith3Col").addEventListener("click", () => this.addSection(3));
        document.getElementById('save').addEventListener('click', () => this.handleSave())
        document.getElementById('custom').addEventListener('click', () => this.handleCustom());

        $('#exampleModal').on('shown.bs.modal', (e) => this.handleModalShown(e));
        $('#exampleModal').on('hidden.bs.modal', (e) => this.handleModelClose(e));
        $('#exampleModal #modalSave').on('click', (e) => this.handleModalSave(e));
        let preview = document.getElementById('preview');
        preview.addEventListener('click', (e) => this.handlePreview(e));
        let removeBtn = document.getElementById('removeBtn');
        removeBtn.addEventListener('click', (e) => this.handleRemoveBtnClick(e));
        let updateModeBtn = document.getElementById('updateMode');
        updateModeBtn.addEventListener('click', (e) => this.handleUpdateModeBtnClick(e));
        let createModeBtn = document.getElementById('createMode');
        createModeBtn.addEventListener('click', (e) => this.handleCreateModeBtnClick(e));
        document.getElementById('entityName').innerText = this.entity.entityName;
        handleDragAndDrop(this.builder);
        
    }


    createColumnAndSection(builder , colTabclass){

        let col = this.builder.build('column', createElementFactoryPropertiesObj(`${crypto.randomUUID()}`, 'Column_Tab', `coltab py-1 my-1 mx-1 ${colTabclass}`, 'border: 0px solid orange'));
        let sec = this.builder.build('section', createElementFactoryPropertiesObj(`${crypto.randomUUID()}`, `Section`, 'my-2', 'border: 1px dashed green;'));
        let colSec = this.builder.build('column', createElementFactoryPropertiesObj(`${crypto.randomUUID()}`, 'Column_Section', 'colsec col py-2 px-1 my-1 mx-1', 'border: 1px dashed #6d6e70'));
       
        builder.setSectionBeforRender(sec);
        sec.addElement(colSec);
        builder.setColumnsBeforeRender(colSec);
        col.addElement(sec);
        builder.setColumnsBeforeRender(col);

        return col;
        
    }

    addTab(colClass1='' , colClass2='' , colClass3='') {
        console.log('call add tab method >>>>>>>>>>>>')
        this.tabCounter++
        const tab = this.builder.build('tab', createElementFactoryPropertiesObj(`${crypto.randomUUID()}`, "Tab", "py-2", "border: 1px dashed #6d6e70"));
        if(colClass1!= ''){
            const col1 = this.createColumnAndSection(this.builder , `${colClass1}`)
            tab.addElement(col1);
        }
        if(colClass2 != ''){
            const col2 = this.createColumnAndSection(this.builder , `${colClass2} `)
            tab.addElement(col2);
        }
        if(colClass3 != ''){
            const col3 = this.createColumnAndSection(this.builder ,  `${colClass3} `)
            tab.addElement(col3);
        }
        document.getElementById('form').innerHTML += tab.render();
        this.builder.addDesignContent();
        console.log('elements from tab: ' , this.builder.getElements());
    }

    addSection(numOfCols) {
        let sec = this.builder.build('section', createElementFactoryPropertiesObj(`${crypto.randomUUID()}`, `Section`, 'my-2', 'border: 1px dashed green;'));
        for(let i=0; i<numOfCols; i++){
            this.secCounter++
            this.colsecCounter++
            let col = this. builder.build('column', createElementFactoryPropertiesObj(`${crypto.randomUUID()}`, 'Column_Section', 'colsec col py-2 px-1 my-1 mx-1 ', 'border: 1px dashed #6d6e70'));
            sec.addElement(col);
            this.builder.setColumnsBeforeRender(col);
        }

        const targetId = this.builder.addSectionToTab(sec);
        this.builder.setSectionBeforRender(sec);
        document.getElementById(`${targetId}`).innerHTML += sec.render();
        this.builder.addDesignContent();
    }

    handleModelClose(e){
        this.builder.setActiveElement('none');
    }

    handleModalShown(e) {

        //$(this).find('.nav a:first').tab('show');


        console.log("modal is fired>>>>>>");
        let elementId = $('#exampleModal').attr('data-id');
        console.log('elementId in handleModal: ' , elementId);
        let element = this.builder.getElementFromMap(elementId)
    

        //#region display tab content

            // label name input
            $('#exampleModal .modal-body #display').html(`<div class="mb-3">
            <label htmlFor="displayNameElm" class="form-label">Label</label>
            <input type="text" class="form-control" id="displayNameElm" value="${element.DisplayName}">
            </div>`);


            // label show or not.
            $('#exampleModal .modal-body #display').append(`<div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" ${element.showLabel? 'checked': ''} id="labelShowCheckElm">
                <label class="form-check-label" for="labelShowCheckElm">Display label on the form</label>
            </div>`); 

            // tab is expanded or not
            if (element.TypeContent._type == Types.Tab){
                $('#exampleModal .modal-body #display').append(`<div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" ${element.collapse? 'checked': ''} id="expandTabCheckElm">
                    <label class="form-check-label" for="expandTabCheckElm">Expand this tab by default</label>
                </div>`); 
            }


            // visible property input
            $('#exampleModal .modal-body #display').append(`<div class="mb-3">
            <div>
                 Specify the default visibility of this ${element.TypeContent._type == Types.Tab? 'tab': element.TypeContent._type == Types.Section? 'section' : 'control'}
            </div>
            <input type="checkbox" class="form-check-input" ${element.Visible? 'checked': ''} id="visiblePropertycheckElm">
            <label class="form-check-label" for="visiblePropertycheckElm">Visible by default</label>
            </div>`);

            if (element.TypeContent._type == Types.Section || element.TypeContent._category == Categories.FormControl){
                    // locked property
                    $('#exampleModal .modal-body #display').append(`<div class="mb-3">
                    <div>
                        lock the ${element.TypeContent._type == Types.Section? 'section' : 'control'} on the form
                    </div>
                    <input type="checkbox" class="form-check-input" ${element.isLocked? 'checked': ''} id="isLockedPropertycheckElm">
                    <label class="form-check-label" for="isLockedPropertycheckElm">Not locked by default</label>
                    </div>`);

            }
           
           

        if(element.TypeContent._category === Categories.FormControl){
            // required property input
            $('#exampleModal .modal-body #display').append(`<div class="mb-3">
                    <label htmlFor="requiredPropertyControl" id="requiredLabel" class="form-label">Required level</label>
                    <select class="form-select" name="required" id="requiredPropertyControl">
          <option value="0" ${!element.isRequired ? `selected` : ''}>Optional</option>
          <option value="1" ${element.isRequired ? `selected` : ''}>Required</option>
        </select>
                </div>`);
        
        
            // read only property input
            $('#exampleModal .modal-body #display').append(`<div class="mb-3">
                    <label htmlFor="readonlyPropertyControl" id="readOnlyLabel" class="form-label">Read only</label>
                    <select class="form-select" name="readOnly" id="readonlyPropertyControl">
          <option value="0" ${!element.ReadOnly ? `selected` : ''}>NO</option>
          <option value="1" ${element.ReadOnly ? `selected` : ''}>YES</option>
        </select>
                </div>`);


                if (element.TypeContent._type == Types.Lookup){
                    // default view property input    
                    console.log('elelemnt ', element);
                let defaultViewName = element.ElementValue.source.defaultView;
                if (!defaultViewName){
                    defaultViewName = element.ElementValue.source.lookFor;
                    element.ElementValue.source.defaultView = defaultViewName;
                }

                let lookupViews = element.ElementValue.source.views;
                
                let selectMenuOptions = '';
                lookupViews.forEach(view => {
                    selectMenuOptions += `<option value="${view}" ${view == defaultViewName ? `selected` : ''}>${view}</option>`
                });
                $('#exampleModal .modal-body #display').append(`<div class="mb-3">
                <label htmlFor="defaultLookupViewElm" class="form-label">Select Defualt view</label>
                <select class="form-select" name="required" id="defaultLookupViewElm">${selectMenuOptions}</select></div>`); 
                }
           


        
               
        }

        //#endregion

        //#region formating tab content
                 // number of columns input
            if ([Types.Section, Types.Tab].includes(element.TypeContent._type)) {
                $('#exampleModal .modal-body #formating').html(`<div>Number of Columns:</div><div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="numberOfColumnsOptions" id="inlineRadio1" value="1" ${element.getElements().length == 1 ? "checked" : ""}>
    <label class="form-check-label" for="inlineRadio1">1</label>
    </div>
    <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="numberOfColumnsOptions" id="inlineRadio2" value="2" ${element.getElements().length == 2 ? "checked" : ""}>
    <label class="form-check-label" for="inlineRadio2">2</label>
    </div>
    <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="numberOfColumnsOptions" id="inlineRadio3" value="3" ${element.getElements().length == 3 ? "checked" : ""}>
    <label class="form-check-label" for="inlineRadio3">3</label>
    </div>`); }

    if (element.TypeContent._type == Types.Section){

        // control positon
        $('#exampleModal .modal-body #formating').append(`<div class="mt-3">Select field label position</div><div class="form-check">
        <input class="form-check-input" type="radio" name="labelPositionSectionProp" value="side"  id="sidePosition" ${!element.labelPosition? 'checked': ''}>
        <label class="form-check-label" for="sidePosition">
        Side
        </label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="radio"  name="labelPositionSectionProp" value="top" id="topPosition"  ${element.labelPosition? 'checked': ''}>
        <label class="form-check-label" for="topPosition">
        Top
        </label>
    </div>`);

        // label alignment
        $('#exampleModal .modal-body #formating').append(`<div class="mt-3">Select field label alignment</div><div class="form-check">
        <input class="form-check-input" type="radio" name="labelAlignmentSectionProp" value="left"  id="leftAlignment" ${!element.labelAlignment? 'checked': ''}>
        <label class="form-check-label" for="leftAlignment">
        Left
        </label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="radio"  name="labelAlignmentSectionProp" value="right" id="rightAlignment"  ${element.labelAlignment? 'checked': ''}>
        <label class="form-check-label" for="rightAlignment">
        Right
        </label>
    </div>`);

    }else if (element.TypeContent._type == Types.MultipleLineOfText){
        $('#exampleModal .modal-body #formating').append(`<div>
        <label class="form-label" for="textAreaRows">Number of rows</label>
        <input class="form-control" type="text" value="${element.textAreaRows}"  id="textAreaRows">
    </div>`);
    }
    
    
        //#endregion

    }

    handleModalSave(e) {

        let elementId = $('#exampleModal').attr('data-id');
        //console.log('elementId skdjfk: ' , elementId)
        let element = this.builder.getElementFromMap(elementId)

        // display name
        let displayNameElm = $('#exampleModal #displayNameElm');
        if (displayNameElm) {
            element.DisplayName = displayNameElm.val();
        }

        // label show
        let labelShowCheckElm = $('#labelShowCheckElm');
        if (labelShowCheckElm.prop('checked')){
            element.showLabel = true;
        }else {
            element.showLabel = false;
        }

        // tab expand or not
        let expandTabCheckElm = $('#expandTabCheckElm');
        if (expandTabCheckElm){
            element.collapse = expandTabCheckElm.prop('checked') ? true : false;
        }

        // element visible or not
        let visiblePropertycheckElm = $('#visiblePropertycheckElm');
        console.log('visible chekc elment: ',visiblePropertycheckElm);
        if (visiblePropertycheckElm){
            element.Visible = visiblePropertycheckElm.prop('checked') ? true : false;
        }


        let isLockedPropertycheckElm = $('#isLockedPropertycheckElm');
        if (isLockedPropertycheckElm){
            console.log('locked chekc elment: ',isLockedPropertycheckElm.prop('checked'));
            element.isLocked = isLockedPropertycheckElm.prop('checked')? true : false ;
        }

        
        // number of columns
        let columnsAdded = [];
        if (element.TypeContent._type == Types.Tab || element.TypeContent._type == Types.Section) {
            let checkedColumnsValue = $('#exampleModal input[name=numberOfColumnsOptions]:checked').val();

            let currentNumberOfCols = element.getElements().length;
            if (checkedColumnsValue < currentNumberOfCols) {
                while (currentNumberOfCols > checkedColumnsValue) {
                    let removedElement = element.popElement();
                    console.log('removed element', removedElement);

                    removedElement.getElements().forEach(el => {
                        console.log('el in removed element', el);
                        if (el.TypeContent._type == Types.Section){
                            el.getElements().forEach( secCol => {
                                secCol.getElements().forEach(control => {
                                    document.getElementById('FieldList').innerHTML += `<div class="border py-2 px-1 field newField" style="background-color: white;" draggable="true" id='${control.Id}'><img src="img/ico_18_attributes.gif"> ${control.Name}</div>`;
                                });
                            });
                        }else if (el.TypeContent._category == Categories.FormControl){
                            document.getElementById('FieldList').innerHTML += `<div class="border py-2 px-1 field newField" style="background-color: white;" draggable="true" id='${el.Id}'><img src="img/ico_18_attributes.gif"> ${el.Name}</div>`;

                        }
                    });
                    

                    currentNumberOfCols--;
                }
            } else if (checkedColumnsValue > currentNumberOfCols) {
                while (currentNumberOfCols < checkedColumnsValue) {
                    let col = null;
                    if (element.TypeContent._type == Types.Tab) {
                        col = this.builder.build(Types.Column, createElementFactoryPropertiesObj(crypto.randomUUID(), 'Column', 'coltab py-1 my-1 mx-1 col', 'border: 0px solid orange;'))
                        let section = this.builder.build(Types.Section, createElementFactoryPropertiesObj(crypto.randomUUID(), 'Section', 'my-2', 'border: 1px dashed green;'));
                        columnsAdded.push(section);

                        let sectionCol = this.builder.build(Types.Column, createElementFactoryPropertiesObj(crypto.randomUUID(), 'Column', 'colsec col py-2 px-1 my-1 mx-1', 'border: 1px dashed #6d6e70;'));
                        section.addElement(sectionCol);
                        columnsAdded.push(sectionCol);

                        col.addElement(section);
                        this.builder.addElementToMap(section);
                        this.builder.setSectionBeforRender(section);
                        this.builder.setColumnsBeforeRender(sectionCol);
                    } else {
                        col = this.builder.build(Types.Column, createElementFactoryPropertiesObj(crypto.randomUUID(), 'Column', 'colsec col py-2 px-1 my-1 mx-1', 'border: 1px dashed #6d6e70;'));
                    }

                    element.addElement(col);
                    columnsAdded.push(col);
                    this.builder.setColumnsBeforeRender(col);  // needs to handle
                    currentNumberOfCols++;
                }
            }
        }

        if (element.TypeContent._type == Types.Section){
            let labelPositionSectionPropElm = $('input[name="labelPositionSectionProp"]:checked');
            if (labelPositionSectionPropElm){
                console.log('label position value',labelPositionSectionPropElm.val());
                element.labelPosition = labelPositionSectionPropElm.val() == "side"? false : true;
            }

            let labelAlignmentSectionProp = $('input[name="labelAlignmentSectionProp"]:checked');
            if (labelAlignmentSectionProp){
                console.log('label position value',labelAlignmentSectionProp.val());
                element.labelAlignment = labelAlignmentSectionProp.val() == "left"? false : true;
            }

            element.getElements().forEach(col => {
                col.getElements().forEach(control => {
                    console.log('control insde section pos', control);
                    control.labelPosition = element.labelPosition;
                    control.labelAlignment = element.labelAlignment;
                    control.TypeContent = this.builder.getPlatformFactory().buildContent(control.TypeContent._type, control);
                });
            });
        }

        // required property
        let requiredSelectElm = document.getElementById('requiredPropertyControl');
        if (requiredSelectElm) {
            element.isRequired = requiredSelectElm.value == '0' ? false : true;
        }


        // readonly property
        let readonlySelectElm = document.getElementById('readonlyPropertyControl');
        if (readonlySelectElm) {
            element.ReadOnly = readonlySelectElm.value == '0' ? false : true;
        }

         // text area rows
         let textAreaRowsElm = document.getElementById('textAreaRows'); 
         if (textAreaRowsElm) {
             element.textAreaRows = textAreaRowsElm.value;
         }

         
        let defaultLookupViewElm = document.getElementById('defaultLookupViewElm');
        if (defaultLookupViewElm){
            element.ElementValue.source.defaultView = defaultLookupViewElm.value;
        }

        console.log('options on save model', element)
        element.TypeContent = this.builder.getPlatformFactory().buildContent(element.TypeContent._type, element);
    

        $(element.render()).insertAfter(`#${elementId}`);
        $(`#${elementId}`).remove();

        addAllEventsToElement(elementId, this.builder);

        element.getElements().forEach((lev1) => {
            if (lev1.TypeContent._type == Types.Column) {
                lev1.getElements().forEach(lev2 => {
                    if (lev2.TypeContent._type != Types.Column)
                        addAllEventsToElement(lev2.Id, this.builder);
                    lev2.getElements().forEach(lev3 => {
                        if (lev3.TypeContent._type != Types.Column)
                            addAllEventsToElement(lev3.Id, this.builder)
                        else {
                            lev3.getElements().forEach(lev4 => addAllEventsToElement(lev4.Id, this.builder))
                        }
                    })
                });
            }
        });

        $('#exampleModal').modal('hide');
       

    }

    async pushForm(jsonForm , uri , method){
        let data = {
            formName: 'main',
            entityId: this.entity.entitySchemaId,
            formJson: JSON.stringify(jsonForm)
        }

        // if(method === 'PUT'){
        //     data.formName = 'main_update';
        // }

        let response = await fetch(uri, {
            method: method,
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

    }

    handlePreview(e) {
        let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
                    width=0,height=0,left=-1000,top=-1000`;

        localStorage.setItem('jsonDataForm', JSON.stringify(this.builder.toSaveSchema()));
        
        window.open('../pages/preview.html', 'preview', params);
    }

    async handleSave(){

        console.log('to save shema', this.builder.toSaveSchema());

        if(this.toggler === false){
            await this.pushForm(this.builder.toSaveSchema(), 'http://localhost:5032/api/EntityFroms' , 'POST');
            this.toggler = !this.toggler;
    
        }else{
            let response = await fetch(`http://localhost:5032/api/EntitySchemas/${this.entity.entitySchemaId}/forms`);
            let form = await response.json();
            let targetFormId = form[form.length-1].id;
            await this.pushForm(this.builder.toSaveSchema(), `http://localhost:5032/api/EntityFroms/${targetFormId}` , 'PUT');
        }
        

    }
    
    handleCustom(){
        localStorage.setItem('jsonDataForm', JSON.stringify(this.builder.toSaveSchema()));
        // download(this.builder.toSaveSchema());
        window.open('../../pages/customForm.html', '_blank');
    }
    
    handleRemoveBtnClick(e){
        let curActiveElement = this.builder.getActiveElement();
        if (curActiveElement != null) {

            let isThereElementRequired = false;
            if (curActiveElement.TypeContent._category == Categories.FormControl){
                if (curActiveElement.isRequired){
                    isThereElementRequired = true;
                }

            }else if (curActiveElement.TypeContent._type == Types.Tab){
                curActiveElement.getElements().forEach(col => {
                    col.getElements().forEach(section => {
                        section.getElements().forEach(col => {
                            col.getElements().forEach(el => {
                                if (el.isRequired){
                                    isThereElementRequired = true;
                                }
                            });
                        });
                    });
                });
            }else if (curActiveElement.TypeContent._type == Types.Section){
                curActiveElement.getElements().forEach(col => {
                            col.getElements().forEach(el => {
                                if (el.isRequired){
                                    isThereElementRequired = true;
                                }
                            });
                });
            }

            if (isThereElementRequired){
                alert("This field is required on the form, you can't remove it.");
                return;
            }


            if (curActiveElement.isLocked){
                alert(`This ${curActiveElement.TypeContent._type == Types.Section? 'section' : 'field'} is locked on the form, you can't remove it.`);
                return;
            }

            this.builder.removeElement(curActiveElement.Id);
            this.builder.getActiveElement().clearElements();
            document.getElementById(curActiveElement.Id).remove();
            this.builder.setActiveElement('notID');
        }

    }

    handleUpdateModeBtnClick(e) {
        localStorage.setItem('formMode', 'update');
        window.open('../index.html', '_self');

    }

    async handleCreateModeBtnClick(e) {
        let jsonData = await getJson('../files/defaultSchema.json');
        localStorage.setItem('jsonDataForm', JSON.stringify(jsonData));
        localStorage.setItem('formMode', 'create');
        window.open('../index.html', '_self');
    }

}


