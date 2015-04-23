module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    app: {
      assets: ''
    },

    sass: {
      dist: {
        options: {
          sourceMap: true,
          outputStyle: 'compressed'
        },
        files: {
          '<%= app.assets %>css/style.min.css': '<%= app.assets %>_css/style.scss'
        }
      }
    },

    autoprefixer: {
      global: {
        src: '<%= app.assets %>css/style.min.css',
        dest: '<%= app.assets %>css/style.min.css'
      }
    },

    shell: {
      jekyll_serve: {
        command: "jekyll serve"
      },
      jekyll_build: {
        command: "jekyll build"
      }
    },

    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: ['<%= app.assets %>_css/**/*.scss'],
        tasks: [
          'sass',
          'autoprefixer',
          'shell:jekyll_build'
        ]
      },
      js: {
        files: ['<%= app.assets %>_js/**/*.js'],
        tasks: [
          'newer:concat',
          'newer:uglify',
          'shell:jekyll_build'
        ]
      },
      livereload: {
        files: [
          '*.html',
          '<%= app.assets %>css/style.min.css',
          '<%= app.assets %>js/script.min.js',
          '<%= app.assets %>img/**/*.{svg,svgz,png,jpg,gif}'
        ],
        tasks: ['shell:jekyll_build']
      }
    }
  });

  grunt.registerTask('serve', ['shell:jekyll_serve']);
  grunt.registerTask('default', ['sass', 'autoprefixer', 'shell:jekyll_build', 'watch']);
};