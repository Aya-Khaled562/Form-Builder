import TypeContent from "../Element/typecontent.js";
import AbstractElementFactory from "./abstract_element_factory.js";

export default class HtmlElementFactory extends AbstractElementFactory {

    // createSingleLineOfText(obj) {
    //     return new TypeContent(
    //         'single line of text',
    //         'formControl',
    //         `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
    //             <label class="col" style="width: 50%;">${obj.name}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
    //             <div class="${obj.customClass}" id="text" style="border: 1px dashed #6d6e70; flex: 1; width: 50%;"></div> 
    //         </div>`,
    //         `<div class="mb-3 d-flex flex-row align-items-center px-2 py-1 my-1 field ${!obj.visible ? 'd-none ' : ''}">
    //                     <label for="${obj.id}" class="form-label me-5">${obj.name}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
    //                      <input type="text" class="form-control" ${obj.readOnly ? `readonly` : ""}  style=" width: 50%;" id="${obj.id}">
    //                     </div>`
    //     );
    // }

    createSingleLineOfText(obj) {
        return new TypeContent(
            'single line of text',
            'formControl',
            `<div class="d-flex align-items-center px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
                <label class="col-4" style="flex: 0 0 auto; margin-right: 5px;">${obj.name}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                <div class="${obj.customClass} col" id="text" style="border: 1px dashed #6d6e70;"></div> 
            </div>`,
            `<div class="mb-3 d-flex align-items-center px-2 py-1 my-1 field ${!obj.visible ? 'd-none ' : ''}">
                <label for="${obj.id}" class="form-label col-2 " style="flex: 0 0 auto; margin-right: 5px;">${obj.name}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                <input type="text" class="form-control col" style=" width: 100%;" ${obj.readOnly ? `readonly` : ""} id="${obj.id}">
            </div>`
        );
    }
    
    
    createOptionSet(obj) {

        let setOptions = ``;

        for (let key in obj.value.source) {
            let option = `<option value="${obj.value.source[key]}">${key}</option>`;
            setOptions += option;
        }
        return new TypeContent(
            'option set',
            'formControl',
            `<div class="d-flex align-items-center px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
                <label class="col-4" style="flex: 0 0 auto; margin-right: 5px;">${obj.name}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                <div class="${obj.customClass} col flex-grow-1" id="text" style="border: 1px dashed #6d6e70;"></div> 
            </div>`,
            `<div class="mb-3 d-flex align-items-center px-2 py-1 my-1 field ${!obj.visible ? 'd-none ' : ''}"  draggable="true" >
                <label class="form-label col-2" style="flex: 0 0 auto; margin-right: 5px;">${obj.name}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                <select class="form-select col" style="width: 100%;" id="${obj.id}" ${obj.readOnly ? `disabled` : ""}>${setOptions}</select> 
            </div>`
        );
    }

    createTwoOptions(obj) {

        let twoOptions = ``;

        for (let key in obj.value.source) {
            let option = `<option value="${obj.value.source[key]}">${key}</option>`;
            twoOptions += option;
        }

        return new TypeContent(
            'two options',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
                <label class="col-4" style="flex: 0 0 auto; margin-right: 5px;">${obj.name}</label>
                <div class="${obj.customClass} col flex-grow-1" id="text" style="border: 1px dashed #6d6e70;"></div> 
            </div>`,
            `<div class="mb-3 d-flex flex-row align-items-center px-2 py-1 my-1 field ${!obj.visible ? 'd-none ' : ''}" draggable="true" >
                <label class="form-label col-2" style="flex: 0 0 auto; margin-right: 5px;">${obj.name}</label>
                <select class="form-select col" style="width: 100%;" id="${obj.id}" ${obj.readOnly ? `disabled` : ""}>${twoOptions}</select> 
            </div>`
        );
    }

    createDecimalNumber(obj) {
        return new TypeContent(
            'decimal number',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
            <label class="col-4" style="flex: 0 0 auto; margin-right: 5px;">${obj.name}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
            <div class="${obj.customClass}" id="text" style="border: 1px dashed #6d6e70; flex: 1; width: 50%;"></div> 
            </div>`,
            `<div class="mb-3 d-flex flex-row align-items-center px-2 py-1 my-1 field ${!obj.visible ? 'd-none ' : ''}">
                        <label for="${obj.id}" class="form-label col-2" style="flex: 0 0 auto; margin-right: 5px;">${obj.name}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                         <input type="number" class="form-control " style=" width: 100%;" id="${obj.id}" ${obj.readOnly ? `readonly` : ""}>
                        </div>`
        );
    }

    createMultipleLineOfText(obj) {
        return  new TypeContent(
            'multiple line of text',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
            <label class="col-4" style="flex: 0 0 auto; margin-right: 5px;">${obj.name}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
            <div class="${obj.customClass}" id="text" style="border: 1px dashed #6d6e70; flex: 1; width: 50%;"></div> 
            </div>`,
            `<div class="mb-3 d-flex flex-row align-items-center px-2 py-1 my-1 field ${!obj.visible ? 'd-none ' : ''}" >
                        <label for="${obj.id}" class="form-label col-2" style="flex: 0 0 auto; margin-right: 5px;">${obj.name}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                         <textarea class="form-control " style=" width: 100%;" id="${obj.id}" rows="3"></textarea>
                        </div>`
        );
    }

    createDateAndTime(obj) {
        return new TypeContent(
            'date and time',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
            <label class="col-4" style="flex: 0 0 auto; margin-right: 5px;">${obj.name}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
            <div class="${obj.customClass}" id="text" style="border: 1px dashed #6d6e70; flex: 1; width: 50%;"></div> 
            </div>`,
            `<div class="mb-3 d-flex flex-row align-items-center px-2 py-1 my-1 field  ${!obj.visible ? 'd-none ' : ''}">
                        <label for="${obj.id}" class="form-label col-2" style="flex: 0 0 auto; margin-right: 5px;">${obj.name}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                         <input type="date" class="form-control " style=" width: 100%;" id="${obj.id}" ${obj.readOnly ? `readonly` : ""}>
                        </div>`
        );
    }

    createTab(obj) {
        return  new TypeContent(
            'tab',
            'layout',
            // `<div class="tabArea">
            //     <div class="tabArea1" style="${obj.style}" id="${obj.id}"  >
            //     <div class="row tabArea2">
            //         <h5>${obj.name}</h5>
            //         <!--content-->
            //     </div>
            // </div>`,
            
            `<div class="tabArea">
                <div class="tabArea1" style="${obj.style}" id="${obj.id}">
                <div data-bs-toggle="collapse" data-bs-target="#areaCollapsed-${obj.id}" style="width:fit-content" aria-expanded="true">
                        <i class="fas fa-caret-right"></i><label class="ms-2">${obj.name}</label>
                </div>
                <div class="row tabArea2 collapse show" id="areaCollapsed-${obj.id}"> <!--content--></div></div>
            </div>
            `,
            `<div id="${obj.id}" class="tabArea1 mb-5">
                <div data-bs-toggle="collapse" data-bs-target="#areaCollapsed-${obj.id}" style="width:fit-content" aria-expanded="true">
                        <i class="fas fa-caret-right"></i><label class="ms-2">${obj.name}</label>
                </div>
                <div class="row tabArea2 my-2 ${obj.customClass} collapse show" id="areaCollapsed-${obj.id}"> <!--content--></div></div>
            `
        );
  
    }

    createSection(obj) {
        return new TypeContent(
            'section',
            'layout',
            `<div class="container-fluid container-section section  ${obj.customClass}" style="${obj.style}" id="${obj.id}" draggable="true" >
                <div class="row row-section">
                    <h6>${obj.name}</h6>
                    <!--content-->
                </div>
            </div>`,

            `<div class="container-fluid container-section section  ${obj.customClass}" id="${obj.id}" draggable="true" >
                <div class="row row-section">
                <h6 class="${!obj.visible ? 'd-none ' : ''}">${obj.name}</h6>
                    <!--content-->
                </div>
            </div>`
            // `<div class="container-fluid container-section section  ${obj.customClass}" id="${obj.id}" >
            //     <div class="row row-section justify-content-between">
            //         <!--content-->
            //     </div>
            // </div>`
        );
    }

    createColumn(obj) {
        return new TypeContent(
            'column',
            'layout',
            `<div id="${obj.id}" class="${obj.customClass}" style = "${obj.style}"> <!--content--></div>`,
            `<div id="${obj.id}" class="${obj.customClass}" > <!--content--></div>`
            // `<div id="${obj.id}" class="${obj.customClass}"> <!--content--></div>`
        );
    }

}