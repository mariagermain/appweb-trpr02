export class Ship{
    private id : string;
    private name : string;

    constructor(id : string, name : string){
        this.id = id;
        this.name = name;
    }

    getid() : string {
        return this.id;
    }

    getName() : string {
        return this.name;
    }
}