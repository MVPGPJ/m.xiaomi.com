const searchTpl = require('../views/search.html');

export default {
    render() {
        $('#index').html(searchTpl);
        $("#back").on('click',()=>{
            window.history.go(-1)
        })
    }
}