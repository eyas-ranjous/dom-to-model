module.exports = (grunt) => {
  grunt.initConfig({
    eslint: {
      src: ['lib/**/*.js', 'test/**/*.js', '!test/fixtures/*']
    },
    mochaTest: {
      files: ['test/**/*.test.js']
    },
    nyc_mocha:{
      target:  {
        src: 'test/**/*.test.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nyc-mocha');

  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('coverage', ['nyc_mocha:target']);
  grunt.registerTask('build', ['lint', 'coverage']);
};
