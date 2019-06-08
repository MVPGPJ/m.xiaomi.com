const positionTpl = require('../views/position.html');

export default {
    render() {
        $('main').html(positionTpl)

        var swiper = new Swiper('.swiper-container', {
            pagination: {
              el: '.swiper-pagination',
            },
        });
    }
}