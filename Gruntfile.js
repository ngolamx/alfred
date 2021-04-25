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
      sass: {
        files: 'front-end/**/*.scss',
        tasks: ['sass'],
      },
      reload: {
        files: ['public/**/*.*', 'views/**/*.hbs', 'app/**/*.*'],
        options: {
          livereload: true,
        }
      }
      // css: {
      //   files: 'public/**/*.css',
      // },
      // js: {
      //   files: 'public/**/**.js',
      // },
      // views: {
      //   files: 'views/**/*.hbs',
      // }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build:css', ['sass', 'postcss']);
  grunt.registerTask('default', ['watch']);
};
