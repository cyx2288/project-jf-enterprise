/**脚本合并
 * 开发*/

var gulp = require('gulp'),

    concatDir = require('gulp-concat-dir'),//按文件夹合并

    connect = require('gulp-connect'),//服务器

    concat = require("gulp-concat"),//文件合并

    rename = require("gulp-rename");//重命名


function devJs() {

    //主要依赖模块

    gulp.src(['src/js/BusinessService.js',  'src/component/**/*.js']) //该任务针对的文件7

        .pipe(concat('BusinessService.js'))

        .pipe(gulp.dest('build/js'))

        .pipe(connect.reload());

    //将会在src/css下生成index.css

    // .pipe(notify({message: 'js_main task complete'}));

    //单独业务模块

  /*  gulp.src(['src/component/!**!/!*.js', '!src/component/basic/!*.js']) //该任务针对的文件7

        .pipe(concatDir({ext: '.js'}))//根据文件夹合并

        .pipe(rename({prefix: "jf_"}))//统一加前缀

        .pipe(gulp.dest('build/js'))*/

    //.pipe(notify({message: 'js task complete'}));


    gulp.src(['src/js/*.js','!src/js/BusinessService.js']) //该任务针对的文件7

        .pipe(gulp.dest('build/js'))

        .pipe(connect.reload());

    gulp.src(['src/json/*']) //该任务针对的文件7

        .pipe(gulp.dest('build/json'))

        .pipe(connect.reload());

}

module.exports = devJs;