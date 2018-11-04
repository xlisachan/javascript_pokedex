class Pokemon{
    constructor(name, id, type, pic, hp, atk, def, pokemonAbilities){
        this.name = name;
        this.id = id;
        this.type = type;
        this.pic = pic;
        this.hp = hp; //integer
        this.atk = atk; // integer
        this.def = def; // integer
        this.pokemonAbilities = pokemonAbilities; // array of strings
    }
}