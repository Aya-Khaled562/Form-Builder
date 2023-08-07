
export default class Value{
    id;
    type;
    source;
    constructor(id, type, source){
        this.id = id;
        this.type = type;
        this.source = source;
    }

    set Source(value){
        this.source = value;
    }
    set Type(value){
        this.type = value;
    }
    set Id(value){
        this.id = value;
    }

    get Type(){
        return this.type;
    }
    get Id(){
        return this.id;
    }
    get Source(){
        return this.source;
    }


    toString() {
        return {id: this.id, type: this.type, source: this.source};
    }
}