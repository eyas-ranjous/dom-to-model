module.exports = (grunt) => {
  grunt.initConfig({
    eslint: {
      src: ['lib/**/*.js', '!lib/fixtures/*']
    },
    mochaTest: {
      files: ['lib/**/*.test.js']
    },
    mocha_istanbul: {
      coverage: {
        src: 'lib',
        options: {
          mask: '**/*.test.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-istanbul');

  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('coverage', ['mocha_istanbul']);
  grunt.registerTask('build', ['lint', 'coverage']);
};
