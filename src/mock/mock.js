const category = require('./category.json')
const phone = require('./phone.json')
const TV = require('./TV.json')
module.exports = function(){
    return {
        category,
        phone,
        TV
    }
}