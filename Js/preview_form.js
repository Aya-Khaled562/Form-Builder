
import FormBuilder from "./formbuilder.js";

export default class PreviewFrom {
    #builder;
    constructor(){
        this.#builder = null;
        console.log('PreviewFrom constructor')
        // this.initialize()
    }
    set Builder(value){
        this.#builder = value;
    }
    get Builder(){
        return this.#builder;
    }
    
    initialize(){
        console.log("Initializing in Preview")
        const jsonData = JSON.parse(sessionStorage.getItem('jsonDataForm'));
        this.#builder = new FormBuilder(jsonData, 'preview' ,'form');
        let copyHtmlBtn = document.getElementById('copyFormHtml');
        copyHtmlBtn.addEventListener('click',  this.hhhh(this));
        let editFromBtn = document.getElementById('EditForm');
        editFromBtn.addEventListener('click',this.handleEditForm );
        console.log('builder', this.#builder)
        this.Builder = this.#builder
    }

    hhhh(f){
        return function handleCopyHtml(e){
            console.log('copyHtml');
            console.log('parent id',f.Builder)
            let formContainer = document.getElementById(f.#builder.ParentId).parentElement;
            navigator.clipboard.writeText(formContainer.innerHTML);
        }
    }
   
    
    handleEditForm(e){
        console.log('editForm');
        // console.log('parent id',this.#builder)
        sessionStorage.setItem('formMode', 'update');
        window.open('/index.html', '_self');
    }

}