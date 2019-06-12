const listPhoneTpl = require('../views/listPhone.html');

import fetch from '../models/fetch'


const render = async () => {
    $('#index').html(listPhoneTpl)
    $("#back").on('click',()=>{
        window.history.go(-1)
    })


    // let result = await fetch.get('/json/cart/#/index/home/cart')
    // let data = result.data.recom_list;
    // let renderCartList = template.render(cartList, { data })
    // $('#list').html(renderCartList)       
}

export default {
    render
}