
import CreateForm from "./create_form.js";
import PreviewFrom from "./preview_form.js";

export default class FormApp{
    forms
    targetFrom
    jsonData
    mode

    constructor(jsonData, mode){
        this.forms = [];
        this.targetFrom =  null;
        this.jsonData = jsonData;
        this.mode = mode;
        this.factory();
    }

    factory(){
        switch(this.mode){
            case 'create':
            case 'update':
                this.createForm();
                break;
            case 'preview':
                this.previewForm();
                break;
        }
    }

    createForm(){
        this.targetFrom = new CreateForm(this.jsonData, this.mode);
        let form = this.targetFrom.initialize();
        this.forms.push(form);
    }

    previewForm(){
        this.targetFrom = new PreviewFrom();
        this.targetFrom.initialize();
    }



}