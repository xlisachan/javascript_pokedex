class Pokemon{
    constructor(name, id, type, frontPic, backPic, hp, atk, def, pokemonAbilities){
        this.name = name;
        this.id = id;
        this.type = type;
        this.frontPic = frontPic;
        this.backPic = backPic;
        this.hp = hp; //integer
        this.atk = atk; // integer
        this.def = def; // integer
        this.pokemonAbilities = pokemonAbilities; // array of strings
    }
}