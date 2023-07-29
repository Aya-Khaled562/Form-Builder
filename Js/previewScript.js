import '/node_modules/jquery/dist/jquery.min.js'
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import FormBuilder from "./formbuilder.js";

const jsonData = JSON.parse(sessionStorage.getItem('jsonDataForm'));

console.log(jsonData);
const builder = new FormBuilder(jsonData, 'preview', 'form');

// Save form
console.log("preview window loading>>>>>>>>>");
let copyHtmlBtn = document.getElementById('copyFormHtml');
copyHtmlBtn.addEventListener('click', function (e) {
    let formContainer = document.getElementById(builder.ParentId).parentElement;
    navigator.clipboard.writeText(formContainer.innerHTML);
});

    let editFromBtn = document.getElementById('EditForm');
    console.log(editFromBtn)
    editFromBtn.addEventListener('click', function () {
        window.open('/Form-Builder/index.html', '_self');
    })






