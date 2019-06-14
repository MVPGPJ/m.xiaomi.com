const category = require('./category.json')
const cart = require('./cart.json')
const Phone_1 = require('./Phone_1.json')
const Phone_2 = require('./Phone_2.json')
const Phone_3 = require('./Phone_3.json')
const Phone_4 = require('./Phone_4.json')
module.exports = function(){
    return {
        category,
        cart,
        Phone_1,
        Phone_2,
        Phone_3,
        Phone_4
    }
}