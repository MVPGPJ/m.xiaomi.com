const {src,dest,series,parallel} = require('gulp')
const path = require('path')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')


const webpackStream = require('webpack-stream')
const gulpSass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')


//4.0以上gulp
//拷贝文件区域，只是进行简单复制
function copyhtml(){
    return src('./*.html')
    .pipe(dest('./dist'))
}
function copyimages(){
    return src('./src/images/**/*')
    .pipe(dest('./dist/images'))
}
function copylibs(){
    return src('./src/libs/**/*')
    .pipe(dest('./dist/libs'))
}
function copyicons(){
    return src('.s/src/icons/**/*')
    .pipe(dest('./dist/icons'))
}


//打包编译js
function packjs(){
    return src('./src/**/*')
    .pipe(webpackStream({
        mode:'production',
        entry:{
            app:'./src/app.js'
        },
        output:{
            filename:'[name].js',
            path:path.resolve(__dirname,'./dist')
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
    .pipe(rev())
    .pipe(dest('./dist/scripts'))
    .pipe(rev.manifest())
    .pipe(dest('./rev/scripts'))
}

//打包编译scss
function packCSS(){
    return src('./src/styles/app.scss')
    .pipe(gulpSass().on('error',gulpSass.logError))
    .pipe(cleanCSS({compatibility:'ie8'}))
    .pipe(rev())
    .pipe(dest('./dist/styles'))
    .pipe(rev.manifest())
    .pipe(dest('./rev/style'))

}


// 添加版本号
function revColl(){
    return src(['./rev/**/*.json','./dist/*.html'])
    .pipe(revCollector())
    .pipe(dest('./dist'))
}

//模块默认执行方案
exports.default = series(parallel(packCSS,packjs,copylibs,copyimages,copyicons),copyhtml,revColl)
