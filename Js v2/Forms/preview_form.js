import FormBuilder from "../formbuilder.js";

export default class PreviewFrom {
    #builder;
    constructor(){
        this.#builder = null;
    }

    initialize(){
        const jsonData = JSON.parse(localStorage.getItem('jsonDataForm'));
        this.#builder = new FormBuilder(jsonData, 'preview', 'form');
        let copyHtmlBtn = document.getElementById('save');
        copyHtmlBtn.addEventListener('click', this.handleCopyHtml(this));
        
    }

    handleCopyHtml(prev){
        return function fun (e){
            let formContainer = document.getElementById(prev.#builder.ParentId).parentElement;
            navigator.clipboard.writeText(formContainer.innerHTML);
        }
    }
   
    handleEditForm(e){
        sessionStorage.setItem('formMode', 'update');
        window.open('/index.html', '_self');
    }


    


}