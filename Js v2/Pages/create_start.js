import FormApp from "../form_app.js";
let mode = localStorage.getItem('formMode');

if (mode == null)
    mode = 'create';

const formApp = new FormApp(mode);




