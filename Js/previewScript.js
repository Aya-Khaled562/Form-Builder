import '/node_modules/jquery/dist/jquery.min.js'
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import FormBuilder from "./formbuilder.js";
import {getJson} from "./Utils.js";

const jsonData = await getJson('../Form-Builder/files/schema.json');

const builder = new FormBuilder(jsonData, 'preview', 'formContainer');

window.addEventListener('load', async function () {

    // Save form
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
});






