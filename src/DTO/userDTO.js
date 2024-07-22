export class User{
    id;
    name;
    lastname;
    email;

    constructor(id, name, lastname, email){
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
    }

    getID(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getLastname(){
        return this.lastname;
    }

    getEmail(){
        return this.email;
    }

    setID(id){
        this.id = id;
    }

    setName(name){
        this.name = name;
    }

    setLastname(lastname){
        this.lastname = lastname;
    }

    setEmail(email){
        this.email = email;
    }
}