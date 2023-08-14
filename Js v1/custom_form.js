
import FormBuilder from "./formbuilder.js";

export default class CustomForm {
    builder;
    values;
    resolvePromise;
    constructor(){
        this.builder = null;
        this.values = [];
        this.resolvePromise = null;
    }

    initialize(){
        console.log("Initializing in Preview")
        const jsonData = JSON.parse(sessionStorage.getItem('jsonDataForm'));
        this.builder = new FormBuilder(jsonData, 'preview' ,'form');
        let saveBtn = document.getElementById('Save');
        return new Promise((resolve)=>{
            this.resolvePromise = resolve;
            saveBtn.addEventListener('click', this.handleSaveBtn(this))
        })
    }

    get Values(){
        return this.values;
    }

    handleSaveBtn(param){
        return function handler(e){
            console.log('read data: ')
            for(let i=0; i< param.builder.Fields.length; i++){
                param.values.push({key: param.builder.Fields[i].name , value: document.getElementById(param.builder.Fields[i].id).value});
            }
            console.log('values: ',param.values);

            if(param.resolvePromise){
                param.resolvePromise(param.values);
            }
        }
    }


}






