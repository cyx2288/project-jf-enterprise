/**
 * Created by Qiaodan on 2017/4/11.
 */


var gulp = require('gulp'),
    less = require('gulp-less'),//less解码
    autoprefixer = require('gulp-autoprefixer'),//css兼容性
    minifyCss = require("gulp-minify-css"),//css文件压缩
    uglify = require("gulp-uglify"),//js文件压缩
    concat = require("gulp-concat"),//文件合并
    livereload = require('gulp-livereload'),//动态刷新
    cheerio = require('gulp-cheerio'),//批量更换html中的引用
    ejs = require('gulp-ejs'),//ejs模板
    rename = require("gulp-rename"),//重命名
    connect = require('gulp-connect');//服务器



/*gulp.task('connect',function(){

    connect.server({

        name: 'jf_bussinessService',//服务名称

        root: 'build',//服务根目录

        host: "192.168.68.240",//ip

        port: 666,//端口

        livereload: true//是否支持实时刷新

    });

});
*/

/*合并html*/
gulp.task('fileIncludeDev', function () {
    /*拼接view*/
    gulp.src(['src/view/*/**.html','src/view/*/**.ejs'])
        //拼接html
        .pipe(ejs())
        //注入css文件
        .pipe(cheerio(function ($) {
            var addHtml = "<link rel='stylesheet'  href='../../css/bootstrap.min.css'/>\n <link rel='stylesheet'  href='../../css/component.min.css'/>\n";
            addHtml += "<link rel='stylesheet'  href='../../css/newcomponent.css'/>\n";

            if ($('head').children('link')) {

                $('head').children('link').remove();//重新引入全新css

                $('head').append(addHtml);
            }


        }))
        .pipe(rename({
            extname: ".html"
        }))
        .pipe(gulp.dest('build/html'))
        .pipe(connect.reload());

    /*框架html导入*/
    gulp.src("src/*.html")
        .pipe(gulp.dest('build'));

});


//更新JS
gulp.task('changeJsDev', changeJsFn);

function changeJsFn(){
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('build/js'));

    gulp.src('src/js/BusinessService.js')
        .pipe(uglify()) //压缩JS
        .pipe(concat('BusinessService.min.js'))  // 合并匹配到的js文件
        .pipe(gulp.dest('build/js'));

    gulp.src('src/json/*.json')
        .pipe(gulp.dest('build/json'));

}



//更新和css文件所有less文件去开发环境
gulp.task('changeLessDev', changeLessDevFn);

function changeLessDevFn() {
    gulp.src(['src/component/**/*.less']) //该任务针对的文件7
        .pipe(less()) //编译less
        .pipe(autoprefixer({
            browsers: ['Android >= 4.0', 'IOS >=7', 'Firefox >= 20', 'ie >= 8'],//兼容设备
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(concat('newcomponent.css'))  // 合并匹配到的css文件
        .pipe(minifyCss()) //压缩css
        .pipe(gulp.dest('build/css')) //将会在build/css下生成index.css
        .pipe(connect.reload());

    gulp.src(['src/css/component.css'])
        .pipe(minifyCss()) //压缩css
        .pipe(concat('component.min.css'))  // 合并匹配到的css文件
        .pipe(gulp.dest('build/css')); //将会在src/css下生成index.css

    gulp.src(['src/css/main.css'])
        .pipe(minifyCss()) //压缩css
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('build/css'));

    gulp.src(['src/css/bootstrap.min.css'])
        .pipe(concat('bootstrap.min.css'))
        .pipe(gulp.dest('build/css'));
}

//图片以及fonts更新
gulp.task('iconChange',function(){
    gulp.src("src/icon/*.*")
        .pipe(gulp.dest('build/icon'));

    gulp.src("src/fonts/*.*")
        .pipe(gulp.dest('build/fonts'))

});


/*k开发环境监听*/
gulp.task('devWatch', function () {

    //less文件修改 ，注入css
    gulp.watch('src/component/**/*.less', ['changeLessDev']);

    //js以及json文件修改
    gulp.watch('src/js/*.js',['changeJsDev']);

    gulp.watch('src/json/*.json',['changeJsDev']);

    //图片更新
    gulp.watch('src/icon',['iconChange']);

  //  livereload.listen(); //要在这里调用listen()方法

    //html文件修改，注入html
    var htmlWatcher = gulp.watch('src/**/**/*.html', ["fileIncludeDev"]);

    htmlWatcher.on('change', function (file) {

        setTimeout(function () {

            livereload.changed(file.path);

        }, 100);

    })

});


//开发环境
//gulp.task('.myServer', ['iconChange', 'changeLessDev', 'changeJsDev', 'fileIncludeDev', 'devWatch', 'connect']);