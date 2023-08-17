
export default class ShowSavedRecords{

    entityid;
    constructor(entityid){
        this.entityid = entityid;
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

        let dataTable = $('#dataTable').DataTable({
            processing: true,
            serverSide: false,
            data: [],
            columns: attributes.map(att => ({ data: att.name, title: att.displayName })),
        });

        let data = await this.getRows();
        dataTable.clear().rows.add(data).draw();

        $('#dataTable').on('dblclick', 'tr' , (e)=>{
            let rowData = dataTable.row(e.currentTarget).data();
            if(rowData){
                let id = rowData.id; 
                this.handleRowClick(id);
            }
        });
    }

    async handleRowClick(id){
        const data = await this.getTargetRow(id);
        localStorage.setItem('targetData', JSON.stringify(data));
        // window.open('../../pages/customForm.html', '_blank');
        window.location.href = '../../pages/customForm.html';
    }
    async getTargetRow(id){
        const response = await fetch(`http://localhost:5032/api/Employees/${id}`);
        
        return response.json();
    }
}