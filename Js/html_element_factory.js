import TypeContent from "./typecontent.js";
import Element from "./element.js";
import AbstractElementFactory from "./abstract_element_factory.js";


export default class HtmlElementFactory extends AbstractElementFactory {

    createSingleLineOfText(obj) {

        obj.typeContent = new TypeContent(
            'single line of text',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
                <label class="col" style="width: 50%;">${obj.name}${obj.required ? "<span style='color: red'>*</span>" : ""}</label>
                <div class="${obj.customClass}" id="text" style="border: 1px solid blue; flex: 1; width: 50%;"></div> 
            </div>`,
            `<div class="mb-3 d-flex flex-row align-items-center px-2 py-1 my-1 field ${!obj.visible ? 'd-none ' : ''}">
                        <label for="${obj.id}" class="form-label me-5">${obj.name}${obj.required ? "<span style='color: red'>*</span>" : ""}</label>
                         <input type="text" class="form-control" ${obj.readOnly ? `readonly` : ""}  style=" width: 50%;" id="${obj.id}">
                        </div>`
        );

        return new Element(obj);
    }

    createOptionSet(obj) {

        console.log('option set object >>> ', obj)
        let setOptions = ``;
        for (let i = 0; i < Object.keys(obj.optionsSetValues).length; i++) {
            let option = `<option value="${Object.values(obj.optionsSetValues)[i]}">${Object.keys(obj.optionsSetValues)[i]}</option>`
            setOptions += option;
        }
        obj.typeContent = new TypeContent(
            'option set',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
            <label class="col" style="width: 50%;">${obj.name}${obj.required ? "<span style='color: red'>*</span>" : ""}</label>
            <div class="${obj.customClass}" id="text" style="border: 1px solid blue; flex: 1; width: 50%;"></div> 
            </div>`,
            `<div class="mb-3 d-flex flex-row align-items-center px-2 py-1 my-1 field ${!obj.visible ? 'd-none ' : ''}" style="" draggable="true" id="${obj.id}">
             <label class="form-label me-5">${obj.name}${obj.required ? "<span style='color: red'>*</span>" : ""}</label>
            <select class="form-select" aria-label="Default select example" ${obj.readOnly ? `disabled` : ""}>${setOptions}</select> 
            </div>`
        );

        return new Element(obj);
    }

    createTwoOptions(obj) {
        console.log('html factory ooptions>>>', obj.optionsSetValues)
        obj.typeContent = new TypeContent(
            'two options',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
            <label class="col" style="width: 50%;">${obj.name}</label>
            <div class="${obj.customClass}" id="text" style="border: 1px solid blue; flex: 1; width: 50%;"></div> 
            </div>`,
            `<div class="mb-3 d-flex flex-row align-items-center px-2 py-1 my-1 field ${!obj.visible ? 'd-none ' : ''}" style="width: 50%;" draggable="true" id="${obj.id}">
            <label class="form-label me-5">${obj.name}</label>
            <select class="form-select" ${obj.readOnly ? `disabled` : ""} aria-label="Default select example">
  <option selected value="${Object.values(obj.optionsSetValues)[0]}">${Object.keys(obj.optionsSetValues)[0]}</option>
  <option value="${Object.values(obj.optionsSetValues)[1]}">${Object.keys(obj.optionsSetValues)[1]}</option>
</select> 
            </div>`
        );

        return new Element(obj);
    }

    createDecimalNumber(obj) {
        obj.typeContent = new TypeContent(
            'decimal number',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
            <label class="col" style="width: 50%;">${obj.name}${obj.required ? "<span style='color: red'>*</span>" : ""}</label>
            <div class="${obj.customClass}" id="text" style="border: 1px solid blue; flex: 1; width: 50%;"></div> 
            </div>`,
            `<div class="mb-3 d-flex flex-row align-items-center px-2 py-1 my-1 field ${!obj.visible ? 'd-none ' : ''}">
                        <label for="${obj.id}" class="form-label me-5">${obj.name}${obj.required ? "<span style='color: red'>*</span>" : ""}</label>
                         <input type="number" class="form-control " style=" width: 50%;" id="${obj.id}" ${obj.readOnly ? `readonly` : ""}>
                        </div>`
        );
        return new Element(obj);
    }

    createMultipleLineOfText(obj) {
        obj.typeContent = new TypeContent(
            'multiple line of text',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
            <label class="col" style="width: 50%;">${obj.name}${obj.required ? "<span style='color: red'>*</span>" : ""}</label>
            <div class="${obj.customClass}" id="text" style="border: 1px solid blue; flex: 1; width: 50%;"></div> 
            </div>`,
            `<div class="mb-3 d-flex flex-row align-items-center px-2 py-1 my-1 field ${!obj.visible ? 'd-none ' : ''}" >
                        <label for="${obj.id}" class="form-label me-5">${obj.name}${obj.required ? "<span style='color: red'>*</span>" : ""}</label>
                         <textarea class="form-control " style=" width: 50%;" id="${obj.id}" rows="3"></textarea>
                        </div>`
        );

        return new Element(obj);
    }

    createDateAndTime(obj) {
        obj.typeContent = new TypeContent(
            'date and time',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
            <label class="col" style="width: 50%;">${obj.name}${obj.required ? "<span style='color: red'>*</span>" : ""}</label>
            <div class="${obj.customClass}" id="text" style="border: 1px solid blue; flex: 1; width: 50%;"></div> 
            </div>`,
            `<div class="mb-3 d-flex flex-row align-items-center px-2 py-1 my-1 field  ${!obj.visible ? 'd-none ' : ''}">
                        <label for="${obj.id}" class="form-label me-5">${obj.name}${obj.required ? "<span style='color: red'>*</span>" : ""}</label>
                         <input type="date" class="form-control " style=" width: 50%;" id="${obj.id}" ${obj.readOnly ? `readonly` : ""}>
                        </div>`
        );

        return new Element(obj);
    }

    createTab(obj) {

        obj.collapse = true;
        obj.typeContent = new TypeContent(
            'tab',
            'layout',
            `<div class="container my-3 tab" style="${obj.style}" id="${obj.id}"  >
                <div class="row">
                    <h5>${obj.name}</h5>
                    <!--content-->
                </div>
            </div>`,
            `<div id="${obj.id}">
                    <div data-bs-toggle="collapse" data-bs-target="#areaCollapsed" style="width:fit-content" aria-expanded="true">
                         <i class="fas fa-caret-right" ></i><label class="ms-2">${obj.name}</label>
                    </div>
            <div class="${obj.customClass} collapse show" style="${obj.style}" id="areaCollapsed" style="margin:10px;"> <!--content--></div></div>`
        );

        return new Element(obj);
    }

    createSection(obj) {
        obj.typeContent = new TypeContent(
            'section',
            'layout',
            `<div class="container section my-2 py-1 ${obj.customClass}" style="${obj.style}" id="${obj.id}" draggable="true" >
                <div class="row">
                    <h6>${obj.name}</h6>
                    <!--content-->
                </div>
            </div>`,
            `<div class="container section my-2 py-1 ${obj.customClass}" style="${obj.style}" id="${obj.id}" >
                   <h6>${obj.name}</h6>
                <div class="row justify-content-between">
                    <!--content-->
                </div>
            </div>`
        );

        return new Element(obj);
    }

    createColumn(obj) {
        obj.typeContent = new TypeContent(
            'column',
            'layout',
            `<div id="${obj.id}" class="${obj.customClass}" style = "${obj.style}"> <!--content--></div>`,
            `<div id="${obj.id}" class="${obj.customClass}"> <!--content--></div>`
        );
        return new Element(obj);
    }

}