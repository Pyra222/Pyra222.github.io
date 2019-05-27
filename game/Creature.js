function mod(stat) {
    return stat - 7;
}

class Creature {
    constructor(name, stats) {
        this.name = name;
        this["base_str"] = this.str = stats.str;
        this["base_agi"] = this.agi = stats.agi;
        this["base_sta"] = this.sta = stats.sta;
        this["base_wis"] = this.wis = stats.wis;
        this["base_pdef"] = this.pdef = stats.pdef;
        this["base_mdef"] = this.mdef = stats.mdef;
        this["base_cha"] = this.cha = stats.cha;
        this["base_mp"] = this.mp = 2 * this.wis + 1;
        this["base_hp"] = this.hp = 2 * this.sta + 3;
    }
    test(stat) {
        let t = mod(this[stat]) + Roll.roll(2, 6).sum;
        return t;
    }
    hit(dmg) {
        this.hp -= dmg;
        infoBar.write(this.name + " <span class='red'>[" + this.hp + "/" + this.base_hp + "]</span> <span class='blue'>[" + this.mp + "/" + this.base_mp + "]</span>");
    }
    dmg(weapon_name) {
        let dmg = 0;
        if (!weapon_name) {
            dmg = Roll.roll(1, 4).sum + mod(this.str);
        } else {
            let weapon = weapons.find((e) => e.name == weapon_name);
            let count = parseInt(weapon.dmg.split('d')[0]);
            let dice = parseInt(weapon.dmg.split(' ')[0].split('d')[1]);
            let dmod = parseInt(weapon.dmg.split(' ')[1]);
            dmg = Roll.roll(count, dice).sum + dmod + mod(this.str);
        }
        if (dmg < 0) {
            dmg = 0;
        }
        return dmg;
    }
    mag(spell_name) {
        let mag = 0;
        if (!spell_name) {
            mag = 0;
        } else {
            let spell = magic.find((e) => e.name == spell_name);
            let count = parseInt(spell.dmg.split('d')[0]);
            let dice = parseInt(spell.dmg.split(' ')[0].split('d')[1]);
            let dmod = parseInt(spell.dmg.split(' ')[1]);
            mag = Roll.roll(count, dice).sum + dmod + mod(this.wis);
        }
        if (mag < 0) {
            mag = 0;
        }
        return mag;
    }
    print() {
        infoBar.write(this.name + " <span class='red'>[" + this.hp + "/" + this.base_hp + "]</span> <span class='blue'>[" + this.mp + "/" + this.base_mp + "]</span>");
        infoBar.write("<span class='short'>STR: </span>" + this.str + " (" + this.base_str + ") " + mod(this.str));
        infoBar.write("<span class='short'>AGI: </span>" + this.agi + " (" + this.base_agi + ") " + mod(this.agi));
        infoBar.write("<span class='short'>STA: </span>" + this.sta + " (" + this.base_sta + ") " + mod(this.sta));
        infoBar.write("<span class='short'>WIS: </span>" + this.wis + " (" + this.base_wis + ") " + mod(this.wis));
        infoBar.write("<span class='short'>PDEF:</span>" + this.pdef + " (" + this.base_pdef + ") " + mod(this.pdef));
        infoBar.write("<span class='short'>MDEF:</span>" + this.mdef + " (" + this.base_mdef + ") " + mod(this.mdef));
        infoBar.write("<span class='short'>CHA: </span>" + this.cha + " (" + this.base_cha + ") " + mod(this.cha));
    }
    inventory = [
        {
            name: 'short sword',
            damaged: false,
            equiped: true,
        }
    ];
    spellbook = [];
    gold = 0;
}
