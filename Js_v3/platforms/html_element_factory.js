import TypeContent from "../Element/typecontent.js";
import AbstractElementFactory from "./abstract_element_factory.js";

export default class HtmlElementFactory extends AbstractElementFactory {


    createLookup(obj) {
        // console.log('object in text', obj);
        return new TypeContent(
            'lookup',
            'formControl',
            `<div class=" d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': ' align-items-start ' } px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
                <label class="${obj.labelPosition ? '': 'col-4'}" style="flex: 0 0 auto; margin-right: 5px;">${obj.isLocked ? "<span style='color: red'><img alt='This control is locked' class='imgLock' src='/img/ico_lock.gif'></span>" : ""} ${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                <div class="${obj.customClass} ${obj.labelPosition ? ' w-100 ': 'col'}" id="text" style="border: 1px dashed #6d6e70;"></div> 
            </div>`,
            `<div class="d-flex ${obj.labelPosition ? 'flex-column' : 'flex-row'} ${obj.labelAlignment ? 'align-items-end' : 'align-items-start'} px-2 py-1 my-1 field ${!obj.visible ? 'd-none' : ''}">
            <label for="${obj.id}" class="col form-label ${obj.labelPosition ? '' : 'col-2'} ${!obj.showLabel ? 'd-none' : ''}" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
            <input type="text" class="form-control ${obj.labelPosition ? '' : 'col'}"  ${obj.readOnly ? `readonly` : ""} id="${obj.id}">
            <div id="search-btn"><i class="fa-solid fa-magnifying-glass"></i></div>
        </div><div class="list-group w-75" id="${obj.id}_lookup_list">
        
      </div>
        `
        );
    }

    createFileUpload(obj) {
        return new TypeContent(
            'file upload',
            'formControl',
            `<div class=" d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': ' align-items-start ' } px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
                <label class="${obj.labelPosition ? '': 'col-4'}" style="flex: 0 0 auto; margin-right: 5px;">${obj.isLocked ? "<span style='color: red'><img alt='This control is locked' class='imgLock' src='/img/ico_lock.gif'></span>" : ""} ${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                <div class="${obj.customClass} ${obj.labelPosition ? ' w-100 ': 'col'}" id="text" style="border: 1px dashed #6d6e70;"></div> 
            </div>`,
            `<div>
                <div class="d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': ' align-items-start ' }  px-2 py-1 my-1 field ${!obj.visible ? 'd-none ' : ''}">
                    <label for="${obj.id}" class="form-label ${obj.labelPosition ? '': 'col-2'} ${!obj.showLabel ? 'd-none ' : ''}" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                    <input type="file" class="form-control ${obj.labelPosition ? '' : 'col'} " style=" width: 100%;" ${obj.readOnly ? `readonly` : ""} id="${obj.id}">
                </div>
            </div>`
        );
    }

    createImage(obj) {
        return new TypeContent(
            'image',
            'formControl',
            `<div class=" d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': ' align-items-start ' } px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
                <label class="${obj.labelPosition ? '': 'col-4'}" style="flex: 0 0 auto; margin-right: 5px;">${obj.isLocked ? "<span style='color: red'><img alt='This control is locked' class='imgLock' src='/img/ico_lock.gif'></span>" : ""} ${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                <div class="${obj.customClass} ${obj.labelPosition ? ' w-100 ': 'col'}" id="text" style="border: 1px dashed #6d6e70;"></div> 
            </div>`,
            ``
            // `<div>
            //     <div class="d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': ' align-items-start ' }  px-2 py-1 my-1 field ${!obj.visible ? 'd-none ' : ''}">
            //         <label for="${obj.id}" class="form-label ${obj.labelPosition ? '': 'col-2'} ${!obj.showLabel ? 'd-none ' : ''}" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
            //         <input type="file" accept="image/*" class="form-control ${obj.labelPosition ? '' : 'col'} " style=" width: 100%;" ${obj.readOnly ? `readonly` : ""} id="${obj.id}">
            //     </div>
            // </div>`
        );
    }

    createPhoneNumber(obj){
        return new TypeContent(
            'phone number',
            'formControl',
            `<div class=" d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': ' align-items-start ' } px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
                <label class="${obj.labelPosition ? '': 'col-4'}" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                <div class="${obj.customClass} ${obj.labelPosition ? ' w-100 ': 'col'}" id="text" style="border: 1px dashed #6d6e70;"></div> 
            </div>`,
            `<div>
                <div class="mb-3 d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': ' align-items-start ' }  px-2 py-1 my-1 field ${!obj.visible ? 'd-none ' : ''}">
                    <label for="${obj.id}" class="form-label ${obj.labelPosition ? '': 'col-2'} ${!obj.showLabel ? 'd-none ' : ''}" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                    <input type="tel" class="form-control ${obj.labelPosition ? '' : 'col'} "  ${obj.readOnly ? `readonly` : ""} id="${obj.id}">
                </div>
            </div>
            `
        );
    }

    createPassword(obj){
        return new TypeContent(
            'password',
            'formControl',
            `<div class=" d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': ' align-items-start ' } px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
                <label class="${obj.labelPosition ? '': 'col-4'}" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                <div class="${obj.customClass} ${obj.labelPosition ? ' w-100 ': 'col'}" id="text" style="border: 1px dashed #6d6e70;"></div> 
            </div>`,
            `<div>
                <div class="mb-3 d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': ' align-items-start ' }  px-2 py-1 my-1 field ${!obj.visible ? 'd-none ' : ''}">
                    <label for="${obj.id}" class="form-label ${obj.labelPosition ? '': 'col-2'} ${!obj.showLabel ? 'd-none ' : ''}" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                    <input type="password" class="form-control ${obj.labelPosition ? '' : 'col'} " display:block;" ${obj.readOnly ? `readonly` : ""} id="${obj.id}">
                </div>
            </div>`
        );
    }
    createEmail(obj){
        return new TypeContent(
            'email',
            'formControl',
            `<div class=" d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': 'align-items-start ' } px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
                <label class="${obj.labelPosition ? '': 'col-4'}" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                <div class="${obj.customClass} ${obj.labelPosition ? ' w-100 ': 'col'}" id="text" style="border: 1px dashed #6d6e70;"></div> 
            </div>`,
            `<div>
                <div class="mb-3 d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': ' align-items-start ' }  px-2 py-1 my-1 field ${!obj.visible ? 'd-none ' : ''}">
                    <label for="${obj.id}" class="form-label ${obj.labelPosition ? '': 'col-2'} ${!obj.showLabel ? 'd-none ' : ''}" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                    <input type="email" class="form-control ${obj.labelPosition ? '' : 'col'} "  ${obj.readOnly ? `readonly` : ""} id="${obj.id}">
                </div>
            </div>`
        );
    }

    createSingleLineOfText(obj) {
        // console.log('object in text', obj);
        return new TypeContent(
            'single line of text',
            'formControl',
            `<div class=" d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': ' align-items-start ' } px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
                <label class="${obj.labelPosition ? '': 'col-4'}" style="flex: 0 0 auto; margin-right: 5px;">${obj.isLocked ? "<span style='color: red'><img alt='This control is locked' class='imgLock' src='/img/ico_lock.gif'></span>" : ""} ${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                <div class="${obj.customClass} ${obj.labelPosition ? ' w-100 ': 'col'}" id="text" style="border: 1px dashed #6d6e70;"></div> 
            </div>`,
            `<div class="d-flex ${obj.labelPosition ? 'flex-column' : 'flex-row'} ${obj.labelAlignment ? 'align-items-end' : 'align-items-start'} px-2 py-1 my-1 field ${!obj.visible ? 'd-none' : ''}">
            <label for="${obj.id}" class="col form-label ${obj.labelPosition ? '' : 'col-2'} ${!obj.showLabel ? 'd-none' : ''}" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
            <input type="text" class="form-control ${obj.labelPosition ? '' : 'col'}"  ${obj.readOnly ? `readonly` : ""} id="${obj.id}">
           
        </div>
        `
        );
    }
    
    createOptionSet(obj) {

        let setOptions = ``;

        for (let key in obj.elementValue.source) {
            let option = `<option value="${obj.elementValue.source[key]}">${key}</option>`;
            setOptions += option;
        }
        return new TypeContent(
            'option set',
            'formControl',
            `<div class="d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': ' align-items-start ' } px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
                <label class="${obj.labelPosition ? '': 'col-4'}" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                <div class="${obj.customClass} ${obj.labelPosition ? ' w-100 ': 'col'} flex-grow-1" id="text" style="border: 1px dashed #6d6e70;"></div> 
            </div>`,
            `<div class="mb-3 d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': ' align-items-start ' } px-2 py-1 my-1 field ${!obj.visible ? 'd-none ' : ''}"  draggable="true" >
                <label class="form-label ${obj.labelPosition ? '': 'col-2'} ${!obj.showLabel ? 'd-none ' : ''}" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                <select class="form-select ${obj.labelPosition ? '': 'col'}"  id="${obj.id}" ${obj.readOnly ? `disabled` : ""}>${setOptions}</select> 
            </div>`
        );
    }

    createTwoOptions(obj) {

        // console.log('object at two option', obj);

        let twoOptions = ``;

        for (let key in obj.elementValue.source) {
            let option = `<option value="${obj.elementValue.source[key]}">${key}</option>`;
            twoOptions += option;
        }

        return new TypeContent(
            'two options',
            'formControl',
            `<div class="d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': ' align-items-start ' } px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
                <label class="${obj.labelPosition ? '': 'col-4'}" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                <div class="${obj.customClass} ${obj.labelPosition ? ' w-100 ': 'col'}" id="text" style="border: 1px dashed #6d6e70;"></div> 
            </div>`,
            `<div class="mb-3 d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': ' align-items-start ' } px-2 py-1 my-1 field ${!obj.visible ? 'd-none ' : ''}" draggable="true" >
                    <label class="form-label ${obj.labelPosition ? '': 'col-2'} ${!obj.showLabel ? 'd-none ' : ''}" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}</label>
                    <select class="form-select ${obj.labelPosition ? '': 'col'}" id="${obj.id}" ${obj.readOnly ? `disabled` : ""}>${twoOptions}</select> 
            </div>
            `
        );
    }


    // createTwoOptions(obj) {

    //     let twoOptions = ``;

    //     for (let key in obj.elementValue.source) {
    //         let option = `<option value="${obj.elementValue.source[key]}">${key}</option>`;
    //         twoOptions += option;
    //     }

    //     return new TypeContent(
    //         'two options',
    //         'formControl',
    //         `<div class="d-flex flex-row align-items-center px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
    //             <label class="col-4" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}</label>
    //             <div class="${obj.customClass} col flex-grow-1" id="text" style="border: 1px dashed #6d6e70;"></div> 
    //         </div>`,
    //         `<div class="mb-3 d-flex flex-row align-items-center px-2 py-1 my-1 field ${!obj.visible ? 'd-none ' : ''}" draggable="true" >
    //             <label class="form-label col-2" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}</label>
    //             <select class="form-select col" style="width: 100%;" id="${obj.id}" ${obj.readOnly ? `disabled` : ""}>${twoOptions}</select> 
    //         </div>`
    //     );
    // }

    
    createDecimalNumber(obj) {
        return new TypeContent(
            'decimal number',
            'formControl',
            `<div class="d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': ' align-items-start ' } px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
            <label class="${obj.labelPosition ? '': 'col-4'}" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
            <div class="${obj.customClass} ${obj.labelPosition ? ' w-100 ': 'col'}" id="text" style="border: 1px dashed #6d6e70; flex: 1; width: 50%;"></div> 
            </div>`,
            `<div>
                <div class="mb-3 d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': ' align-items-start ' } px-2 py-1 my-1 field ${!obj.visible ? 'd-none ' : ''}">
                    <label for="${obj.id}" class="form-label ${obj.labelPosition ? '': 'col-2'} ${!obj.showLabel ? 'd-none ' : ''}" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                    <input type="number" class="form-control ${obj.labelPosition ? '' : 'col'} "  id="${obj.id}" ${obj.readOnly ? `readonly` : ""}>
                </div>
            </div>`
        );
    }

    createMultipleLineOfText(obj) {
        return  new TypeContent(
            'multiple line of text',
            'formControl',
            `<div class=" d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': ' align-items-start ' } px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
            <label class="${obj.labelPosition ? '': 'col-4'}" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
            <div class="${obj.customClass} ${obj.labelPosition ? ' w-100 ': 'col'}" id="text" style="border: 1px dashed #6d6e70; flex: 1; width: 50%;"></div> 
            </div>`,
            `<div>
                <div class="mb-3  d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': ' align-items-start ' } px-2 py-1 my-1 field ${!obj.visible ? 'd-none ' : ''}" >
                    <label for="${obj.id}" class="form-label ${obj.labelPosition ? '': 'col-2'} ${!obj.showLabel ? 'd-none ' : ''}" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                    <textarea class="form-control ${obj.labelPosition ? '' : 'col'}  " id="${obj.id}" rows="${obj.textAreaRows ?? 3}"></textarea>
                </div>
            </div>`
        );
    }

    createDateAndTime(obj) {
        return new TypeContent(
            'date and time',
            'formControl',
            `<div class="d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': ' align-items-start ' } px-2 py-1 my-1 field" style="${obj.style}" draggable="true" id="${obj.id}">
            <label class="${obj.labelPosition ? '': 'col-4'}" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
            <div class="${obj.customClass}" id="text" style="border: 1px dashed #6d6e70; flex: 1; width: 50%;"></div> 
            </div>`,
            `<div>
                <div class="mb-3 d-flex ${obj.labelPosition? ' flex-column ' : ' flex-row '} ${obj.labelAlignment? ' align-items-end ': ' align-items-start ' } px-2 py-1 my-1 field  ${!obj.visible ? 'd-none ' : ''}">
                    <label for="${obj.id}" class="form-label ${obj.labelPosition ? '': 'col-2'} ${!obj.showLabel ? 'd-none ' : ''}" style="flex: 0 0 auto; margin-right: 5px;">${obj.displayName}${obj.isRequired ? "<span style='color: red'>*</span>" : ""}</label>
                    <input type="date" class="form-control ${obj.labelPosition ? '' : 'col'}  " id="${obj.id}" ${obj.readOnly ? `readonly` : ""}>
                </div>
            </div>`
        );
    }

    createTab(obj) {
        return  new TypeContent(
            'tab',
            'layout',
            `<div class="tabArea" id="${obj.id}">
                <div class="tabArea1" style="${obj.style}; user-select:none;" >
                <div data-bs-toggle="collapse" data-bs-target="#areaCollapsed-${obj.id}" style="width:fit-content" aria-expanded="true">
                        <i class="fas fa-caret-right"></i><label class="ms-2">${obj.name}</label>
                </div>
                <div class="row tabArea2 collapse show" id="areaCollapsed-${obj.id}"> <!--content--></div></div>
            </div>
            `,
            `<div id="${obj.id}" class="mt-2${obj.visible ? '' : 'd-none'}" style="padding:4px;">
                <div class="${obj.showLabel ? '' : ' d-none '}" data-bs-toggle="collapse" data-bs-target="#areaCollapsed-${obj.id}" style="width:fit-content" aria-expanded="true">
                        <i class="fas fa-caret-right"></i><label class="ms-2">${obj.name}</label>
                </div>
                <div class="row tabArea2 ${obj.customClass} w-100 collapse show" id="areaCollapsed-${obj.id}"><!--content--></div></div>
            `
            // `<div id="${obj.id}" class="tabArea1 mb-5 ${obj.visible ? '' : 'd-none'}">
            //     <div class="${obj.showLabel ? '' : ' d-none '}" data-bs-toggle="collapse" data-bs-target="#areaCollapsed-${obj.id}" style="width:fit-content" aria-expanded="true">
            //             <i class="fas fa-caret-right"></i><label class="ms-2">${obj.name}</label>
            //     </div>
            //     <div class="row tabArea2 my-2 ${obj.customClass} w-100 collapse show" id="areaCollapsed-${obj.id}"><!--content--></div></div>
            // `
        );
  
    }

    createSection(obj) {
        return new TypeContent(
            'section',
            'layout',
            `<div class="container-fluid container-section section  ${obj.customClass}" style="${obj.style}" id="${obj.id}" draggable="true" >
                <div class="row row-section">
                    <h6>
                    ${obj.isLocked ? "<span style ='color: red'><img alt='This control is locked' class='imgLock' src='/img/ico_lock.gif'></span>" : ""}
                    ${obj.name}</h6>
                    <!--content-->
                </div>
            </div>`,

            `<div class="container-fluid  ${obj.customClass} ${obj.visible ? '' : ' d-none '}" id="${obj.id}" style="border: 1px solid #c3c6cd!important; padding:0">
            <div style="
            border-bottom: 2px solid #c3c6cd;
            padding: 5px 10px;
            text-decoration: none;
            display: inline-block; 
          " class="w-100 ${!obj.showLabel ? 'd-none ' : ''}">
                <h6 class="mx-2">${obj.name}</h6>   
            </div>
            <div class="row row-section mx-2">
                    <!--content-->
                </div>
            </div>`
        );
    }

    createColumn(obj) {
        return new TypeContent(
            'column',
            'layout',
            `<div id="${obj.id}" class="${obj.customClass}" style = "${obj.style}"> <!--content--></div>`,
            `<div id="${obj.id}" class="${obj.customClass}"> <!--content--></div>`
        );
    }

    buildContent(type, element){
        console.log('element at build contet', element);
        switch (type) {
            case 'tab':
                return this.createTab(element);

            case 'section':
                return this.createSection(element);
             
            case 'column':
                return this.createColumn(element);
            case 'single line of text':
                return this.createSingleLineOfText(element);
               
            case 'option set':
                return this.createOptionSet(element);

            case 'two options':
                return this.createTwoOptions(element);
            case 'decimal number':
                return this.createDecimalNumber(element);
               
            case 'multiple line of text':
                return this.createMultipleLineOfText(element);
              
            case 'date and time':
               return this.createDateAndTime(element);
            
            case 'email':
                return this.createEmail(element);

            case 'phone number':
                return this.createPhoneNumber(element);
            case 'password':
                return this.createPassword(element);

            case 'file upload':
                return this.createFileUpload(element);

            case 'image':
                return this.createImage(element);
            case 'lookup':
                return this.createLookup(element);
        }
    }

}