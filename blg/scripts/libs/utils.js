function clear() {
    $('.body').empty();
    $('#articles-menu ul').empty();
    $('#articles-menu').removeClass('dropdown');
}

$(document).on('load', load_main());