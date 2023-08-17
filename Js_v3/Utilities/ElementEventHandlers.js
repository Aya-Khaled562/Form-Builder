    
    import Value from "../Element/value.js";


    function showModal(e) {
        e.stopPropagation();
        
        $('button[id="display-tab"]').tab('show');

        $('#formating').html('');
        $('#display').html('');


        $('#exampleModal').attr('data-id', e.currentTarget.id);

        console.log('id modal fired', e.currentTarget.id)
        $('#exampleModal').modal('show');

    }

  export function showLookupLoadMoreRecordsModal(lookupElement) {

        return function(e){
            e.stopPropagation();
            let lookupListElm = $(`#${lookupElement.Id}_lookup_list`);

             if (lookupListElm){
                 lookupListElm.addClass('d-none');
             }
            console.log('modeal load more called');
           // $('button[id="display-tab"]').tab('show');

            $('#loadMoreRecordsModal').attr('data-id', lookupElement.Id);

            $('#loadMoreRecordsModal').modal('show');
        }

    }

    export function fieldIsRequired(e) {
        let inputValue = e.target.value;

        let requiredFeedbackElm = e.target.parentElement.parentElement.querySelector('.required');
        if (inputValue.trim().length == 0) {
            if (!requiredFeedbackElm)
                $(`<div class="required ms-5 text-danger" >This field is required</div>`).insertAfter(e.target.parentElement)
            e.target.focus();
        } else {
            if (requiredFeedbackElm)
                e.target.parentElement.parentElement.querySelector('.required').remove();
        }
    }

    export function fieldMaxAndMinLen(element) {
        return function (e){

            let minLen = 3;
            let maxLen = 10000;

            if (element.minLen != null){
                minLen = element.minLen;
            }

            if (element.maxLen != null){
                maxLen = element.maxLen;
            }

            console.log('element at handler', element);
            console.log('max and min', maxLen, minLen);
            let inputValue = e.target.value;
    
            let lengthFeedbackElm = e.target.parentElement.parentElement.querySelector('.length-feedback');
            if (inputValue.trim().length < minLen || inputValue.trim().length > maxLen) {
                if (!lengthFeedbackElm)
                    $(`<div class="length-feedback ms-5 text-danger" >This field length must between ${minLen} and ${maxLen}</div>`).insertAfter(e.target.parentElement)
                e.target.focus();
            } else {
                if (lengthFeedbackElm)
                    e.target.parentElement.parentElement.querySelector('.length-feedback').remove();
            }
        }
    }

    export function validatePattern(element) {
        return function (e){

            let pattern = element.pattern;

            let inputValue = e.target.value;
    
            let patternFeebackElm = e.target.parentElement.querySelector('.pattern-feedback');
            if (!pattern.test(inputValue)) {
                if (!patternFeebackElm)
                    $(`<div class="pattern-feedback text-danger" >pattern feedback</div>`).insertAfter(e.target)
                e.target.focus();
            } else {
                if (patternFeebackElm)
                    e.target.parentElement.querySelector('.pattern-feedback').remove();
            }
        }
    }
    
    export function selectElement(formBuilder) {
        return function (e) {
            e.stopPropagation();
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

    }

    function handleDragStart(formBuilder, e){
        console.log('dragStart , ', e.target);
        formBuilder.dragAfterRender = e.target;
        if (e.target.classList.contains('section')) {
            formBuilder.dragBeforeRender = formBuilder.getSectionBeforeRenderById(e.target.id);
            e.target.style.opacity = '0.5';
        }
        else if(e.target.classList.contains('field')){
            if(e.target.classList.contains('newField')){
                console.log('drag after render', formBuilder.dragAfterRender);
                formBuilder.targetField = formBuilder.Entity.attributeSchemas.find(field => field.id === formBuilder.dragAfterRender.id);
                console.log('target field', formBuilder.targetField);
                let value = new Value('', formBuilder.targetField.type, formBuilder.targetField.lookup || formBuilder.targetField.options || {})
                let obj = {
                    customClass: 'py-3',
                    style: 'border: 1px dashed #6d6e70',
                    id: formBuilder.targetField.id,
                    name: formBuilder.targetField.name,
                    displayName: formBuilder.targetField.displayName,
                    type: formBuilder.targetField.type,
                    value: value,
                    isRequired: formBuilder.targetField.isRequired,
                    minLen: formBuilder.targetField.minLen,
                    maxLen: formBuilder.targetField.maxLen,
                    pattern: formBuilder.targetField.pattern
                }


                formBuilder.dragBeforeRender = formBuilder.build(formBuilder.targetField.type, obj);
                console.log('drag befor render', formBuilder.dragBeforeRender);
                //formBuilder.addElementToMap(formBuilder.dragBeforeRender);
            }else{
                formBuilder.dragBeforeRender = formBuilder.getFeildBeforeRender(e.target.id);
            }
            e.target.style.opacity = '0.5';
        }
        console.log('drag start',formBuilder.dragBeforeRender );

        
    }

    function handleDragEnd(formBuilder, e ){
        console.log('dragEnd , ', e.target);
        if (e.target.classList.contains('section') || e.target.classList.contains('field') || e.target.classList.contains('tab')) {
            if (formBuilder.dragAfterRender) {
                formBuilder.dragAfterRender.style.opacity = '1';
                formBuilder.dragAfterRender = null;
            }
        }
        console.log('dragEnd');
        
    }

    function handleDragOver(formBuilder , e){
        console.log('dragOver , ', e.target);
        
        e.preventDefault();
        if ((e.target.classList.contains('coltab') && formBuilder.dragAfterRender.classList.contains('section')) ||
            (e.target.classList.contains('colsec')&& formBuilder.dragAfterRender.classList.contains('field')) )
        {
            e.target.style.borderBottom = '3px solid blue';
        }
        console.log('dragOver');
        
    }

    function handleDragLeave(formBuilder, e ){
        console.log('dragleave', e.target);

        if (e.target.classList.contains('coltab') && formBuilder.dragAfterRender.classList.contains('section')) {
            e.target.style.borderBottom = '1px solid orange';
            console.log('dragleave');
        }
        else if (e.target.classList.contains('colsec') && formBuilder.dragAfterRender.classList.contains('field')) {
            e.target.style.borderBottom = '1px dashed #6d6e70';
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

            e.target.style.borderBottom = '1px dashed #6d6e70';

            if(formBuilder.dragAfterRender.classList.contains('newField')) {
                formBuilder.dragAfterRender.classList.remove('newField');
                const div = document.createElement('div');
                div.innerHTML = formBuilder.dragBeforeRender.render()
                oldParentColAfterRender.removeChild(formBuilder.dragAfterRender);
                //formBuilder.targetField.active = false;
                e.target.append(div.firstChild);
                addAllEventsToElement(formBuilder.dragAfterRender.id, formBuilder)
            }else{

                e.target.style.borderBottom = '1px dashed #6d6e70';
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