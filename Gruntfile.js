'use strict';
module.exports = function(grunt){
  // load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-simple-mocha');

  // configure
  grunt.initConfig({

    clean: { // remove all files from dist/
      dev: {
        src:['dist']
      }
    },

    copy: { // copy files from app/ --> dist/
      dev: {
        expand: true,
        cwd: 'app/',
        src: ['*.html', 'js/**/*.js', 'icons/**/*.*', '*.png', '*.json' ],
        dest: 'dist/',
        filter: 'isFile'
      }
    },

    simplemocha: {
      all: {
        src: ['test/mocha/**/*.js']
      }
    },

    express: {
      dev: {
        options: {
          script: 'server.js'
        }
      }
    },

    watch: {
      express: {
        files: ['app/js/**/*.js', 'app/*.html', 'app/views/**/*.html', 
                'server.js', 'models/*.js', 'routes/*.js'],
        tasks: ['build:dev', 'express:dev'],
        options: {
          spawn: false
        }
      }
    }

  });

  // register tasks
  grunt.registerTask('default', [ 'clean:dev', 'copy:dev']);

  grunt.registerTask('build:dev', ['clean:dev', 'copy:dev']);

  grunt.registerTask('test', ['simplemocha']);

  grunt.registerTask('watch:dev', ['build:dev','express:dev', 'watch:express']);

};