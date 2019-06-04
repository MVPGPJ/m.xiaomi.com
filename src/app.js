const indexTxT = require('./views/index.html')

const renderedIndexTxT = template.render(indexTxT)

document.querySelector('#app').innerHTML = renderedIndexTxT; 



