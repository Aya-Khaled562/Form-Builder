import TypeContent from "./typecontent.js";
import Element from "./element.js";
import AbstractElementFactory from "./abstract_element_factory.js";


export default class HtmlElementFactory extends AbstractElementFactory {

    createText(id, name, customClass, style, mode) {
        const typeContent = new TypeContent(
            'text',
            'formControl',
            `<div class="col mt-5" id="text" style = "border: 2px solid blue"></div>`,
            'Text input preview'
        );

        return new Element(id, name, customClass, style, typeContent, mode);
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
    
    createTab(id, name, customClass, style, mode, numOfCols) {
        const typeContentTab = new TypeContent(
            'tab',
            'layout',
            `<div class="container" style="border: 2px solid red; margin: 5px;">
                <div class="row">
                    <h5>${name}</h5>
                    <!--COLUMNS-->
                </div>
            </div>`,
            `<label>${name}</label>
            <div id="${id}" class="${customClass}" style="${style}"><!--TAP 01 --></div>`
        );
    
        const tab = new Element(id, name, customClass, style, typeContentTab, mode);
    
        for (let i = 0; i < numOfCols; i++) {
            const typeContentColumn = new TypeContent(
                'column',
                'layout',
                `<div id="${id}" class="${customClass}" style="${style}"></div>`,
                `<div id="${id}" class="${customClass}" style="${style}"></div>`
            );
    
            const column = new Element(`${id}-col${i + 1}`, `Column ${i + 1}`, '', '', typeContentColumn, mode);
            tab.addElement(column);
        }
        console.log("tab name: ", tab.Name);
        return tab;
    }
    
    
    

    createSection(id, name, customClass, style, mode, numOfCols) {
        const typeContent = new TypeContent(
            'section',
            'layout',
            '<div class="col order-frist"  id="Section01" ></div>',
            'Section Preview'
        );

        const section = new Element(id, name, customClass, style, typeContent, mode);
        for (let i = 0; i < numOfCols; i++) {
            const field = this.createTextInput(`${id}-field${i + 1}`, `Field ${i + 1}`, '', '', mode);
            section.addElement(field);
        }
        return section;
    }
}