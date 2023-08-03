import FormBuilder from "./formbuilder.js";
import '/node_modules/jquery/dist/jquery.min.js'
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import {Types} from "./element.js";

import {addAllEventsToElement, handleDragAndDrop} from "./ElementEventHandlers.js";
import {createElementFactoryPropertiesObj, download, getJson} from "./Utils.js";


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
    const tab = builder.build('tab', createElementFactoryPropertiesObj(`tab_${tabConter}`, "Tab", "col py-2", "border: 1px solid green"));
    for(let i=0; i<numOfCols; i++) {
        secCounter++
        coltabCounter++
        colsecCounter++
        let col = builder.build('column', createElementFactoryPropertiesObj(`tab${tabConter}_col_${coltabCounter}`, 'Column', 'coltab col py-1 my-1 mx-1 ', 'border: 1px solid orange'));
        let sec = builder.build('section', createElementFactoryPropertiesObj(`tab${coltabCounter}_sec_${secCounter}`, `Section`, ' section', 'border: 1px dashed green;'));
        let colSec = builder.build('column', createElementFactoryPropertiesObj(`sec${secCounter}_col_${colsecCounter}`, 'Column', 'colsec col py-2 px-1 my-1 mx-1 ', 'border: 1px solid blue'));

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

    let sec = builder.build('section', createElementFactoryPropertiesObj(`sec_${secCounter}`, `Section`, 'section', 'border: 1px dashed green;'));
    for(let i=0; i<numOfCols; i++){
        secCounter++
        colsecCounter++
        let col = builder.build('column', createElementFactoryPropertiesObj(`sec${secCounter}_col_${colsecCounter}`, 'Column', 'colsec col py-2 px-1 my-1 mx-1 ', 'border: 1px solid blue'));
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

});




    $('#exampleModal #modalSave').on('click', function (e) {
        let elementId = $('#exampleModal').attr('data-id');
        let element = builder.getElementFromMap(elementId)

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
                        col = builder.build(Types.Column, createElementFactoryPropertiesObj(crypto.randomUUID(), 'col', 'coltab col py-1 my-1 mx-1', 'border: 1px solid orange;'))
                        let section = builder.build(Types.Section, createElementFactoryPropertiesObj(crypto.randomUUID(), 'section', 'mx-1', 'border: 1px dashed green;'));
                        columnsAdded.push(section);

                        let sectionCol = builder.build(Types.Column, createElementFactoryPropertiesObj(crypto.randomUUID(), 'col', 'colsec col py-1 my-1 mx-1', 'border: 1px solid blue;'));
                        section.addElement(sectionCol);
                        columnsAdded.push(sectionCol);

                        col.addElement(section);
                        builder.addElementToMap(section);
                        builder.setSectionBeforRender(section);
                        builder.setColumnsBeforeRender(sectionCol);
                    } else {
                        col = builder.build(Types.Column, createElementFactoryPropertiesObj(crypto.randomUUID(), 'col', 'colsec col py-1 my-1 mx-1', 'border: 1px solid blue;'));
                    }

                    element.addElement(col);
                    columnsAdded.push(col);
                    builder.setColumnsBeforeRender(col);  // needs to handle
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
            element.TypeContent = builder.build(Types.Tab, createElementFactoryPropertiesObj(element.Id, element.Name, element.CustomClass, element.Style, element.Mode))
                .TypeContent;
        } else {
            console.log('options on save model', element)
            element.TypeContent = builder.build(element.TypeContent._type, createElementFactoryPropertiesObj(element))
                .TypeContent;
        }


        $(element.render()).insertAfter(`#${elementId}`);
        $(`#${elementId}`).remove();

        addAllEventsToElement(elementId, builder);

        element.getElements().forEach((lev1) => {
            if (lev1.TypeContent._type == Types.Column) {
                lev1.getElements().forEach(lev2 => {
                    if (lev2.TypeContent._type != Types.Column)
                        addAllEventsToElement(lev2.Id, builder);
                    lev2.getElements().forEach(lev3 => {
                        if (lev3.TypeContent._type != Types.Column)
                            addAllEventsToElement(lev3.Id, builder)
                        else {
                            lev3.getElements().forEach(lev4 => addAllEventsToElement(lev4.Id, builder))
                        }
                    })
                });
            }
        });

        $('#exampleModal').modal('hide');

    });

    // Save form
    let saveFromElm = document.getElementById('saveJsonForm');
    saveFromElm.addEventListener('click', function (e) {
        download(builder.toSaveSchema());
        window.open('/pages/preview.html', '_self');

        sessionStorage.setItem('jsonDataForm', JSON.stringify(builder.toSaveSchema()));
        sessionStorage.setItem('formMode', builder.getMode());

    });

    let updateModeBtn = document.getElementById('updateMode');
    updateModeBtn.addEventListener('click', function (e) {
        window.open('/Form-Builder/index.html', '_self');
        sessionStorage.setItem('formMode', 'update');
    });
    let createModeBtn = document.getElementById('createMode');
    createModeBtn.addEventListener('click', function (e) {
        window.open('/Form-Builder/index.html', '_self');
        sessionStorage.setItem('formMode', 'create');
    });


//});

builder.handleDragAndDrop();


let removeBtn = document.getElementById('removeBtn');
removeBtn.addEventListener('click', function (e) {
    let curActiveElement = builder.getActiveElement();

    if (curActiveElement != null) {

        builder.removeElement(curActiveElement.Id);
        builder.getActiveElement().clearElements();

        document.getElementById(curActiveElement.Id).remove();

        builder.setActiveElement('notID');
    }
})




