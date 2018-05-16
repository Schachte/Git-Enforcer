const yaml = require('js-yaml')
const fs = require('fs')

/** Configures the current context request for a particular user event */
class Configuration {
  constructor (settings) {
    try {
      /**
       * TODO:
       * Would be nice to have a validation function to ensure
       * all keys/vals are present before continuing based
       * on the current config.
      */
      this.settings = yaml.safeLoad(settings)[Configuration.YML_POLICY_NAME]
    } catch (e) {
      throw new Error(Configuration.YML_LOADER_ERR)
    }
  }

  /** Handle current logic for current request context */
  static handleCurrentInstanceContext (context) {
    let github = context.github
    let repo = context.repo()

    return github.repos
      .getContent({
        owner: repo.owner,
        repo: repo.repo,
        path: Configuration.SPEC_PATH
      })
      .then(res => {
        let settings = Buffer.from(res.data.content, 'base64').toString()
        return new Configuration(settings)
      })
      .catch(error => {
        throw new Error(Configuration.GITHUB_RETRIEVAL_ERR)
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

// Unable to properly retrieve the github user content data
Configuration.GITHUB_RETRIEVAL_ERR =
  'The request for retrieving the user data from the github source is invalid.'

// Unable to properly retrieve the YML config
Configuration.ADD_SETTINGS_ERR =
  'The loaded settings were null, please ensure the YML file exists in .github/git-enforcer.yml'

// Logo used to post onto PRs/Issues
Configuration.POSTER_IMAGE =
  'https://user-images.githubusercontent.com/7055226/39845985-f15aca58-53ad-11e8-9d2c-01bcd6bc55f9.png'

Configuration.TEMPLATE_DEFAULT =
  'No explicit #{} was defined, please add #{} field to config'

Configuration.defaults = {
  add_label_on_failure: {
    color: 'FFA500',
    name: 'Git-Enforcer Issue Failure'
  },
  message: Configuration.TEMPLATE_DEFAULT.replace('${}', 'message'),
  milestone_required: Configuration.TEMPLATE_DEFAULT.replace('${}', 'message'),
  prefix: Configuration.TEMPLATE_DEFAULT.replace('${}', 'prefix'),
  suffix: Configuration.TEMPLATE_DEFAULT.replace('${}', 'suffix'),
  pattern: Configuration.TEMPLATE_DEFAULT.replace('${}', 'pattern'),
  title_must_contain: Configuration.TEMPLATE_DEFAULT.replace(
    '${}',
    'title_must_contain'
  ),
  title_must_not_contain: Configuration.TEMPLATE_DEFAULT.replace(
    '${}',
    'title_must_not_contain'
  ),
  title_must_be_prefixed: Configuration.TEMPLATE_DEFAULT.replace(
    '${}',
    'title_must_be_prefixed'
  ),
  title_must_be_suffixed: Configuration.TEMPLATE_DEFAULT.replace(
    '${}',
    'title_must_be_suffixed'
  ),
  validate_label_population: Configuration.TEMPLATE_DEFAULT.replace(
    '${}',
    'validate_label_population'
  ),
  validate_assignee_population: Configuration.TEMPLATE_DEFAULT.replace(
    '${}',
    'validate_assignee_population'
  ),
  required_milestone_name: Configuration.TEMPLATE_DEFAULT.replace(
    '${}',
    'required_milestone_name'
  )
}

module.exports = Configuration
