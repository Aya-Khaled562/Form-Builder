function showModal(e) {
    e.stopPropagation();
    $('#exampleModal').attr('data-id', e.currentTarget.id);

    console.log('id modal fired', e.currentTarget.id)
    $('#exampleModal').modal('show');

}


export function selectElement(formBuilder) {

    return function (e) {
        e.stopPropagation();
        let curActiveElement = formBuilder.getActiveElement();
        if (curActiveElement != null) {
            document.getElementById(curActiveElement.Id).classList.remove('border-danger');
        }
        e.currentTarget.classList.toggle('border-danger');
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