const categoryTpl = require('../views/category.html');
const category_list_navbar = require('../views/category-list-navbar.html');
const category_list_wrap = require('../views/category-list-wrap.html');
const categoryContent= require('../views/category/categoryClass.html');
const cells_auto_fill= require('../views/category/cells_auto_fill.html');
const category_title= require('../views/category/category_title.html');
const category_group= require('../views/category/category_group.html');

import fetch from '../models/fetch'

const render = async () => {

    $('main').html(categoryTpl);
    $('main').css({'top':'50px'})
    $('header').css({ 'display': 'flex' });
    $('header .middle .title').html("分类");


    let result = await fetch.get('/json/category/#/index/home/category')
    let data  = result.data;
    // console.log(data)

    //listBar部分
    let renderedListNavBar = template.render(category_list_navbar, { data })
    $('.list-navbar ul').html(renderedListNavBar)       
    
    $('.list-navbar ul li').eq(0).addClass('active')
    $('.list-navbar ul li').on("click",function(){
        $('.list-navbar ul li').removeClass('active')
        $(this).addClass('active')
    })

    //listWrap部分
    let renderedListWrap = template.render(category_list_wrap, { data })
    $('.list-wrap').html(renderedListWrap)

    //绚烂商品部分
    data.forEach((item,i)=>{
        let listdata = data[i].category_list
        let renderedList = template.render(categoryContent, { listdata })

        $(`.category${i} .component-list-main`).html(renderedList)

        listdata.forEach((body,index)=>{
            let listBody = listdata[index].body
            if(listdata[index].view_type === "cells_auto_fill"){
                let listItem = listBody.items
                let w = listBody.w/100 + "rem"
                let h = listBody.h/100 + "rem"
                let renderedListItem = template.render(cells_auto_fill, { listItem })
                $(`.category${i} .component-list-main .cells_auto_fill`).html(renderedListItem)
                $(`.category${i} .component-list-main .cells_auto_fill`).css({'width':`${w}`,'height':`${h}`})
            }else if(listdata[index].view_type === "category_title"){
                let title = listBody.category_name
                let renderedListItem = template.render(category_title, { title })
                $(`.category${i} .component-list-main`).children().eq(index).html(renderedListItem)
            }else if(listdata[index].view_type ===  "category_group"){
                let listItem = listBody.items
                let renderedListItem = template.render(category_group, { listItem })
                $(`.category${i} .component-list-main`).children().eq(index).html(renderedListItem)
            }
        })
    })


    //绑定按钮页面之间的高度对应
    var list_navbar = document.querySelector('.list-navbar')
    var list_wrap = document.querySelector('.list-wrap')
    let ht = 0
    $('.list-navbar ul li').on('click',function(){
        for(let i = 0; i < $(this).index();i++){
            ht += $(`.category${i}`).height()
        }
        document.documentElement.scrollTop = ht;
        ht = 0
    })
    

    let change = [];

    for(let i = 0;i<$('.list-wrap .list-item').length;i++){
        ht += $(`.category${i}`).height()
        change.push(ht)
    }
    

    //暂时存在缺陷
    $(document).on('scroll',function(){
        let top = document.documentElement.scrollTop;
        if(top <= change[0]){
            $('.list-navbar ul li').eq(0).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[0] && top < change[1]){
            $('.list-navbar ul li').eq(1).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[1] && top <change[2]){
            $('.list-navbar ul li').eq(2).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[2] && top <change[3]){
            $('.list-navbar ul li').eq(3).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[3] && top <change[4]){
            $('.list-navbar ul li').eq(4).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[4] && top <change[5]){
            $('.list-navbar ul li').eq(5).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[5] && top <change[6]){
            $('.list-navbar ul li').eq(6).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[6] && top <change[7]){
            $('.list-navbar ul li').eq(7).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[7] && top <change[8]){
            $('.list-navbar ul li').eq(8).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[8] && top <change[9]){
            $('.list-navbar ul li').eq(9).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[10] && top <change[11]){
            $('.list-navbar ul li').eq(10).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[11] && top <change[12]){
            $('.list-navbar ul li').eq(11).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[12] && top <change[13]){
            $('.list-navbar ul li').eq(12).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[13] && top <change[14]){
            $('.list-navbar ul li').eq(13).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[14] && top <change[15]){
            $('.list-navbar ul li').eq(14).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[15] && top <change[16]){
            $('.list-navbar ul li').eq(15).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[16] && top <change[17]){
            $('.list-navbar ul li').eq(16).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[17] && top <change[18]){
            $('.list-navbar ul li').eq(17).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[18] && top <change[19]){
            $('.list-navbar ul li').eq(18).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[19] && top <change[20]){
            $('.list-navbar ul li').eq(19).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[20] && top <change[21]){
            $('.list-navbar ul li').eq(20).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[21] && top <change[22]){
            $('.list-navbar ul li').eq(21).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[22] && top <change[23]){
            $('.list-navbar ul li').eq(22).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[23] && top <change[24]){
            $('.list-navbar ul li').eq(23).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[24] && top <change[25]){
            $('.list-navbar ul li').eq(24).addClass('active').siblings().removeClass('active')
        }
        if(top >= change[25]){
            $('.list-navbar ul li').eq(25).addClass('active').siblings().removeClass('active')
        }
    })

}
export default {
    render
}