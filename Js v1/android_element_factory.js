import TypeContent from "./typecontent.js";
import Element from "./element.js";
import AbstractElementFactory from "./abstract_element_factory.js";


export default class AndroidElementFactory extends AbstractElementFactory {
    
    createSingleLineOfText(id, name, customClass, style, mode) {
        const typeContent = new TypeContent(
            'single line of text',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${style}" draggable="true" id="${id}">
                <label class="col" style="width: 50%;">${name}</label>
                <div class="${customClass}" id="text" style="border: 1px dashed #6d6e70; flex: 1; width: 50%;"></div> 
            </div>`,
            'Text input preview'
        );
    
        return new Element(id, name, customClass, style, typeContent, mode);
    }

    createOptionSet(id, name, customClass, style, mode) {
        const typeContent = new TypeContent(
            'option set',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${style}" draggable="true" id="${id}">
            <label class="col" style="width: 50%;">${name}</label>
            <div class="${customClass}" id="text" style="border: 1px dashed #6d6e70; flex: 1; width: 50%;"></div> 
            </div>`,
            'Text input preview'
        );
        
        return new Element(id, name, customClass, style, typeContent, mode);
    }

    createTwoOptions(id, name, customClass, style, mode){
        const typeContent = new TypeContent(
            'two options',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${style}" draggable="true" id="${id}">
            <label class="col" style="width: 50%;">${name}</label>
            <div class="${customClass}" id="text" style="border: 1px dashed #6d6e70; flex: 1; width: 50%;"></div> 
            </div>`,
            'Text input preview'
        );
        
        return new Element(id, name, customClass, style, typeContent, mode);
    }

    createDecimalNumber(id, name, customClass, style, mode){
        const typeContent = new TypeContent(
            'decimal number',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${style}" draggable="true" id="${id}">
            <label class="col" style="width: 50%;">${name}</label>
            <div class="${customClass}" id="text" style="border: 1px dashed #6d6e70; flex: 1; width: 50%;"></div> 
            </div>`,
            'Text input preview'
        );
        
        return new Element(id, name, customClass, style, typeContent, mode);
    }

    createMultipleLineOfText(id, name, customClass, style, mode){
        const typeContent = new TypeContent(
            'multiple line of text',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${style}" draggable="true" id="${id}">
            <label class="col" style="width: 50%;">${name}</label>
            <div class="${customClass}" id="text" style="border: 1px dashed #6d6e70; flex: 1; width: 50%;"></div> 
            </div>`,
            'Text input preview'
        );
        
        return new Element(id, name, customClass, style, typeContent, mode);
    }

    createDateAndTime(id, name, customClass, style, mode){
        const typeContent = new TypeContent(
            'date and time',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${style}" draggable="true" id="${id}">
            <label class="col" style="width: 50%;">${name}</label>
            <div class="${customClass}" id="text" style="border: 1px dashed #6d6e70; flex: 1; width: 50%;"></div> 
            </div>`,
            'Text input preview'
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
                    <div class="py-3" style="border: 1px dashed #6d6e70;"></div>
                </div>
            </div>`,
            `<label>${name}</label>
            <div class="${customClass}" style="${style}" style="margin:10px;"> <!--columns--> </div>`
        );

       return new Element(id, name, customClass, style, typeContentTab, mode);
    }
   
    createSection(id, name, customClass, style, mode) {
        const typeContentSection = new TypeContent(
            'section',
            'layout',
            `<div class="container my-2 py-1 ${customClass}" style="${style}" id="${id}" draggable="true" >
                <div class="row">
                    <h6>${name}</h6>
                    <div class="py-3" style="border: 1px dashed #6d6e70;"></div>
                </div>
            </div>`,
            `<label>${name}</label>
            <div id="${id}" class="${customClass}" style="${style}" draggable="true"> <!--columns--> </div>`
        );

        return new Element(id, name, customClass, style, typeContentSection, mode);
    }

    createColumn(id, name, customClass, style, mode){
        const typeContentColumn = new TypeContent(
            'column',
            'layout',
            `<div id="${id}" class="${customClass}" style = "${style}"> <div class="py-3" style="border: 1px dashed #6d6e70;"></div></div>`,
            `<div id="${id}" class="col py-1 my-1 mx-1"> <!--content--> </div>`
        );
        return new Element(id, name, customClass, style, typeContentColumn, mode);
    }

}
