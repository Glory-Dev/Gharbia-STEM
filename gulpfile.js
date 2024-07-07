// import { task, src, dest, pipe } from "gulp";
// import { concat } from "gulp-concat";
// import { minify } from "gulp-minify";
// import { pug } from "gulp-pug";
// import { prefixer } from "gulp-autoprefixer";
// import { sass } from "gulp-sass";
// import { sourcemaps } from "gulp-sourcemaps";
// import { livereload } from "gulp-livereload";

var gulp = require("gulp"),
  concat = require("gulp-concat"),
  pug = require("gulp-pug"),
  prefixer = require("gulp-autoprefixer"),
  sass = require("gulp-sass"),
  minify = require("gulp-minify"),
  sourcemaps = require("gulp-sourcemaps"),
  livereload = require("gulp-livereload");

// "gulp-notify": "^4.0.0",
// "static-server": "^2.2.1"

// HTML
gulp.task("html", function () {
  return gulp
    .src("./html/*.pug")
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("./dist"))
    .pipe(livereload());
});

// CSS
gulp.task("css", function () {
  return gulp
    .src(["./css/**/*.css", "./css/**/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }))
    .on("error", sass.logError)
    .pipe(prefixer())
    .pipe(concat("main.css"))
    .pipe(sourcemaps.write("."))
    .dest(gulp.dest("./dist/css"))
    .pipe(livereload());
});

// Javascript
gulp.task("js", function () {
  return gulp.src("./js/*.js").pipe(concat("main.js")).pipe(minify()).pipe(gulp.dest("./dist/js")).pipe(livereload());
});

// Watch
gulp.task("watch", function () {
  require("./server");
  livereload.listen();
  gulp.watch("./html/**/*.pug", ["html"]);
  gulp.watch(["./html/**/*.css", "./html/**/*.scss"], ["css"]);
  gulp.watch("./html/**/*.js", ["js"]);
});
