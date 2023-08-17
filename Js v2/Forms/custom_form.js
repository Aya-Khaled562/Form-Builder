
import { Types } from "../Element/element.js";
import FormBuilder from "../formbuilder.js";

export default class CustomForm {
    builder;
    resolvePromise;
    targetData;
    flag;
    targetId;
    requiredFields;
    hasImage
    constructor(){
        this.builder = null;
        this.resolvePromise = null;
        this.targetData = null;
        this.flag = false;
        this.targetId = 0;
        this.requiredFields = [];
        this.hasImage = false
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
        console.log('formAfterParse' , formAfterParse);
        
        this.setRequiredFields(formAfterParse)
        console.log('required fields: ', this.requiredFields);
        //Get Data
        this.targetData = JSON.parse(localStorage.getItem('targetData'));
        if(this.hasImage){
            console.log('target data: ', this.targetData);
            if(this.targetData.hasOwnProperty('image')){
                document.getElementById('ImageContainer').style.display = 'block';
                let image = document.getElementById('empImage');

                if(this.targetData.image !== null){
                    image.src = this.targetData.image;
                }
               
                
            }
            
        }
        this.targetId = this.targetData?.id || 0;
        this.builder = new FormBuilder(formAfterParse, 'custom' ,'form');

        let saveBtn = document.getElementById('onlysave');
        let saveandcloseBtn = document.getElementById('saveandclose');
        let removeBtn = document.getElementById('removeBtn');
        let newBtn = document.getElementById('new');
        newBtn.addEventListener('click' ,this.handleNewBtn);

        if(this.targetData !== null){
            this.builder.mapData(this.targetData);
        }

        saveBtn.addEventListener('click',()=> this.handleSaveBtn(false));
        saveandcloseBtn.addEventListener('click',()=> this.handleSaveBtn(true));
        removeBtn.addEventListener('click' , ()=> this.handleRemoveBtn());
    
    }

    setRequiredFields(form){
        form.elements.forEach(tab => {
            tab.elements.forEach(coltab=>{
                coltab.elements.forEach(sec=>{
                    sec.elements.forEach(colsec => {
                        colsec.elements.forEach(field => {
                            if(field.isRequired){
                                this.requiredFields.push(field);
                            }
                            if(field.type === Types.FileUpload){
                                this.hasImage = true;
                            }
                            
                        })
                    })
                })
            })
        });
    }

    async getForm(){
        const form = await fetch('http://localhost:5032/api/EntityFroms?formName=main');
        return form.json();
    }

    async handleSaveBtn(shouldClose){
        let dataObject = {}
        
        let flag = false;
        for(let i=0; i< this.builder.Fields.length; i++){
            let key = this.builder.Fields[i].name;
            let value = document.getElementById(this.builder.Fields[i].id).value
            if(key === 'image'){
                // if()
                value = document.getElementById(this.builder.Fields[i].id)?.files[0]?.name;
            }
            dataObject[key]  = value;
        }

        this.requiredFields.forEach(field => {
            let requiredField = dataObject.hasOwnProperty(field.name);
            if(requiredField){
                console.log('field ', dataObject[field.name]);
                if(!dataObject[field.name]){
                    flag = true;
                }
            }
        });

        if(flag){
            alert('Please Enter the required Data?');
            return;
        }

        try{
            let response = null;
            let dataFromLocalStorage = localStorage.getItem('newRecordFlag');
            let data = JSON.parse(dataFromLocalStorage);
            if(this.targetData !== null || data !== null){
                this.targetId = this.targetData?.id || data?.id;
                // console.log('id in localStorage: ' , this.targetId);
                response = await this.pushDataIntoDB(dataObject , 'PUT' , this.targetId);
            }
            else{
                response = await this.pushDataIntoDB(dataObject , 'POST');
                if(response.status !==400){
                    localStorage.setItem('newRecordFlag', JSON.stringify(response));
                }
            }
            if (shouldClose) {
                localStorage.setItem('targetData', null);
                localStorage.setItem('newRecordFlag',null);
                window.open('../../pages/showSavedRecord.html' , '_self');
            }
        }catch(error){
            console.error('Error pushing data into DB:', error);
        }
    }

    handleRemoveBtn(){
        const id = this.targetId;
        console.log('id: ' , id)
        if(id !== 0 ){
            let isDelete = confirm('Are you sure you want to Delete this record?');
            if(isDelete){
                const response = fetch(`http://localhost:5032/api/Employees/${id}`,{
                    method:'DELETE',
                    headers:{
                        'Content-Type': 'application/json'
                    }
                });

                localStorage.setItem('targetData', null);
                localStorage.setItem('newRecordFlag',null);
                window.open('../../pages/showSavedRecord.html' , '_self');
            }
        }else{
            alert('There is no record to delete')
        }
        
        
    }

    handleNewBtn(){
        console.log('hsjhfajsfh');
        localStorage.setItem('targetData', null);
        localStorage.setItem('newRecordFlag',null);
        window.location.reload();
    }

    async pushDataIntoDB(data , method , id=''){
        data.departmentId = 1;
        console.log('data', data);
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






