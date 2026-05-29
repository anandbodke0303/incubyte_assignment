module.exports = {
  default: {
    require: [
      'features/support/**/*.js',
      'features/step_definitions/**/*.js'
    ],
    paths: ['features/register.feature', 'features/login.feature'],
    format: ['progress', 'allure-cucumberjs/reporter']
  }
};
