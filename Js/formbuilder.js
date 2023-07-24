import AndroidElementFactory from "./android_element_factory.js";
import Element from "./element.js";
import HtmlElementFactory from "./html_element_factory.js";


export default class FormBuilder {
    #platform;
    #mode;
    #elements;
    #platformFactory
    #parentId
    #Tabs
    #sectionsBeforRender
    #sectionAfterRender
    #columnsTabAfterRender
    #columnsTabBeforRender
    #activeTab
    


    constructor(platform, mode, parentId) {
        this.#platform = platform;
        this.#mode = mode;
        this.#elements = [];
        this.#parentId = parentId;
        this.#Tabs = [];
        this.#sectionsBeforRender= [];
        this.#sectionAfterRender = [];
        this.#columnsTabAfterRender = [];
        this.#columnsTabBeforRender = [];
        this.#activeTab = null;
        this.#platformFactory = this.createPlatformFactory(this.#platform);// html or android
        this.ElementContent(this.#parentId);
    }

    // addElement(element) {
    //     this.#elements.push(element);
    // }

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

    setSectionBeforRender(section){
        this.#sectionsBeforRender.push(section);
    }
    getSectionBeforRender(){
        return this.#sectionsBeforRender;
    }

    setSectionAfterRender(section){
        this.#sectionAfterRender.push(section);
    }
    getSectionAfterRender(){
        return this.#sectionAfterRender;
    }

    setColumnsTab(column){
        this.#columnsTabAfterRender.push(column);
    }
    getIndexOfColumnsTabAfterRender(column){
        return this.#columnsTabAfterRender.indexOf(column);
    }
    setColumnsTabBeforeRender(column){
        this.#columnsTabBeforRender.push(column) ;
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
              this.#activeTab = null;
            }
          } else {
            tabElement.style.borderColor = 'green';
          }
        });
        console.log('active', this.#activeTab);
    }

    HandleDragAndDrop() {

        let dragBeforeRender = null;
        let dragAfterRender = null;
        console.log('sections After render', this.#sectionAfterRender)
        // console.log('section before render', this.#sectionBeforeRender)

        this.#sectionAfterRender.forEach((section, index)=>{
            section.addEventListener('dragstart',(e)=>{
                dragAfterRender = this.#sectionAfterRender[index];
                dragBeforeRender = this.#sectionsBeforRender[index];
                section.style.opacity = '0.5';
                console.log('dragstart',dragAfterRender);
            });
            section.addEventListener('dragend',(e)=>{
                dragAfterRender = null;
                section.style.opacity = '1';
                console.log('dragend');
            });

            this.#columnsTabAfterRender.forEach((column, index)=>{
                column.addEventListener('dragover',(e)=>{
                    e.preventDefault();
                    column.style.borderBottom = '3px solid blue'
                    console.log('dragover');
                });
                column.addEventListener('dragleave',(e)=>{
                    column.style.borderBottom = '1px solid orange';
                    console.log('dragleave');
                });
                
                column.addEventListener('drop',(e)=>{
                    e.preventDefault();
                    
                    console.log('target col', column);
                    let col = this.#columnsTabBeforRender[index];
                    let parentColAfterRender = dragAfterRender.parentNode;
                    let parentColIndexBeforeRender = this.getIndexOfColumnsTabAfterRender(parentColAfterRender);
                    let parentCol = this.#columnsTabBeforRender[parentColIndexBeforeRender];
                    console.log( 'parent',parentCol);
                    parentCol.removeElement(dragBeforeRender);
                    col.addElement(dragBeforeRender);
                    column.style.borderBottom = '1px solid orange';
                    column.append(dragAfterRender);
                    console.log('target col after add col', col)
                    console.log("old parent", parentCol);
                    e.stopPropagation();
                });
            });

            
        });
    }
    
    ElementContent(parentId){
        switch(this.#mode){
            case 'create':
                const tab = this.#platformFactory.createTab('tab_def', "Tab", "col py-2", "border: 1px solid green", this.#mode);
                const column = this.#platformFactory.createColumn('tab_col_def1', 'Column', 'col py-1 my-1 mx-1 ', 'border: 1px solid orange', this.#mode);
                const column2 = this.#platformFactory.createColumn('tab_col_def2', 'Column', 'col py-1 my-1 mx-1 ', 'border: 1px solid orange', this.#mode);
                const section = this.#platformFactory.createSection('sec_def1', 'Section', '', 'border: 1px dashed green', this.#mode); 
                const section2 = this.#platformFactory.createSection('sec_def2', 'Section', '', 'border: 1px dashed green', this.#mode); 
                const colSec1 = this.#platformFactory.createColumn('sec', 'Column', 'col py-3 px-1 my-1 mx-1 ', 'border: 1px solid blue', this.#mode);
                const colSec2 = this.#platformFactory.createColumn('sec', 'Column', 'col py-3 px-1 my-1 mx-1 ', 'border: 1px solid blue', this.#mode);
                section.addElement(colSec1);
                section2.addElement(colSec2);
                this.setSectionBeforRender(section);
                this.setSectionBeforRender(section2);

                column.addElement(section);
                column2.addElement(section2);
                this.setColumnsTabBeforeRender(column);
                this.setColumnsTabBeforeRender(column2);

                tab.addElement(column);
                tab.addElement(column2);

                this.setTab(tab);
                const render=  tab.render();
                document.getElementById(parentId).innerHTML = render;


                let sec1 = document.getElementById(`${section.Id}`);
                this.setSectionAfterRender(sec1);
                sec1 = document.getElementById(`${section2.Id}`);
                this.setSectionAfterRender(sec1);

                let col = document.getElementById(`${column.Id}`);
                this.setColumnsTab(col);
                col = document.getElementById(`${column2.Id}`);
                this.setColumnsTab(col);


                this.addClickOnTab()
                this.HandleDragAndDrop();
                
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
        this.#Tabs.forEach(t => {
            const target = document.getElementById(`${t.Id}`);
            target.addEventListener('click', ()=> {
                this.handleTabClick(t.Id)
            });
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
                return section;
            case 'column':
                const column = this.#platformFactory.createColumn(id, name, customClass, style, this.#mode);
                return column;

            case 'text':
                const text = this.#platformFactory.createText(id, name, customClass, style, this.#mode);
                // const renderText=  text.render();
                // document.getElementById(parentId).innerHTML += renderText;
                return text;
               
            
        }
        
    }
}
