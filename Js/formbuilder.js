import AndroidElementFactory from "./android_element_factory.js";
import Element from "./element.js";
import HtmlElementFactory from "./html_element_factory.js";


export default class FormBuilder {
    #platform;
    #mode;
    #elements;
    #platformFactory
    #parentId
    #id;
    #name;
    #customClass;
    #style;
    #oldStyle;
    #Tabs
    #Sections
    #activeTab
    #tabCounter;
    #sectionCounter
    #colCounter;

    constructor(platform, mode, parentId) {
        this.#platform = platform;
        this.#mode = mode;
        this.#elements = [];
        this.#parentId = parentId;
        this.#Tabs = [];
        this.#Sections = [];
        this.#activeTab = null;
        this.#tabCounter = 1;
        this.#sectionCounter = 1;
        this.#colCounter = 1;

        this.#platformFactory = this.createPlatformFactory(this.#platform);// html or android
        this.ElementContent(this.#parentId);
    }

    addElement(element) {
        this.#elements.push(element);
    }

    setPlatform(platform) {
        this.#platform = platform;
    }

    setMode(mode) {
        this.#mode = mode;
    }

    getElementByIndex(index) {
        return this.#elements[index];
    }

    setTab(tab){
        this.#Tabs.push(tab);
    }

    getTabById(tabId){
        return this.#Tabs.find(tab=> tab.Id == tabId);
    }

    setActiveTab(tabId){
        this.#activeTab = this.getTabById(tabId);
    }

    getActiveTab(){
        return this.#activeTab;
    }

    setSection(section){
        this.#Sections.push(section);
    }

    getSectionById(secId){
        return this.#Sections.find(sec => sec.id == secId);
    }

    addSectionToTab(section){
        let targetId = '';
        if(this.#activeTab){
            const target = this.#activeTab.getElementByIndex(0);
            target.addElement(section);
            targetId = target.Id;
        }else{
            const targetTab = this.#Tabs[this.#Tabs.length-1];
            const targetCol = targetTab.getElementByIndex(0);
            targetCol.addElement(section);
            targetId = targetCol.Id;
        }
        return targetId;
    }

    createPlatformFactory(platform){
        if(platform === 'html'){
            return new HtmlElementFactory();
        }else if(platform === 'android'){
            return new AndroidElementFactory();
        }else{
            throw new Error(`Invalid platform: ${platform}`);
        }
    }

    handleTabClick(tabId) {
        this.#Tabs.forEach(t => {
          const tabElement = document.getElementById(`${t.Id}`);
          if (t.Id === tabId) {
            if (tabElement.style.borderColor === 'green') {
              tabElement.style.borderColor = 'red';
              this.#activeTab = t;
            } else {
              tabElement.style.borderColor = 'green';
            }
          } else {
            tabElement.style.borderColor = 'green';
          }
        });
    }

    // HandleDragAndDrop(tab){
    //     const columns = tab.getElements();
    //     // const sections = columns.flatMap((col) => col.getElements());
    //     console.log(this.#Sections)
    //     this.#Sections.forEach(sec=> {
    //         const sectionElement = document.getElementById(sec.Id);
    //         sectionElement.addEventListener('dragstart',function(e){
    //             columns.forEach(col => {
    //                 let selected = e.target;
    //                 const colElement = document.getElementById(col.Id);
                
    //                 colElement.addEventListener('dragover',function(e){
    //                     e.preventDefault();
    //                 });
    //                 colElement.addEventListener('drop', function(e){
    //                     console.log
    //                     col.addElement(selected)
    //                     selected = null;
    //                 });
    //             });
    //         });
    //     })
        
    // }

    HandleDragAndDrop() {
        let sections = [];
        this.#Sections.forEach(sec => {
            sections.push(document.getElementById(sec.Id)) ;
        })
        sections.forEach(sec=>{
            sec.addEventListener('dragstart',function(e){
                console.log('dragstart');
            });
        })
    }
    
    ElementContent(parentId){
        switch(this.#mode){
            case 'create':
                const genId = `tab_${this.#tabCounter++}`;
                const secId = `sec_${this.#tabCounter++}`;
                const colId = `col_${this.#colCounter++}`;
                const tab = this.#platformFactory.createTab(genId, "Tab", "col py-2", "border: 1px solid green", this.#mode);
                const column = this.#platformFactory.createColumn(colId, 'Column', 'col py-1 my-1 mx-1 ', 'border: 1px solid orange', this.#mode);
                const column2 = this.#platformFactory.createColumn(colId, 'Column', 'col py-1 my-1 mx-1 ', 'border: 1px solid orange', this.#mode);
                const section = this.#platformFactory.createSection(secId, 'Section', '', 'border: 1px dashed green', this.#mode); 
                const section2 = this.#platformFactory.createSection(secId, 'Section', '', 'border: 1px dashed green', this.#mode); 
                const colSec1 = this.#platformFactory.createColumn(colId, 'Column', 'col py-3 px-1 my-1 mx-1 ', 'border: 1px solid blue', this.#mode);
                const colSec2 = this.#platformFactory.createColumn(colId, 'Column', 'col py-3 px-1 my-1 mx-1 ', 'border: 1px solid blue', this.#mode);
                section.addElement(colSec1);
                section2.addElement(colSec2);
                column.addElement(section);
                column2.addElement(section2);
                tab.addElement(column);
                tab.addElement(column2);

                this.setTab(tab);
                const render=  tab.render();
                document.getElementById(parentId).innerHTML = render;

                //add click 
                this.#Tabs.forEach(t => {
                    const target = document.getElementById(`${t.Id}`);
                    target.addEventListener('click', ()=> {
                        this.handleTabClick(t.Id)
                    });
                    this.HandleDragAndDrop();
                });

                break;
            case 'update':
                
                break;
            case 'preview':
                break;
            default:
                throw new Error(`Invalid mode ${this.#mode}`);
        }
    }

    addClickOnTab(){
        console.log('tabs', this.#Tabs)
        this.#Tabs.forEach(t => {
            console.log(`${t.Id}`);
            console.log('t', t)
            console.log(t.Id);
            const target = document.getElementById(`${t.Id}`);
            console.log('target', target)
            target.addEventListener('click', ()=> {
                this.handleTabClick(t.Id)
            });
            // HandleDragAndDrop();
        });
    }
    build(type,id, name, customClass, style ,parentId=null) {
        switch(type){
            case 'tab':
                const tab = this.#platformFactory.createTab(id, name, customClass, style, this.#mode);
                this.setTab(tab);
                return tab;
            case 'section':
                const section = this.#platformFactory.createSection(id, name, customClass, style, this.#mode);
                this.setSection(section);
                return section;
            case 'column':
                const column = this.#platformFactory.createColumn(id, name, customClass, style, this.#mode);
                return column;

            case 'text':
                const text = this.#platformFactory.createText(id, name, customClass, style, this.#mode);
                // const renderText=  text.render();
                // document.getElementById(parentId).innerHTML += renderText;
                return text;
                break;
            
        }
        
    }
}
