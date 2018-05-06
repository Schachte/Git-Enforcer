const yaml = require('js-yaml');
const fs = require('fs');

class Configuration {
  constructor (settings) {
    if (settings === undefined) {
      this.settings = {};
    } else {
      this.settings.yml_data = yaml.safeLoad(fs.readFileSync(settings.configPath, 'utf8'));
      if (this.settings === undefined) { throw new Error(Configuration.YML_LOADER_ERR) }
    }

    this.loadDefaults();
  }

  /** Populate the settings object with the correct user-data */
  loadDefaults() {
    console.log("The value is settings is now: ");
    console.log(this.settings.yml_data);
  }

  /** Handle the current contextual value from GitHub to process */
  static handleCurrentInstanceContext (context) {
      console.log('The current context is:');
      console.log(context);

      let settings = {
        configPath: Configuration.SPEC_PATH
      }

      let configData = new Configuration(settings);
  }
}

Configuration.SPEC_PATH = '.github/polizei.yml'
Configuration.YML_LOADER_ERR = 'Invalid YML Spec. Please check the readme to validate your YML config.';

module.exports = Configuration
