import FormBuilder from "../formbuilder.js";

export default class PreviewFrom {
    #builder;
    jsonData;
    constructor(jsonData){
        this.#builder = null;
        this.jsonData = jsonData;
    }

    initialize(){
        // console.log("Initializing in Preview")
        // const jsonData = JSON.parse(localStorage.getItem('jsonDataForm'));
        // console.log('prevew dasta >>', jsonData);
        this.#builder = new FormBuilder(this.jsonData, 'preview', 'form');

        let copyHtmlBtn = document.getElementById('copyFormHtml');
        copyHtmlBtn.addEventListener('click', this.handleCopyHtml(this));

        // let editFromBtn = document.getElementById('EditForm');
        // editFromBtn.addEventListener('click',this.handleEditForm );
        // console.log('builder', this.#builder)
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