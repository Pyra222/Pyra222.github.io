/* info */
class InfoBar {
    constructor(el) {
        this.el = $(el);
    }
    write(text) {
        this.el.append('<div class="infoLine">' + text + '</div>');
        this.el.scrollTop(this.el[0].scrollHeight);
    }
    clear() {
        this.el.empty();
    }
}