import FormApp from './form_app.js';

const formAppSingleton = (function (){

    let instance ;
    let i = 0;
    console.log('i: ', i+1);
    function createInstance(jsonData , mode){
        return new FormApp(jsonData, mode);
    }
    return {
        getInstance: function(jsonData , mode){
           
            if(!instance){
                instance = createInstance(jsonData, mode);
            }
            return instance;
        }
    }
})();

export default formAppSingleton;