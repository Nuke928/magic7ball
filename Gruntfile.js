module.exports = function(grunt) {
  grunt.initConfig({
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
        grep: '*-test',
        ui: 'bdd',
        reporter: 'tap'
      },

      all: { src: 'tests/**/*.js' }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  
  grunt.registerTask('default', ['simplemocha','jshint']);
};