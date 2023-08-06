    import Value from "./value.js";
    function showModal(e) {
        e.stopPropagation();
        $('#exampleModal').attr('data-id', e.currentTarget.id);

        console.log('id modal fired', e.currentTarget.id)
        $('#exampleModal').modal('show');

    }

export function fieldIsRequired(e) {
    let inputValue = e.target.value;

    let requiredFeedbackElm = e.target.parentElement.querySelector('.required');
    if (inputValue.trim().length == 0) {
        if (!requiredFeedbackElm)
            $(`<div class="required text-danger" >This field is required</div>`).insertAfter(e.target)
        e.target.focus();
    } else {
        if (requiredFeedbackElm)
            e.target.parentElement.querySelector('.required').remove();
    }
}


export function selectElement(formBuilder) {

    return function (e) {
        e.stopPropagation();
        console.log('selectElement', formBuilder)
        let curActiveElement = formBuilder.getActiveElement();
        if (curActiveElement != null) {
            document.getElementById(curActiveElement.Id).classList.remove('border-danger');
            document.getElementById(curActiveElement.Id).classList.remove('border-3');

        }
        e.currentTarget.classList.toggle('border-danger');
        e.currentTarget.classList.toggle('border-3');

        formBuilder.setActiveElement(e.currentTarget.id);


    }

}

let events = new Map();


let dbleClickHandlers = [showModal];
events.set('dblclick', dbleClickHandlers);

//let clickHandlers = [selectElement];
//events.set('click', clickHandlers);


export default events;

export function addAllEventsToElement(elementIdSelector, builder) {
    events.forEach((handlersArr, eventType) => {
        handlersArr.forEach((handler) => {
            $(`#${elementIdSelector}`).on(eventType, handler);
        });
    });

    $(`#${elementIdSelector}`).on('click', selectElement(builder));

        // handleDragAndDrop(builder);
    }

    // export function handleDragAndDrop(formBuilder) {
    //     const formContainer = document.getElementById('formContainer');

    //     formContainer.addEventListener('dragstart', (e) => {
    //         formBuilder.dragAfterRender = e.target;
    //         if (e.target.classList.contains('section')) {
    //             formBuilder.dragBeforeRender = formBuilder.getSectionBeforeRenderById(e.target.id);
    //             e.target.style.opacity = '0.5';
    //         }
    //         else if(e.target.classList.contains('field')){
    //             if(e.target.classList.contains('newField')){
    //                 formBuilder.targetField = formBuilder.Entity.fields.find(field => field.name === formBuilder.dragAfterRender.id);
    //                 // console.log('targetField: ',formBuilder.targetField )
    //                 ///let value = new Value('', formBuilder.targetField.type, formBuilder.targetField.options || {})
    //                 // formBuilder.dragBeforeRender = formBuilder.build(formBuilder.targetField.type, `${formBuilder.targetField.name}`, `${formBuilder.targetField.displayName}`, 'py-3', 'border: 1px solid green',formBuilder.targetField.required, value);
    //                 let value = new Value('', formBuilder.targetField.type, formBuilder.targetField.options || {})
    //                 let obj = {
    //                     customClass: 'py-3',
    //                     style: 'border: 1px solid green',
    //                     id: formBuilder.targetField.name,
    //                     name: formBuilder.targetField.displayName,
    //                     type: formBuilder.targetField.type,
    //                     // optionsSetValues: this.targetField.options
    //                     value: value,
    //                     required: formBuilder.targetField.isrequired
    //                 }

    //                 formBuilder.dragBeforeRender = formBuilder.build(formBuilder.targetField.type, obj);
    //                 // console.log('drag element: ', formBuilder.dragBeforeRender)
    //                 formBuilder.addElementToMap(formBuilder.dragBeforeRender);
    //             }else{
    //                 formBuilder.dragBeforeRender = formBuilder.getFeildBeforeRender(e.target.id);
    //                 // console.log('oldField' , formBuilder.dragBeforeRender);
    //             }
    //             e.target.style.opacity = '0.5';
    //         }

    //         // console.log('dragstart' , e.target);
    //     });

    //     formContainer.addEventListener('dragend', (e) => {
    //         if (e.target.classList.contains('section') || e.target.classList.contains('field') || e.target.classList.contains('tab')) {
    //             if (formBuilder.dragAfterRender) {
    //                 formBuilder.dragAfterRender.style.opacity = '1';
    //                 formBuilder.dragAfterRender = null;
    //                 // console.log('dragend');
    //             }
    //         }
    //     });

    //     formContainer.addEventListener('dragover', (e) => {
    //         e.preventDefault();
    //         if ((e.target.classList.contains('coltab') && formBuilder.dragAfterRender.classList.contains('section')) ||
    //             (e.target.classList.contains('colsec')&& formBuilder.dragAfterRender.classList.contains('field')) )
    //         {
    //             e.target.style.borderBottom = '3px solid blue';
    //             // console.log('dragover');
    //         }

    //     });

    //     formContainer.addEventListener('dragleave', (e) => {
    //         if (e.target.classList.contains('coltab') && formBuilder.dragAfterRender.classList.contains('section')) {
    //             e.target.style.borderBottom = '1px solid orange';
    //             // console.log('dragleave');
    //         }
    //         else if (e.target.classList.contains('colsec') && formBuilder.dragAfterRender.classList.contains('field')) {
    //             e.target.style.borderBottom = '1px solid blue';
    //             // console.log('dragleave field');
    //         }
    //     });

    //     formContainer.addEventListener('drop', (e) => {
    //         e.preventDefault();
    //         e.stopPropagation();

    //         let targetColId = e.target.id;
    //         let newColBeforRender = formBuilder.ColumnsBeforRender.find(col => col.Id === targetColId);
    //         let oldParentColAfterRender = formBuilder.dragAfterRender.parentNode;
    //         let oldParentColBeforeRender = formBuilder.ColumnsBeforRender.find(col => col.Id === oldParentColAfterRender.id)

    //         if(oldParentColAfterRender.classList.contains('colsec') || oldParentColAfterRender.classList.contains('coltab') ) {
    //             oldParentColBeforeRender = formBuilder.ColumnsBeforRender.find(col => col.Id === oldParentColAfterRender.id);
    //             oldParentColBeforeRender.removeElement(formBuilder.dragBeforeRender);
    //         }

    //         if (e.target.classList.contains('coltab') && formBuilder.dragAfterRender.classList.contains('section')) {
    //             newColBeforRender.addElement(formBuilder.dragBeforeRender);
    //             e.target.style.borderBottom = '1px solid orange';
    //             e.target.append(formBuilder.dragAfterRender);
    //             // console.log('drop');
    //         }

    //         else if (e.target.classList.contains('colsec')&& formBuilder.dragAfterRender.classList.contains('field')) {
    //             newColBeforRender.addElement(formBuilder.dragBeforeRender);
    //             // console.log('drop newColBeforRender', newColBeforRender)

    //             e.target.style.borderBottom = '1px solid blue';

    //             if(formBuilder.dragAfterRender.classList.contains('newField')) {
    //                 formBuilder.dragAfterRender.classList.remove('newField');
    //                 const div = document.createElement('div');
    //                 div.innerHTML = formBuilder.dragBeforeRender.render()
    //                 oldParentColAfterRender.removeChild(formBuilder.dragAfterRender);
    //                 formBuilder.targetField.active = false;
    //                 e.target.append(div.firstChild);
    //                 addAllEventsToElement(formBuilder.dragAfterRender.id, formBuilder)
    //             }else{

    //                 e.target.style.borderBottom = '1px solid blue';
    //                 e.target.append(formBuilder.dragAfterRender);

    //             }

    //         }

    //     });


    // }

    function handleDragStart(formBuilder, e){
        formBuilder.dragAfterRender = e.target;
        if (e.target.classList.contains('section')) {
            formBuilder.dragBeforeRender = formBuilder.getSectionBeforeRenderById(e.target.id);
            e.target.style.opacity = '0.5';
        }
        else if(e.target.classList.contains('field')){
            if(e.target.classList.contains('newField')){
                formBuilder.targetField = formBuilder.Entity.attributeSchemas.find(field => field.name === formBuilder.dragAfterRender.id);
                let value = new Value('', formBuilder.targetField.type, formBuilder.targetField.options || {})
                let obj = {
                    customClass: 'py-3',
                    style: 'border: 1px solid green',
                    id: formBuilder.targetField.name,
                    name: formBuilder.targetField.displayName,
                    type: formBuilder.targetField.type,
                    value: value,
                    required: formBuilder.targetField.isrequired
                }

                formBuilder.dragBeforeRender = formBuilder.build(formBuilder.targetField.type, obj);
                formBuilder.addElementToMap(formBuilder.dragBeforeRender);
            }else{
                formBuilder.dragBeforeRender = formBuilder.getFeildBeforeRender(e.target.id);
            }
            e.target.style.opacity = '0.5';
        }
        console.log('drag start');
        
    }

    function handleDragEnd(formBuilder, e ){
        if (e.target.classList.contains('section') || e.target.classList.contains('field') || e.target.classList.contains('tab')) {
            if (formBuilder.dragAfterRender) {
                formBuilder.dragAfterRender.style.opacity = '1';
                formBuilder.dragAfterRender = null;
            }
        }
        console.log('dragEnd');
        
    }

    function handleDragOver(formBuilder , e){
        e.preventDefault();
        if ((e.target.classList.contains('coltab') && formBuilder.dragAfterRender.classList.contains('section')) ||
            (e.target.classList.contains('colsec')&& formBuilder.dragAfterRender.classList.contains('field')) )
        {
            e.target.style.borderBottom = '3px solid blue';
        }
        console.log('dragOver');
        
    }

    function handleDragLeave(formBuilder, e ){
        if (e.target.classList.contains('coltab') && formBuilder.dragAfterRender.classList.contains('section')) {
            e.target.style.borderBottom = '1px solid orange';
            console.log('dragleave');
        }
        else if (e.target.classList.contains('colsec') && formBuilder.dragAfterRender.classList.contains('field')) {
            e.target.style.borderBottom = '1px solid blue';
            console.log('dragleave field');
        }
        
    }

    function handleDrop(formBuilder, e ){
        e.preventDefault();
        e.stopPropagation();
        console.log('drop');
        let targetColId = e.target.id;
        let newColBeforRender = formBuilder.ColumnsBeforRender.find(col => col.Id === targetColId);
        let oldParentColAfterRender = formBuilder.dragAfterRender.parentNode;
        let oldParentColBeforeRender = formBuilder.ColumnsBeforRender.find(col => col.Id === oldParentColAfterRender.id)

        if(oldParentColAfterRender.classList.contains('colsec') || oldParentColAfterRender.classList.contains('coltab') ) {
            oldParentColBeforeRender = formBuilder.ColumnsBeforRender.find(col => col.Id === oldParentColAfterRender.id);
            oldParentColBeforeRender.removeElement(formBuilder.dragBeforeRender);
        }

        if (e.target.classList.contains('coltab') && formBuilder.dragAfterRender.classList.contains('section')) {
            newColBeforRender.addElement(formBuilder.dragBeforeRender);
            e.target.style.borderBottom = '1px solid orange';
            e.target.append(formBuilder.dragAfterRender);
            // console.log('drop');
        }

        else if (e.target.classList.contains('colsec')&& formBuilder.dragAfterRender.classList.contains('field')) {
            newColBeforRender.addElement(formBuilder.dragBeforeRender);
            // console.log('drop newColBeforRender', newColBeforRender)

            e.target.style.borderBottom = '1px solid blue';

            if(formBuilder.dragAfterRender.classList.contains('newField')) {
                formBuilder.dragAfterRender.classList.remove('newField');
                const div = document.createElement('div');
                div.innerHTML = formBuilder.dragBeforeRender.render()
                oldParentColAfterRender.removeChild(formBuilder.dragAfterRender);
                formBuilder.targetField.active = false;
                e.target.append(div.firstChild);
                addAllEventsToElement(formBuilder.dragAfterRender.id, formBuilder)
            }else{

                e.target.style.borderBottom = '1px solid blue';
                e.target.append(formBuilder.dragAfterRender);

            }

        }
        
    }


    export function handleDragAndDrop(formBuilder) {
        const formContainer = document.getElementById('formContainer');

        formContainer.addEventListener('dragstart', handleDragStart.bind( null,formBuilder));
        formContainer.addEventListener('dragend', handleDragEnd.bind( null,formBuilder));
        formContainer.addEventListener('dragover', handleDragOver.bind( null,formBuilder));
        formContainer.addEventListener('dragleave',handleDragLeave.bind( null,formBuilder));
        formContainer.addEventListener('drop', handleDrop.bind( null,formBuilder));


    }