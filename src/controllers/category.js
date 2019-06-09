const categoryTpl = require('../views/category.html');

export default {
    render() {
        $('main').html(categoryTpl);
        $('header').css({'display':'flex'});

    }
}