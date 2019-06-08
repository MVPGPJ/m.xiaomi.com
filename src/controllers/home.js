const homeTpl = require('../views/home.html')
export default {
  render() {
    $('#index').html(homeTpl)

    // 实时监听屏幕宽度，改变字体大小
    window.addEventListener('resize', changeSize)
    function changeSize(){
      let width = window.screen.width;
      let font_size = 0;
      if(width>414){
        font_size = width/7.68;
        $('html').attr('style',`font-size:${font_size}px`)
      }else{
        font_size = width/7.2;
        $('html').attr('style',`font-size:${font_size}px`)
      }
    }
    changeSize()
  }
}