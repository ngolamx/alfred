module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'public/css/style.css': 'front-end/sass/main.scss'
        }
      }
    },
    postcss: {
      options: {
        // map: true, // inline sourcemaps
        // or
        map: {
            inline: false, // save all sourcemaps as separate files...
            annotation: 'public/css/' // ...to the specified directory
        },

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')(), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'public/css/style.css',
        dest: 'public/css/style.css'
      }
    },
    watch: {
      options: {
        livereload: 35729,
      },
      css: {
        files: 'front-end/**/*.scss',
        tasks: ['sass'],
      },
      js: {
        files: 'public/**/**.js',
      },
      views: {
        files: 'views/**/*.hbs',
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build:css', ['sass', 'postcss']);
  grunt.registerTask('default', ['watch']);
};
