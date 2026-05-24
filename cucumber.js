module.exports = {
  default: {
    require: [
      'features/support/**/*.js',
      'features/step_definitions/**/*.js'
    ],
    // Explicit ordered list ensures register runs before login without renaming files
    paths: ['features/register.feature', 'features/login.feature'],
    format: ['progress']
  }
};
