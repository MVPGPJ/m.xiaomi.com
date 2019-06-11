export default {
    get(url) {
      return $.ajax({
        url,
        type: 'GET',
      //   beforeSend: function(request) {
      //     request.setRequestHeader("Referer","https://m.mi.com/");
      //  },
        success(result) {
          return result
        }
      })
    }
  }