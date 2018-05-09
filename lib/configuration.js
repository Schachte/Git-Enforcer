const yaml = require('js-yaml');
const fs = require('fs');

class Configuration {
  constructor (settings) {
    if (settings === undefined) {
      throw new Error('Add settings to .github/ in root');
    } else {

      this.settings = yaml.safeLoad(settings).polizei;

      if (this.settings === undefined) {
        throw new Error(Configuration.YML_LOADER_ERR);
      }
    }
  }

  static handleCurrentInstanceContext (context) {
    let github = context.github
    let repo = context.repo()

    return github.repos.getContent({
      owner: repo.owner,
      repo: repo.repo,
      path: Configuration.SPEC_PATH

    }).then(res => {
      let content = Buffer.from(res.data.content, 'base64').toString()
      return new Configuration(content)

    }).catch(error => {
      if (error.code === 404) { throw new Error(Configuration.YML_LOADER_ERR); }
      else throw error
    })
  }
}

Configuration.SPEC_PATH = '.github/polizei.yml'
Configuration.YML_LOADER_ERR = 'Invalid YML Spec. Please check the readme to validate your YML config.';

module.exports = Configuration
