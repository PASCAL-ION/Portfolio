import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import nodeSass from 'sass';
const sass = gulpSass(nodeSass);
import strip from 'gulp-strip-banner'; 
import cleanCss from 'gulp-clean-css'; 
import concat from 'gulp-concat';
import uglify from 'gulp-uglify'; 
import ts from 'gulp-typescript';
import plumber from 'gulp-plumber';
import imagemin from 'gulp-imagemin';
import imagewebp from 'gulp-webp'
import browserSync from 'browser-sync';

function tsCompileTask() {
  return gulp.src('./app/**/*.ts')
  .pipe(plumber(function (error) {
    console.log(error);
    this.emit('end');
  }))
    .pipe(ts())
    .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./dist/script'))
    .pipe(browserSync.stream());
}

function sassCompileTask() {
  return gulp.src('./app/**/*.scss')
    .pipe(sass())
    .pipe(strip())
    .pipe(cleanCss())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
}

export function optimizeImg(){
  return gulp.src('app/images/*.{png,jpg,svg,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
    .on("error", function(err){
      console.error(err);
    })
    .pipe(browserSync.stream());
}

export function webpImg(){
  return gulp.src('dist/images/*.{jpg,png}')
    .pipe(imagewebp())
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.stream());
}


function reload() {
  browserSync.init({
    server: {
      baseDir: "./dist",
      index: "index.html"
    }
  });
  gulp.watch(['./app/**/*.scss', './app/**/*.ts', './*.html']).on('change', browserSync.reload);
}

export function watch() {
  reload();
  gulp.watch('./app/**/*.ts', tsCompileTask);
  gulp.watch('./app/**/*.scss', sassCompileTask);
  gulp.watch('./app/images/*.{jpg,png}', optimizeImg);
  gulp.watch('./dist/images/*.{jpg,png}', webpImg);
}