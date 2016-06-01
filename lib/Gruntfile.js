module.exports = function(grunt) {
  grunt.initConfig({
    requirejs: {
      compile: {
        options: {
          name: "main",
          out: "../built.js",
          baseUrl: "../javascripts/",
          findNestedDependencies: true,
          paths: {
            q: "../lib/bower_components/q/q",
            lodash: "../lib/bower_components/lodash/lodash.min",
            firebase: "../lib/bower_components/firebase/firebase",
            jquery: "../lib/bower_components/jquery/dist/jquery.min",
            hbs: "../lib/bower_components/require-handlebars-plugin/hbs",
            bootstrap: "../lib/bower_components/bootstrap/dist/js/bootstrap.min"
          },
          shim: {
            "bootstrap": ["jquery"],
            "firebase": {
                exports: "firebase"
            }
          }
        }
      }
    },
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3,
          progressive: true,
          interlaced: true
        },
        files: [{
          expand: true,
          cwd: "../dev-images/",
          src: ["**/*.{png,jpg,gif}"],
          dest: "../images/"
        }]
      }
    },
    jshint: {
      files: ['../javascripts/**/*.js']
    },
    sass: {
      dist: {
        files: {
          '../styles/main.css': '../sass/main.scss'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['../javascripts/**/*.js'],
        tasks: ['jshint']
      },
      sassy: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'watch']);
};
