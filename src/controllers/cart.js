const cartTpl = require('../views/cart.html');

export default {
    render() {
        $('main').html(cartTpl)

        $('header').css({'display':'flex'});
        $('header .middle .title').html("购物车");
        $('header .left a').on('click',function(){
            window.history.go(-1);
        })
        
    }
}