const homeHeaderTpl = require('../views/home-header.html')
export default {
  render(e) {
    //渲染头部
    $('#index-scroll').before().html(homeHeaderTpl)

    // 头部小箭头显示隐藏
    $('header .nav-display').on('click', function () {
      if ($(this).children().hasClass('icon-down')) {
        $(this).children().removeClass('icon-down')
        $(this).children().addClass('icon-down-up')
      } else {
        $(this).children().removeClass('icon-down-up')
        $(this).children().addClass('icon-down')
      }
      $('header .nav-layer').toggle()
      $('header nav').toggle()
    })

    // 头部导航
    $('header nav .item').on('click', function () {
      $(this).children().addClass('item-color')
        .parent()
        .siblings().children()
        .removeClass('item-color');

      $('header .nav-layer .btn-item').eq($(this).index())
        .addClass('cur').siblings().removeClass('cur');

        // console.log(document.body.scrollLeft)
    })

    $('header nav').scrollLeft(80);
   

   


    // 头部隐藏的导航
    $('header .nav-layer .btn-item').on('click', function () {
      $(this).addClass('cur').siblings().removeClass('cur');
    

      if ($('header .nav-display').children().hasClass('icon-down')) {
        $('header .nav-display').children().removeClass('icon-down')
        $('header .nav-display').children().addClass('icon-down-up')
      } else {
        $('header .nav-display').children().removeClass('icon-down-up')
        $('header .nav-display').children().addClass('icon-down')
      }
      $('header .nav-layer').toggle()
      $('header nav').toggle()


      if($(this).index() === 5){
        
      }
      $('header nav .item')
        .eq($(this).index())
        .children()
        .addClass('item-color')
        .parent()
        .siblings().children()
        .removeClass('item-color');
    })

  }
}