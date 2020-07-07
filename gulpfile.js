const { src, dest, watch }= require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');

function lessFunc(cb){
    src('pages/**/*.less')
        .pipe(less())
        .pipe(rename(function (path) {
            path.extname = ".wxss";
        }))
        .pipe(dest('pages/'));
    cb();
}
watch('pages/**/*.less', lessFunc)