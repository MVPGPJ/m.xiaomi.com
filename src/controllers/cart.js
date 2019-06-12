const cartTpl = require('../views/cart.html');
const cartList = require('../views/cart-list.html');

import fetch from '../models/fetch'


const render = async () => {
    $('main').html(cartTpl)



    //基本功能
    $('header').css({ 'display': 'flex' });
    $('header .middle .title').html("购物车");
    $('main').css({ 'top': '50px' })
    $('header .left a').on('click', function () {
        window.history.go(-1);
    })

    let result = await fetch.get('/json/cart/#/index/home/cart')
    let data = result.data.recom_list;
    let renderCartList = template.render(cartList, { data })
    $('#list').html(renderCartList)       
}

export default {
    render
}