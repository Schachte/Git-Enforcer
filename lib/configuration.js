const yaml = require('js-yaml');
const fs = require('fs');

class Configuration {
  constructor (settings) {
    if (settings === undefined) {
      this.settings = {};
    } else {
      settings.yml_data = yaml.safeLoad(fs.readFileSync(settings.config_path, 'utf8'));
      this.settings = settings.yml_data.polizei;
      if (this.settings === undefined) {
        throw new Error(Configuration.YML_LOADER_ERR);
      }
    }
  }

  static handleCurrentInstanceContext (context) {
      let settings = {
        config_path: Configuration.SPEC_PATH,
        yml_data: null
      }

    let configData = new Configuration(settings);
    return configData;
  }
}

Configuration.SPEC_PATH = '.github/polizei.yml'
Configuration.YML_LOADER_ERR = 'Invalid YML Spec. Please check the readme to validate your YML config.';

module.exports = Configuration
