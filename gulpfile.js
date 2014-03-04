var gulp = require('gulp'),
    jade = require('gulp-jade'),
    browserify = require('gulp-browserify'),
    stylus = require('gulp-stylus'),
    lr = require('tiny-lr'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    color = require('cli-color');

var server = lr(),
    env = process.env.NODE_ENV === 'production' ? 'production' : 'develpoment',
    production = env === 'production';

var paths = {
    bundle: { src: 'app', out: 'app.zip' },
    views: { watch: [ 'views/**/*.jade', 'content/**/*' ], src: 'views/**/*.jade', out: 'app' },
    browserify: { watch: 'src/**/*.coffee' , src: 'src/index.coffee', out: 'app/js' },
    styles: { watch: 'styles/**/*.styl', src: 'styles/app.styl', out: 'app/css' },
    clean: { targets: 'app/**/*.html' }
};

function beep () {
    console.log('\007');
}

function handleError (error) {
    beep(error);
    console.log(color.bold('[ error caught ]:\n') + color.red(error));
}

gulp.task('browserify', function () {
    gulp.src(paths.browserify.src,  { read: false })
    .pipe(browserify({
        transform: [ 'coffeeify' ],
        extensions: [ '.coffee' ]
    }))
    .on('error', handleError)
    .pipe(rename('index.js'))
    .pipe(gulp.dest(paths.browserify.out))
    .pipe(livereload(server));
});

gulp.task('styles', function () {
    gulp.src(paths.styles.src)
    .pipe(stylus({
        pretty: !production,
        use: [ 'nib' ]
    }))
    .on('error', handleError)
    .pipe(gulp.dest(paths.styles.out))
    .pipe(livereload(server));
});

gulp.task('views', function () {
    gulp.src(paths.views.src)
    .pipe(jade({
        pretty: !production,
        locals: {
            env: env,
            production: production
        }
    }))
    .on('error', handleError)
    .pipe(gulp.dest(paths.views.out))
    .pipe(livereload(server));
});

gulp.task('livereload', function (next) {
    livereload(server);
    next();
});

gulp.task('listen', function (next) {
    server.listen(35729, next);
});

gulp.task('clean', function () {
    gulp.src(paths.clean.targets).pipe(clean());
});

gulp.task('build', [ 'clean', 'browserify', 'styles', 'views' ]);

gulp.task('watch', [ 'listen' ], function () {
    gulp.watch(paths.browserify.watch, [ 'browserify' ]);
    gulp.watch(paths.styles.watch, [ 'styles' ]);
    gulp.watch(paths.views.watch, [ 'views' ]);
});

gulp.task('default', [ 'build', 'watch' ]);