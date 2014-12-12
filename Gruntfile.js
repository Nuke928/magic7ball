module.exports = function(grunt) {
  grunt.initConfig({
    jsDir: 'public/js/',
    jsDistDir: 'dist/js/',    
    cssDir: 'public/css/',
    cssDistDir: 'dist/css/',
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        '.'
      ]
    },
    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'tap'
      },

      all: { src: 'tests/**/*.js' }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'dist/css/global.css': 'public/css/global.sass'
        }
      }
    },
    concat: {
      js: {
        options: {
          separator: ';'
        },
        src: ['<%=jsDir%>*.js'],
        dest: '<%=jsDistDir%><%= pkg.name %>.js'
      },
      css: {
        src: ['<%=cssDir%>*.css','dist/css/global.css'],
        dest: '<%=cssDistDir%><%= pkg.name %>.css'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%=jsDistDir%><%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        files: {
          '<%=cssDistDir%><%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
        }
      }
    },
    watch: {
      files: ['<%=jsDir%>*.js', '<%=cssDir%>*.css', '<%=cssDir%>*.sass'],
      tasks: ['sass', 'concat', 'uglify', 'cssmin', 'clean:postbuild']
    },
    imagemin: {
        dynamic: {
            files: [{
                expand: true,
                cwd: 'public/images/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'dist/images/'
            }]
        }
    },
    copy: {
      favicon: {
        files: [
          { 
            expand: true,
            cwd: 'public/images/', 
            src: ['favicon'], 
            dest:'dist/images/' 
          }
        ]
      }
    },
    clean: {
      postbuild: {
        src: ['dist/css/global.css']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  
  grunt.registerTask('build', ['sass', 'concat', 'uglify', 'cssmin', 'imagemin', 'copy', 'clean:postbuild']);
  grunt.registerTask('test', ['jshint', 'simplemocha']);
  grunt.registerTask('default', ['test', 'build', 'watch']);
};