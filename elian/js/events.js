$(document).on('keypress', '#answer', function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        checkWord();
    }
});

$(document).on('click', '.switch', function(event){
    $('.reminder').toggleClass('hidden');
});

$(document).on('click', '.random', function(event){
    $('.random').toggleClass('success');
    random = !random;
});