module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          '.temp/main.css': 'front-end/sass/main.scss'
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
        src: '.temp/main.css',
        dest: 'public/css/style.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('build:css', ['sass', 'postcss']);
};
