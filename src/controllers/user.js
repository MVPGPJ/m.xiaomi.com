const userTpl = require('../views/user.html');

export default {
    render() {
        $('main').html(userTpl)
    }
}