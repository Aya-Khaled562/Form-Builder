import FormBuilder from "./formbuilder.js";
import '/node_modules/jquery/dist/jquery.min.js'
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import {Types} from "./element.js";

import {addAllEventsToElement} from "./ElementEventHandlers.js";
import {download, getJson} from "./Utils.js";


let jsonData = sessionStorage.getItem('jsonDataForm');
let mode = sessionStorage.getItem('formMode');

if (mode == null)
    mode = 'create';

if (jsonData != null) {
    jsonData = JSON.parse(jsonData);
} else if ( mode == 'update') {
    jsonData = await getJson('/files/schema.json');
}else {
    jsonData = await getJson('/files/defaultSchema.json');
}

let tabConter = 0;
let secCounter = 2;
let coltabCounter = 0;
let colsecCounter = 0;

const builder = new FormBuilder(jsonData, mode, 'form');


function addTab(numOfCols){
    
    tabConter++
    const tab = builder.build('tab',`tab_${tabConter}`,"Tab", "col py-2", "border: 1px solid green" );
    for(let i=0; i<numOfCols; i++){
        secCounter++
        coltabCounter++
        colsecCounter++
        let col = builder.build('column',`tab${tabConter}_col_${coltabCounter}`,'Column', 'coltab col py-1 my-1 mx-1 ', 'border: 1px solid orange');
        let sec = builder.build('section',`tab${coltabCounter}_sec_${secCounter}`,`Section`,' section','border: 1px dashed green;');
        let colSec = builder.build('column',`sec${secCounter}_col_${colsecCounter}`,'Column', 'colsec col py-2 px-1 my-1 mx-1 ', 'border: 1px solid blue');
        
        builder.setSectionBeforRender(sec);
        sec.addElement(colSec);
        builder.setColumnsBeforeRender(colSec);
        col.addElement(sec);
        builder.setColumnsBeforeRender(col);
        tab.addElement(col);
    }

    document.getElementById('form').innerHTML += tab.render();
    builder.addDesignContent();
}

function addSection(numOfCols){
    
    let sec = builder.build('section',`sec_${secCounter}`,`Section`,'section','border: 1px dashed green;');
    for(let i=0; i<numOfCols; i++){
        secCounter++
        colsecCounter++
        let col = builder.build('column',`sec${secCounter}_col_${colsecCounter}`,'Column', 'colsec col py-2 px-1 my-1 mx-1 ', 'border: 1px solid blue');
        sec.addElement(col);
        builder.setColumnsBeforeRender(col);
    }

    const targetId = builder.addSectionToTab(sec);
    builder.setSectionBeforRender(sec);
    document.getElementById(`${targetId}`).innerHTML += sec.render();
    builder.addDesignContent();
}

document.getElementById("addTabWith1Col").addEventListener("click", () => addTab(1));
document.getElementById("addTabWith2Col").addEventListener("click", () => addTab(2));
document.getElementById("addTabWith3Col").addEventListener("click", () => addTab(3));

document.getElementById("addSectionWith1Col").addEventListener("click", () => addSection(1));
document.getElementById("addSectionWith2Col").addEventListener("click", () => addSection(2));
document.getElementById("addSectionWith3Col").addEventListener("click", () => addSection(3));


$('#exampleModal').on('shown.bs.modal', function (e) {
    console.log("modal is fired>>>>>>");
    let elementId = $('#exampleModal').attr('data-id');
    console.log(elementId)
    let element = builder.getElementFromMap(elementId)

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


    });

    $('#exampleModal #modalSave').on('click', function (e) {
        let elementId = $('#exampleModal').attr('data-id');
        let element = builder.getElementFromMap(elementId)

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
                        col = builder.getPlatformFactory()
                            .createColumn(crypto.randomUUID(), 'col', 'coltab col py-1 my-1 mx-1', 'border: 1px solid orange;')
                        let section = builder.build(Types.Section, crypto.randomUUID(), 'section', 'mx-1', 'border: 1px dashed green;');
                        columnsAdded.push(section);

                        let sectionCol = builder.build(Types.Column, crypto.randomUUID(), 'col', 'colsec col py-1 my-1 mx-1', 'border: 1px solid blue;');
                        section.addElement(sectionCol);
                        columnsAdded.push(sectionCol);


                        col.addElement(section);
                        builder.addElementToMap(section);
                        builder.setSectionBeforRender(section);
                        builder.setColumnsBeforeRender(sectionCol);
                    } else {
                        col = builder.getPlatformFactory()
                            .createColumn(crypto.randomUUID(), 'col', 'colsec col py-1 my-1 mx-1', 'border: 1px solid blue;');
                    }

                    element.addElement(col);
                    columnsAdded.push(col);
                    builder.setColumnsBeforeRender(col);  // needs to handle
                    currentNumberOfCols++;
                }
            }
        }

        element.TypeContent = builder.build(element.TypeContent._type, element.Id, element.Name, element.CustomClass, element.Style)
            .TypeContent;

        $(element.render()).insertAfter(`#${elementId}`);
        $(`#${elementId}`).remove();

        addAllEventsToElement(elementId);
        element.getElements().forEach((lev1) => {
            if (lev1.TypeContent._type == Types.Column) {
                lev1.getElements().forEach(lev2 => {
                    if (lev2.TypeContent._type != Types.Column)
                        addAllEventsToElement(lev2.Id);
                    lev2.getElements().forEach(lev3 => {
                        if (lev3.TypeContent._type != Types.Column)
                            addAllEventsToElement(lev3.Id)
                        else {
                            lev3.getElements().forEach(lev4 => addAllEventsToElement(lev4.Id))
                        }
                    })
                });
            }
        })

        $('#exampleModal').modal('hide');

    });

    // Save form
    let saveFromElm = document.getElementById('saveJsonForm');
    saveFromElm.addEventListener('click', function (e) {
        download(builder.toSaveSchema());
        window.open('/previewPage.html', '_self');

        sessionStorage.setItem('jsonDataForm', JSON.stringify(builder.toSaveSchema()));
        sessionStorage.setItem('formMode', builder.getMode());

    });

    let updateModeBtn = document.getElementById('updateMode');
    updateModeBtn.addEventListener('click', function (e) {
        window.open('/test.html', '_self');
        sessionStorage.setItem('formMode', 'update');
    });
    let createModeBtn = document.getElementById('createMode');
    createModeBtn.addEventListener('click', function (e) {
        window.open('/test.html', '_self');
        sessionStorage.setItem('formMode', 'create');
    });

    
//});

builder.handleDragAndDrop();





