import '/node_modules/jquery/dist/jquery.min.js'
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import FormBuilder from "./formbuilder.js";
import { download } from './Utils.js';

const jsonData = JSON.parse(sessionStorage.getItem('jsonDataForm'));

const builder = new FormBuilder(jsonData, 'preview', 'form');

console.log("custom form loading>>>>>>>>>");

let saveBtn = document.getElementById('Save');
saveBtn.addEventListener('click', function () {
    console.log('read data: ', builder.Fields)

    let values = [];
    for (let i = 0; i < builder.Fields.length; i++) {
        values.push(document.getElementById(builder.Fields[i].id).value);
        console.log('ids: ', builder.Fields[i].id)
    }
    console.log('values: ',values);
    
})







