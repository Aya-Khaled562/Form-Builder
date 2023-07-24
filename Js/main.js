import FormBuilder from "./formbuilder.js";

let tabConter = 0;
let secCounter = 0;
let colCounter = 0;
const builder = new FormBuilder('html', 'create', 'formContainer');

function addTab(numOfCols){
    const tab = builder.build('tab',`tab_${tabConter++}`,"Tab", "col py-2", "border: 1px solid green", 'formContainer' );
    for(let i=0; i<numOfCols; i++){
        let col = builder.build('column',`col_${colCounter++}`,'Column', 'column col py-1 my-1 mx-1 ', 'border: 1px solid orange');
        let sec = builder.build('section',`sec_${secCounter++}`,`Section ${secCounter++}`,'mx-1 section','border: 1px dashed green;');
        let colSec = builder.build('column',`col_${colCounter++}`,'Column', 'col py-3 px-1 my-1 mx-1 ', 'border: 1px solid blue');
        sec.addElement(colSec);
        // console.log('sec', sec)
        col.addElement(sec);
        tab.addElement(col);
    }
    document.getElementById('formContainer').innerHTML += tab.render();
    // const container = document.getElementById('formContainer');
    // container.appendChild(tab.render());

    tab.getElements().forEach(col => {

        col.getElements().forEach(sec=>{
            builder.setSectionBeforRender(sec);
            sec = document.getElementById(`${sec.Id}`);
            builder.setSectionAfterRender(sec);
        });
        
        builder.setColumnsTabBeforeRender(col);
        col = document.getElementById(`${col.Id}`);
        builder.setColumnsTab(col);
    });

    builder.addClickOnTab()
    // builder.HandleDragAndDrop();
}

function addSection(numOfCols){
    let sec = builder.build('section',`sec_${secCounter++}`,`Section ${secCounter++}`,'mx-1 section','border: 1px dashed green;');
    for(let i=0; i<numOfCols; i++){
        let col = builder.build('column',`col_${colCounter++}`,'Column', 'col py-3 px-1 my-1 mx-1 ', 'border: 1px solid blue');
        sec.addElement(col);
    }
    const targetId = builder.addSectionToTab(sec);
    builder.setSectionBeforRender(sec);
    document.getElementById(`${targetId}`).innerHTML += sec.render();
    sec = document.getElementById(`${sec.Id}`);
    builder.setSectionAfterRender(sec);
    // builder.HandleDragAndDrop();
}

document.getElementById("addTabWith1Col").addEventListener("click", () => addTab(1));
document.getElementById("addTabWith2Col").addEventListener("click", () => addTab(2));
document.getElementById("addTabWith3Col").addEventListener("click", () => addTab(3));

document.getElementById("addSectionWith1Col").addEventListener("click", () => addSection(1));
document.getElementById("addSectionWith2Col").addEventListener("click", () => addSection(2));
document.getElementById("addSectionWith3Col").addEventListener("click", () => addSection(3));


builder.addClickOnTab()
builder.HandleDragAndDrop();
