const yaml = require('js-yaml')
const fs = require('fs')

/**
  * Configures the current context request for a particular user event
*/
class Configuration {
  constructor (settings) {
    if (settings === undefined) {
      throw new Error('Add settings to .github/ in root')
    } else {
      this.settings = yaml.safeLoad(settings)[Configuration.YML_POLICY_NAME]

      if (this.settings === undefined) {
        throw new Error(Configuration.YML_LOADER_ERR)
      }
    }
  }

  /** Handle current logic for current request context */
  static handleCurrentInstanceContext (context) {
    console.log('This is getting called properly')
    let github = context.github
    let repo = context.repo()

    return github.repos.getContent({
      owner: repo.owner,
      repo: repo.repo,
      path: Configuration.SPEC_PATH

    }).then(res => {
      let settings = Buffer.from(res.data.content, 'base64').toString()
      console.log('Settings')
      console.log(settings)
      return new Configuration(settings)
    }).catch(error => {
      if (error.code === 404) {
        throw new Error(Configuration.YML_LOADER_ERR)
      } else throw error
    })
  }
}

// File name
Configuration.YML_POLICY_NAME = 'git-enforcer'

// Location of the actual YML on the users repository to load in the custom preferences
Configuration.SPEC_PATH = `.github/${Configuration.YML_POLICY_NAME}.yml`

// Loader error for YML parser
Configuration.YML_LOADER_ERR =
  'Invalid YML Spec. Please check the readme to validate your YML config.'

// Logo used to post onto PRs/Issues
Configuration.POSTER_IMAGE =
  'https://user-images.githubusercontent.com/7055226/39845985-f15aca58-53ad-11e8-9d2c-01bcd6bc55f9.png'

module.exports = Configuration
