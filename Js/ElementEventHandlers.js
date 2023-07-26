function showModal(e) {
    e.stopPropagation();
    $('#exampleModal').attr('data-id', e.currentTarget.id);

    console.log('id modal fired', e.currentTarget.id)
    $('#exampleModal').modal('show');

}

let events = new Map();


let dbleClickHandlers = [showModal]
events.set('dblclick', dbleClickHandlers);


export default events;

export function addAllEventsToElement(elementIdSelector) {
    // console.log('id modal fired', elementIdSelector);

    events.forEach((handlersArr, eventType) => {
        handlersArr.forEach((handler) => {
            $(`#${elementIdSelector}`).on(eventType, handler);
        });
    });

}