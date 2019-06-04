// 导航显示隐藏切换
const navHide = ()=>{
    $('header .nav-display').on('click',function(){
        if($(this).children().hasClass('icon-down')){
            $(this).children().removeClass('icon-down')
            $(this).children().addClass('icon-down-up')
        }else{
            $(this).children().removeClass('icon-down-up')
            $(this).children().addClass('icon-down')
        }
        $('header .nav-layer').toggle()
        $('header nav').toggle()
    })
}
// 导航选中样式
const navClick = ()=>{
    $('header nav .item').on('click',function(){
        $(this).children().addClass('item-color')
        .parent()
        .siblings().children()
        .removeClass('item-color');
    })
}
// 隐藏的导航选中样式
const navLayer = ()=>{
    $('header .nav-layer .btn-item').on('click',function(){
        $(this).addClass('cur').siblings().removeClass('cur');
    })
}

// 模块暴露
module.exports = {
    navHide,
    navClick,
    navLayer
}