
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
    entity;
    constructor(mode){
        this.forms = [];
        this.targetFrom =  null;
        this.jsonData = null;
        this.mode = mode;
        this.factory();
    }


    async factory(){
        this.entity = await this.getEntity();
        console.log('entity' , this.entity)
        let formasJson = await this.getJsonform(this.mode ,this.entity.entitySchemaId);
        this.jsonData = JSON.parse(formasJson.formJson)
        console.log('jsonData' , this.jsonData )
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

  
    async getEntity(){
        const response = await fetch('http://localhost:5032/api/EntitySchemas/1');

        return response.json();
    }

    async getJsonform(mode , enitityId){
        let response = null;
        switch(mode){
            case 'create':
                response = await fetch(`http://localhost:5032/api/EntitySchemas/${enitityId}/forms/default`);
                break;
            case 'update':
                response = await fetch(`http://localhost:5032/api/EntitySchemas/${enitityId}/forms/update`);
                break;
            case 'preview':
                response = await fetch(`http://localhost:5032/api/EntitySchemas/${enitityId}/forms/preview`);
                break;
            case 'custom':
                response = await fetch(`http://localhost:5032/api/EntitySchemas/${enitityId}/forms/custom`);
                break;
        }

        return response.json();
    }

    createForm(){
        this.targetFrom = new CreateForm(this.jsonData, this.mode , this.entity);
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