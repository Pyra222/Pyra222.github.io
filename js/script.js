let word;
let scorePos = 0;
let scoreNeg = 0;
let scorePass = 0;

function getWord() {
    clear();
    $(".word").text("...");
    $('.result').html("");
    $('#answer').prop("disabled", "disabled");
    $.get('http://generatorslow.pl/php/getwords.php?categories=[%22rzeczowniki%22]&length=&limit=1', function (response) {
        var r = JSON.parse(response);
        word = r[0].toUpperCase();
        $(".word").text(word);
        $('#answer').prop("disabled", "");
        $('#answer').focus();
    });
}

function success() {
    $('.result').html('<div class="success">POPRAWNIE!</div>');
    setTimeout(getWord, 2000);
    updateScore('pos');
}

function fail() {
    $('.result').html('<div class="fail">NIEPOPRAWNIE</div>');
    setTimeout(getWord, 2000);
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
    getWord();
}

$(document).on('keypress', '#answer', function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        checkWord();
    }
})

init();