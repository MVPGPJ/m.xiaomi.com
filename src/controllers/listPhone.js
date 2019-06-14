const listPhoneTpl = require('../views/listPhone.html');
const Phone_1Tpl = require('../views/goods/Phone_1.html')

import fetch from '../models/fetch'


const render = async () => {
    $('#index').html(listPhoneTpl)
    $("#back").on('click',()=>{
        window.history.go(-1)
    })

    let html = "";
    let count = 2;

    let result = await fetch.get('/json/Phone_1/#/index/search/listPhone')
    let result_2 = await fetch.get('/json/Phone_2/#/index/search/listPhone')
    let result_3 = await fetch.get('/json/Phone_3/#/index/search/listPhone')
    let result_4 = await fetch.get('/json/Phone_4/#/index/search/listPhone')
    
    var data = result.data.list_v2;
    
    console.log(data)
    let renderPhone_1 = template.render(Phone_1Tpl, { data })
    $('.app-goods-list').html(renderPhone_1)   
    html += renderPhone_1;
    // let a = $('#yinghao').text()
    for(let i = 0; i<=$('.yinghao').length;i++){
        let a = $('.yinghao').eq(i).text()
        $('.yinghao').eq(i).html(a) 
    }

    
    $(document).on('scroll',function(){
        var timer = setTimeout(renderlist,80)
        function renderlist(){
            if(document.documentElement.scrollHeight-document.documentElement.scrollTop < 800){
                if(count==2){
                    data = result_2.data.list_v2;
                    let renderPhone_2 = template.render(Phone_1Tpl, { data })
                    html += renderPhone_2
                    $('.app-goods-list').html(html)  
                    for(let i = 0; i<=$('.yinghao').length;i++){
                        let a = $('.yinghao').eq(i).text()
                        $('.yinghao').eq(i).html(a) 
                    }
                    count++
                    return false;
                }
    
                if(count==3){
                    data = result_3.data.list_v2;
                    let renderPhone_3 = template.render(Phone_1Tpl, { data })
                    html += renderPhone_3
                    $('.app-goods-list').html(html)  
                    for(let i = 0; i<=$('.yinghao').length;i++){
                        let a = $('.yinghao').eq(i).text()
                        $('.yinghao').eq(i).html(a) 
                    }
                    count++
                    return false;
                } 
                if(count==4){
                    data = result_4.data.list_v2;
                    let renderPhone_4 = template.render(Phone_1Tpl, { data })
                    html += renderPhone_4
                    $('.app-goods-list').html(html)  
                    for(let i = 0; i<=$('.yinghao').length;i++){
                        let a = $('.yinghao').eq(i).text()
                        $('.yinghao').eq(i).html(a) 
                    }
                    count++
                    return false;
                }
                if(count>4){
                    return false;
                }
            }
        }
        // clearTimeout(timer);
    })

    //隐藏的按钮
    $('.item-child div a').eq(0).on('click',function(){
        // $('.app-nav .item-child').toggle()
        $('.app-nav .item-child').toggle()
        $(this).addClass('active').siblings().removeClass('active')
        $('.showbg').toggle()
        $('.nav-main a').eq(0).addClass('active')
        $('.nav-main a').eq(0).html('综合<i class="active icon icon-down"></i>')
    })
    $('.item-child div a').eq(1).on('click',function(){
        $('.app-nav .item-child').toggle()
        $(this).addClass('active').siblings().removeClass('active')
        $('.showbg').toggle()
        $('.nav-main a').eq(0).html('新品<i class="active icon icon-down"></i>')
        $('.nav-main a').eq(0).addClass('active')
    })
    //第一排按钮区域
    $('.nav-main a').eq(0).on('click',function(){
        $('.showbg').toggle()
        $('.app-nav .item-child').toggle()
        $('.nav-main a').eq(2).children('span').children('i').eq(0).removeClass('active1')
        $('.nav-main a').eq(2).children('span').children('i').eq(1).removeClass('active2')
        $('.nav-specs>.item-child').css({'display':'none'})
        // $('.showbg').css({'display':'none'})
        if($('.item-child').attr('style')=='display: block; transform-origin: 0px 0px; opacity: 1; transform: scale(1, 1);'){
            $('.showbg').css({'display':'block'})
        }
        return false;
    })
    $('.nav-main a').eq(1).on('click',function(){
        $('.nav-main a').eq(0).children('i').removeClass('active')
        $(this).addClass('active').siblings().removeClass('active')
        $('.item-child div a').removeClass('active')
        $('.nav-main a').eq(2).children('span').children('i').eq(0).removeClass('active1')
        $('.nav-main a').eq(2).children('span').children('i').eq(1).removeClass('active2')
        return false;
    })
    $('.nav-main a').eq(2).on('click',function(){
        $('.nav-main a').eq(0).children('i').removeClass('active')
        $(this).addClass('active').siblings().removeClass('active')
        $('.item-child div a').removeClass('active')
        if(!$('.nav-main a').eq(2).children('span').children('i').eq(0).hasClass('active1')){
            $('.nav-main a').eq(2).children('span').children('i').eq(0).addClass('active1')
            $('.nav-main a').eq(2).children('span').children('i').eq(1).removeClass('active2')
        }else{
            $('.nav-main a').eq(2).children('span').children('i').eq(0).removeClass('active1')
            $('.nav-main a').eq(2).children('span').children('i').eq(1).addClass('active2')
        }
        return false;
    })
    $('.nav-main a').eq(3).on('click',function(){
        $('.item-child div a').removeClass('active')
        $('.nav-main a').eq(0).children('i').removeClass('active')
        $(this).addClass('active').siblings().removeClass('active')
        $('.nav-main a').eq(2).children('span').children('i').eq(0).removeClass('active1')
        $('.nav-main a').eq(2).children('span').children('i').eq(1).removeClass('active2')
        return false;
    })

    // 第二排按钮区
    $('.nav-specs>a').eq(0).on('click',function(){
        $('.showbg').toggle()
        // $('.nav-specs>.item-child').eq(0).toggle()

        if(!$('.nav-specs a').eq(0).hasClass('active')){
            $('.nav-specs a').children('i').addClass('icon-down').removeClass('icon-up')
            $('.nav-specs a').eq(0).children('i').removeClass('icon-down').addClass('icon-up')
            $('.showbg').css({'display':'block'})
            $('.nav-specs a').eq(0).addClass('active').siblings().removeClass('active')
            $('.nav-specs>.item-child').eq(0).css({'display':'block'})
            $('.nav-specs>.item-child').eq(1).css({'display':'none'})
            $('.nav-specs>.item-child').eq(2).css({'display':'none'})
            $('.nav-specs>.item-child').eq(3).css({'display':'none'})
        }else{
            $('.nav-specs a').eq(0).removeClass('active')
            $('.nav-specs a').eq(0).children('i').addClass('icon-down').removeClass('icon-up')
            $('.nav-specs>.item-child').eq(0).css({'display':'none'})
        }
       
        if($('.showbg').attr('style')=='transform-origin: 0px 0px; opacity: 1; transform: scale(1, 1);'){
            $('.showbg').css({'display':'block'})
        }
        
    })
    $('.nav-specs>a').eq(1).on('click',function(){
        $('.showbg').toggle()
        // $('.nav-specs>.item-child').eq(1).toggle()
        
        if(!$('.nav-specs a').eq(1).hasClass('active')){
            
            $('.nav-specs a').children('i').addClass('icon-down').removeClass('icon-up')
            $('.nav-specs a').eq(1).children('i').removeClass('icon-down').addClass('icon-up')
            $('.showbg').css({'display':'block'})
            $('.nav-specs a').eq(1).addClass('active').siblings().removeClass('active')
            
            $('.nav-specs>.item-child').eq(0).css({'display':'none'})
            $('.nav-specs>.item-child').eq(1).css({'display':'block'})
            $('.nav-specs>.item-child').eq(2).css({'display':'none'})
            $('.nav-specs>.item-child').eq(3).css({'display':'none'})
        }else{
            $('.nav-specs a').eq(1).removeClass('active')
            $('.nav-specs a').eq(1).children('i').addClass('icon-down').removeClass('icon-up')
            $('.nav-specs>.item-child').eq(1).css({'display':'none'})
        }
        if($('.showbg').attr('style')=='display: block; transform-origin: 0px 0px; opacity: 1; transform: scale(1, 1);'){
            $('.showbg').css({'display':'block'})
        }
    })
    $('.nav-specs>a').eq(2).on('click',function(){
        $('.showbg').toggle()
        // $('.nav-specs>.item-child').eq(2).toggle()
       
        if(!$('.nav-specs a').eq(2).hasClass('active')){  
            $('.nav-specs a').children('i').addClass('icon-down').removeClass('icon-up')
            $('.nav-specs a').eq(2).children('i').removeClass('icon-down').addClass('icon-up')
            $('.showbg').css({'display':'block'})
            $('.nav-specs a').eq(2).addClass('active').siblings().removeClass('active')

            $('.nav-specs>.item-child').eq(0).css({'display':'none'})
            $('.nav-specs>.item-child').eq(1).css({'display':'none'})
            $('.nav-specs>.item-child').eq(2).css({'display':'block'})
            $('.nav-specs>.item-child').eq(3).css({'display':'none'})
        }else{
            $('.nav-specs a').eq(2).removeClass('active')
            $('.nav-specs a').eq(2).children('i').addClass('icon-down').removeClass('icon-up')
            $('.nav-specs>.item-child').eq(2).css({'display':'none'})
        }
        if($('.showbg').attr('style')=='display: block; transform-origin: 0px 0px; opacity: 1; transform: scale(1, 1);'){
            $('.showbg').css({'display':'block'})
        }
    })
    $('.nav-specs>a').eq(3).on('click',function(){
        $('.showbg').toggle()
        $('.nav-specs>.item-child').eq(3).toggle()
      
        
        if(!$('.nav-specs a').eq(3).hasClass('active')){
           
            $('.nav-specs a').children('i').addClass('icon-down').removeClass('icon-up')
            $('.nav-specs a').eq(3).children('i').removeClass('icon-down').addClass('icon-up')
            $('.showbg').css({'display':'block'})
            $('.nav-specs a').eq(3).addClass('active').siblings().removeClass('active')

            $('.nav-specs>.item-child').eq(0).css({'display':'none'})
            $('.nav-specs>.item-child').eq(1).css({'display':'none'})
            $('.nav-specs>.item-child').eq(2).css({'display':'none'})
            $('.nav-specs>.item-child').eq(3).css({'display':'block'})
        }else{
            $('.nav-specs a').eq(3).removeClass('active')
            $('.nav-specs a').eq(3).children('i').addClass('icon-down').removeClass('icon-up')
            $('.nav-specs>.item-child').eq(3).css({'display':'none'})
        }
        if($('.showbg').attr('style')=='display: block; transform-origin: 0px 0px; opacity: 1; transform: scale(1, 1);'){
            $('.showbg').css({'display':'block'})
        }
    })

   
    // 第二排隐藏区
    
    $('.btn-confirm').on('click',function(){
        $('.nav-specs a').removeClass('active')
        $(this).parent().parent().css({'display':'none'})
        $('.showbg').css({'display':'none'})
        $('.nav-specs a').children('i').addClass('icon-down').removeClass('icon-up')
    })

    $('.item-child a').on('click',function(){
        if(!$(this).hasClass('active1')){
            $(this).addClass('active1')
        }else{
            $(this).removeClass('active1')
        }
        
    })
    
}

export default {
    render
}