import TypeContent from "./typecontent";
import Element from "./element";
import AbstractElementFactory from "./abstract_element_factory";


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

    createTab(id, name, customClass, style, mode, numOfCols) {
        const typeContent = new TypeContent(
            'tab',
            'layout',
            '<div id="tap01" class="col"><!--TAP 01 --></div>',
            'Tab Preview'
        );

        const tab = new Element(id, name, customClass, style, typeContent, mode);
        for (let i = 0; i < numOfCols; i++) {
            const column = new Element(`${id}-col${i + 1}`, `Column ${i + 1}`, '', '', typeContent, mode);
            tab.addElement(column);
        }
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