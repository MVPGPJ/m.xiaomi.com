const positionTpl = require('../views/position.html');

export default {
    render() {
        $('main').html(positionTpl)
        $('header').css({'display':'none'});
        $('main').css({'top':'1.39rem'})

        var swiper = new Swiper('.swiper-container', {
            pagination: {
              el: '.swiper-pagination',
            },
        });


        // 头部小箭头显示隐藏
    $('#header .nav-display').on('click', function () {
        if ($(this).children().hasClass('icon-down')) {
          $(this).children().removeClass('icon-down')
          $(this).children().addClass('icon-down-up')
        } else {
          $(this).children().removeClass('icon-down-up')
          $(this).children().addClass('icon-down')
        }
        $('#header .nav-layer').toggle()
        $('#header nav').toggle()
      })
  
      // 头部导航
      $('#header nav .item').on('click', function () {
        $(this).children().addClass('item-color')
          .parent()
          .siblings().children()
          .removeClass('item-color');
  
        $('#header .nav-layer .btn-item').eq($(this).index())
          .addClass('cur').siblings().removeClass('cur');

      })
    
      // 头部隐藏的导航
      $('#header .nav-layer .btn-item').on('click', function () {
        $(this).addClass('cur').siblings().removeClass('cur');
  
  
        if ($('#header .nav-display').children().hasClass('icon-down')) {
          $('#header .nav-display').children().removeClass('icon-down')
          $('#header .nav-display').children().addClass('icon-down-up')
        } else {
          $('#header .nav-display').children().removeClass('icon-down-up')
          $('#header .nav-display').children().addClass('icon-down')
        }
        $('#header .nav-layer').toggle()
        $('#header nav').toggle()
  
  
        if($(this).index() === 1 || $(this).index() === 2 || $(this).index() === 3){
            $('#header nav').scrollLeft(0);
        }
        if($(this).index() === 5 || $(this).index() === 6 || $(this).index() === 7){
            $('#header nav').scrollLeft(180);
        }
        $('#header nav .item')
          .eq($(this).index())
          .children()
          .addClass('item-color')
          .parent()
          .siblings().children()
          .removeClass('item-color');
      })

    }
}