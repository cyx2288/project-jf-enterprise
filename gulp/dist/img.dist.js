/**图片压缩
 * 交付*/


var gulp = require('gulp');

function distImg() {
    

    gulp.src('icon/**/*.png')

        .pipe(gulp.dest('dist/icon'));

    gulp.src("build/fonts/*.*")

        .pipe(gulp.dest('build/fonts'))



}

module.exports = distImg;