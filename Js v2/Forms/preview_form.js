import FormBuilder from "../formbuilder.js";

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

 async   handleModalShown(e) {

        let elementId = $('#loadMoreRecordsModal').attr('data-id');
        let element = this.#builder.getElementFromMap(elementId)

        console.log('lookup element', element);


        $('#loadMoreRecordsModal #lookFor').val(element.value.source.lookFor);

        // look in select menu
        let lookForSelectMenu = $('#loadMoreRecordsModal #lookIn');
        
        if (lookForSelectMenu){
            lookForSelectMenu.html('');
            let systemViews = element.value.source.views;
            systemViews.forEach(viewName => {
                let option = `<option value="${viewName}">${viewName}</option>`
                lookForSelectMenu.append(option);
            });
        }
        let lookupForId = element.value.source.lookForId;

        let entity = await this.getEntity(lookupForId);
        let attributes = entity.attributeSchemas

        console.log('attributes',attributes);

        let dataTable = $('#dataTable').DataTable({
            processing: true,
            serverSide: false,
            data: [],
            columns: attributes.map(att => ({ data: att.name, title: att.displayName })),
        });

        //let data = await this.getRows();
        dataTable.clear().rows.add([]).draw();
       
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