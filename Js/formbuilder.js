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
                const tab = this.#platformFactory.createTab(genId, "Tab", "col py-2", "border: 1px solid green", this.#mode, 2);
                tab.getElements().forEach(element => {
                    element.getElements().forEach(sec=>{
                        this.#Sections.push(sec);
                    })
                });

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

    build(type,parentId=null, numOfCols=1) {
        switch(type){
            case 'tab':
                const tabId = `tab_${this.#tabCounter++}`;
                const tab = this.#platformFactory.createTab(tabId, 'Tab', '', 'border: 1px solid green;', this.#mode, numOfCols);
                this.setTab(tab);
                tab.getElements().forEach(element => {
                    element.getElements().forEach(sec=>{
                        this.#Sections.push(sec);
                    })
                });
                
                const renderTab =  tab.render();
                document.getElementById(parentId).innerHTML += renderTab;

                //add click
                this.#Tabs.forEach(t => {
                    const target = document.getElementById(`${t.Id}`);
                    target.addEventListener('click', ()=> {
                        this.handleTabClick(t.Id)
                    });
                    HandleDragAndDrop();
                });

                break;
            case 'section':
                const secId = `sec_${this.#tabCounter++}`;
                const section = this.#platformFactory.createSection(secId, 'Section', '', 'border: 1px dashed green', this.#mode, numOfCols);
                this.setSection(section);
                console.log(this.#Sections)
                const renderSection =  section.render();
                const targetId = this.addSectionToTab(section);
                document.getElementById(`${targetId}`).innerHTML += renderSection;
                break;
            case 'text':
                const text = this.#platformFactory.createText(id, name, customClass, style, this.#mode);
                const renderText=  text.render();
                document.getElementById(parentId).innerHTML += renderText;
                break;
            
        }
        
    }
}
