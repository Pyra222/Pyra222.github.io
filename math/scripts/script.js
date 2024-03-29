//            1   2   3   4
var buffer = ['', '', '', '']
var file = {
    nodes: []
}
var currentEntry = null;
var selectedFile = null;
var selectedFileName = null;

function oneUp() {
    if ($('#current').prev().length >= 1 && !$('#current').prev().hasClass('actionArea')) {
        $('#current').prop('id', 'last');
        $('#last').prev().prop('id', 'current');
        $('#last').prop('id', '');
        $('#current').get(0).scrollIntoView({ block: "center" });
        // currentEntry = $('#current');
        $('#current').click();
    }
}

function oneDown() {
    if ($('#current').next().length >= 1) {
        $('#current').prop('id', 'last');
        $('#last').next().prop('id', 'current');
        $('#current').click();
        $('#last').prop('id', '');
        $('#current').get(0).scrollIntoView({ block: "center" });
        // currentEntry = $('#current');
    }
}

function contextMenuAt(x, y) {
    if ($('#menu').length > 0) {
        return;
    }
    var enabled = [true, true, true, false, false, false, false, true];
    if ($(".entry").length <= 1) {
        enabled[0] = false;
    }
    if ($('#current').prev().length <= 0) {
        enabled[1] = false;
    }
    if ($('#current').next().length <= 0) {
        enabled[2] = false;
    }
    if ($('#current').hasClass('def')) {
        enabled[3] = true;
    }
    if ($('#current').children('.mark').length) {
        enabled[4] = true;
    }
    if ($('#current').hasClass('underline')) {
        enabled[5] = true;
    }
    if ($('#current').hasClass('note')) {
        enabled[6] = true;
    }
    if ($('#current').hasClass('image')) {
        enabled[7] = true;
    }
    var template = `
        <div id="menu">
            <ul>
            <li class="`+ (!enabled[0] ? 'disabled' : '') + `">Usuń</li>
            <!--<li class="`+ (!enabled[1] ? 'disabled' : '') + `">W górę</li>-->
            <!--<li class="`+ (!enabled[2] ? 'disabled' : '') + `">W dół</li>-->
            <li>`+ (!enabled[3] ? 'Zaznacz definicję' : 'Odznacz definicję') + `</li>
            <li>`+ (!enabled[4] ? 'Oznacz równanie' : 'Usuń oznaczenie') + `</li>
            <li>`+ (!enabled[5] ? 'Podkreśl' : 'Usuń podkreślenie') + `</li>
            <li>`+ (!enabled[6] ? 'Zaznacz notatkę' : 'Odznacz notatkę') + `</li>
            <li class="`+ (!enabled[7] ? 'disabled' : '') + `">Dodaj obraz</li>
            </ul>
        </div>
    `
    var menu = $(template);
    menu.css('top', y);
    if (x > 155) {
        menu.css('left', x - 155);
    }
    else {
        menu.css('left', x);
    }
    $('body').append(menu);
}

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function insertAtCursor(myField, myValue) {
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
    } else {
        myField.value += myValue;
    }
}

function updateBufferElement() {
    for (var i = 0; i < 4; i++) {
        if (buffer[i] != '') {
            $('#buffer' + (i + 1)).addClass('oc');
        } else {
            $('#buffer' + (i + 1)).removeClass('oc');
        }
    }
}

function updateFile() {
    file = {
        nodes: []
    }
    $('.entry').each(function (index, element) {
        $element = $(element);
        if ($element.hasClass('eq')) {
            var text = $element.data('input');
            file.nodes.push({ contents: text, type: 'eq' })
        } else if ($element.hasClass('text')) {
            var text = $element.data('input');
            file.nodes.push({ contents: text, type: 'text' })
        } else if ($element.hasClass('image')) {
            var src = $element.data('input');
            file.nodes.push({ contents: src, type: 'image' })
        }
        if ($element.hasClass('def')) {
            file.nodes[file.nodes.length - 1].definition = true;
        }
        if ($element.hasClass('note')) {
            file.nodes[file.nodes.length - 1].note = true;
        }
        if ($element.hasClass('underline')) {
            file.nodes[file.nodes.length - 1].underline = true;
        }
        if ($element.children('.mark').length) {
            file.nodes[file.nodes.length - 1].mark = $element.children('.mark').text();
        }
    });
    fileUpdated(true);
}

function fileUpdated(b) {
    if (b) {
        $(".saveIcon").addClass('green');
        $(".saveIcon").removeClass('red');
    } else {
        $(".saveIcon").addClass('red');
        $(".saveIcon").removeClass('green');
    }
}

function loadFile(fileText) {
    return new Promise(function (resolve, reject) {
        file = null;
        try {
            file = JSON.parse(fileText);
        } catch (e) {
            reject(e);
        }
        $('.eq_area').empty();
        file.nodes.forEach(element => {
            $node = $('<div class="entry ' + element.type + '"></div>');
            if (element.type == 'text') {
                $node.html('`' + renderText(element.contents) + '`');
                $node.data('input', element.contents);
            } else if (element.type == 'image') {
                $node.html(renderImage(element.contents));
                $node.data('input', element.contents);
            } else {
                $node.html('`' + element.contents + '`');
                $node.data('input', element.contents);
            }

            if (element.definition) {
                $node.addClass('def');
            }

            if (element.note) {
                $node.addClass('note');
            }

            if (element.underline) {
                $node.addClass('underline');
            }

            if (element.mark) {
                $node.append('<span class="mark">' + element.mark + '</span>');
            }

            $('.eq_area').append($node);
        });
        $('#overlay').show();
        MathJax.Hub.Queue(["Typeset", MathJax.Hub], function () {
            $('#overlay').hide();
        });
        updateFile();
        fileUpdated(true);
        resolve();
    }).then(function () {
        $('#overlay').show();
    });
}

function copyFile() {
    var fileText = JSON.stringify(file);
    window.localStorage.setItem('temp', fileText);
}

function renderText(text) {
    var splitted = text.split('\\');
    var ready = "\\ ";
    for (token of splitted) {
        if (token == " " || token == "") {
            var newToken = "";
            ready = ready + newToken;
        } else if (token.startsWith('$') && token.endsWith('$')) {
            var newToken = token.slice(1, -1);
            ready = ready + newToken;
        } else {
            var newToken = '"' + token.split(' ').join('"\\ "') + '"\\ ';
            ready = ready + newToken;
        }
    }
    return ready;
}

function renderImage(src) {
    return `<img class="img" src="`+src+`"/>`;
}

function addRow() {
    $("#current").prop('id', 'last');

    var newNode = $('<div class="entry eq" id="current">``</div>');
    $('#last').after(newNode);
    $('#last').prop('id', '');
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById('current')]);
    var math = MathJax.Hub.getAllJax("current")[0];
    MathJax.Hub.Queue(["Text", math, ""]);

    $(this).val('');

    fileUpdated(false);
    currentEntry = $('#current');
    $(".input").val('');
    updateFile();
    $('#current').get(0).scrollIntoView({ block: "center" });
}

function moveCursorToEnd(el, pos = 0) {
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length - pos;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}

function showLoader() {
    $('#loaderContainer').show();
}

function hideLoader() {
    $('#loaderContainer').hide();
}

function init() {
    buffer = ["", "", "", ""];
    file = { nodes: [] }
    currentEntry = null;
    $('.eq_area').empty();
    var startNode = $('<div class="entry eq" id="current">``</div>');
    $('.eq_area').append(startNode);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById('current')]);
}

// start
(function () {
    updateFile();
    $('.input').focus();
})();
