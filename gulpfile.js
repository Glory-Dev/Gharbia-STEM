var gulp = require("gulp"),
  concat = require("gulp-concat"),
  sass = require("gulp-sass")(require("sass")),
  autoprefixer = require("gulp-autoprefixer"),
  pug = require("gulp-pug"),
  livereload = require("gulp-livereload"),
  sourcemaps = require("gulp-sourcemaps"),
  minify = require("gulp-minify");

gulp.task("html", function () {
  return gulp
    .src("./html/*.pug")
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("dist/"))
    .pipe(livereload({ start: true }));
});

// Css Task
gulp.task("css", function () {
  return gulp
    .src(["./css/**/*.css", "./css/**/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(concat("main.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload({ start: true }));
});

// JS Task
gulp.task("js", function () {
  return gulp
    .src("./js/*.js")
    .pipe(concat("main.js"))
    .pipe(minify())
    .pipe(gulp.dest("dist/js"))
    .pipe(livereload({ start: true }));
});

// Watch Tasks
gulp.task("watch", function () {
  require("./server.js");
  livereload.listen();
  // gulp.watch("./html/**/*.pug", gulp.series(["html"]));
  gulp.watch(["./css/**/*.css", "./css/**/*.scss"], gulp.series(["css"]));
  gulp.watch("./js/*.js", gulp.series(["js"]));
});

// Default Task
gulp.task("default", gulp.series(["watch"]));
