// const { compose } = require("react-app-rewired");
const rewireStyledComponents = require("react-app-rewire-styled-components");
const rewireEslint = require("react-app-rewire-eslint");

//  custom config
module.exports = function(config, env) {
  // const rewires = compose(
  //   rewireStyledComponents(config, env),
  //   rewireEslint(config, env)
  // );
  config = rewireStyledComponents(config, env);
  config = rewireEslint(config, env);

  // return rewires(config, env);
  return config;
};
