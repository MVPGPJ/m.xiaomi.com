const userTpl = require('../views/user.html');

export default {
    render() {
        $('main').html(userTpl)
        $('header').css({'display':'none'});
        $('main').css({'top':0})

    }
}