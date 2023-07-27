import TypeContent from "./typecontent.js";
import Element from "./element.js";
import AbstractElementFactory from "./abstract_element_factory.js";


export default class HtmlElementFactory extends AbstractElementFactory {

    createSingleLineOfText(id, name, customClass, style, mode) {
        const typeContent = new TypeContent(
            'single line of text',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${style}" draggable="true" id="${id}">
                <label class="col" style="width: 50%;">${name}</label>
                <div class="${customClass}" id="text" style="border: 1px solid blue; flex: 1; width: 50%;"></div> 
            </div>`,
            `<div class="mb-3 d-flex flex-row align-items-center px-2 py-1 my-1 field">
                        <label for="${id}" class="form-label me-5">${name}</label>
                         <input type="text" class="form-control " style=" width: 50%;" id="${id}">
                        </div>`
        );

        return new Element(id, name, customClass, style, typeContent, mode);
    }

    createOptionSet(id, name, customClass, style, mode, options) {

        let setOptions = ``;
        console.log('option set values', options)
        for (let i = 0; i < Object.keys(options).length; i++) {
            let option = `<option value="${Object.values(options)[i]}">${Object.keys(options)[i]}</option>`
            setOptions += option;
        }
        console.log('string set options', setOptions)
        const typeContent = new TypeContent(
            'option set',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${style}" draggable="true" id="${id}">
            <label class="col" style="width: 50%;">${name}</label>
            <div class="${customClass}" id="text" style="border: 1px solid blue; flex: 1; width: 50%;"></div> 
            </div>`,
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${style}" draggable="true" id="${id}">
            <label class="col" style="width: 50%;">${name}</label>
            <select class="form-select" aria-label="Default select example">${setOptions}</select> 
            </div>`
        );

        return new Element(id, name, customClass, style, typeContent, mode, options);
    }

    createTwoOptions(id, name, customClass, style, mode, options) {
        console.log('html factory ooptions>>>', options)
        const typeContent = new TypeContent(
            'two options',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${style}" draggable="true" id="${id}">
            <label class="col" style="width: 50%;">${name}</label>
            <div class="${customClass}" id="text" style="border: 1px solid blue; flex: 1; width: 50%;"></div> 
            </div>`,
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${style}" draggable="true" id="${id}">
            <label class="col" style="width: 50%;">${name}</label>
            <select class="form-select" aria-label="Default select example">
  <option selected value="${Object.values(options)[0]}">${Object.keys(options)[0]}</option>
  <option value="${Object.values(options)[1]}">${Object.keys(options)[1]}</option>
</select> 
            </div>`
        );

        return new Element(id, name, customClass, style, typeContent, mode, options);
    }

    createDecimalNumber(id, name, customClass, style, mode) {
        const typeContent = new TypeContent(
            'decimal number',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${style}" draggable="true" id="${id}">
            <label class="col" style="width: 50%;">${name}</label>
            <div class="${customClass}" id="text" style="border: 1px solid blue; flex: 1; width: 50%;"></div> 
            </div>`,
            'decimal number input preview'
        );

        return new Element(id, name, customClass, style, typeContent, mode);
    }

    createMultipleLineOfText(id, name, customClass, style, mode) {
        const typeContent = new TypeContent(
            'multiple line of text',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${style}" draggable="true" id="${id}">
            <label class="col" style="width: 50%;">${name}</label>
            <div class="${customClass}" id="text" style="border: 1px solid blue; flex: 1; width: 50%;"></div> 
            </div>`,
            'multiple line of text input preview'
        );

        return new Element(id, name, customClass, style, typeContent, mode);
    }

    createDateAndTime(id, name, customClass, style, mode) {
        const typeContent = new TypeContent(
            'date and time',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${style}" draggable="true" id="${id}">
            <label class="col" style="width: 50%;">${name}</label>
            <div class="${customClass}" id="text" style="border: 1px solid blue; flex: 1; width: 50%;"></div> 
            </div>`,
            'date and time input preview'
        );

        return new Element(id, name, customClass, style, typeContent, mode);
    }

    createTab(id, name, customClass, style, mode) {

        const typeContentTab = new TypeContent(
            'tab',
            'layout',
            `<div class="container my-3" style="${style}" id="${id}">
                <div class="row">
                    <h5>${name}</h5>
                    <!--content-->
                </div>
            </div>`,
            `<label>${name}</label>
            <div class="${customClass}" style="${style}" style="margin:10px;"> <!--content--></div>`
        );

        return new Element(id, name, customClass, style, typeContentTab, mode);
    }

    createSection(id, name, customClass, style, mode) {
        const typeContentSection = new TypeContent(
            'section',
            'layout',
            `<div class="container section my-2 py-1 ${customClass}" style="${style}" id="${id}" draggable="true" >
                <div class="row">
                    <h6>${name}</h6>
                    <!--content-->
                </div>
            </div>`,
            `<div class="container section my-2 py-1 ${customClass}" style="${style}" id="${id}" >
                   <h6>${name}</h6>
                <div class="row justify-content-between">
                    <!--content-->
                </div>
            </div>`
        );

        return new Element(id, name, customClass, style, typeContentSection, mode);
    }

    createColumn(id, name, customClass, style, mode) {
        const typeContentColumn = new TypeContent(
            'column',
            'layout',
            `<div id="${id}" class="${customClass}" style = "${style}"> <!--content--></div>`,
            `<div id="${id}" class="${customClass}"> <!--content--></div>`
        );
        return new Element(id, name, customClass, style, typeContentColumn, mode);
    }

}