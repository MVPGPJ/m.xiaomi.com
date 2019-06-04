import { navHide,navClick,navLayer } from './controllers/index-top-nav'
import { footerNav } from './controllers/footer-nav'

const indexTxT = require('./views/index.html')


const renderedIndexTxT = template.render(indexTxT)

document.querySelector('#app').innerHTML = renderedIndexTxT; 



// 函数调用区
// nav导航函数
navHide(),navClick(),navLayer(),footerNav()