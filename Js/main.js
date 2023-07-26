import FormBuilder from "./formbuilder.js";
import '/node_modules/jquery/dist/jquery.min.js'
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import {Types} from "./element.js";

import {addAllEventsToElement} from "./ElementEventHandlers.js";
import {download, getJson} from "./Utils.js";

const jsonData = await getJson('/files/schema.json');


let tabConter = 0;
let secCounter = 2;
let colCounter = 0;
const builder = new FormBuilder(jsonData, 'update', 'form');


function addTab(numOfCols){
    const tab = builder.build('tab',`tab_${tabConter++}`,"Tab", "col py-2", "border: 1px solid green" );
    for(let i=0; i<numOfCols; i++){
        let col = builder.build('column',`col_${colCounter++}`,'Column', 'coltab col py-1 my-1 mx-1 ', 'border: 1px solid orange');
        let sec = builder.build('section',`sec_${secCounter++}`,`Section`,' section','border: 1px dashed green;');
        let colSec = builder.build('column',`col_${colCounter++}`,'Column', 'colsec col py-3 px-1 my-1 mx-1 ', 'border: 1px dashed blue');
        sec.addElement(colSec);
        col.addElement(sec);
        tab.addElement(col);
    }

    document.getElementById('form').innerHTML += tab.render();
    tab.getElements().forEach(col => {

        col.getElements().forEach(sec=>{
            builder.setSectionBeforRender(sec);
            sec.getElements().forEach(secCol=>{
                builder.setColumnsBeforeRender(secCol);
                secCol = document.getElementById(`${secCol.Id}`);
                builder.setColumnsAterRender(secCol);
            });
            sec = document.getElementById(`${sec.Id}`);
            builder.setSectionAfterRender(sec);
        });

        builder.setColumnsBeforeRender(col);
        col = document.getElementById(`${col.Id}`);
        builder.setColumnsAterRender(col);
    });

    builder.addClickOnTab()
}

function addSection(numOfCols){
    let sec = builder.build('section',`sec_${secCounter++}`,`Section`,'section','border: 1px dashed green;');
    for(let i=0; i<numOfCols; i++){
        let col = builder.build('column',`col_${colCounter++}`,'Column', 'colsec col py-3 px-1 my-1 mx-1 ', 'border: 1px dashed blue');
        sec.addElement(col);
        builder.setColumnsBeforeRender(col);
    }
    const targetId = builder.addSectionToTab(sec);
    builder.setSectionBeforRender(sec);
    document.getElementById(`${targetId}`).innerHTML += sec.render();
    sec.getElements().forEach(col=>{
            col = document.getElementById(`${col.Id}`);
            builder.setColumnsAterRender(col);
    });

    sec = document.getElementById(`${sec.Id}`);
    builder.setSectionAfterRender(sec);
}



document.getElementById("addTabWith1Col").addEventListener("click", () => addTab(1));
document.getElementById("addTabWith2Col").addEventListener("click", () => addTab(2));
document.getElementById("addTabWith3Col").addEventListener("click", () => addTab(3));

document.getElementById("addSectionWith1Col").addEventListener("click", () => addSection(1));
document.getElementById("addSectionWith2Col").addEventListener("click", () => addSection(2));
document.getElementById("addSectionWith3Col").addEventListener("click", () => addSection(3));


console.log("enter dom loaded>>>>>>>>>")
console.log($('#exampleModal'))

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
                    if (element.TypeContent._type == Types.Tab)
                        col = builder.getPlatformFactory()
                            .createColumn(crypto.randomUUID(), 'col', 'coltab col py-1 my-1 mx-1', 'border: 1px solid orange;')
                    else
                        col = builder.getPlatformFactory()
                            .createColumn(crypto.randomUUID(), 'col', 'colsec col py-1 my-1 mx-1', 'border: 1px solid blue;');
                    element.addElement(col);
                    columnsAdded.push(col);
                    builder.setColumnsBeforeRender(col);  // needs to handle
                    currentNumberOfCols++;
                }
            }
        }

        element.TypeContent = builder.getPlatformFactory()
            .createTab(element.Id, element.Name, element.CustomClass, element.Style, element.Mode)
            .TypeContent;

        $(element.render()).insertAfter(`#${elementId}`);
        $(`#${elementId}`).remove();


        columnsAdded.forEach(colum => {
            builder.setColumnsAterRender(document.getElementById(colum.Id))
            console.log("columns added>>> ", document.getElementById(colum.Id))
        });

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
        window.open('/previewPage.html', '_blank');

        localStorage.setItem('previewJson', JSON.stringify(builder.toSaveSchema()));
    });
//});

builder.HandleDragAndDrop();



