//Подключаем модули галпа
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const rigger = require('gulp-rigger');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const svgSprite = require('gulp-svg-sprite');
const include = require('gulp-include')

//------------------------Создаем SVG спарайт------------------------
function SVG() {
  return gulp.src('./src/img/svg/*.svg') // svg files for sprite
        .pipe(svgSprite({
                mode: {
                  symbol: {
                        sprite: "../sprite.svg"  //sprite file name
                    }
                },
            }
        ))
        .pipe(gulp.dest('./src/img/svg'));
};
// Помещаем SVG спрайт в index.html--------------------------------

function INCLUDE() {
  return gulp.src('src/index.html')
        .pipe(include({
            includePaths: [
                "src/img/svg",
                "src"
            ]
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}

//------------------------Таск на компиляцию SCSS------------------
function sassCompile() {
  return gulp.src('./src/scss/**.*scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./src/css/'))
}

//------------------------Таск на стили CSS------------------------
// Порядок подключения CSS файлов
const cssFiles = [
  './src/css/normalize.css',
  './src/css/main.css',
  './src/css/style.css',
]

function styles() {
  // Чтобы выбрать все css файлы - return gulp.src('./src/css/**/*.css')
  return gulp.src(cssFiles)
  //Объединение файлов в один
  .pipe(concat('style.css'))
  //Добавление префиксов
  .pipe(autoprefixer({
    cascade: false
  }))
  //Минификация CSS  
  .pipe(cleanCSS({
    level: 2
  }))
  //Выходная папка для стилей
  .pipe(gulp.dest('./dist/css'))
  //Обновляем страницу при изменениях в CSS
  .pipe(browserSync.stream());
}

//------------------------Таск на скрипты JS------------------------
// Порядок подключения js файлов
const jsFiles = [
  // './src/js/lib.js',
  './src/js/main.js',
]

function scripts() {
 // Чтобы выбрать все js файлы - return gulp.src('./src/js/**/*.js')
 return gulp.src(jsFiles)
 //Объединение файлов в один
 .pipe(concat('script.js'))
 //Минификация JS
//  .pipe(uglify())
 //Выходная папка для скриптов
 .pipe(gulp.dest('./dist/js'))
 //Обновляем страницу при изменениях в JS
 .pipe(browserSync.stream())
}

//------------------------Таск для переноса HTML в папку dist------------------------
function HTML() {
  return gulp.src('src/**/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream())
};

//------------------------Следим за изменениями в файлах------------------------
function watch() {
  browserSync.init({
    server: {
        baseDir: "./dist"
    }
  });
  //Следить за CSS файлами
  gulp.watch('./src/css/**/*.css', styles)
  //Следить за JS файлами
  gulp.watch('./src/js/**/*.js', scripts)
  //При изменении HTML запускать синхронизацию
  gulp.watch('./src/**/*.html', INCLUDE)
  // gulp.watch("./src/*.html").on('change', browserSync.reload);
  //Следить за SCSS файлами
  gulp.watch('./src/scss/**/*.scss', sassCompile)
}

// ------------------------------------------------
//Таск на SVG спрайт
gulp.task('SVG', SVG);
//Таск на установку SVG спрайта в index.html
gulp.task('INCLUDE', INCLUDE);
//Таск вызывающий ф-ю styles
gulp.task('styles', styles);
//Таск вызывающий ф-ю scripts
gulp.task('scripts', scripts);
//Таск компилирующий SCSS
gulp.task('sassCompile', sassCompile);
//Таск на трансляцию HTML в папку dist
gulp.task('HTML', HTML);
//Таск для слежения за файлами и перезагрузки страницы
gulp.task('watch', watch);
//Таск для одновременного запуска styles и scripts
gulp.task('build', gulp.series(SVG, INCLUDE, sassCompile, gulp.parallel(styles, scripts)));
//Таск последовательно запускает таски build и  watch
gulp.task('default', gulp.series('build', 'watch'));