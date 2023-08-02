

    import FormApp from "./form_app.js";
    import {download, getJson} from "./Utils.js";

    let jsonData = sessionStorage.getItem('jsonDataForm');
    let mode = sessionStorage.getItem('formMode');

    if (mode == null)
        mode = 'create';

    if (jsonData != null) {
        jsonData = JSON.parse(jsonData);

    } else if ( mode == 'update') {
        jsonData = await getJson('/files/schema.json');
    }else {
        jsonData = await getJson('/files/defaultSchema.json');
    }

    debugger;
    const formApp = new FormApp(jsonData, mode);



