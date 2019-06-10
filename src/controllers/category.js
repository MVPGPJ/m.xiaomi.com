const categoryTpl = require('../views/category.html');

import fetch from '../models/fetch'

let positionList = []
let currentPage = 1

const render = async () => {
    let result = await fetch.get('./#/index/home/category')
    let data = positionList = result.data;
    console.log(data)

    $('main').html(categoryTpl);
    $('header').css({ 'display': 'flex' });
    $('header .middle .title').html("分类");

}
export default {
    render
}