$(document).on('keypress', '#answer', function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        checkWord();
    }
})