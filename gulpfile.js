const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const strip = require('gulp-strip-banner'); //efface les commentaires des fichiers pour les alléger
const cleanCss = require('gulp-clean-css'); //minifie le css
const concat = require('gulp-concat'); // permet de concaténer les fichiers
const uglify = require('gulp-uglify'); // minifie le js
const ts = require('gulp-typescript');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();

async function tsCompileTask() {
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

async function sassCompileTask() {
  return gulp.src('./app/**/*.scss')
    .pipe(sass())
    .pipe(strip())
    .pipe(cleanCss())
    .pipe(concat('style.css'))//en param on met le nom du fichier généré après concaténation
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
}

// Tâche pour recharger la page à chaque modification
function reload() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    }
  });
  gulp.watch(['./app/**/*.scss', './app/**/*.ts', './dist/*.html']).on('change', browserSync.reload);
}

exports.watch = function() {
  reload();
  gulp.watch('./app/**/*.scss', sassCompileTask),
  gulp.watch('./app/**/*.ts', tsCompileTask)
}
