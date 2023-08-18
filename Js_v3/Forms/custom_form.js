
import { Types } from "../Element/element.js";
import FormBuilder from "../formbuilder.js";
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../node_modules/datatables.net/js/jquery.dataTables.js'

export default class CustomForm {
    builder;
    resolvePromise;
    targetData;
    flag;
    targetId;
    requiredFields;
    hasImage
    entity;
    id;
    image;
    formData
    constructor(entity = null){
        this.builder = null;
        this.resolvePromise = null;
        this.targetData = null;
        this.entity = entity;
        this.flag = false;
        this.targetId = 0;
        this.requiredFields = [];
        this.hasImage = false;
        this.id = null;
        this.image = null;
        
    }

    async initialize(){
        const form = await this.getForm();
        const mainForm = form[0];
        const formAfterParse = JSON.parse(mainForm.fromJson);
        this.id = this.getParameterByName('id' , window.location.href);
        console.log('id: ' , this.id);
        this.setRequiredFields(formAfterParse)
        //Get Data
        if(this.id != null){
            this.targetData = await this.getData(this.id);
        }
        console.log('target data: ', this.targetData);
        if(this.hasImage){
            document.getElementById('ImageContainer').style.display = 'block';
            if(this.targetData !== null){
                document.getElementById('userName').textContent = this.targetData.firstName + " " + this.targetData.lastName;
                if(this.targetData.hasOwnProperty('image')){
                    let image = document.getElementById('empImage');
                    if(this.targetData.image !== null){
                        image.src = this.targetData.image;
                    }
                }
            }
        }
        this.targetId = this.targetData?.id || 0;
        this.builder = new FormBuilder(formAfterParse, 'custom' ,'form', this.entity);

        let saveBtn = document.getElementById('onlysave');
        let saveandcloseBtn = document.getElementById('saveandclose');
        let removeBtn = document.getElementById('delete');
        let newBtn = document.getElementById('new');
        newBtn.addEventListener('click' ,this.handleNewBtn);
        if(this.targetData !== null){
            this.builder.mapData(this.targetData);
        }

        saveBtn.addEventListener('click',()=> this.handleSaveBtn(false));
        saveandcloseBtn.addEventListener('click',()=> this.handleSaveBtn(true));
        removeBtn.addEventListener('click' , ()=> this.handleRemoveBtn());
        $('#loadMoreRecordsModal').on('shown.bs.modal', (e) => this.handleModalShown(e));
        $('#loadMoreRecordsModal #modalSave').on('click', (e) => this.handleModalSave(e));



        //Handle Image Upload
        const imageContainer = document.getElementById('empImage');
        const modal = document.getElementById('uploadImageModal');
        const imageInput = document.getElementById('imageInput');
        const closebtns = document.getElementsByClassName('close');
        const uploadimageform = document.getElementById('uploadimageform');
        imageContainer.addEventListener('dblclick', () => this.openModal(modal));

        for (let i = 0; i < closebtns.length; i++) {
            closebtns[i].addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
        const uploadImageBtn = document.getElementById('uploadImageBtn');
        uploadImageBtn.addEventListener('click', () => {
            this.image = imageInput.files[0];
            this.formData = new FormData(uploadimageform);
            this.formData.append('image', imageInput.files[0]);
            modal.style.display = 'none';
        });


    }

    openModal(modal){
        modal.style.display = 'block';
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
                            if(field.type === Types.Image){
                                this.hasImage = true;
                            }
                        })
                    })
                })
            })
        });
    }

    async getData(id){
        const data = await fetch(`http://localhost:5032/api/Employees/${id}`);
        return await data.json()
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
            let value = null;
            if(key !== 'image'){
                value = document.getElementById(this.builder.Fields[i].id).value
            }
            else{
                value = this.targetData?.image;
                // value = document.getElementById(this.builder.Fields[i].id)?.files[0]?.name;
            }


            if (this.builder.Fields[i].TypeContent._type == Types.Lookup){
                value = document.getElementById(this.builder.Fields[i].id)?.getAttribute('data-value');
                console.log('lookup value id', value);
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

    async getEntity(entityId){
        const response = await fetch(`http://localhost:5032/api/EntitySchemas/${entityId}`);
        return await response.json();
    }

    async getRows(viewName){
        let rows = await fetch(`http://localhost:5032/api/EntitySchemas/viewData?viewName=${viewName}`);
        return rows.json();
    }

    handleNewBtn(){
        localStorage.setItem('targetData', null);
        localStorage.setItem('newRecordFlag',null);
        // window.location.reload();
        window.open(`../../pages/customForm.html`, '_self');

    }

    async pushDataIntoDB(data , method , id=''){
        console.log('data', data);
        const response = await fetch(`http://localhost:5032/api/Employees/${id}`,{
            method: `${method}`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        var newRecord =  await response?.json();
        if(data.hasOwnProperty('image') && this.image !== null){
            const sendImage = await fetch(`http://localhost:5032/api/Employees/image?empId=${newRecord.id}`,{
                method: 'POST',
                body: this.formData
            });
        }

        return newRecord;
    }

    async handleModalShown(e) {

        let elementId = $('#loadMoreRecordsModal').attr('data-id');
        let element = this.builder.getElementFromMap(elementId)

        // let value = new Value('', Types.Lookup, formBuilder.targetField.lookup || formBuilder.targetField.options || {})


        let lookupFieldElm =  $(`#${element.Id}`);
        console.log('lookup element', element);


        $('#loadMoreRecordsModal #lookFor').val(element.elementValue.source.lookFor);

        // look in select menu
        let lookForSelectMenu = $('#loadMoreRecordsModal #lookIn');

        if (lookForSelectMenu){
            lookForSelectMenu.html('');
            let systemViews = element.elementValue.source.views;
            systemViews.forEach(viewName => {
                let option = `<option value="${viewName}" ${viewName == element.elementValue.source.selectedView? 'selected': ''}>${viewName}</option>`
                lookForSelectMenu.append(option);
            });


        }

        let lookupForId = element.elementValue.source.lookForId;

        let entity = await this.getEntity(lookupForId);
        let attributes = entity.attributeSchemas

        console.log('attributes',attributes);

        let dataTable = null;
        if (!$.fn.dataTable.isDataTable("#dataTable")){
          dataTable = $('#dataTable').DataTable({
                processing: true,
                serverSide: false,
                data: [],
                columns: attributes.map(att => ({ data: att.name, title: att.displayName })),
            });


            $("#dataTable tbody").on("dblclick", "tr", function() {
                // Get the data from the clicked row
                var rowData = dataTable.row(this).data();

                // Do something with the row data
                console.log("Clicked row data:", rowData);

                element.elementValue.source.selectedData = rowData;

                if (lookupFieldElm){
                    lookupFieldElm.val(rowData.name);
                    lookupFieldElm.attr('data-value', rowData.id);
                }

                $('#loadMoreRecordsModal').modal('hide');

              });

              let data = [];
              if (element.elementValue.source.selectedView){
                   data = await this.getRows(element.elementValue.source.selectedView);
              }else{
                   data = await this.getRows(element.elementValue.source.views[0]);
              }
              dataTable.clear().rows.add(data).draw();



        }

        if (element.elementValue.source.selectedData){
            dataTable = $('#dataTable').DataTable();
            console.log('datatable', dataTable);
            console.log('selected data', element.elementValue.source.selectedData);
            dataTable.search(element.elementValue.source.selectedData.name).draw();

        }


        lookForSelectMenu.on('change',async function(e){
            let selectedView = $(this).val();

            element.elementValue.source.selectedView = selectedView;

            let rows = await fetch(`http://localhost:5032/api/EntitySchemas/viewData?viewName=${selectedView}`);
            let data =  await rows.json();

            dataTable.clear().rows.add(data).draw();

            if (element.elementValue.source.selectedData){
                dataTable.search(element.elementValue.source.selectedData.name).draw();
            }
        });

    }


    getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
        const results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        const capturedValue = results[2];
        console.log('captured value: ' , capturedValue);
        return capturedValue;
    }

}






