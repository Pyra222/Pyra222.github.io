$(document).on('click', '.entry', function () {
    $('.input').focus();
    $('#current').prop('id', '');
    $(this).prop('id', 'current');
    var text = "";
    if ($('#current').hasClass('text')) {
        text = '#' + $(this).data('input');
    } else {
        text = $(this).data('input');
    }
    $('.input').val(text);
    currentEntry = $('#current');
});

$(document).on('click', '#menu li', function () {
    switch ($(this).text()) {
        case "Usuń": {
            if ($(".entry").length > 1) {
                var next = null;
                if (currentEntry.prev().length) {
                    next = currentEntry.prev();
                } else {
                    next = currentEntry.next();
                }
                next.prop('id', 'current');
                if ($('#current').hasClass('text')) {
                    text = '#' + $('#current').data('input');
                } else {
                    text = $('#current').data('input');
                }
                $(".input").val(text);
                currentEntry.remove();
                currentEntry = next;
            }
        } break;
        // case "W górę": {
        //     if ($('#current').prev().length >= 1) {
        //         var temp = $('#current').html();
        //         var tempData = $('#current').data('input');
        //         $('#current').html($('#current').prev().html());
        //         $('#current').data('input', $('#current').prev().data('input'));
        //         if ($('#current').hasClass('def')) {
        //             $('#current').prev().addClass('def');
        //             $('#current').removeClass('def');
        //         }
        //         $('#current').prev().html(temp);
        //         $('#current').prev().data('input', tempData);
        //         oneUp();
        //     }
        // } break;
        // case "W dół": {
        //     if ($('#current').next().length >= 1) {
        //         var temp = $('#current').html();
        //         var tempData = $('#current').data('input');
        //         $('#current').html($('#current').next().html());
        //         $('#current').data('input', $('#current').next().data('input'));
        //         if ($('#current').hasClass('def')) {
        //             $('#current').next().addClass('def');
        //             $('#current').removeClass('def');
        //         }
        //         $('#current').next().html(temp);
        //         $('#current').next().data('input', tempData);
        //         oneDown();
        //     }
        // } break;
        case "Oznacz równanie": {
            $(".markEntry").show();
            $("#overlay").show();
            $('#mark').focus();
        } break;
        case "Usuń oznaczenie": {
            currentEntry.children('.mark').remove();
            $('#mark').val('');
            $('.input').focus();
        } break;
        case "Podkreśl":
        case "Usuń podkreślenie": {
            $('#current').toggleClass('underline');
        } break;
        case "Zaznacz definicję":
        case "Odznacz definicję": {
            $('#current').toggleClass('def');
        } break;
    }
});

$(document).on('click', function () {
    $('#menu').remove();
});

$(document).on('click', '.buffer', function () {
    var id = $(this).prop('id').split('buffer')[1];
    if (id) {
        buffer[id - 1] = "";
        updateBufferElement();
    }
});

$(document).on('click', '#copyFile', function (e) {
    $(".copyFile").show();
    $("#overlay").show();
    updateFile();
    fileUpdated(true);
    var $contents = $('#copyFileContents');
    var fileText = JSON.stringify(file);
    $contents.val(fileText);
});

$(document).on('click', '#copyFileClose', function (e) {
    $(".copyFile").hide();
    $("#overlay").hide();
});

$(document).on('click', '#loadFile', function (e) {
    $(".loadFile").show();
    $("#overlay").show();
    $('#loadFileContents').focus();
});

$(document).on('click', '#loadFileClose', function (e) {
    $(".loadFile").hide();
    $("#overlay").hide();
});

$(document).on('click', '#markEntryClose', function (e) {
    $(".markEntry").hide();
    $('#mark').val('');
    $("#overlay").hide();
});

$(document).on('click', '#load', function (e) {
    var $file = $('#loadFileContents').val();
    loadFile($file)
        .then(function () {
            $(".loadFile").hide();
            $("#overlay").hide();
            $('.entry:last-of-type').prop('id', 'current');
            $(".input").val($('#current').data('input'));
            $('.input').focus();
        })
        .catch(function (e) {
            alert('Parser JSON zwrócił następujący błąd:\n\n' + e.message);
        });
});

$(document).on('click', '#markEntry', function (e) {
    var mark = $('#mark').val();
    currentEntry.append('<span class="mark">' + mark + '</span>');
    $(".markEntry").hide();
    $("#overlay").hide();
    $('.input').focus();
});

$(document).on('click', '#new', function () {
    var result = confirm("Niezapisane zmiany zostaną utracone. Czy na pewno chcesz otworzyć nową notatkę?");
    if (result) {
        init();
        $('.input').val('');
        $('.input').focus();
    }
});

$('#overlay').on('click', function (e) {
    return false;
});

$(document).on('contextmenu', '.entry', function (e) {
    e.preventDefault();
    $('#current').prop('id', '');
    $(this).prop('id', 'current');
    currentEntry = $(this);
    contextMenuAt(e.pageX, e.pageY);
});
