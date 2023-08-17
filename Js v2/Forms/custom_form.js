
import { Types } from "../Element/element.js";
import FormBuilder from "../formbuilder.js";

export default class CustomForm {
    builder;
    values;
    resolvePromise;
    targetData;
    entity;
    constructor(entity = null){
        this.builder = null;
        this.values = [];
        this.resolvePromise = null;
        this.targetData = null;
        this.entity = entity;
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
       // const entity = await this.getEntity();

        this.targetData = JSON.parse(localStorage.getItem('targetData'));

        console.log('targetData: ', this.targetData);
        console.log('formAfterParse: ', formAfterParse);
        this.builder = new FormBuilder(formAfterParse, 'custom' ,'form', this.entity);
       
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

        $('#loadMoreRecordsModal').on('shown.bs.modal', (e) => this.handleModalShown(e));
         $('#loadMoreRecordsModal #modalSave').on('click', (e) => this.handleModalSave(e));
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
            console.log('builder', param.builder.Fields);
            for(let i=0; i< param.builder.Fields.length; i++){
                let key = param.builder.Fields[i].name;
                let value = document.getElementById(param.builder.Fields[i].id).value
                dataObject[key]  = value;
                console.log('data object',dataObject);
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
        //data.departmentId = 1;
        console.log('data: ', data);
        const response = await fetch(`http://localhost:5032/api/Employees/${id}`,{
            method: `${method}`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        
        
    }

    async  handleModalShown(e) {
        
        let elementId = $('#loadMoreRecordsModal').attr('data-id');
        let element = this.builder.getElementFromMap(elementId)
        
        // let value = new Value('', Types.Lookup, formBuilder.targetField.lookup || formBuilder.targetField.options || {})
        
      
        let lookupFieldElm =  $(`#${element.Id}`);
        console.log('lookup element', element);


        $('#loadMoreRecordsModal #lookFor').val(element.value.source.lookFor);

        // look in select menu
        let lookForSelectMenu = $('#loadMoreRecordsModal #lookIn');
        
        if (lookForSelectMenu){
            lookForSelectMenu.html('');
            let systemViews = element.value.source.views;
            systemViews.forEach(viewName => {
                let option = `<option value="${viewName}" ${viewName == element.value.source.selectedView? 'selected': ''}>${viewName}</option>`
                lookForSelectMenu.append(option);
            });

           
        }

        let lookupForId = element.value.source.lookForId;

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

                element.value.source.selectedData = rowData; 

                if (lookupFieldElm){
                    lookupFieldElm.val(rowData.name);
                    lookupFieldElm.attr('data-value', rowData.id);
                }

                $('#loadMoreRecordsModal').modal('hide');

              });

              let data = [];
              if (element.value.source.selectedView){
                   data = await this.getRows(element.value.source.selectedView);
              }else{
                   data = await this.getRows(element.value.source.views[0]);
              }
              dataTable.clear().rows.add(data).draw();

              

        }

        if (element.value.source.selectedData){
            dataTable = $('#dataTable').DataTable();
            console.log('datatable', dataTable);
            console.log('selected data', element.value.source.selectedData);
            dataTable.search(element.value.source.selectedData.name).draw();
          
          }
       
        
        lookForSelectMenu.on('change',async function(e){
            let selectedView = $(this).val();

            element.value.source.selectedView = selectedView; 

            let rows = await fetch(`http://localhost:5032/api/EntitySchemas/viewData?viewName=${selectedView}`);
            let data =  await rows.json();

            dataTable.clear().rows.add(data).draw();

            if (element.value.source.selectedData){
                dataTable.search(element.value.source.selectedData.name).draw();
            }
        });

    }
}






