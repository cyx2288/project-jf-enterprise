/**模板引擎合并
 * 开发*/

var gulp = require('gulp'),

    ejs = require('gulp-ejs'),//ejs模板

    cheerio = require('gulp-cheerio'),//批量更换html中的引用

    connect = require('gulp-connect'),//服务器

    rename = require("gulp-rename");//重命名

var bom = require('gulp-bom');//解决UTF-8文件是采用无BOM


function devEjs() {

    gulp.src('src/view/*/**.{ejs,html}')

        .pipe(ejs())

        //增加媒体查询，通用样式文件
        .pipe(cheerio({

            run: function ($) {

                if ($('head').children('link')) {

                    $('head').children('link').remove();//重新引入全新css

                    $('head').append(addHtml);

                }

                var addHtml = "";

                addHtml += "<link rel='stylesheet'  href='../../css/bootstrap.min.css'/>\n ";//框架

                addHtml += "<link rel='stylesheet'  href='../../css/component.css'/>\n";//第一版样式

                addHtml += "<link rel='stylesheet'  href='../../css/newcomponent.css'/>\n";//第二版开发样式

                $('head').prepend(addHtml);

            },

            parserOptions: {
                // Options here
                decodeEntities: false
            }

        }))

        //顺序增加脚本文件
        .pipe(cheerio({

            run: function ($) {

                var addJSHtml = '';//保存引用的业务脚本

                var addJsRun = "<script>\n";//运行的脚本

                var addJsHtmlHead = "<script src='";

                var addJSHtmlBottom = "'></script>\n";

                $('script').each(function (index, ele) {

                    if ($(this).attr('src')) {

                        var thisAttr = $(this).attr('src');

                        if (thisAttr.indexOf('BusinessService.min.js') > -1) {

                            thisAttr = thisAttr.replace('BusinessService.min.js', 'BusinessService.js')

                        }

                        addJSHtml += addJsHtmlHead + thisAttr + addJSHtmlBottom;

                    }

                    else {

                        addJsRun += $(this).html() + '\n';

                    }

                });

                addJsRun += "\n</script>\n";

                $('script').remove();

                $('body').append(addJSHtml);

                $('body').append(addJsRun);

            },
            parserOptions: {
                // Options here
                decodeEntities: false
            }
        }))


        .pipe(rename({

            extname: ".html"

        }))

        .pipe(gulp.dest('build/html'))//输出为html

        .pipe(bom())

        //.pipe(notify({message: 'html task complete'}));

        .pipe(connect.reload());

    /*框架html导入*/
    gulp.src("src/*.html")

        .pipe(gulp.dest('build'));

}

module.exports = devEjs;