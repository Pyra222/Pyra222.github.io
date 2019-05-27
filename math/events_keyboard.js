$('.input').on('keydown', function (e) {
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
    if (e.key == "Enter") {
        $("#current").prop('id', 'last');

        var newNode = $('<div class="entry eq" id="current">``</div>');
        $('#last').after(newNode);
        $('#last').prop('id', '');
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById('current')]);
        var math = MathJax.Hub.getAllJax("current")[0];
        MathJax.Hub.Queue(["Text", math, ""]);

        $(this).val('');
        $('body').stop().animate({
            scrollTop: $('body')[0].scrollHeight
        }, 800);
        fileUpdated(false);
        updateFile();
    } else {
        var text = $(this).val();
        if (text.startsWith('#')) {
            $('#current').removeClass('eq');
            $('#current').addClass('text');
            text = text.substr(1);
            $('#current').html(text);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById('current')]);
        } else {
            $('#current').removeClass('text');
            $('#current').addClass('eq');
            if ($('#current').text() == "") {
                $('#current').text('``');
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById('current')]);
            }
            var math = MathJax.Hub.getAllJax("current")[0];
            MathJax.Hub.Queue(["Text", math, text]);
        }
        fileUpdated(false);
    }
});

$(document).on('keyup', function (e) {
    if (e.key == "Escape") {
        $(".copyFile").hide();
        $(".loadFile").hide();
        $("#overlay").hide();
    }
});