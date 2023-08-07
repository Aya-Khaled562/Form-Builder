import FormApp from './form_app.js';

const formAppSingleton = (function (){

    let instance ;
    function createInstance(mode){
        return new FormApp(mode);
    }
    return {
        getInstance: function(mode){
           
            if(!instance){
                instance = createInstance(mode);
            }
            return instance;
        }
    }
})();

export default formAppSingleton;