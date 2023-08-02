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