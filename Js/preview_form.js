import FormBuilder from "./formbuilder.js";

export default class PreviewFrom {
    #builder;
    constructor(){
        this.#builder = null;
    }

    initialize(){
        console.log("Initializing in Preview")
        const jsonData = JSON.parse(sessionStorage.getItem('jsonDataForm'));
        this.#builder = new FormBuilder(jsonData, 'preview' ,'form');
        let copyHtmlBtn = document.getElementById('copyFormHtml');
        copyHtmlBtn.addEventListener('click',  this.handleCopyHtml(this));
        let editFromBtn = document.getElementById('EditForm');
        editFromBtn.addEventListener('click',this.handleEditForm );
        console.log('builder', this.#builder)
    }

    
    handleCopyHtml(prev){
        return function fun (e){
            let formContainer = document.getElementById(prev.#builder.ParentId).parentElement;
            navigator.clipboard.writeText(formContainer.innerHTML);
        }
    }
   
    
    handleEditForm(e){
        sessionStorage.setItem('formMode', 'update');
        window.open('/Form-Builder/index.html', '_self');
    }

}