import '/node_modules/jquery/dist/jquery.min.js'
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import FormBuilder from "./formbuilder.js";
import {getJson} from "./Utils.js";

const jsonData = await getJson('../files/schema.json');

console.log(jsonData);
//window.onload =  function () {
const builder = new FormBuilder(jsonData, 'preview', 'formContainer');

// Save form
console.log("preview window loading>>>>>>>>>");
let copyHtmlBtn = document.getElementById('copyFormHtml');
copyHtmlBtn.addEventListener('click', function (e) {

    let formContainer = document.getElementById(builder.ParentId);
    navigator.clipboard.writeText(formContainer.innerHTML);
});

    let editFromBtn = document.getElementById('EditForm');
    console.log(editFromBtn)
    editFromBtn.addEventListener('click', function () {

        window.open('/Form-Builder/test.html', '_blank');

    })
//};






