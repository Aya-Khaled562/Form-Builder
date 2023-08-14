
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
    //         saveBtn.addEventListener('click', this.handleNewSaveBtn(this, 'POST'))
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
        let saveandcloseBtn = document.getElementById('saveandclose');
        if(this.targetData === null){
            saveBtn.addEventListener('click', this.handleNewSaveBtn(this,'POST', false));
            saveandcloseBtn.addEventListener('click', this.handleNewCloseBtn(this,'POST', true));
        }else{
            saveBtn.addEventListener('click', this.handleNewSaveBtn(this,'PUT', false,this.targetData.id, ))
            saveandcloseBtn.addEventListener('click', this.handleNewSaveBtn(this,'PUT', true, this.targetData.id))

        }
    }

    async getForm(){
        const form = await fetch('http://localhost:5032/api/EntityFroms?formName=main');
        return form.json();
    }
    
    get Values(){
        return this.values;
    }

    handleNewSaveBtn(param, method,shouldClose = false,id=''){
        return async function handler(e){
            let dataObject = {}
            for(let i=0; i< param.builder.Fields.length; i++){
                let key = param.builder.Fields[i].name;
                let value = document.getElementById(param.builder.Fields[i].id).value
                dataObject[key]  = value;
            }
            try{
                await param.pushDataIntoDB(dataObject , method , id);
                if(shouldClose){
                    window.close();
                    window.location.reload();
                    window.history.back();
                    
                }
            }catch(error){
                console.error('Error pushing data into DB:', error);
            }
            
        }
    }

    async pushDataIntoDB(data , method , id){
        data.departmentId = 1;
        console.log('data: ', data);
        const response = await fetch(`http://localhost:5032/api/Employees/${id}`,{
            method: `${method}`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        
        
    }


}






