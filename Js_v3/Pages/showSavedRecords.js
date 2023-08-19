import ShowSavedRecords from "../Forms/showSavedRecords_form.js";

// $('#test').append('<h1>Test</h1>');
// $('#dataTable').DataTable();

// // $(document).ready(async function() {
// //     // Initialize the DataTable
// //     // console.log('in');
// //     // Add data dynamically
// //     // addData("John Doe", 25, "New York");
// //     // addData("Jane Smith", 32, "Los Angeles");
// //     // addData("Mike Johnson", 45, "Chicago");

// //     // let entity = await getEntity('6e080d98-a290-402c-1858-08db9b2e1c04')
// //     // console.log('entity' , entity);
// //     // let attributes = entity.attributeSchemas;

// //     // attributes.forEach(att => {
// //     //     $('#headerRow').append(att.displayName);
// //     //     // console.log('att: ', att.displayName);
// //     // });

// //     // console.log('ATTRIBUTES',attributes);
// //     // let data = await getRows();
// //     // console.log('DATA',data);
    
    
// // });
// // function addData(name, age, city) {
// //     $('#dataTable').DataTable().row.add([name, age, city]).draw(false);
// // }

// // async function getRows(){
// //     let rows = await fetch('http://localhost:5032/api/Employees');
// //     return rows.json();
// // }

// // async function getEntity(id){
// //     const response = await fetch(`http://localhost:5032/api/EntitySchemas/${id}`);
// //     return response.json();
// // }




// // let showForm = new ShowSavedRecords('6e080d98-a290-402c-1858-08db9b2e1c04')
// // showForm.createDataTable();


// $(document).ready(async function() {
//     let entity = await getEntity('6e080d98-a290-402c-1858-08db9b2e1c04');
//     let attributes = entity.attributeSchemas;
    
//     // Construct the table header using the fetched attributes
//     let headerRow = $('#headerRow');
//     attributes.forEach(att => {
//         headerRow.append(`<th>${att.displayName}</th>`);
//     });

//     // Initialize the DataTable after constructing the table header
//     $('#dataTable').DataTable({
//         processing: true, // Enable loading spinner during processing
//         serverSide: true, // Enable server-side processing for large data sets
//         ajax: {
//             url: 'http://localhost:5032/api/Employees',
//             type: 'GET',
//             dataSrc: '', // Specify the data source property if needed
//         },
//         columns: attributes.map(att => ({ data: att.displayName })), // Map attributes to column data
//     });
// });

// async function getEntity(id){
//     const response = await fetch(`http://localhost:5032/api/EntitySchemas/${id}`);
//     return response.json();
// }
// $(document).ready(async function() {
//     let entity = await getEntity('6e080d98-a290-402c-1858-08db9b2e1c04');
//     let attributes = entity.attributeSchemas;

//     let dataTable = $('#dataTable').DataTable({
//         processing: true,
//         serverSide: false, // Client-side rendering
//         data: [], // Empty data initially
//         columns: attributes.map(att => ({ data: att.name, title: att.displayName })),
//     });

//     let data = await getRows();
//     dataTable.clear().rows.add(data).draw(); // Add data and redraw the table
// });

// async function getEntity(id){
//     const response = await fetch(`http://localhost:5032/api/EntitySchemas/${id}`);
//     return response.json();
// }

// async function getRows(){
//     let rows = await fetch('http://localhost:5032/api/Employees');
//     return rows.json();
// }


let showForm = new ShowSavedRecords('6e080d98-a290-402c-1858-08db9b2e1c04')
showForm.createDataTable();

