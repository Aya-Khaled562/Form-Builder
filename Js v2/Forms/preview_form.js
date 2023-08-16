import FormBuilder from "../formbuilder.js";
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../node_modules/datatables.net/js/jquery.dataTables.min.js'
//import { data } from "jquery";
export default class PreviewFrom {
    #builder;
    constructor(){
        this.#builder = null;
    }

    initialize(){
        const jsonData = JSON.parse(localStorage.getItem('jsonDataForm'));
        this.#builder = new FormBuilder(jsonData, 'preview', 'form');
        let copyHtmlBtn = document.getElementById('save');
        copyHtmlBtn.addEventListener('click', this.handleCopyHtml(this));

        $('#loadMoreRecordsModal').on('shown.bs.modal', (e) => this.handleModalShown(e));
       // $('#loadMoreRecordsModal').on('hidden.bs.modal', (e) => this.handleModelClose(e));
        $('#loadMoreRecordsModal #modalSave').on('click', (e) => this.handleModalSave(e));

    }

    async getEntity(entityId){
        const response = await fetch(`http://localhost:5032/api/EntitySchemas/${entityId}`);
        return await response.json();
    }

    async getRows(viewName){
        let rows = await fetch(`http://localhost:5032/api/EntitySchemas/viewData?viewName=${viewName}`);
        return rows.json();
    }

 async   handleModalShown(e) {

        let elementId = $('#loadMoreRecordsModal').attr('data-id');
        let element = this.#builder.getElementFromMap(elementId)
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

    handleCopyHtml(prev){
        return function fun (e){
            let formContainer = document.getElementById(prev.#builder.ParentId).parentElement;
            navigator.clipboard.writeText(formContainer.innerHTML);
        }
    }
   
    handleEditForm(e){
        sessionStorage.setItem('formMode', 'update');
        window.open('/index.html', '_self');
    }


    


}