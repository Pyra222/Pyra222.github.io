class Roll {
    constructor(num, sum) {
        this.num = num;
        this.sum = sum;
    }
    static roll(dice_count, type) {
        let num = [];
        let sum = 0;
        for (let i = 0; i < dice_count; i++) {
            let roll = Math.floor(Math.random() * 6) + 1;
            num.push(roll);
            sum += roll;
        }
        audio_dice.play();
        return new Roll(num, sum);
    }
}


function fight(c1, c2, type, weapon) {
    var hit = c1.test('agi') > c2.test('agi');
    var dmg = 0;
    switch (type) {
        case 'phy': dmg = c1.dmg(weapon) ? c1.dmg(weapon) - mod(c2.pdef) : 0;
            break;
        case 'mag': dmg = c1.mag(weapon) ? c1.mag(weapon) - mod(c2.mdef) : 0;
            break;
    }
    if (c1.hp <= 0) {
        infoBar.write(c1.name + ' iz DED x_x');
    } else if (hit) {
        infoBar.write(c1.name + ' hits ' + c2.name + ' for ' + dmg + ' dmg');
        if (dmg < 0) {
            dmg = 0;
        }
        c2.hit(dmg);
    } else {
        infoBar.write(c1.name + ' misses ' + c2.name);
    }
}