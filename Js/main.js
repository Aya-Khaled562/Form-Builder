import FormBuilder from "./formbuilder.js";
import '/node_modules/jquery/dist/jquery.min.js'
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Element from "./element.js";

import {addAllEventsToElement} from "./ElementEventHandlers.js";

const builder = new FormBuilder('html', 'update', 'formContainer');
let tabConter = 0;
let secCounter = 0;
let colCounter = 0;

function addTab(numOfCols) {
    const tab = builder.build('tab', `tab_${tabConter++}`, "Tab", "col py-2", "border: 1px solid green");
    for (let i = 0; i < numOfCols; i++) {
        let col = builder.build('column', `col_${colCounter++}`, 'Column', 'col py-1 my-1 mx-1 ', 'border: 1px solid orange');
        let sec = builder.build('section', `sec_${secCounter++}`, 'Section', 'mx-1', 'border: 1px dashed green;');
        let colSec = builder.build('column', `col_${colCounter++}`, 'Column', 'col py-3 px-1 my-1 mx-1 ', 'border: 1px solid blue');
        sec.addElement(colSec);
        col.addElement(sec);
        tab.addElement(col);
    }
    document.getElementById('formContainer').innerHTML += tab.render();
    builder.addClickOnTab()
}

function addSection(numOfCols) {
    let sec = builder.build('section', `sec_${secCounter++}`, 'Section', 'mx-1', 'border: 1px dashed green;');
    for (let i = 0; i < numOfCols; i++) {
        let col = builder.build('column', `col_${colCounter++}`, 'Column', 'col py-3 px-1 my-1 mx-1 ', 'border: 1px solid blue');
        sec.addElement(col);
    }
    const targetId = builder.addSectionToTab(sec);
    document.getElementById(`${targetId}`).innerHTML += sec.render();
}


document.getElementById("addTabWith1Col").addEventListener("click", () => addTab(1));
document.getElementById("addTabWith2Col").addEventListener("click", () => addTab(2));
document.getElementById("addTabWith3Col").addEventListener("click", () => addTab(3));

document.getElementById("addSectionWith1Col").addEventListener("click", () => addSection(1));
document.getElementById("addSectionWith2Col").addEventListener("click", () => addSection(2));
document.getElementById("addSectionWith3Col").addEventListener("click", () => addSection(3));

window.addEventListener('load', function () {
    $('#exampleModal').on('shown.bs.modal', function (e) {
        let elementId = $('#exampleModal').attr('data-id');
        console.log(elementId)
        let element = builder.getElementFromMap(elementId)
        console.log(element);

        $('#exampleModal .modal-body').html(`<div className="mb-3">
            <label htmlFor="exampleFormControlInput1" id="displayNameElm" className="form-label">Display Name</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" value="${element.Name}">
        </div>`);

    });

    $('#exampleModal #modalSave').on('click', function (e) {
        let elementId = $('#exampleModal').attr('data-id');
        console.log(elementId)
        let element = builder.getElementFromMap(elementId)
        console.log(element);

        let displayName = $('#exampleModal #exampleFormControlInput1').val();
        if (displayName != undefined && displayName != null && displayName != "") {
            element.Name = displayName;
        }
        const typeContent = builder.getPlatformFactory()
            .createTab(element.Id, element.Name, element.CustomClass, element.Style, Element.Mode)
            .TypeContent;
        element.TypeContent = typeContent;

        $(element.render()).insertAfter(`#${elementId}`);
        $(`#${elementId}`).remove();

        addAllEventsToElement(elementId);

        $('#exampleModal').modal('hide')
        console.log(typeContent);
    });

})
