var gulp = require('gulp');
var eslint = require('gulp-eslint');

var url = '2016_spring/graspJavaScript/task026/task.js';
gulp.task('default', function() {
    // 代码块放在这里
    return gulp.src(url)
        .pipe(eslint())
        .pipe(gulp.dest('2016_spring/graspJavaScript/task026/build'));
});
