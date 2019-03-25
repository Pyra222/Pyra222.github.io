let word;
let scorePos = 0;
let scoreNeg = 0;
let scorePass = 0;
let words;
let random = false;

function getWordsFromFile() {
    return new Promise(function (resolve, reject) {
        words = dict.split(/\r?\n/).map(e => e.split(/\/|\s/)[0]);
        resolve();
    });
}

function getWord() {
    clear();
    $(".word").text("...");
    $('.result').html("");
    if (random) {
        word = getRandomWord();
    } else {
        word = words[random_int(0, words.length)];
    }
    $(".word").text(word);
    $('#answer').focus();
}

function getRandomWord() {
    let length = random_int(3, 16);
    let random_word = "";
    for (var i = 0; i < length; i++) {
        random_word += letters[random_int(0, letters.length)];
    }
    return random_word;
}

function success() {
    $('.result').html('<div class="success">Dobrze!</div>');
    $('.word').toggleClass('elian');
    $('.word').toggleClass('alpha');
    setTimeout(function () {
        getWord();

        $('.word').toggleClass('elian');
        $('.word').toggleClass('alpha');
    }, 2000);
    updateScore('pos');
}

function fail() {
    $('.result').html('<div class="fail">Błąd</div>');
    $('.word').toggleClass('elian');
    $('.word').toggleClass('alpha');
    setTimeout(function () {
        getWord();

        $('.word').toggleClass('elian');
        $('.word').toggleClass('alpha');
    }, 2000);
    updateScore('neg');
}

function next() {
    clear();
    getWord();
    updateScore('pass');
}

function updateScore(type) {
    switch (type) {
        case 'pos': scorePos++; $('#scorePos').html(scorePos); break;
        case 'neg': scoreNeg++; $('#scoreNeg').html(scoreNeg); break;
        case 'pass': scorePass++; $('#scorePass').html(scorePass); break;
    }
    let count = scorePos + scoreNeg + scorePass;
    $('#count').html(count);
}

function clear() {
    $('#answer').val("");
}

function checkWord() {
    var answer = $('#answer').val().toUpperCase();
    if (answer != "") {
        word.toUpperCase() == answer ? success() : fail();
    } else {
        $('.result').html('<div>Podaj odpowiedź</div>');
    }
}

function init() {
    getWordsFromFile().then(getWord);
}

init();