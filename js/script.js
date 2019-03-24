let word;
let scorePos = 0;
let scoreNeg = 0;
let scorePass = 0;
let words;

function getWordsFromJson(){
    return new Promise(function(resolve, reject){
        $.getJSON("data/words.json",function(json){
            words = json;
            resolve();
        }, function(error){
            reject();
        });
    });
}

function getWord() {
    clear();
    $(".word").text("...");
    $('.result').html("");
    word = words.data[Math.floor(Math.random() * words.data.length)].word;
    $(".word").text(word);
    $('#answer').focus();
}

function success() {
    $('.result').html('<div class="success">POPRAWNIE!</div>');
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
    $('.result').html('<div class="fail">NIEPOPRAWNIE</div>');
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
}

function clear() {
    $('#answer').val("");
}

function checkWord() {
    var answer = $('#answer').val().toUpperCase();
    if (answer != "") {
        word == answer ? success() : fail();
    } else {
        $('.result').html('<div>Podaj odpowiedź</div>');
    }
}

function init() {
    getWordsFromJson().then(getWord);
}

init();