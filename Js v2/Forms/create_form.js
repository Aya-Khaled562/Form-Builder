import FormBuilder from "../formbuilder.js";
// import '.../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import {Types} from "../Element/element.js";
import {addAllEventsToElement, handleDragAndDrop} from "../Utilities/ElementEventHandlers.js";
import {createElementFactoryPropertiesObj,getJson} from "../Utilities/Utils.js";

export default class CreateForm {
    jsonData;
    mode;
    builder;
    entity
    constructor(jsonData, mode, entity) {
        this.tabCounter = 0;
        this.secCounter = 2;
        this.coltabCounter = 0;
        this.colsecCounter = 0;
        this.jsonData = jsonData;
        this.mode = mode; 
        this.builder = null;  
        this.entity = entity;
    }

    initialize(){
        this.builder = new FormBuilder(this.jsonData,this.mode,'form', this.entity);
        this.initializeUI();
        return this.jsonData;
    }

    initializeUI() {
        document.getElementById("addTabWith1Col").addEventListener("click", () => this.addTab(1));
        document.getElementById("addTabWith2Col1").addEventListener("click", () => this.addTab(2));
        document.getElementById("addTabWith2Col2").addEventListener("click", () => this.addTab(2));
        document.getElementById("addTabWith2Col3").addEventListener("click", () => this.addTab(2));
        document.getElementById("addTabWith3Col1").addEventListener("click", () => this.addTab(3));
        document.getElementById("addTabWith3Col2").addEventListener("click", () => this.addTab(3));
        document.getElementById("addSectionWith1Col").addEventListener("click", () => this.addSection(1));
        document.getElementById("addSectionWith2Col").addEventListener("click", () => this.addSection(2));
        document.getElementById("addSectionWith3Col").addEventListener("click", () => this.addSection(3));
        document.getElementById('save').addEventListener('click', () => this.handleSave())

        $('#exampleModal').on('shown.bs.modal', (e) => this.handleModalShown(e));
        $('#exampleModal #modalSave').on('click', (e) => this.handleModalSave(e));
        let preview = document.getElementById('preview');
        preview.addEventListener('click', (e) => this.handlePreview(e));
        let removeBtn = document.getElementById('removeBtn');
        removeBtn.addEventListener('click', (e) => this.handleRemoveBtnClick(e));
        let updateModeBtn = document.getElementById('updateMode');
        updateModeBtn.addEventListener('click', (e) => this.handleUpdateModeBtnClick(e));
        let createModeBtn = document.getElementById('createMode');
        createModeBtn.addEventListener('click', (e) => this.handleCreateModeBtnClick(e));
        handleDragAndDrop(this.builder);
    }

    addTab(numOfCols) {
        console.log('call add tab method >>>>>>>>>>>>')
        this.tabCounter++
        const tab = this.builder.build('tab', createElementFactoryPropertiesObj(`tab_${this.tabCounter}`, "Tab", "col py-2", "border: 1px solid green"));
        for(let i=0; i<numOfCols; i++){
            this.secCounter++
            this.coltabCounter++
            this.colsecCounter++
            let col = this.builder.build('column', createElementFactoryPropertiesObj(`tab${this.tabCounter}_col_${this.coltabCounter}`, 'Column', 'coltab col py-1 my-1 mx-1 ', 'border: 1px solid orange'));
            let sec = this.builder.build('section', createElementFactoryPropertiesObj(`tab${this.coltabCounter}_sec_${this.secCounter}`, `Section`, ' section', 'border: 1px dashed green;'));
            let colSec = this.builder.build('column', createElementFactoryPropertiesObj(`sec${this.secCounter}_col_${this.colsecCounter}`, 'Column', 'colsec col py-2 px-1 my-1 mx-1 ', 'border: 1px solid blue'));
            
            this.builder.setSectionBeforRender(sec);
            sec.addElement(colSec);
            this.builder.setColumnsBeforeRender(colSec);
            col.addElement(sec);
            this.builder.setColumnsBeforeRender(col);
            tab.addElement(col);
        }

        document.getElementById('form').innerHTML += tab.render();
        this.builder.addDesignContent();
        console.log('elements add tab method', this.builder.getElements())
    }

    addSection(numOfCols) {
        let sec = this.builder.build('section', createElementFactoryPropertiesObj(`sec_${this.secCounter}`, `Section`, 'section', 'border: 1px dashed green;'));
        for(let i=0; i<numOfCols; i++){
            this.secCounter++
            this.colsecCounter++
            let col = this. builder.build('column', createElementFactoryPropertiesObj(`sec${this.secCounter}_col_${this.colsecCounter}`, 'Column', 'colsec col py-2 px-1 my-1 mx-1 ', 'border: 1px solid blue'));
            sec.addElement(col);
            this.builder.setColumnsBeforeRender(col);
        }

        const targetId = this.builder.addSectionToTab(sec);
        this.builder.setSectionBeforRender(sec);
        document.getElementById(`${targetId}`).innerHTML += sec.render();
        this.builder.addDesignContent();
    }

    handleModalShown(e) {
        console.log("modal is fired>>>>>>");
        let elementId = $('#exampleModal').attr('data-id');
        console.log(elementId)
        let element = this.builder.getElementFromMap(elementId)
    
        // display name input
        $('#exampleModal .modal-body').html(`<div class="mb-3">
                <label htmlFor="exampleFormControlInput1" id="displayNameElm" class="form-label">Display Name</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" value="${element.Name}">
            </div>`);
    
        // number of columns input
            if ([Types.Section, Types.Tab].includes(element.TypeContent._type)) {
                $('#exampleModal .modal-body').append(`<div>Number of Columns:</div><div class="form-check form-check-inline">
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
    </div>`);
            }
    
        // required property input
        $('#exampleModal .modal-body').append(`<div class="mb-3">
                <label htmlFor="requiredPropertyControl" id="requiredLabel" class="form-label">Required level</label>
                <select class="form-select" name="required" id="requiredPropertyControl">
      <option value="0" ${!element.Required ? `selected` : ''}>Optional</option>
      <option value="1" ${element.Required ? `selected` : ''}>Required</option>
    </select>
            </div>`);
    
    
        // read only property input
        $('#exampleModal .modal-body').append(`<div class="mb-3">
                <label htmlFor="readonlyPropertyControl" id="readOnlyLabel" class="form-label">Read only</label>
                <select class="form-select" name="readOnly" id="readonlyPropertyControl">
      <option value="0" ${!element.ReadOnly ? `selected` : ''}>NO</option>
      <option value="1" ${element.ReadOnly ? `selected` : ''}>YES</option>
    </select>
            </div>`);
    
    
        // visible property input
        $('#exampleModal .modal-body').append(`<div class="mb-3">
                <label htmlFor="readonlyPropertyControl" id="visibleLabel" class="form-label">Visible Control</label>
                <select class="form-select" name="visible" id="visiblePropertyControl">
      <option value="0" ${!element.Visible ? `selected` : ''}>NO</option>
      <option value="1" ${element.Visible ? `selected` : ''}>YES</option>
    </select>
            </div>`);

    }


    handleModalSave(e) {
        let elementId = $('#exampleModal').attr('data-id');
        console.log('elementId: ' , elementId)
        let element = this.builder.getElementFromMap(elementId)

        // display name
        let displayName = $('#exampleModal #exampleFormControlInput1').val();
        if (displayName != undefined && displayName != null && displayName != "") {
            element.Name = displayName;
        }

        // number of columns
        let columnsAdded = [];
        if (element.TypeContent._type == Types.Tab || element.TypeContent._type == Types.Section) {
            let checkedColumnsValue = $('#exampleModal input[name=numberOfColumnsOptions]:checked').val();

            let currentNumberOfCols = element.getElements().length;
            if (checkedColumnsValue < currentNumberOfCols) {
                while (currentNumberOfCols > checkedColumnsValue) {
                    element.popElement();
                    currentNumberOfCols--;
                }
            } else if (checkedColumnsValue > currentNumberOfCols) {
                while (currentNumberOfCols < checkedColumnsValue) {
                    let col = null;
                    if (element.TypeContent._type == Types.Tab) {
                        col = this.builder.build(Types.Column, createElementFactoryPropertiesObj(crypto.randomUUID(), 'col', 'coltab col py-1 my-1 mx-1', 'border: 1px solid orange;'))
                        let section = this.builder.build(Types.Section, createElementFactoryPropertiesObj(crypto.randomUUID(), 'section', 'mx-1', 'border: 1px dashed green;'));
                        columnsAdded.push(section);

                        let sectionCol = this.builder.build(Types.Column, createElementFactoryPropertiesObj(crypto.randomUUID(), 'col', 'colsec col py-1 my-1 mx-1', 'border: 1px solid blue;'));
                        section.addElement(sectionCol);
                        columnsAdded.push(sectionCol);

                        col.addElement(section);
                        this.builder.addElementToMap(section);
                        this.builder.setSectionBeforRender(section);
                        this.builder.setColumnsBeforeRender(sectionCol);
                    } else {
                        col = this.builder.build(Types.Column, createElementFactoryPropertiesObj(crypto.randomUUID(), 'col', 'colsec col py-1 my-1 mx-1', 'border: 1px solid blue;'));
                    }

                    element.addElement(col);
                    columnsAdded.push(col);
                    this.builder.setColumnsBeforeRender(col);  // needs to handle
                    currentNumberOfCols++;
                }
            }
        }

        // required property
        let requiredSelectElm = document.getElementById('requiredPropertyControl');
        if (requiredSelectElm) {
            element.Required = requiredSelectElm.value == '0' ? false : true;
        }


        // readonly property
        let readonlySelectElm = document.getElementById('readonlyPropertyControl');
        if (readonlySelectElm) {
            element.ReadOnly = readonlySelectElm.value == '0' ? false : true;
        }

        // visible property
        let visibleSelectElm = document.getElementById('visiblePropertyControl');
        if (visibleSelectElm) {
            element.Visible = visibleSelectElm.value == '0' ? false : true;
            console.log('element visible', element)
        }

        if (element.TypeContent._type == Types.Tab) {
            element.TypeContent = this.builder.build(Types.Tab, createElementFactoryPropertiesObj(element.Id, element.Name, element.CustomClass, element.Style, element.Mode))
                .TypeContent;
        } else {
            console.log('options on save model', element)
            element.TypeContent = this.builder.build(element.TypeContent._type, createElementFactoryPropertiesObj(element))
                .TypeContent;
        }


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



    async pushForm(jsonForm){
        let data = {
            entityFromsName: 'new',
            entitySchemaId: this.entity.entitySchemaId,
            fromJson: JSON.stringify(jsonForm)
        }

        console.log('data: ', data)

        let response = await fetch('http://localhost:5032/api/EntityFroms', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }



    handlePreview(e) {
        let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
                    width=0,height=0,left=-1000,top=-1000`;

        localStorage.setItem('jsonDataForm', JSON.stringify(this.builder.toSaveSchema()));
        
        window.open('../pages/preview.html', 'preview', params);
    }

    async handleSave(){
        await this.pushForm(this.builder.toSaveSchema()); 
    }
    
    handleRemoveBtnClick(e){
        let curActiveElement = this.builder.getActiveElement();
        if (curActiveElement != null) {
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


