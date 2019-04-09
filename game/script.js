/* sounds */
var audio_dice = null;

/* data */
var kills = null;

function loadSounds() {
    return new Promise(function (resolve, reject) {
        audio_dice = new Audio('./sfx/dice.wav');
        resolve('audio loaded');
    });
}

function loadData() {
    return new Promise(function (resolve, reject) {
        $.get('./data/kills.json').then(function (response) {
            kills = response.kills;
            renderKills(kills);
        });
    });
}

function renderKills() {
    for (kill of kills) {
        var kill_node = $(
            `<tr>
                <td>`+ kill.encounter + `</td>
                <td>`+ kill.attack_value + `</td>
                <td>`+ kill.defence + `</td>
                <td>`+ ((kill.damage_mod >= 0) ? '+' + kill.damage_mod : kill.damage_mod) + `</td>
                <td>`+ kill.health_points.join('/') + `</td>
                <td>`+ kill.abilities.join(', ') + `</td>
            </tr>`
        );
        $('.kill table').append(kill_node);
    }
}

function roll() {
    $('#d1').css('top', (Math.random() * 120 - 30) + 'px');
    $('#d1').css('left', (Math.random() * 100 - 30) + 'px');
    $('#d1').css('transform', 'rotate(' + Math.random() * 360 + 'deg)');
    $('#d1 .number').html(Math.floor(Math.random() * 10));

    $('#d2').css('top', (Math.random() * 120 - 30) + 'px');
    $('#d2').css('left', (Math.random() * 100 - 30) + 'px');
    $('#d2').css('transform', 'rotate(' + Math.random() * 360 + 'deg)');
    $('#d2 .number').html(Math.floor(Math.random() * 10) + "0");

    $('#d3').css('top', (Math.random() * 120 - 30) + 'px');
    $('#d3').css('left', (Math.random() * 100 - 30) + 'px');
    $('#d3').css('transform', 'rotate(' + Math.random() * 360 + 'deg)');
    $('#d3 .number').html(Math.floor(Math.random() * 6 + 1));

    $('#roll').attr('disabled', 'disabled');
    audio_dice.play();
    setTimeout(function () {
        $('#roll').attr('disabled', false);
    }, 1000);
}

function init() {
    loadSounds();
    loadData();
}

init();