function showModal(e) {
    var attr = $(this).attr('data-id');

    console.log('attr', attr)
    if (typeof attr !== 'undefined' && attr !== false) {
        $('#exampleModal').data('id', e.currentTarget.id);
    } else {
        $('#exampleModal').attr('data-id', e.currentTarget.id);
    }

    $('#exampleModal').modal('show');


    console.log('targetid', e.currentTarget.id)

}

let events = new Map();


let dbleClickHandlers = [showModal]
events.set('dblclick', dbleClickHandlers);


export default events;

export function addAllEventsToElement(elementIdSelector) {
    events.forEach((handlersArr, eventType) => {
        handlersArr.forEach((handler) => {
            $(`#${elementIdSelector}`).on(eventType, handler);
        });
    });

}