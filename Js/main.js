import FormBuilder from "./formbuilder.js";

const builder = new FormBuilder('html', 'create', 'formContainer');

function addTab(numOfCols){
    builder.build('tab','formContainer', numOfCols);
    // builder.build('tab','Tap','border: 1px solid green;', )
}

function addSection(numOfCols){
    builder.build('section','',numOfCols);
}
document.getElementById("addTabWith1Col").addEventListener("click", () => addTab(1));
document.getElementById("addTabWith2Col").addEventListener("click", () => addTab(2));
document.getElementById("addTabWith3Col").addEventListener("click", () => addTab(3));

document.getElementById("addSectionWith1Col").addEventListener("click", () => addSection(1));
document.getElementById("addSectionWith2Col").addEventListener("click", () => addSection(2));
document.getElementById("addSectionWith3Col").addEventListener("click", () => addSection(3));



