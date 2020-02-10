'use strict';

const gulp        = require('gulp'),
      sass        = require('gulp-sass'),
      browserSync = require('browser-sync'),
      sourcemaps  = require('gulp-sourcemaps');

gulp.task('sass', function () {
  return gulp.src('app/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app/css/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() { ///// Создаем таск browser-sync
  browserSync({ ///// Выполняем browser Sync
    server: { ///// Определяем параметры сервера
      baseDir: 'app' /////// Директория для сервера - app
    },
    notify: false ////// Отключаем уведомления
  });
});

gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}))

})

gulp.task('watch', function () {
  gulp.watch('app/sass/**/*.scss', gulp.series('sass'));
  gulp.watch('app/*.html', gulp.parallel('html'));
});

gulp.task('default', gulp.parallel('watch', 'sass', 'browser-sync'));


