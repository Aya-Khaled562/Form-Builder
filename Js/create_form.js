import FormBuilder from "./formbuilder.js";
import '/node_modules/jquery/dist/jquery.min.js'
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { Types } from "./element.js";
import { addAllEventsToElement, handleDragAndDrop } from "./ElementEventHandlers.js";
import { download, getJson } from "./Utils.js";

export default class FormCreation {
    jsonData;
    mode;
    builder;
    
    constructor(jsonData, mode) {
        this.tabCounter = 0;
        this.secCounter = 2;
        this.coltabCounter = 0;
        this.colsecCounter = 0;
        this.jsonData = jsonData;
        this.mode = mode; 
        this.builder = null;  
    }

    initialize(){
        this.builder = new FormBuilder(this.jsonData,this.mode,'form');
        this.initializeUI();
        return this.jsonData;
    }

    initializeUI() {
        document.getElementById("addTabWith1Col").addEventListener("click", () => this.addTab(1));
        document.getElementById("addTabWith2Col").addEventListener("click", () => this.addTab(2));
        document.getElementById("addTabWith3Col").addEventListener("click", () => this.addTab(3));
        document.getElementById("addSectionWith1Col").addEventListener("click", () => this.addSection(1));
        document.getElementById("addSectionWith2Col").addEventListener("click", () => this.addSection(2));
        document.getElementById("addSectionWith3Col").addEventListener("click", () => this.addSection(3));

        $('#exampleModal').on('shown.bs.modal', (e) => this.handleModalShown(e));
        $('#exampleModal #modalSave').on('click', (e) => this.handleModalSave(e));
        let saveFromElm = document.getElementById('saveJsonForm');
        saveFromElm.addEventListener('click', (e) => this.handleSaveFormClick(e));
        let removeBtn = document.getElementById('removeBtn');
        removeBtn.addEventListener('click', (e) => this.handleRemoveBtnClick(e));
        let updateModeBtn = document.getElementById('updateMode');
        updateModeBtn.addEventListener('click', (e) => this.handleUpdateModeBtnClick(e));
        let createModeBtn = document.getElementById('createMode');
        createModeBtn.addEventListener('click', (e) => this.handleCreateModeBtnClick(e));
        handleDragAndDrop(this.builder);
    }

    addTab(numOfCols) {
        this.tabCounter++
        const tab = this.builder.build('tab',`tab_${this.tabCounter}`,"Tab", "col py-2", "border: 1px solid green" );
        for(let i=0; i<numOfCols; i++){
            this.secCounter++
            this.coltabCounter++
            this.colsecCounter++
            let col = this.builder.build('column',`tab${this.tabCounter}_col_${this.coltabCounter}`,'Column', 'coltab col py-1 my-1 mx-1 ', 'border: 1px solid orange');
            let sec = this.builder.build('section',`tab${this.coltabCounter}_sec_${this.secCounter}`,`Section`,' section','border: 1px dashed green;');
            let colSec = this.builder.build('column',`sec${this.secCounter}_col_${this.colsecCounter}`,'Column', 'colsec col py-2 px-1 my-1 mx-1 ', 'border: 1px solid blue');
            
            this.builder.setSectionBeforRender(sec);
            sec.addElement(colSec);
            this.builder.setColumnsBeforeRender(colSec);
            col.addElement(sec);
            this.builder.setColumnsBeforeRender(col);
            tab.addElement(col);
        }

        document.getElementById('form').innerHTML += tab.render();
        this.builder.addDesignContent();
        console.log(this.builder.getElements())
    }

    addSection(numOfCols) {
        let sec = this.builder.build('section',`sec_${this.secCounter}`,`Section`,'section','border: 1px dashed green;');
        for(let i=0; i<numOfCols; i++){
            this.secCounter++
            this.colsecCounter++
            let col = this.builder.build('column',`sec${this.secCounter}_col_${this.colsecCounter}`,'Column', 'colsec col py-2 px-1 my-1 mx-1 ', 'border: 1px solid blue');
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

        $('#exampleModal .modal-body').html(`<div class="mb-3">
                <label htmlFor="exampleFormControlInput1" id="displayNameElm" class="form-label">Display Name</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" value="${element.Name}">
            </div>`);

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
    }

    handleModalSave(e) {
        let elementId = $('#exampleModal').attr('data-id');
        let element = this.builder.getElementFromMap(elementId)

        let displayName = $('#exampleModal #exampleFormControlInput1').val();
        if (displayName != undefined && displayName != null && displayName != "") {
            element.Name = displayName;
        }

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
                        col = this.builder.getPlatformFactory()
                            .createColumn(crypto.randomUUID(), 'col', 'coltab col py-1 my-1 mx-1', 'border: 1px solid orange;')
                        let section = this.builder.build(Types.Section, crypto.randomUUID(), 'section', 'mx-1', 'border: 1px dashed green;');
                        columnsAdded.push(section);

                        let sectionCol = this.builder.build(Types.Column, crypto.randomUUID(), 'col', 'colsec col py-1 my-1 mx-1', 'border: 1px solid blue;');
                        section.addElement(sectionCol);
                        columnsAdded.push(sectionCol);


                        col.addElement(section);
                        this.builder.addElementToMap(section);
                        this.builder.setSectionBeforRender(section);
                        this.builder.setColumnsBeforeRender(sectionCol);
                    } else {
                        col = this.builder.getPlatformFactory()
                            .createColumn(crypto.randomUUID(), 'col', 'colsec col py-1 my-1 mx-1', 'border: 1px solid blue;');
                    }

                    element.addElement(col);
                    columnsAdded.push(col);
                    this.builder.setColumnsBeforeRender(col);  // needs to handle
                    currentNumberOfCols++;
                }
            }
        }

        if (element.TypeContent._type == Types.Tab) {
            element.TypeContent = this.builder.getPlatformFactory().createTab(element.Id, element.Name, element.CustomClass, element.Style, element.Mode)
                .TypeContent;
        } else {
            element.TypeContent = this.builder.build(element.TypeContent._type, element.Id, element.Name, element.CustomClass, element.Style)
                .TypeContent;
        }


        $(element.render()).insertAfter(`#${elementId}`);
        $(`#${elementId}`).remove();

        addAllEventsToElement(elementId, this.builder);
        // if (element.TypeContent._type == Types.Tab) {
        //     console.log('handle click on tab>>>>>>>>>>>>>>>')
        //     //builder.addClickOnTab();
        // }

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

    handleSaveFormClick(e) {
        console.log("builder.tosave: ", this.builder.toSaveSchema());
        download(this.builder.toSaveSchema());
        this.mode = 'preview'
        window.open('/pages/preview.html', '_self');
        // window.open('/pages/customForm.html', '_self');

        sessionStorage.setItem('jsonDataForm', JSON.stringify(this.builder.toSaveSchema()));
        console.log('mode hh: ', this.builder.getMode())
        sessionStorage.setItem('formMode', 'preview');
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

    handleUpdateModeBtnClick(e){
        window.open('/index.html', '_self');
        sessionStorage.setItem('formMode', 'update');
    }

    handleCreateModeBtnClick(e){
        window.open('/index.html', '_self');
        sessionStorage.setItem('formMode', 'create');
    }
}


