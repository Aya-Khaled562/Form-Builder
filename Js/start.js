import FormApp from "./form_app.js";
import formAppSingleton from "./singleton.js";
import {getJson} from "./Utils.js";

// let jsonData = null;
let mode = localStorage.getItem('formMode');

if (mode == null)
    mode = 'create';

// if (jsonData != null) {
//     jsonData = JSON.parse(jsonData);
// } else if (mode == 'update') {
//     jsonData = await getJson('../files/schema.json');
// } else {
//     console.log('hereeeeeeeee>>>>>>>')
//     jsonData = await getJson('../files/defaultSchema.json');
// }

const formApp = new FormApp(mode);
// const start = formAppSingleton.getInstance(jsonData , mode);
// start.factory();



