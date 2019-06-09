import index from '../controllers/index'
import home from '../controllers/home'
import position from '../controllers/position'
import category from '../controllers/category'
import cart from '../controllers/cart'
import user from '../controllers/user'
import search from '../controllers/search'

export default class Router {
  constructor(obj) {
    this.mode = obj.mode
    // this.mode = 'history'
    // 路由配置
    this.routes = {
      '/index': index,
      '/index/home': home,
      // '/index/details': details,
      '/index/search': search,
      '/index/home/position': position,
      '/index/home/category': category,
      '/index/home/cart': cart,
      '/index/home/user': user,
    }
    // 组件挂载根元素
    this.root = $('#main')
    // 导航菜单列表
    this.navList = $('footer nav a')
    this.init()
  }

  init() {
    index.render()
    if (this.mode === 'hash') {
      window.addEventListener('load', this.hashRefresh.bind(this), false);
      window.addEventListener('hashchange', this.hashRefresh.bind(this), false);
    } else {
      this.bindLink()
      window.addEventListener('load', this.loadView.bind(this, location.pathname));
      window.addEventListener('popstate', this.historyRefresh.bind(this));
    }
  }
  /**
   * history模式劫持 a链接
   */
  bindLink() {
    $('nav').on('click', 'a', this.handleLink.bind(this))
  }
  /**
   * history 处理a链接
   * @param  e 当前对象Event
   */
  handleLink(e) {
    e.preventDefault();
    // 获取元素路径属性
    let href = $(e.target).attr('href')
    // 对非路由链接直接跳转
    if (href.slice(0, 1) !== '#') {
      window.location.href = href
    } else {
      let path = href.slice(1)
      history.pushState({
        path: path
      }, null, path)
      // 加载相应页面
      this.loadView(path.split('?')[0])
    }
  }
  /**
   * hash路由刷新执行
   * @param {object} e
   */
  hashRefresh(e) {
    // console.log(e)
    if (e.newURL) {
      var newURL = e.newURL.split('#')[1];
      var oldURL = e.oldURL.split('#')[1];
    }
    // 获取当前路径,默认'/index'
    var currentURL = location.hash.slice(1).split('?')[0] || '/index/home/position';
    this.loadView(currentURL)
  }
  /**
   * history模式刷新页面
   * @param  e  当前对象Event
   */
  historyRefresh(e) {
    const state = e.state || {}
    const path = state.path.split('?')[0] || null
    if (path) {
      this.loadView(path)
    }
  }
  /**
   * 加载页面
   * @param {string} currentURL 
   */
  loadView(currentURL) {
    if (this.mode === 'history' && currentURL === '/') {
      history.replaceState({
        path: '/'
      }, null, '/')
      currentURL = '/position'
    }
    // 多级链接拆分为数组,遍历依次加载
    this.currentURLlist = currentURL.slice(1).split('/')
    this.url = ""
    this.currentURLlist.forEach((item, index) => {
      // 导航菜单激活显示
      if (index === 0) {
        this.navActive(item)
      }
      this.url += "/" + item
      this.controllerName = this.routes[this.url]
      // 404页面处理
      if (!this.controllerName) {
        this.errorPage()
        return false
      }
      // 对于嵌套路由的处理
      if (this.oldURL && this.oldURL[index] == this.currentURLlist[index]) {
        this.handleSubRouter(item, index)
      } else {
        this.controller(this.controllerName, this.url)
      }
    });
    // 记录链接数组,后续处理子级组件
    this.oldURL = JSON.parse(JSON.stringify(this.currentURLlist))
  }
  /**
   * 处理嵌套路由
   * @param {string} item 链接list中当前项
   * @param {number} index 链接list中当前索引
   */
  handleSubRouter(item, index) {
    // 新路由是旧路由的子级
    if (this.oldURL.length < this.currentURLlist.length) {
      // 相同路由部分不重新加载
      if (item !== this.oldURL[index]) {
        this.controller(this.name)
        console.log('解绑状态监听事件')
        store.getSubject().unsubscribe('stateChange')
      }
    }
    // 新路由是旧路由的父级
    if (this.oldURL.length > this.currentURLlist.length) {
      var len = Math.min(this.oldURL.length, this.currentURLlist.length)
      // 只重新加载最后一个路由
      if (index == len - 1) {
        this.controller(this.name)
      }
    }
  }
  /**
   * 404页面处理
   */
  errorPage() {
    if (this.mode === 'hash') {
      location.href = '#/error'
    } else {
      history.replaceState({
        path: '/error'
      }, null, '/error')
      this.loadView('/error')
    }
  }
  /**
   * 组件控制器
   * @param {string} name 
   */
  controller(name, item) {
    
      name.render() // name 是当前路由匹配的那个 controller
      this.navActive(item) // 切换路由时导航高亮
    
  }
  /**
   * 手动跳转路由
   * @param {string} path 
   */
  push(path) {
    if (this.mode === 'hash') {
      location.hash = '#' + path
    } else {
      history.pushState({
        path: path
      }, null, path)
      // 加载相应页面
      this.loadView(path.split('?')[0])
    }
  }
  /**
   * 绑定组件对象中events 事件
   * @desc 将组件对象中this通过call绑定
   * ! 仅支持绑定当前组件下的DOM事件
   */
  bindEvents() {
    var self = this;
    //eventType: 事件类型;selector: 事件作用对象;handleEvent: 事件执行方法
    var eventType = "",
      selector = "",
      handleEvent = "";
    var Event = function (eventType, selector, handleEvent) {
      self.$el.find(selector).on(eventType, (e) => {
        // 执行事件
        self[handleEvent](e)
      })
    }
    // 遍历events对象
    for (var index in self.events) {
      eventType = index.match(/[0-9A-Za-z]+\s/i)[0].trim(); // 匹配事件名
      selector = index.replace(/[0-9A-Za-z]+\s/i, "").trim(); // 匹配事件作用元素选择器
      handleEvent = self.events[index]; // 匹配处理事件名称
      var obj = new Event(eventType, selector, handleEvent);
      obj = null; // 用完即释放空间
    }
    Event = null
  }
  /**
   * 导航激活显示
   * @param  item 当前router对象
   */
  navActive(item) {

    let c = "";
    if(item === '/index/home/position'){
      c = $('footer nav a').eq(0);
      changeBtn(c,item)
    }
    if(item === '/index/home/category'){
      c = $('footer nav a').eq(1);
      changeBtn(c,item)
    }
    if(item === '/index/home/cart'){
      c = $('footer nav a').eq(2);
      changeBtn(c,item)
    }
    if(item === '/index/home/user'){
      c = $('footer nav a').eq(3);
      changeBtn(c,item)
    }


    function changeBtn(c){
      $(c).children('span').addClass('footer-color')
        .parent()
        .siblings()
        .children('span')
        .removeClass('footer-color')

        // 切换底部导航颜色和图片
      let k = $(c).index();
      if(k===0){
        allColor()
        $(c).children('i').css({
          "background-image" : 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABI1BMVEUAAAD/hwD1bQP2bQP1bQP4WQD2bQP1bALxawD1bgT2bQP2bAP0awD2bQL2bQP3bQT0bAD1bQL1bAP2bQL2bAP2bQP1bAP1bQP2bQL2bQP1bAX0awL5bQD2awDwZgD1bQP1bgL2bQL3bgP0awTzagT7bQD1bAL2bQP1bAP1bAP1bQT2bQL2bAP2bAL1bAP1bQP1bAP1bQL1bAL2bQP/cwP8bwP////+cAP4bgP///76bgP1bgn1bgX2bw/0WQD1bhj1bhT1ZgL1ZAD0YgD0WwD72sP6xaP1ahn0XwD4pnD3i0j1aRL1agD+/Pb9+PP+9u/+8OT85ND5t433n2v2bgH2dAD0cwD969r80bP6y7D4s4b4r3r2llr1fy31eh74bQP1YQBGjgL7AAAAMXRSTlMAAf78mgP21B1B/f0R46s3B+nAbVfzvLSFSjQtKRoM8Xl2YURBFdjDl5OPgF3VzJ+eS58CkgAABAVJREFUSMetlQd32jAQx0G0mNoQCqRJk7bpTPeyDiNj9shO9979/p+id9JZoq+GB3m9F+Qg8dP976/h3KLIY+TOGHluzsaWq9Uy0yuz+fXNzXV8nIW9+KhWLNYeXSR6Zc334yiOI7i/qnI0ubSmQGCAWivh95Vs3r6npAhlGPqhureNXSuwW3eVEGFItBDq7hbTS7G3apEPoZQISylEVLu1JH0+d/5GMRLSsBRSRMUb2L0Mu/MgjgMJCNoQcfJgh+mFNl9DmwPJOaWl1do1Gl1c7pW6Cn0NMqzFy0Cq+hX8wUL2tqcEaNDgXDnZprzbTM9hH1ciPwCNMGwbpCuPmc6yKn/zUhTo5WXBFBCydhDRpZt5/Flm3p2HkBSIw8DWVkxfgeYpJPBwh3Jn2RyDMKxtXOEaF7/iDNPJ5o0IsFzQBJIsVze2Ch/UhjXdsRc8ReWC8YcDNI7BMIAIlHeBacuuV5QQ7LEJZ5lhwUwXBKqyzjSzDbQ53ReS6wQ9V+o98DDS0fUGQvbCuVyIChqazQtht9M1DnB+Lr+QFC7j5WRs3n2Gapjk8ujZHRycHAwQd/WbB4gYnu8a069uJIma9Raw7Ybdk2n/cNo/6RgaQEtjFXG0cZVUVz2VXPKKmmZ5RHdGv7/vf95/Nx53WAoNQQg0XiyC8qq5XLneTK7f2roeixTWn+5o/PZ1q9V6tX866hjYTi4i72YlatbLufJmE62/UIxFmJZNizKYHr1otdvtVvtt/4DqBqR4Aj96Wt6qNDfLWHJjG09iMQ7ArWnYG3/YayHaarfe/DjsUZ9bCz/xSrlq4yqfJ8ocSE5LaYbT41cIEvzyXX+AhHOEZJfcO4lgEATz4ZOD/vFLhl8cIYy9TDNMB9jQBjarybInP9+gbPr7dDwd6gG7/3yE3f7kzGBw0Ib1v1Je/Oz3D/gGB86fCbNqrbEzOv2iZe99nPQ0LO3FJv6FA5kmoOf73uT0aO/13rePk6E5ImznnMy0LW10cbUOww/vD8dDw/H2XQg7ebIzHE1Gw5471BRzZAtjpYVpf/c6Vgr18pBIsuHZ295d3xR8nWbJvoMwn2YA6UQaHtLlNws2p2Z7aYcp6u5vngrmGBY6mAJCwcDfF6IU/8iOhb29QMOz9VKP/R+yMrurbjaXm5KHIEN2mhmsUOCMoRswtsyBwXrKstkmJ4q6RTZMozyFu4KZ4T4ps93mY8Ep2CH3krWvHT/Lbbs7pctFqKmWYKCJsgwLAJgwqLHO2Wytm7dJKNyGNp7rUlwPyMxTZTA5A3IHq7Gnw0+e/AVv1yKRVmkpDsacj4Gq7xJsX7LnosLSIQsNYhxdWouay0b6dnZRvXxu2bhhK7a5l4vsX+dXidx/iD/dun/WaEYHqgAAAABJRU5ErkJggg==)'
        })
      }
      if(k===1){
        allColor()
        $(c).children('i').css({
          "background-image" : 'url(data:image/png;base64,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)'
        })
      }
      if(k===2){
        allColor()
        $(c).children('i').css({
          "background-image" : 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABHCAYAAACgTtGvAAACpElEQVR4Ae3bQ7wrPRjH8Rxj8/La9uour23btm3btm3btm3bNnL/i1m1OchMOv2cPFn86g6+dTPDeGM2G/1CPBb9QrMRoxaLEUmAZaBiGVWo2TawElKEiqmBAqj8Bsq76gKoVgbKu2wCqCkGyrsw9MMD6oCBEnfZA+qVgRK3AnGPEhko7/oJoM4irmmf0QFUVhaqkmBidxAn0GAZqMyCCbxGnEglYgsVjL573PknIaidMm9o5xEn2nsZqKWEod7KQPUkDHVABqocYajJMlDpCUM1k4EKQp+JQuW2EGLdGaJQ/8pCLSSI9BAxWaiuBKG22IEqRRBqhB2oVASh6tqBCkQfFS3AZh/+p5XImj5XUHZpKKsTihZAHkkeizvsJ4qwCzUnjkAlVLCMVxGzC9VJEdQmHw6kJrGmzx222glUMcSJ1M8JVHJCUBVtQ1m9IwKVwSnUYQJIX1GwU6iZBKDOIOYUqi0BqPkqoAoRgOqkAioxAajiKqAYgQHQ5KqgDmiM9BYxVVBTNIY6oBKqpcZQU1RC5dMYqqVKqHgaQ+VRBmX1XFOof1VD7dF1eEo11AQNobb7AqqZhlCjfAGVU8/hKfVQ/2qG9AMlVA5l9VgjqMWI+QpquyZI31AGeSh6f+K1RcyXUAGoD3oVR9+TLqAacrt4mAyUgTJQBspAGag4kIEyUAYqAFVC69BJtB5Vti5nfigYNUBbreVZjor4GyoAzUZc0CI/YIWiLYgLGupPqIaIR1NTl6H6S2xf4CrUkRgW7KTLUI9i3phVPZSK4as3LiJFIB5D59RDqdlB+zJiLvY2huXZqh5Kzd5XvV2GmiwxkOAqVBg6iLigwyjSZah/0RXEBa1BQX6BsgpH/dBN9N067o8iEPNDf6Mx6D76bsG1jzWS1R8KbrV38WJ0IQAAAABJRU5ErkJggg==)'
        })
      }
      if(k===3){
        allColor()
        $(c).children('i').css({
          "background-image" : 'url(data:image/png;base64,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)'
        })
      }
      function allColor() {
        $('footer nav a').eq(0).children('i').css({
          "background-image" : 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAk1BMVEUAAABxcXFxcXFwcHBxcXFwcHBvb29wcHBwcHBxcXFvb29wcHBubm5vb29vb29wcHBwcHBvb29wcHBwcHBwcHBvb29wcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBycnJwcHBwcHBwcHBvb29wcHBwcHBwcHBwcHBvb29vb29wcHBwcHBwcHBubm5wcHB0dHRycnJ2dnY0KzjsAAAALnRSTlMAAgn0mv6+6cEcQdIlEg36rTcy5E0g7tXFu6GPhmwG3Kl4KbSTc1xXR8p/Zyxhwd65kwAAAr1JREFUSMftlumSojAUhYEYQemwg7K4r63dOXn/p5ubbqoVcByw5tfUnNLKMfB5b05AMZ7JJBkv6gt8mRZhKF6ta552uxMNr7DLi82YfVmSHcyKEYeU4CMxkKaQ0wDgQcCBIKXPg2KO5hJ+6XmlD8wjmhrAJjOAHUzyBwbMEjK92U8bsI9kyR+1/yTfc4s2utpZW/066y42NN2H9fb8e521aP0A9l6X7sY8WeuYU/I/q0h16OvJn0OPHGIbZcgK3YwTPQXrBfr6qmrFcPHrGJ6wxxjIrmQ7R64ZEB/JPo15lZB9tPWrJ6FTzGUrZq1m6LzUaXRRipnY4JZpdx8Coin0B/jHGMDIexaJNwIw/ujWnboAr9oxt0JfVhxwp2Qb7EnHvLifNWu8ed5Ch34iez/HwFdJh/1d6D9VaLAqH9wNW81sF0VQHKL25oRzDr+y9Kx+i4Jzjl2zrneJfamUb+8nrRTCjE4vxPfp2xwadqxGsAWX0me+lMjTZuepDQ7k2682XAl7xyTB5q3nEuD54XQNGGRgNXp6s8EYl25IPTsK7BhmTThh8EtB1jqQu7Zg6W5iqLEwxE6tTsb0vjJFVChemN/7VHE1pkunAb+Lc6x2QocaGm347V3Z0zrPj5VahS14NjHCxbaeaMNRTF9eeyuQWdKC3cntTuzAYSznXl3ZXEvWhfWBmm7D25mMoxpOXRVPH8G1OrC1VrysL+wDV3oJfWEajxzs+uWTGHxjmENgXZoVyfa8t7lyqHB/mEzqKIDZDFCz0BgEk9JRBiklWEDJDYPJLqdVPs/LxKNPA2HtTTERehgM179fNToY1jjJ6A939R/+B+EeegyPlz2fD9MujLkwrR7yjCiTswYc2TJz8nEf5e++dMQ9vByBS9VHUknOW08BaQDZV/rfuamwGvXVJu2EOETdu3yAjL+gX1S9Wc5duViwAAAAAElFTkSuQmCC)'
        })
        $('footer nav a').eq(1).children('i').css({
          "background-image" : 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAllBMVEUAAABubm5xcXFxcXFvb29xcXFycnJwcHBxcXF3d3d2dnZwcHBwcHBtbW1wcHBwcHBycnJ0dHRwcHBwcHBwcHBwcHBwcHBqampwcHBwcHBwcHBzc3NwcHBwcHBwcHBwcHBwcHB6enpxcXFwcHBxcXFwcHBwcHBxcXFwcHBwcHBwcHBxcXFwcHBvb29wcHBwcHBwcHBwcHDmBwfKAAAAMnRSTlMAAhVLVT4vv/////WOCrP7//9yK/HuxxCJ0HwGfySCWx7/q9SEGZpDUDllpeuV3+S22PgUu6wAAAK1SURBVHgB7ZaFmqMwEIBnqhMozUzd3QV23//lLjU0t3CufyX2/cRDABC+HoRSufIFVDFeXa1OqjiO2/Ai22sqTVwYYmlBSFsTdbqFcbX0onGqMXEVS/1ClGCgZJiU21CYUUauwRgLMYaJRUYoBCbl/zJ+lm+qGXNkBK9dszNFwA9lBJwR2+nMAXLkxVARk43lyoMfV/O39DkH/GXz/OvlmeJ1oT7b5NFyWf/qmmvNXhkMWXlc2UxCNpWxzff6YJMRKrRUIUuq5DQoKbeWEsHLVkzGJyZikw3b3XoYst5tISQ0jGuXM43ESBi394dK+bi4JbOyxY6SpdN57YrwpXctRwUF5tkElR45wjfE6Zxr9pptIIwHWojJ7XQ7rgnFrwBgMRnGOybWvVF1u20frj7T/WjAD5odX81MHLQ8eDDdaeLu3iLHnDAsu8z+ESB8aEuT9EqA2anK2P03oUdF4azNWEvLRO2LJFofpmIimkCiH/268Hs/JSO0FCdWpvk1hP1tqk0VYn3IyPPXxqD5M2fbY75CSl70hAYmYtuS0W5EmF6YU5vLJHaKmxnZsveJ+ZgqRdgo6WVlfBHJZJFnSoYFam53mA8Z+aq4XkBerJlH0YBFc7/Lkw3eWbjnpUa72mV9yt8YCCchnRhuE70KXaaA+fJ0zTzcJo6hg0uyg4xss1tMvOrfLZNCgKPPFBgj5+75vI+L5mYNHjpgxWctDYjkKVjBR8OHoiXYVE3tsDicNWvi9/3jUTUiejuvslynT7vWE2IJ6s3VW881UWYS/2Fv144WFeE4z3B5fe3y7dVlFpPviDH90+Bh34rnHVEWHNWIzpf9KnDZcYQ6740p4M0OjG3Y71Y2BuEE3YLpqXE+7yaHkknebQ6qkCX3HYMPW628j24xcQFeefhIbci5InwVxp63tvAJwN9WhCnsGIoAAAAASUVORK5CYII=)'
        })
        $('footer nav a').eq(2).children('i').css({
          "background-image" : 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABHCAYAAACgTtGvAAADTUlEQVR4AWIsKCiYx8AAaNcegGu7ojCO56K2Gw3q3mZUa1Tbtjmobbsdq+2zbQ2fNYr5/GLbyf/5vRWdc7Ku9t3fzG8Qnnx373WyT5L0PPwYKb0Yh5eQUPGLkpx9fALGr/855hY1Dr1wk3MTsaiXEIBvCD9CJmS33sDkQOYyW9TAZNsV5ayoQnTj8GTYogamA0WwK8rDnDod59qidAb6nShFD/riTCtW4QG3RWV7KOo/JMOPeMtxuBFz8BOSgnCS3AS+832KNU5f7UJ0uVxRr6AcJuRdp0V1I99lUYuRDF+cOAaPohoyV8ui3Az005AMU9KJmXgJMr2iKA8D3bwsh0zWwKLsQE9xVpQ9HIdGW1QJ2uQXTZCictwU1YOCBFhRl0ImWxbldqCfhhTDV9Ru1MqivMypkOErKmvgWc8O9DScPHAXiaLs087BB7mXorajRWlF3YlS9GlDKe5U2Haet14vcpWK+i+MR6Bk/KdQVA9yRVGe59SpSEWsxQe3kS96MdpEUfpHmSg+htmNlxVWVC72JgiiMtBXQMTBY5jYyTk4Q84n8SjY/oogVpNKUTvQKFeULcrZqspAvEfuig6UaBd1ClINW1F56NYoSiZk4hnvyKLsQD8NybYoj2c8jaJKUSu/mWkP60RRnpNr8IpqwA6torLlnQ9pZg1yWZS988nrzlYvyoDtdxLS5c+mWZQpTzsvgS+cW68KECvKpDOeLEpx+4VM+fOUdlEm3PlkUbkgukXlGjDQLx647fSLyorzojJwoUJRxv4r0NG4H4vEHa8bSzEgQYwmtSgTJ++XgbjMDJSrrSiRbJiQTnwLEp6ilsGEfIwCEKWtJ/IXTsbbOAPxlG7k4xdMAglfUX34GjA3fsRGbFG2KFuUjS3KFmWLskXZonx4FPOwGfPxGHyIRoJ4GUuxGdNxu4cvol7Sf3gRB3IF7sX9eAZ9EX6cMg93iOt5FL/ik2itqJdBSYPmKbyOSOYLUZI8BN8VvaKGzytQiN71RKuo872/Xz3HIUXnevSLKsdwKUOk0oYGnevRL2oyhstUKETveqJV1N9Yg8GyDn9EYZjnY7DMxYRoFdWBW/AdStCFEnyPm9GKSKYW1+Ef7EQX8vE+HkEPHKUfkZb5KCDSBwMAAAAASUVORK5CYII=)'
        })
        $('footer nav a').eq(3).children('i').css({
          "background-image" : 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAkFBMVEUAAABiYmJoaGhxcXFwcHBwcHBycnJwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBzc3NycnJwcHB2dnZwcHBwcHBxcXFwcHBwcHBwcHBwcHBwcHBwcHBwcHBvb29wcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBvb29wcHBwcHBwcHBwcHBnZ2dwcHC6NtRcAAAAMHRSTlMAAwoXHycsRXWfxdzz+jB+vv8ljv/+72HU682aahOXTQ+wNblUtazlb1elWuE7B4ObTEwxAAADdklEQVR4AZWWh5rqOgyEnd7LEA2k0Os24P3f7vLdBVOSTTizBbfflmVZWHXJUBeZlu24rmNbpm56U5bnB2EUJ0kchYHvWep9pVke40FxnqX9hLZ4VEQQgEk8vihOCAiiYnTpHGKNSQmAVd1MvdRxUm/a1BUBlJNLZz87mycAo2axNHTjctFEBJL5rI82lL0SYjxfX+sX/ZbW8zEoK1sZPexGiHL7cDa6uC1B2XTQ2uaVEDv3idS8uwNl9bflhRB7q7vbUNYelOKvhRck8g5W0znIhTI6+2rwsO5zyfpA1N2zfwg5Ub2akPLR6a0I2Jn9J2nugKjLZ5/s3FDLLfxUba0guTUYgLlg1e6wIkg2HPqZIJq1DRpj3Gu1HlbpYbrVT6QcDcOjWpKPFlxAclMNyswFRQv+ElmpN7QS+WrBe5H9kNV6XP/Kre5HuL3yHLIx1LB2gnkLzii1peuW9RwES10KhVkL/o5x8G6tXlnq8kXTn91vCjHU8Ufi75Zv3AMwvbUWIuFSGbebWIlsr+UpcXBVSyHk6zbjBGRxO3UnB+PrPT99CULVVkZU66txy42Q+/X/w7c1KGdtBJh1wE6lM5Sh0lKIn+Dbm+5iEF+3O1wIK0d1aA6Oj7ddpzkAxuMEv9le/bprTDSdsZNWxEanCescERAgCSeXputuwCrtjsMMRHEZdI2p1N/XUdhMLB1lBYjsrzSxAZk9BOPSSUfGfTaflFyb1kqtEZhkevjvqNv/U5YQUU9qXlQgG/s+n6GH2gGIaqF6tD2ACL/NVg74DEEctqpXXg0i3kxe5lzFIGpPDcgJElA4ffouiYVIAkcN6vRdM0HsKkP7MUHC8PvUz11d3JDE8Q57QrL47Rt4DB2bmMRudoetXMi4OQ4+h2b+Dwis7Ke7vieIH3/Zz7orgizPs5eT8ksS3Lt97LEE8XN+fa9dKs75AKI89rCREJujemavVS8HJTr+FdpuKUQwa6FX3ArAru8znXtQmH8/aMwClFX3gDOI5tT3oDk1IM6dG44fEknPjY+7nLbDLXuqvscUsGs3b2NtUR+dgfG2tcRe9PusD7ZLyKplzw94VidjSKoAfvTurrAPRLZ6Q3YE+C8WBoLQHjmjATkjO4QEL8EVgUn1lhKidJXxAC9A4k2RWDzBn5LwPSVkIp9Pm16m7j8ovWaF/wCc31NtcLeHeAAAAABJRU5ErkJggg==)'
        })
      }
          

    }
  }
}