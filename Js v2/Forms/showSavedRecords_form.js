
export default class ShowSavedRecords{
    entityid;
    dataTable;
    selectedRow;
    constructor(entityid){
        this.entityid = entityid;
        this.selectedRow = null;
        this.initialize();
    }

    initialize(){
        $('#new').on('click',()=> {
            localStorage.setItem('targetData', null);
            window.open('../../pages/customForm.html', '_self');
        });

        $('#removeBtn').on('click',()=> this.handleRemoveRecord());
        $('#dataTable').on('dblclick', 'tr' , (e)=> this.handleRowdbClick(e));
        $('#dataTable').on('click', 'tr',(e)=> this.handleRowClick(e));
    }


    handleRemoveRecord(){
        if(this.selectedRow !== null && this.selectedRow !== undefined){
            console.log('selected', this.selectedRow);
            const deleteRecord = confirm('Are you sure you want to delete this record?');
            if(deleteRecord){
                this.removeRecord(this.selectedRow.id)
                window.location.reload();
            }
        }else{
            alert('Please select record to delete');
        }
    }

    removeRecord(id){
        const response = fetch(`http://localhost:5032/api/Employees/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        });
    }

    async getEntity(){
        const response = await fetch(`http://localhost:5032/api/EntitySchemas/${this.entityid}`);
        return response.json();
    }

    async getAttributes(){
        let entity  = await this.getEntity();
        return entity.attributeSchemas;
    }

    async getRows(){
        let rows = await fetch('http://localhost:5032/api/Employees');
        return rows.json();
    }

    addDataToDataTable(attributes) {
        $('#dataTable').DataTable().row.add(attributes).draw(false);
    }

    async createDataTable(){
        let attributes = await this.getAttributes();
        this.dataTable = $('#dataTable').DataTable({
            processing: true,
            serverSide: false,
            data: [],
            columns: attributes.map(att => ({ data: att.name, title: att.displayName })),
        });

        let data = await this.getRows();
        this.dataTable.clear().rows.add(data).draw();
    }

    handleRowClick(e){
        $('#dataTable tr').removeClass('select');
        $(e.currentTarget).addClass('select');
        console.log('selected row', this.selectedRow);
        console.log('event fired element', this);

        this.selectedRow =this.dataTable.row(e.currentTarget).data();
        console.log('selected row', this.selectedRow);

    }

    async handleRowdbClick(e){
        let rowData = this.dataTable.row(e.currentTarget).data();
            if(rowData){
                let id = rowData.id; 
                const data = await this.getTargetRow(id);
                localStorage.setItem('targetData', JSON.stringify(data));
                window.location.href = '../../pages/customForm.html';
            }
    }

    async getTargetRow(id){
        const response = await fetch(`http://localhost:5032/api/Employees/${id}`);
        return response.json();
    }
}