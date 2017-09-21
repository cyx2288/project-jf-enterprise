/**图片压缩
 * 交付*/


var gulp = require('gulp');

function distImg() {
    

    gulp.src('build/icon/**/*.{png,jpg,gif}')

        .pipe(gulp.dest('dist/icon'));

    gulp.src("build/fonts/*.*")

        .pipe(gulp.dest('dist/fonts'))
    
}

module.exports = distImg;