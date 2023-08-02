import '/node_modules/jquery/dist/jquery.min.js'
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import FormBuilder from "./formbuilder.js";
import { download } from './Utils.js';

const jsonData = JSON.parse(sessionStorage.getItem('jsonDataForm'));

// console.log(jsonData);
const builder = new FormBuilder(jsonData, 'preview', 'form');

// Save form
console.log("preview window loading>>>>>>>>>");
let copyHtmlBtn = document.getElementById('copyFormHtml');
copyHtmlBtn.addEventListener('click', function (e) {
    let formContainer = document.getElementById(builder.ParentId).parentElement;
    navigator.clipboard.writeText(formContainer.innerHTML);
});

let editFromBtn = document.getElementById('EditForm');
// console.log(editFromBtn)
editFromBtn.addEventListener('click', function () {
    window.open('/index.html', '_self');
})


// let saveBtn = document.getElementById('Save');
// saveBtn.addEventListener('click', function () {
//     download(builder.toSaveSchema());
// })







