import FormApp from "./form_app.js";
import {getJson} from "./Utils.js";

let jsonData = sessionStorage.getItem('jsonDataForm');
let mode = sessionStorage.getItem('formMode');

if (mode == null)
    mode = 'create';

if (jsonData != null) {
    jsonData = JSON.parse(jsonData);

} else if (mode == 'update') {
    jsonData = await getJson('../Form-Builder/files/schema.json');
} else {
    jsonData = await getJson('../Form-Builder/files/defaultSchema.json');
}

const formApp = new FormApp(jsonData, mode);



