/* sounds */
let audio_dice = null;

let infoBar = new InfoBar('#infoBar');

function loadSounds() {
    return new Promise(function (resolve, reject) {
        audio_dice = new Audio('./sfx/dice.wav');
        resolve('audio loaded');
    });
}

(function init() {
    loadSounds().then((res) => infoBar.write(res));
})();