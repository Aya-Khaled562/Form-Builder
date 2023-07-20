import TypeContent from "./typecontent.js";
import Element from "./element.js";
import AbstractElementFactory from "./abstract_element_factory.js";


export default class HtmlElementFactory extends AbstractElementFactory {

    createText(id, name, customClass, style, mode) {
        const typeContent = new TypeContent(
            'text',
            'formControl',
            `<div class="d-flex flex-row align-items-center">
                <label style="flex: 1; margin-right: 5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 50%;">${name}</label>
                <div class="${customClass} py-3" id="text" style="border: 1px solid blue; flex: 1; width: 50%;"></div> 
            </div>`,
            'Text input preview'
        );
    
        return new Element(id, name, customClass, style, typeContent, mode);
    }

   
    createTab(id, name, customClass, style, mode, numOfCols) {
        const typeContentTab = new TypeContent(
            'tab',
            'layout',
            `<div class="container" style="border: 2px solid red; margin: 5px;">
                <div class="row">
                    <h5>${name}</h5>
                    <!--columns-->
                </div>
            </div>`,
            `<label>${name}</label>
            <div id="${id}" class="${customClass}" style="${style}"> <!--columns--> </div>`
        );
    
        const tab = new Element(id, name, customClass, style, typeContentTab, mode);
    
        for (let i = 0; i < numOfCols; i++) {
            const typeContentColumn = new TypeContent(
                'column',
                'layout',
                `<div id="${id}-col${i + 1}" class="${customClass}" style="${style}"> <!--content--> </div>`,
                `<div id="${id}-col${i + 1}" class="${customClass}" style="${style}"> <!--content--> </div>`
            );
    
            const column = new Element(`${id}-col${i + 1}`, `Column ${i + 1}`, '', '', typeContentColumn, mode);
            tab.addElement(column);
            const section = this.createSection(`sec1`, "Section", "col py-1 my-1 mx-1", "border: 1px dashed green;", mode, 2);
            column.addElement(section);
        }
    
        return tab;
    }
   
    createSection(id, name, customClass, style, mode, numOfFields) {
        const typeContentSection = new TypeContent(
            'section',
            'layout',
            `<div class="container">
                <div class="row">
                    <h6>${name}</h6>
                    <!--columns-->
                </div>
            </div>`,
            `<label>${name}</label>
            <div id="${id}" class="${customClass}" style="${style}"> <!--columns--> </div>`
        );

        const section = new Element(id, name, customClass, style, typeContentSection, mode);

        for(let i = 0; i < numOfFields; i++){
            const typeContentColumn = new TypeContent(
                'column',
                'layout',
                `<div id="${id}-col${i + 1}" class="${customClass}" style="${style}"> <!--content--> </div>`,
                `<div id="${id}-col${i + 1}" class="${customClass}" style="${style}"> <!--content--> </div>`
            );
            const column = new Element(`${id}-col${i + 1}`, `Column ${i + 1}`, '', '', typeContentColumn, mode);
            section.addElement(column);
            const feild = this.createText('text1', "ahmed khaled", 'py-1' , "", mode);
            column.addElement(feild);
        }

        return section;
    }


     // createTab(id, name, customClass, style, mode, numOfCols) {
    //     // console.log("from create tab");
    //     const typeContentTab = new TypeContent(
    //         'tab',
    //         'layout',
    //         `<div class = "container" style="border:2px solid red; margin:5px">
    //         <div class="row">
    //         <h5>${name}</h5>
    //         </div>
    //         </div>
    //         `,
            
    //         `<label>${name}</label>
    //         <div id="${id}" class="${customClass}" style="${style}"><!--TAP 01 --></div>`
    //     );
    
    //     const tab = new Element(id, name, customClass, style, typeContentTab, mode);

    //     for (let i = 0; i < numOfCols; i++) {
    //         const typeContentColumn = new TypeContent(
    //             'column',
    //             'layout',
    //             `<div id="${id}" class="${customClass}" style="${style}"></div>`,
    //             `<div id="${id}" class="${customClass}" style="${style}"></div>`
    //         );
    
    //         const column = new Element(`${id}-col${i + 1}`, `Column ${i + 1}`, '', '', typeContentColumn, mode);
    //         tab.addElement(column);
    //     }
    //     console.log("tab name: " , tab.Name)
    //     return tab;
    // }
    
    // createTab(id, name, customClass, style, mode, numOfCols) {
    //     const typeContentTab = new TypeContent(
    //         'tab',
    //         'layout',
    //         `<div class="container" style="border: 2px solid red; margin: 5px;">
    //             <div class="row">
    //                 <h5>${name}</h5>
    //                 <!--COLUMNS-->
    //             </div>
    //         </div>`,
    //         `<label>${name}</label>
    //         <div id="${id}" class="${customClass}" style="${style}"><!--TAP 01 --></div>`
    //     );
    
    //     const tab = new Element(id, name, customClass, style, typeContentTab, mode);
    
    //     for (let i = 0; i < numOfCols; i++) {
    //         const typeContentColumn = new TypeContent(
    //             'column',
    //             'layout',
    //             `<div id="${id}" class="${customClass}" style="${style}"> <!--sections--> </div>`,
    //             `<div id="${id}" class="${customClass}" style="${style}"><!--sections--></div>`
    //         );
    
    //         const column = new Element(`${id}-col${i + 1}`, `Column ${i + 1}`, '', '', typeContentColumn, mode);
    //         tab.addElement(column);
    //         const section = this.createSection(`${column[i]+1}`, "Section", "Section", "col py-3", "border: 1px dashed blue; padding=10px ; margin:10px", mode, 1 )
    //         column.addElement(section);
    //     }
    //     console.log("tab name: ", tab.Name);
    //     return tab;
    // }
    
}