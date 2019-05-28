//            1  2  3  4
var buffer = ['', '', '', '']
var file = {
    nodes: []
}
var currentEntry = null;

function oneUp() {
    if ($('#current').prev().length >= 1) {
        $('#current').prop('id', 'last');
        $('#last').prev().prop('id', 'current');
        $('#current').click();
        $('#last').prop('id', '');
        $('#current').get(0).scrollIntoView({ block: "center" });
    }
}

function oneDown() {
    if ($('#current').next().length >= 1) {
        $('#current').prop('id', 'last');
        $('#last').next().prop('id', 'current');
        $('#current').click();
        $('#last').prop('id', '');
        $('#current').get(0).scrollIntoView({ block: "center" });
    }
}

function contextMenuAt(x, y) {
    if ($('#menu').length > 0) {
        return;
    }
    var enabled = [true, true, true, false];
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
    console.log(enabled);
    var template = `
        <div id="menu">
            <ul>
            <li class="`+ (!enabled[0] ? 'disabled' : '') + `">Usuń</li>
            <li class="`+ (!enabled[1] ? 'disabled' : '') + `">W górę</li>
            <li class="`+ (!enabled[2] ? 'disabled' : '') + `">W dół</li>
            <li>`+ (!enabled[3] ? 'Zaznacz definicję' : 'Odznacz definicję') + `</li>
            </ul>
        </div>
    `
    var menu = $(template);
    menu.css('top', y);
    menu.css('left', x);
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
            var text = $element.find('script').text();
            file.nodes.push({ contents: text, type: 'eq' })
        } else if ($element.hasClass('text')) {
            var text = $element.text();
            file.nodes.push({ contents: text, type: 'text' })
        }
    });
    fileUpdated(true);
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
            if (element.type == 'eq') {
                $node.html('`' + element.contents + '`');
            } else {
                $node.html(element.contents);
            }
            $('.eq_area').append($node);
        });
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        updateFile();
        fileUpdated(true);
        resolve();
    });
}

function copyFile() {
    var fileText = JSON.stringify(file);
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