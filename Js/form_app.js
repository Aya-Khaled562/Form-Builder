
import CreateForm from "./create_form.js";
import PreviewFrom from "./preview_form.js";
import CustomForm from "./custom_form.js";

export let entityValues = {
    entity_name:"Employee",
    fields:[
        {
            displayName:"First Name",
            name:"firstname",
            values:[]
        },
        {
            displayName:"Last Name",
            name:"lastname",
            values:[]
        },
        {
            displayName:"Social Status",
            name:"socialstatus",
            values:[]
        },
        {
            displayName:"Gender",
            name:"gender",
            values:[]
        },
        {
            displayName:"Salary",
            name:"salary",
            values:[]
        },
        {
            displayName:"Notes",
            name:"notes",
            values:[]
        },
        {
            displayName:"Start Date",
            name:"startdate",
            values:[]
        }
    ]
}

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

    async factory(){
        switch(this.mode){
            case 'create':
            case 'update':
                this.createForm();
                break;
            case 'preview':
                this.previewForm();
                break;
            case 'custom':
               await this.customFrom();
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

    async customFrom(){
        this.targetFrom = new CustomForm();
        await this.targetFrom.initialize();
        let values = this.targetFrom.Values;
        console.log('values in form app:', values);

        for (let i = 0; i < values.length; i++){
            for (let key of  entityValues.fields) {
                if(key.displayName === values[i].key){
                    key.values.push(values[i].value)
                }
            }
        }
        console.log('entityValues: ', entityValues)
    }


}