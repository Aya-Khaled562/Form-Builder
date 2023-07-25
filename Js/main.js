import FormBuilder from "./formbuilder.js";

let tabConter = 0;
let secCounter = 2;
let colCounter = 0;
const builder = new FormBuilder('html', 'create', 'form');

function addTab(numOfCols){
    const tab = builder.build('tab',`tab_${tabConter++}`,"Tab", "col py-2", "border: 1px solid green", 'form' );
    for(let i=0; i<numOfCols; i++){
        let col = builder.build('column',`col_${colCounter++}`,'Column', 'coltab col py-1 my-1 mx-1 ', 'border: 1px solid orange');
        let sec = builder.build('section',`sec_${secCounter++}`,`Section ${secCounter++}`,' section','border: 1px dashed green;');
        let colSec = builder.build('column',`col_${colCounter++}`,'Column', 'colsec col py-3 px-1 my-1 mx-1 ', 'border: 1px dashed blue');
        sec.addElement(colSec);
        col.addElement(sec);
        tab.addElement(col);
    }
    document.getElementById('form').innerHTML += tab.render();
    tab.getElements().forEach(col => {

        col.getElements().forEach(sec=>{
            builder.setSectionBeforRender(sec);
            sec.getElements().forEach(secCol=>{
                builder.setColumnsBeforeRender(secCol);
                secCol = document.getElementById(`${secCol.Id}`);
                builder.setColumnsAterRender(secCol);
            });
            sec = document.getElementById(`${sec.Id}`);
            builder.setSectionAfterRender(sec);
        });
        
        builder.setColumnsBeforeRender(col);
        col = document.getElementById(`${col.Id}`);
        builder.setColumnsAterRender(col);
    });

    builder.addClickOnTab()
    // builder.HandleDragAndDrop();
}

function addSection(numOfCols){
    let sec = builder.build('section',`sec_${secCounter++}`,`Section ${secCounter++}`,'section','border: 1px dashed green;');
    for(let i=0; i<numOfCols; i++){
        let col = builder.build('column',`col_${colCounter++}`,'Column', 'colsec col py-3 px-1 my-1 mx-1 ', 'border: 1px dashed blue');
        sec.addElement(col);
        builder.setColumnsBeforeRender(col);
    }
    const targetId = builder.addSectionToTab(sec);
    builder.setSectionBeforRender(sec);
    document.getElementById(`${targetId}`).innerHTML += sec.render();
    sec.getElements().forEach(col=>{
            col = document.getElementById(`${col.Id}`);
            builder.setColumnsAterRender(col);
    });

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


// builder.addClickOnTab()
builder.HandleDragAndDrop();

