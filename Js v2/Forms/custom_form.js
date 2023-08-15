
import FormBuilder from "../formbuilder.js";

export default class CustomForm {
    builder;
    values;
    resolvePromise;
    targetData;
    flag;
    targetId;
    constructor(){
        this.builder = null;
        this.values = [];
        this.resolvePromise = null;
        this.targetData = null;
        this.flag = false;
        this.targetId = 0;
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
        //Get Form
        const form = await this.getForm();
        const mainForm = form[0];
        const formAfterParse = JSON.parse(mainForm.fromJson);
        //Get Data
        this.targetData = JSON.parse(localStorage.getItem('targetData'));
        this.builder = new FormBuilder(formAfterParse, 'custom' ,'form');

        let saveBtn = document.getElementById('save');
        let saveandcloseBtn = document.getElementById('saveandclose');
        let removeBtn = document.getElementById('removeBtn');
        let newBtn = document.getElementById('new');
        newBtn.addEventListener('click' ,this.handleNewBtn);
        
        // if(this.targetData !== null){
        //     this.builder.mapData(this.targetData);
        //     console.log('Updated');
        //     saveBtn.addEventListener('click', ()=> this.handleNewSaveBtn('PUT', false,this.targetData.id))
        //     saveandcloseBtn.addEventListener('click',()=> this.handleNewSaveBtn('PUT', true, this.targetData.id))
        //     
        // }else{
        //     console.log('Add');
        //     saveBtn.addEventListener('click',()=> this.handleNewSaveBtn('POST', false));
        //     saveandcloseBtn.addEventListener('click',()=> this.handleNewSaveBtn('POST', true));
        // }

        if(this.targetData !== null){
            this.builder.mapData(this.targetData);
        }

        saveBtn.addEventListener('click',()=> this.handleNewSaveBtn(false));
        saveandcloseBtn.addEventListener('click',()=> this.handleNewSaveBtn(true));
        removeBtn.addEventListener('click' , ()=> this.handleRemoveBtn());
    
    }

    async getForm(){
        const form = await fetch('http://localhost:5032/api/EntityFroms?formName=main');
        return form.json();
    }
    
    get Values(){
        return this.values;
    }

    // handleNewSaveBtn(param, method,shouldClose = false,id=''){
    //     return async function handler(e){
    //         let dataObject = {}
    //         for(let i=0; i< param.builder.Fields.length; i++){
    //             let key = param.builder.Fields[i].name;
    //             let value = document.getElementById(param.builder.Fields[i].id).value
    //             dataObject[key]  = value;
    //         }
    //         try{
    //             // this.flag = true;
    //             await param.pushDataIntoDB(dataObject , method , id);
    //             console.log('window opener:', window.opener);
    //             if (shouldClose) {
    //                 window.close();
    //                 window.location.reload();
    //                 window.history.back();
    //             }
    //         }catch(error){
    //             console.error('Error pushing data into DB:', error);
    //         }
            
    //     }
    // }

    async handleNewSaveBtn(shouldClose){
        let dataObject = {}
        for(let i=0; i< this.builder.Fields.length; i++){
            let key = this.builder.Fields[i].name;
            let value = document.getElementById(this.builder.Fields[i].id).value
            dataObject[key]  = value;
        }

        try{
            let response = null;
            let dataFromLocalStorage = localStorage.getItem('newRecordFlag');
            let data = JSON.parse(dataFromLocalStorage);
            console.log('data', data);
            console.log('dataFromLocalStorage:', dataFromLocalStorage);
            if(this.targetData !== null || data !== null){
                console.log('update');
                this.targetId = this.targetData?.id || data?.id;
                console.log('id in localStorage: ' , id);
                response = await this.pushDataIntoDB(dataObject , 'PUT' , this.targetId);
            }
            else{
                console.log('Add')
                response = await this.pushDataIntoDB(dataObject , 'POST');
                localStorage.setItem('newRecordFlag', JSON.stringify(response))
                console.log('responsesdf', response);
            }
            // console.log('response', response);

            if (shouldClose) {
                localStorage.setItem('targetData', null);
                localStorage.setItem('newRecordFlag',null);
                window.close();
                window.location.reload();
                window.history.back();
            }
        }catch(error){
            console.error('Error pushing data into DB:', error);
        }
    }

    handleRemoveBtn(){
        const id = this.targetId;
        if(id !== 0 ){
            let isDelete = confirm('Are you sure you want to Delete this record?');
            if(isDelete){
                const response = fetch(`http://localhost:5032/api/Employees/${id}`,{
                    method:'DELETE',
                    headers:{
                        'Content-Type': 'application/json'
                    }
                });
            }
        }else{
            alert('There is no record to delete')
        }
        
        
    }

    handleNewBtn(){
        localStorage.setItem('targetData', null);
        localStorage.setItem('newRecordFlag',null);
        window.location.reload();
    }

    async pushDataIntoDB(data , method , id=''){
        console.log('id', id);
        data.departmentId = 1;
        console.log('data: ', data);
        const response = await fetch(`http://localhost:5032/api/Employees/${id}`,{
            method: `${method}`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(method === 'POST'){
            return await response?.json();
        }
    }


}






