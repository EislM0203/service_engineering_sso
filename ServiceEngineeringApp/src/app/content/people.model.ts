export class People{

    public name: string;
    public height: number;
    public mass: number;
    public birth_year: string;
    public homeworld: string;

    constructor(name: string, height: number, mass: number, birth_year: string, homeworld:string){
        this.name = name;
        this.height = height;
        this.mass = mass;
        this.birth_year = birth_year;
        this.homeworld = homeworld;

    }

};