const Configuration = require('../configuration')
const Util = require('../util')

class IssueHandler {
  constructor (config, context) {
    this.config = config.settings
    this.context = context

    // Issues will be aggregates and populates here before execution to GH
    this.issue_list = {
      issues: '',
      pattern: '[replace_pattern]'
    }

    // Message that will get posted to the GitHub issues page
    this.validator_message = Util.getIssueMessage(
        context.payload.issue.user.login,
        this.issue_list.pattern
      )

    /**
      * This will execute all validator issues at once.
      * Validation for determining execution will be read from the users config
    */
    Promise.all([
      this.validate_label_population(),
      this.validate_title_prefix(),
      this.validate_title_suffix()
    ])
      .then(function (values) {
        this.executeGitCommentCreation()
      }.bind(this))
  }

  /** Post message if label is missing from a new issue */
  async validate_label_population () {
    let labelConfig = this.config.validate_label_population

    if (labelConfig.enabled) {
      if (this.context.payload.issue.labels.length === 0) {
        this.appendStatusMessage(labelConfig.message)
      }
    }
  }

  /** Validate that the issue title is prefixed with WIP or the required name */
  async validate_title_prefix () {
    this.context.log.warn('validate_title_prefix not implemented')
  }

  /** Validate that the issue title is suffixed the required name */
  async validate_title_suffix () {
    this.context.log.warn('validate_title_suffix')
  }

  /** Send API Req. to GH */
  async executeGitCommentCreation () {
    this.validator_message = this.validator_message.replace(this.issue_list.pattern,
      this.issue_list.issues)
    let params = this.context.issue({
      body: this.validator_message
    })
    return this.context.github.issues.createComment(params)
  }

  appendStatusMessage (msg) {
    this.issue_list.issues += '- ' + msg + '\n'
  }
}

module.exports = IssueHandler
