
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
    constructor(entity = null){
        this.builder = null;
        this.resolvePromise = null;
        this.targetData = null;
        this.entity = entity;
        this.flag = false;
        this.targetId = 0;
        this.requiredFields = [];
        this.hasImage = false
    }

    async initialize(){
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
            if(this.targetData !== null){
                if(this.targetData.hasOwnProperty('image')){
                    document.getElementById('ImageContainer').style.display = 'block';
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
        let removeBtn = document.getElementById('removeBtn');
        let newBtn = document.getElementById('new');
        newBtn.addEventListener('click' ,this.handleNewBtn);

        console.log('elements at custom', this.builder.getElements());
        if(this.targetData !== null){
            this.builder.mapData(this.targetData);
        }

        saveBtn.addEventListener('click',()=> this.handleSaveBtn(false));
        saveandcloseBtn.addEventListener('click',()=> this.handleSaveBtn(true));
        removeBtn.addEventListener('click' , ()=> this.handleRemoveBtn());

        $('#loadMoreRecordsModal').on('shown.bs.modal', (e) => this.handleModalShown(e));
        $('#loadMoreRecordsModal #modalSave').on('click', (e) => this.handleModalSave(e));
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

    async getEntity(entityId){
        const response = await fetch(`http://localhost:5032/api/EntitySchemas/${entityId}`);
        return await response.json();
    }

    async getRows(viewName){
        let rows = await fetch(`http://localhost:5032/api/EntitySchemas/viewData?viewName=${viewName}`);
        return rows.json();
    }


    handleNewBtn(){
        console.log('hsjhfajsfh');
        localStorage.setItem('targetData', null);
        localStorage.setItem('newRecordFlag',null);
        window.location.reload();
    }

    async pushDataIntoDB(data , method , id=''){
       // data.departmentId = 1;
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

    async  handleModalShown(e) {

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
}






