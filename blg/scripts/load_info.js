function load_info() {
    clear();
    $('.body').append($('<div class="personal"><div class="label">Personalia</div></div><div class="credits"><div class="label">Zasoby</div></div>'));
    load_personal();
    load_credits();
}

function load_personal() {
    let credit_node = $('<div class="personal-data">Dorodna pyra zryta życiem.</div>');
    $('.personal').append(credit_node);
};

function load_credits() {
    $.getJSON('./data/credits.json', function (response) {
        for (credit of response.credits) {
            let credit_node = $('<div class="credit">' + credit.data + '</div>');
            $('.credits').append(credit_node);
        }
    });
};
