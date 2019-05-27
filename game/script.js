let stats = {
    str: 7,         // STRENGTH
    agi: 6,         // AGILITY
    sta: 6,         // STAMINA
    wis: 5,         // WISDOM
    pdef: 5,        // PHYSICAL DEFENCE
    mdef: 5,        // MAGICAL DEFENCE
    cha: 5          // CHARISMA
}

let stats2 = {
    str: 2,         // STRENGTH
    agi: 4,         // AGILITY
    sta: 2,         // STAMINA
    wis: 0,         // WISDOM
    pdef: 2,        // PHYSICAL DEFENCE
    mdef: 1,        // MAGICAL DEFENCE
    cha: 0          // CHARISMA
}

let p = new Creature('Herr Durr', stats);
let r = new Creature('Rat', stats2);

do {
    fight(r, p, 'phy', 'claws');
    fight(p, r, 'phy');
} while (r.hp > 0 && p.hp > 0);