
import FormBuilder from "../formbuilder.js";

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
        const jsonData = JSON.parse(localStorage.getItem('jsonDataForm'));
        console.log('jsonData: ', jsonData);
        this.builder = new FormBuilder(jsonData, 'custom' ,'form');
        let saveBtn = document.getElementById('save');
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
            let dataObject = {}
            for(let i=0; i< param.builder.Fields.length; i++){
                let key = param.builder.Fields[i].name;
                let value = document.getElementById(param.builder.Fields[i].id).value
                dataObject[key]  = value 
            }
            param.pushDataIntoDB(dataObject);
        }
    }

    pushDataIntoDB(data){
        data.departmentId = 1;
        console.log('data: ', data);
        const response = fetch('http://localhost:5032/api/Employees',{
            method: 'POST',
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






