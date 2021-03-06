import gulp, { series } from 'gulp';
import webpackConfig from './webpack.config.js';
import webpack from 'webpack-stream';
import browserSyncfrom 'browser-sync';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import eslint from 'gulp-eslint';

// gulpタスクの作成
gulp.task('build', function(done){
  gulp.src('src/js/app.js')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/js/'));
  done();
});
// const build = done => {
//   gulp.src('src/js/app.js')
//     .pipe(plumber({
//       errorHandler: notify.onError("Error: <%= error.message %>")
//     }))
//     .pipe(webpack(webpackConfig))
//     .pipe(gulp.dest('dist/js/'));
//     done();
// }
gulp.task('browser-sync', function(done) {
  browserSync.init({
    server: {
      baseDir: "./", // 対象ディレクトリ
      index: "index.html" //indexファイル名
    }
  });
  done();
});
// const browserServer = done => {
//   browserSync.init({
//     server: {
//       baseDir: "./", // 対象ディレクトリ
//       index: "index.html" //indexファイル名
//     }
//   });
//   done();
// }
gulp.task('bs-reload', function (done) {
  browserSync.reload();
  done();
});
// const bsReload = done => {
//   browserSync.reload();
//   done();
// }
gulp.task('eslint', function(done) {
  gulp.src(['src/js/*.js']) // lint のチェック先を指定
    .pipe(plumber({
      // エラーをハンドル
      errorHandler: function(error) {
        const taskName = 'eslint';
        const title = '[task]' + taskName + ' ' + error.plugin;
        const errorMsg = 'error: ' + error.message;
        // ターミナルにエラーを出力
        console.error(title + '\n' + errorMsg);
        // エラーを通知
        notify.onError({
          title: title,
          message: errorMsg,
          time: 3000
        });
      }
    }))
    .pipe(eslint({ useEslintrc: true })) // .eslintrc を参照
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .pipe(plumber.stop());
    done();
});
// const esError = done => {
//   gulp.src(['src/js/*.js']) // lint のチェック先を指定
//     .pipe(plumber({
//       // エラーをハンドル
//       errorHandler: function(error) {
//         const taskName = 'eslint';
//         const title = '[task]' + taskName + ' ' + error.plugin;
//         const errorMsg = 'error: ' + error.message;
//         // ターミナルにエラーを出力
//         console.error(title + '\n' + errorMsg);
//         // エラーを通知
//         notify.onError({
//           title: title,
//           message: errorMsg,
//           time: 3000
//         });
//       }
//     }))
//     .pipe(eslint({ useEslintrc: true })) // .eslintrc を参照
//     .pipe(eslint.format())
//     .pipe(eslint.failOnError())
//     .pipe(plumber.stop());
//     done();
// }

// Gulpを使ったファイルの監視
gulp.task('default', gulp.series( gulp.parallel('eslint', 'build', 'browser-sync'), function(done){
  gulp.watch('./src/*/*.js', gulp.task('build'));
  gulp.watch("./*.html", gulp.task('bs-reload'));
  gulp.watch("./dist/*/*.+(js|css)", gulp.task('bs-reload'));
  gulp.watch("./src/js/*.js", gulp.task('eslint'));
  done();
}));

// const watchFiles = () => {
//   watch('./src/*/*.js', build)
//   watch("./*.html", bsReload)
//   watch("./dist/*/*.+(js|css)", bsReload)
//   watch("./src/js/*.js", esError)
// }
// exports.default = series(browserServer, watchFiles)
