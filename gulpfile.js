var gulp = require('gulp');
var tsc = require('gulp-tsc');
var shell = require('gulp-shell');
var runseq = require('run-sequence');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var replace = require('gulp-replace');
var path = require('path');

var paths = {
      src: './src/',
      tests: './out/tests/',
      dest: './out/'
};

gulp.task('default', ['buildrun']);

// Run

gulp.task('run', shell.task([
    'node ' + paths.dest + 'index.js'
]));

gulp.task('buildrun', function (cb) {
    runseq('build', 'run', cb);
});

// Compile

gulp.task('build', ['compile:typescript']);
gulp.task('compile:typescript', function () {
    return gulp
        .src(paths.src + '**/*.ts')
        .pipe(tsc({
            module: "CommonJS",
            sourcemap: true,
            emitError: false
        }))
        // Fix up the sourcemap locations
        .pipe(replace('"sources":["../', '"sources":["../../'))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('watch', ['build'], function () {
    return gulp.watch(paths.src, ['build']);
});

gulp.task('test', ['build'], function () {
    return gulp.src(paths.tests + '**/*.js', { read: false })
    // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({ reporter: 'nyan' }));
});
/*
gulp.task('develop', ['test', 'server-assets'], function () {
    nodemon({
        watch: paths.server.src,
        script: paths.server.dest + 'server.js',
        "execMap": {
            "js": "node --debug --nolazy"
        },
        ext: 'ts ejs',
        //tasks: ['test'],
        tasks: function (changedFiles) {
            var tasks = []
            changedFiles.forEach(function (file) {
                if (path.extname(file) === '.ts' && !~tasks.indexOf('test')) tasks.push('test')
                if (path.extname(file) === '.ejs' && !~tasks.indexOf('server-assets')) tasks.push('server-assets')
            })
            return tasks
        }
    })
});
*/
