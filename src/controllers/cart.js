const cartTpl = require('../views/cart.html');

export default {
    render() {
        $('main').html(cartTpl)
    }
}