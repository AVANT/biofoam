// COPY FILES FOR TESTING, DEVING AND BUILDING
// DRY THIS UP WITH SOME ARGS AND GRUNT REG TASK //
module.exports = {
    // DEVELOPMENT
    assets2tmp: {
        files: [{
            expand: true,
            dot: true,
            cwd: 'app/assets/',
            dest: '.tmp',
            src: '**'
        }]
    },
    scripts2tmp: {
        files: [{
            expand: true,
            dot: true,
            cwd: 'app',
            dest: '.tmp/js/',
            src: ['**/*.js', '!jsdocs/**/*.js']
        }]
    },
    templates2tmp: {
        files: [{
            expand: true,
            dot: true,
            cwd: 'app/apps',
            dest: '.tmp/js/apps',
            src: '**/*.html'
        }]
    },
    styles2tmp: {
        files: [{
            expand: true,
            dot: true,
            cwd: 'app/styles',
            dest: '.tmp/css/',
            src: '**/*.css'
        }]
    },
    vendor2tmp: {
        files: [{
            expand: true,
            dot: true,
            flatten: true,
            cwd: 'bower_components',
            src: [
                'backbone/backbone.js',
                'backbone.localstorage/backbone.localstorage.js',
                'backbone.picky/lib/backbone.picky.js',
                'backbone.stickit/backbone.stickit.js',
                'backbone.syphon/backbone.syphon.js',
                'blueimp-load-image/js/*.js',
                'bootstrap/dist/js/bootstrap.js',
                'bootbox/bootbox.js',
                'handlebars/handlebars.js',
                'jcrop/js/jquery.Jcrop.js',
                'jquery/jquery.js',
                'marionette/lib/backbone.marionette.js',
                'requirejs/require.js',
                'spinjs/spin.js',
                'text/text.js',
                'underscore/underscore.js'
            ],
            dest: '.tmp/js/vendor'
        }, {
            expand: true,
            dot: true,
            flatten: true,
            cwd: 'vendor',
            src: 'Redactor/redactor/redactor.js',
            dest: '.tmp/js/vendor'
        }]
    },
    // BUILD
    assets2dist: {
        files: [{
            expand: true,
            dot: true,
            cwd: 'app/assets/',
            dest: 'dist',
            src: '**'
        }]
    },
    scripts2dist: {
        files: [{
            expand: true,
            dot: true,
            cwd: 'app',
            dest: 'dist/js/',
            src: '**/*.js'
        }]
    },
    styles2dist: {
        files: [{
            expand: true,
            dot: true,
            cwd: 'app/styles',
            dest: 'dist/css/',
            src: '**/*.css'
        }]
    },
    vendor2dist: {
        files: [{
            expand: true,
            dot: true,
            flatten: true,
            cwd: 'vendor',
            src: 'js/require*.js',
            dest: 'dist/js/'
        }, {
            expand: true,
            dot: true,
            flatten: true,
            cwd: 'vendor',
            src: 'js/almond*.js',
            dest: 'dist/js/'
        }, {
            expand: true,
            dot: true,
            flatten: true,
            cwd: 'vendor',
            src: 'js/**/*.js',
            dest: 'dist/js/vendor'
        }, {
            expand: true,
            dot: true,
            flatten: true,
            cwd: 'vendor',
            src: 'css/**/*.css',
            dest: 'dist/css/vendor'
        }]
    }
}
