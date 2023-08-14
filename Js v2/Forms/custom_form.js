
import FormBuilder from "../formbuilder.js";

export default class CustomForm {
    builder;
    values;
    resolvePromise;
    targetData
    constructor(){
        this.builder = null;
        this.values = [];
        this.resolvePromise = null;
        this.targetData = null;
    }

    // initialize(){
    //     const jsonData = JSON.parse(localStorage.getItem('jsonDataForm'));

    //     console.log('jsonData: ', jsonData);
    //     this.builder = new FormBuilder(jsonData, 'custom' ,'form');
    //     let saveBtn = document.getElementById('save');
    //     return new Promise((resolve)=>{
    //         this.resolvePromise = resolve;
    //         saveBtn.addEventListener('click', this.handleSaveBtn(this))
    //     })
    // }

    async initialize(){
        const form = await this.getForm();
        const mainForm = form[0];
        const formAfterParse = JSON.parse(mainForm.fromJson);
       
        this.targetData = JSON.parse(localStorage.getItem('targetData'));
        console.log('targetData: ', this.targetData);
        console.log('formAfterParse: ', formAfterParse);
        this.builder = new FormBuilder(formAfterParse, 'custom' ,'form');
        this.builder.mapData(this.targetData)
        let saveBtn = document.getElementById('save');

        if(this.targetData === null){
            saveBtn.addEventListener('click', this.handleNewSaveBtn(this, 'POST'))
        }else{
            saveBtn.addEventListener('click', this.handleNewSaveBtn(this,'PUT', this.targetData.id))

        }
    }

    async getForm(){
        const form = await fetch('http://localhost:5032/api/EntityFroms?formName=main');
        return form.json();
    }
    
    get Values(){
        return this.values;
    }

    handleSaveBtn(param){
        return function handler(e){

        }
    }
     handleNewSaveBtn(param, method,id=''){
        return function handler(e){
            let dataObject = {}
            for(let i=0; i< param.builder.Fields.length; i++){
                let key = param.builder.Fields[i].name;
                let value = document.getElementById(param.builder.Fields[i].id).value
                dataObject[key]  = value;
            }
            param.pushDataIntoDB(dataObject , method , id);
        }
    }

    pushDataIntoDB(data , method , id){
        data.departmentId = 1;
        console.log('data: ', data);
        const response = fetch(`http://localhost:5032/api/Employees/${id}`,{
            method: `${method}`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            console.log('res : ' , res)
        }).catch(err => {
            console.log('err: ' , err)
        });
        
        
    }


}






