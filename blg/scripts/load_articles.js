function load_articles() {
    clear();
    $('#articles-menu').addClass('dropdown');
    $.getJSON('./data/articles.json', function (response) {
        for (article of response.articles) {
            let article_node = $('<div class="article" id="' + article.title.replace(/\s/g, '_') + '"></div>');
            article_node.append($('<div class="title"><a href="#' + article.title.replace(/\s/g, '_') + '">' + article.title + '</a></div>'));
            article_node.append($('<div class="date">' + article.date + '</div>'));
            article_node.append($('<div class="text">' + article.text + '</div>'));
            $('#articles-menu ul').append($('<a href="#' + article.title.replace(/\s/g, '_') + '"><li class="dropdown-item">' + article.title + '</li></a>'));
            $('.body').append(article_node);
        }
    });
}