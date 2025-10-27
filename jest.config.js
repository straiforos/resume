module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*test*.js'],
  collectCoverageFrom: [
    'theme/**/*.js',
    '!theme/**/*.test.js'
  ]
};

