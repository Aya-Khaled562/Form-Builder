import TypeContent from "./typecontent.js";
import Element from "./element.js";
import AbstractElementFactory from "./abstract_element_factory.js";


export default class HtmlElementFactory extends AbstractElementFactory {
    
    createText(id, name, customClass, style, mode) {
        const typeContent = new TypeContent(
            'text',
            'formControl',
            `<div class="d-flex flex-row align-items-center px-2 py-1" style="${style}" draggable="true" id="${id}">
                <label class="col" style="width: 50%;">${name}</label>
                <div class="${customClass}" id="text" style="border: 1px solid blue; flex: 1; width: 50%;"></div> 
            </div>`,
            'Text input preview'
        );
    
        return new Element(id, name, customClass, style, typeContent, mode);
    }

    createTab(id, name, customClass, style, mode) {
        
        const typeContentTab = new TypeContent(
            'tab',
            'layout',
            `<div class="container my-3" style="${style}" id="${id}">
                <div class="row">
                    <h5>${name}</h5>
                    <div class="py-3" style="border: 1px solid blue;"></div>
                </div>
            </div>`,
            `<label>${name}</label>
            <div class="${customClass}" style="${style}" style="margin:10px;"> <!--columns--> </div>`
        );

       return new Element(id, name, customClass, style, typeContentTab, mode);
        // for (let i = 0; i < numOfCols; i++) {
        //     const typeContentColumn = new TypeContent(
        //         'column',
        //         'layout',
        //         `<div id="${id}-col${i + 1}" class="col py-2 mx-1" style = "border: 1px solid orange"> <!--columns--> </div>`,
        //         `<div id="${id}-col${i + 1}" class="col py-2"> <!--content--> </div>`
        //     );
        //     const column = new Element(`${id}-col${i + 1}`, `Column ${i + 1}`, '', '', typeContentColumn, mode);
        //     tab.addElement(column);
        //     const section = this.createSection(`sec_${i}`, "Section", "col py-1 my-1 mx-1", "border: 1px dashed green;", mode, 1);
        //     column.addElement(section);
        // }
    
        // return tab;
    }
   
    createSection(id, name, customClass, style, mode) {
        const typeContentSection = new TypeContent(
            'section',
            'layout',
            `<div class="container my-2 py-1" style="${style}" id="${id}" draggable="true">
                <div class="row">
                    <h6>${name}</h6>
                    <div class="py-3" style="border: 1px solid blue;"></div>
                </div>
            </div>`,
            `<label>${name}</label>
            <div id="${id}" class="${customClass}" style="${style}"> <!--columns--> </div>`
        );

        return new Element(id, name, customClass, style, typeContentSection, mode);

        // for(let i = 0; i < numOfFields; i++){
        //     const typeContentColumn = new TypeContent(
        //         'column',
        //         'layout',
        //         `<div id="${id}-col${i + 1}" class="col py-1 my-1 mx-1 "> <!--columns--> </div>`,
        //         `<div id="${id}-col${i + 1}" class="col py-1 my-1 mx-1"> <!--content--> </div>`
        //     );
        //     const column = new Element(`${id}-col${i + 1}`, `Column ${i + 1}`, '', '', typeContentColumn, mode);
        //     section.addElement(column);
        //     const feild = this.createText('text1', "feild_name", 'col py-3' , "border: 1px dashed green;", mode);
        //     column.addElement(feild);
        // }

        // return section;
    }

    createColumn(id, name, customClass, style, mode){
        const typeContentColumn = new TypeContent(
            'column',
            'layout',
            `<div id="${id}" class="${customClass}" style = "${style}"> <div class="py-3" style="border: 1px solid blue;"></div> </div>`,
            `<div id="${id}" class="col py-1 my-1 mx-1"> <!--content--> </div>`
        );
        return new Element(id, name, customClass, style, typeContentColumn, mode);
    }

}