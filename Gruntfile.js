(function(module){

  'use strict';

  var BUILD_DIR = 'build/';
  var CSS_DIR   = 'assets/styles/';
  var JS_DIR    = 'assets/scripts/';
  var IMG_DIR   = 'assets/images/'

  module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      // We provide globals to meta so they can be used dynamically in strings for property names.
      meta: {
        build: BUILD_DIR,
        css: CSS_DIR,
        js: JS_DIR,
        image: IMG_DIR
      },
      less: {
        compile: {
          files: {
            '<%= meta.css %>css/custom.css': ['<%= meta.css %>less/custom.less']
          }
        }
      },
      cssmin: {
        compress: {
          options: {
            banner: '/* Minified and Combined CSS */'
          },
          files: {
            '<%= meta.css %>custom.min.css': ['<%= meta.css %>css/custom.css']
          }
        }
      },
      uglify: {
        options: {
          mangle: false,
          compress: false
        },
        jsmin: {
          files: {
            '<%= meta.js %>custom.min.js': ['<%= meta.js %>js/custom.js'],
            '<%= meta.js %>libs.min.js': ['<%= meta.js %>libs/jquery-1.11.1.min.js']
          }
        }
      },
      imagemin: {
        dist: {
          options: {
            optimizationLevel: 5
          },
          files: [{
            expand: true,
            cwd: '<%= meta.image %>src',
            src: ['**/*.{png,jpg,gif,svg}'],
            dest: '<%= meta.image %>'
          }]
        }
}
    });

    // ////////////////// //
    // LOAD GRUNT MODULES //
    // ////////////////// //
    
    // Complile LESS
    grunt.loadNpmTasks('grunt-contrib-less');

    // Minify CSS
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Uglify for minification
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // //////////////////// //
    // REGISTER GRUNT TASKS //
    // //////////////////// //
    // Default task(s).
    grunt.registerTask('default', ['build']);

    grunt.registerTask('build', ['less:compile', 'cssmin:compress', 'uglify:jsmin']);

    // Minify CSS files only
    grunt.registerTask('css', ['less:compile', 'cssmin:compress']);

    // Minify JS files only
    grunt.registerTask('js', ['uglify:jsmin']);

    //Optimize images only
    grunt.registerTask('img', ['imagemin']);

  };

}(module));