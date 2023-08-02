import TypeContent from "./typecontent.js";
import Element from "./element.js";
import AbstractElementFactory from "./abstract_element_factory.js";
import Value from "./value.js";


export default class HtmlElementFactory extends AbstractElementFactory {

    //new Type
    createFileUpload(id, name, customClass, style, mode,isrequired , value) {
        const typeContent = new TypeContent(
            'file upload',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${style}" draggable="true" id="${id}">
                <label class="col" style="width: 50%;">${name}</label>
                <input type="file" class="${customClass}"  style="display: none;"> 
                <label for="${id}" class="btn ${customClass}" style="border: 1px solid blue; flex: 1; width: 50%;">Select File</label>
            </div>`,
            `<div class="mb-3 d-flex flex-row align-items-center px-2 py-1 my-1 field">
                <label for="${id}" class="form-label me-5">${name}</label>
                <input type="file" class="form-control" style="width: 50%;" id="${id}">
            </div>`
        );
        return new Element(id, name, customClass, style, typeContent, mode,isrequired , value);
    }
    
    createSingleLineOfText(id, name, customClass, style, mode,isrequired , value) {
        const typeContent = new TypeContent(
            'single line of text',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${style}" draggable="true" id="${id}" >
                <label class="col" style="width: 50%;">${name}</label>
                <div class="${customClass}"  style="border: 1px solid blue; flex: 1; width: 50%;"></div> 
            </div>`,
            `<div class="mb-3 d-flex flex-row align-items-center px-2 py-1 my-1 field">
            <label for="${id}" class="form-label me-5">${name}</label>
                <input type="text" class="form-control " style=" width: 50%;" id="${id}">
            </div>`
        );
        return new Element(id, name, customClass, style, typeContent, mode, isrequired , value);
    }

    createOptionSet(id, name, customClass, style, mode,isrequired, options) {

        let setOptions = ``;
        // console.log('option set values', options.source)

        for (let key in options.source) {
            
            let option = `<option value="${options.source[key]}">${key}</option>`;
            setOptions += option;
          }

        const typeContent = new TypeContent(
            'option set',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${style}" draggable="true" id="${id}">
            <label class="col" style="width: 50%;">${name}</label>
            <div class="${customClass}"  style="border: 1px solid blue; flex: 1; width: 50%;"></div> 
            </div>`,
            `<div class="mb-3 d-flex flex-row align-items-center px-2 py-1 my-1 field" style="" draggable="true">
             <label class="form-label me-5">${name}</label>
            <select class="form-select" aria-label="Default select example" id="${id}">${setOptions}</select> 
            </div>`
        );

        return new Element(id, name, customClass, style, typeContent, mode,isrequired, options);
    }

    createTwoOptions(id, name, customClass, style, mode,isrequired, options) {
        console.log('html factory ooptions>>> ', options)
        let twoOptions = ``;
        
        for (let key in options.source) {
            let option = `<option value="${options.source[key]}">${key}</option>`;
            twoOptions += option;
          }

        const typeContent = new TypeContent(
            'two options',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${style}" draggable="true" id="${id}" >
            <label class="col" style="width: 50%;">${name}</label>
            <div class="${customClass}" style="border: 1px solid blue; flex: 1; width: 50%;"></div> 
            </div>`,
            `<div class="mb-3 d-flex flex-row align-items-center px-2 py-1 my-1 field" style="width: 50%;" draggable="true" >
            <label class="form-label me-5">${name}</label>
            <select class="form-select" id="${id}" aria-label="Default select example">${twoOptions}</select> 
            </div>`
        );
        return new Element(id, name, customClass, style, typeContent, mode,isrequired, options);
    }

    createDecimalNumber(id, name, customClass, style, mode,isrequired , value) {
        const typeContent = new TypeContent(
            'decimal number',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${style}" draggable="true" id="${id}">
            <label class="col" style="width: 50%;">${name}</label>
            <div class="${customClass}"  style="border: 1px solid blue; flex: 1; width: 50%;"></div> 
            </div>`,
            `<div class="mb-3 d-flex flex-row align-items-center px-2 py-1 my-1 field">
                        <label for="${id}" class="form-label me-5">${name}</label>
                         <input type="number" class="form-control " style=" width: 50%;" id="${id}">
                        </div>`
        );

        return new Element(id, name, customClass, style, typeContent, mode,isrequired , value);
    }

    createMultipleLineOfText(id, name, customClass, style, mode, isrequired , value) {
        const typeContent = new TypeContent(
            'multiple line of text',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${style}" draggable="true"  id="${id}">
            <label class="col" style="width: 50%;">${name}</label>
            <div class="${customClass}" style="border: 1px solid blue; flex: 1; width: 50%;"></div> 
            </div>`,
            `<div class="mb-3 d-flex flex-row align-items-center px-2 py-1 my-1 field">
                        <label for="${id}" class="form-label me-5">${name}</label>
                         <textarea class="form-control " style=" width: 50%;" id="${id}" rows="3"></textarea>
                        </div>`
        );

        return new Element(id, name, customClass, style, typeContent, mode, isrequired , value);
    }

    createDateAndTime(id, name, customClass, style, mode, isrequired , value) {
        const typeContent = new TypeContent(
            'date and time',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${style}" draggable="true" id="${id}">
            <label class="col" style="width: 50%;">${name}</label>
            <div class="${customClass}"  style="border: 1px solid blue; flex: 1; width: 50%;"></div> 
            </div>`,
            'date and time input preview'
        );

        return new Element(id, name, customClass, style, typeContent, mode ,isrequired , value);
    }

    createTab(id, name, customClass, style, mode) {

        const typeContentTab = new TypeContent(
            'tab',
            'layout',
            `<div class="container my-3 tab" style="${style}" id="${id}"  >
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