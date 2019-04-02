function load_main() {
    clear();
    $.getJSON('./data/main.json', function (response) {
        for (article of response.articles) {
            let article_node = $('<div class="article" id="' + article.title.replace(/\s/g, '_') + '"></div>');
            article_node.append($('<div class="title"><a href="#' + article.title.replace(/\s/g, '_') + '">' + article.title + '</a></div>'));
            article_node.append($('<div class="date">' + article.date + '</div>'));
            article_node.append($('<div class="text">' + article.text + '</div>'));
            $('.body').append(article_node);
        }
    });
}