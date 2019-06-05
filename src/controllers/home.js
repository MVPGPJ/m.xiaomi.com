const homeTpl = require('../views/home.html')
export default {
  render() {
    $('#index').html(homeTpl)


    // $('footer nav a').on('click', function () {
    //   $(this).children('span').addClass('footer-color')
    //     .parent()
    //     .siblings()
    //     .children('span')
    //     .removeClass('footer-color')


    //   console.log($(this).children('i').attr())
    //   // $(this).children('i').attr()
    //   if ($(this).index() === 0 || $(this).index()) {
    //     $(this).children('i').removeClass('images-d').addClass('images-o-1')
    //   } else {
    //     $(this).children('i').addClass('images-d')
    //   }

    // })
  }
}