const {src,dest,series,parallel,watch} = require('gulp')
const path = require('path')

const gulpWebserver = require('gulp-webserver')
const webpackStream = require('webpack-stream')
const gulpSass = require('gulp-sass')
const proxy = require('http-proxy-middleware')
const del = require('del')

//4.0以上gulp
//拷贝文件区域，只是进行简单复制
function copyhtml(){
    return src('./*.html')
    .pipe(dest('./dev'))
}
function copyimages(){
    return src('./src/images/**/*')
    .pipe(dest('./dev/images'))
}
function copylibs(){
    return src('./src/libs/**/*')
    .pipe(dest('./dev/libs'))
}
function copyicons(){
    return src('.s/src/icons/**/*')
    .pipe(dest('./dev/icons'))
}
//开启服务
function webserver(){
    return src('./dev')
    .pipe(gulpWebserver({
        host:'10.9.65.220',
        port:8000,
        livereload:true,
        middleware:[
            // proxy('./category',{
            //     target:'https://m.mi.com',
            //     changeOrigin:true,
            //     pathRewrite:{
            //         '^category':''
            //     }
            // }),
            proxy('./json',{
                target:'http://localhost:9999',
                changeOrigin:true,
                pathRewrite:{
                    '^/json':''
                }
            })
        ]
    }))
}
//打包编译js
function packjs(){
    return src('./src/**/*')
    .pipe(webpackStream({
        mode:'development',
        entry:{
            app:'./src/app.js'
        },
        output:{
            filename:'[name].js',
            path:path.resolve(__dirname,'./dev')
        },
        module:{
            rules:[
                {
                    test:/\.js$/,
                    exclude:/node_modules/,
                    use:{
                        loader:'babel-loader',
                        options:{
                            presets:['@babel/preset-env'],
                            plugins:['@babel/plugin-transform-runtime']
                        }
                    }
                },
                {
                    test:/\.html$/,
                    loader:'string-loader'
                }
            ]
        }
    }))
    .pipe(dest('./dev/scripts'))
}

//打包编译scss
function packCSS(){
    return src('./src/styles/app.scss')
    .pipe(gulpSass().on('error',gulpSass.logError))
    .pipe(dest('./dev/styles'))
}

//文件删除时触发
function clear(target){
    return function(){
        return del(target)
    }
}

//监听事件
function watcher(){
    watch('./src/libs/**/*',series(clear('./dev/libs'),copylibs))
    watch('./src/images/**/*',series(clear('./dev/images'),copyimages))
    watch('./src/icons/**/*',series(clear('./dev/icons'),copyicons))
    watch('./*.html',series(clear('./dev/*.html'),copyhtml))
    watch('./src/styles/**/*',series(packCSS))
    watch(['./src/**/*','!src/libs/**/*','!src/styles/**/*','!src/icons/**/*','!src/images/**/*'],series(packjs))
}

//模块默认执行方案
exports.default = series(parallel(packCSS,packjs,copylibs,copyimages,copyicons),copyhtml,webserver,watcher)
