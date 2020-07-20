$(document).on('keydown', function (e) {
    if (e.altKey && e.ctrlKey && e.key == 'w') {
        // console.log('aaaaa');
        e.preventDefault();
        e.stopPropagation();
        $('.input').toggleClass('invisible');
        $('.bufferArea').toggleClass('invisible');
        $('#current').prop('id', '');
        return false;
    }
    if (e.ctrlKey) {
        if (e.key == 's') {
            e.preventDefault();
            $('#copyFile').click();
            return false;
        }
        if (e.key == 'o') {
            e.preventDefault();
            $('#loadFile').click();
            return false;
        }
        if (e.key == 'e') {
            e.preventDefault();
            $('#insertEquation').click();
            return false;
        }
    }
});

$('.input').on('keydown', function (e) {
    if (e.ctrlKey) {
        if (e.key == "Delete") {
            e.preventDefault();
            if ($(".entry").length > 1) {
                var next = null;
                if (currentEntry.prev().length) {
                    next = currentEntry.prev();
                } else {
                    next = currentEntry.next();
                }
                next.prop('id', 'current');
                if (next.hasClass('text')) {
                    text = '#' + next.data('input');
                } else {
                    text = next.data('input');
                }
                console.log(text);
                $(".input").val(text);
                currentEntry.remove();
                currentEntry = next;
            }
            return false;
        }
        if (e.key == "Enter") {
            addRow();
            return;
        }
        if ($('#current').length) {
            if (e.keyCode == 9) {
                e.preventDefault();
                if (e.shiftKey) {
                    oneUp();
                } else {
                    oneDown();
                }
                return false;
            }
            if (e.key == 'ArrowUp') {
                e.preventDefault();
                oneUp();
                return false;
            }
            if (e.key == 'ArrowDown') {
                e.preventDefault();
                oneDown();
                return false;
            }
        }
        var text = getSelectionText();
        var bufferIndex = e.key;
        if (bufferIndex != '1' &&
            bufferIndex != '2' &&
            bufferIndex != '3' &&
            bufferIndex != '4') {
            return;
        }
        e.preventDefault();
        if (text) {
            if (text.trim()) {
                buffer[parseInt(e.key) - 1] = text;
            } else {
                buffer[parseInt(e.key) - 1] = '';
            }
        } else {
            insertAtCursor($('.input')[0], buffer[parseInt(e.key) - 1]);
        }
        updateBufferElement();
        return false;
    }
});

$(".input").on('keyup', function (e) {
    var text = $(this).val();
    if (text.startsWith('#')) {
        text = text.substr(1);
        $('#current').removeClass('eq');
        $('#current').addClass('text');
        if ($('#current').text() == "") {
            $('#current').text('``');
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById('current')]);
        }
        // ---------
        ready = renderText(text);
        // ---------
        var math = MathJax.Hub.getAllJax("current")[0];
        MathJax.Hub.Queue(["Text", math, ready]);
        $('#current').data('input', text);
    } else {
        $('#current').removeClass('text');
        $('#current').addClass('eq');
        if ($('#current').text() == "") {
            $('#current').text('``');
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById('current')]);
        }
        var math = MathJax.Hub.getAllJax("current")[0];
        MathJax.Hub.Queue(["Text", math, text]);
        $('#current').data('input', text);
    }
    fileUpdated(false);
});

$(document).on('keyup', function (e) {
    if (e.key == "Escape") {
        $(".copyFile").hide();
        $(".loadFile").hide();
        $("#overlay").hide();
    }
});
/**
 #Raz dwa trzy cztery, łamanie linii powinno działać jak należy, i to nawet szybko! Teraz na następnej linijce będziemy robić całkę \$int_0^xf(t)dt=0$\ a potem zobaczymy co z tego wyjdzie. Łamanie linii działa i umieszcza rzeczy jak należy! Teraz tylko zapisywanie...
 */