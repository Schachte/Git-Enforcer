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
      this.validateMilestoneAssignment(),
      this.validateLabelPopulation(),
      this.validateTitlePrefix(),
      this.validateTitleSuffix(),
      this.validateAsigneePopulation()
    ])
      .then(function (values) {
        this.executeGitCommentCreation()
      }.bind(this))
  }

  /** Post message if label is missing from a new issue */
  async validateLabelPopulation () {
    let labelConfig = this.config.labels.validate_label_population

    if (!Util.isUndefined(labelConfig)) {
      if (this.context.payload.issue.labels.length) {
        this.appendStatusMessage(labelConfig.message)
      }
    }
  }

  /** Validate that the issue title is prefixed with WIP or the required name */
  async validateTitlePrefix () {
    let prefixConfig = this.config.labels.title_must_be_prefixed
    let prefix = prefixConfig.prefix

    if (!Util.isUndefined(prefixConfig) && prefix != null) {
      if (!this.context.payload.issue.title.startsWith(prefix)) {
        this.appendStatusMessage(`Title must be prefixed with: ${prefix}`)
      }
    }
  }

  /** Validate that the issue title is suffixed the required name */
  async validateTitleSuffix () {
    console.log('we are validating the title suffixed here')
    let suffixConfig = this.config.labels.title_must_be_suffixed
    let suffix = suffixConfig.suffix

    if (!Util.isUndefined(suffixConfig) && suffix != null) {
      if (!this.context.payload.issue.title.endsWith(suffix)) {
        this.appendStatusMessage(`Title must be suffixed with: ${suffix}`)
      }
    }
  }

  /** Validating population of milestone or population of specific milestone */
  async validateMilestoneAssignment () {
    let milestoneConfig = this.config.labels.milestone_required
    let currentIssueMilestone = this.context.payload.issue.milestone

    if (!Util.isUndefined(milestoneConfig)) {
      if (milestoneConfig.required_milestone_name != null
        && currentIssueMilestone != null
        && currentIssueMilestone.title != milestoneConfig.required_milestone_name) {
        this.appendStatusMessage(`Only issues pertaining to the "${milestoneConfig.required_milestone_name}" milestone are acceptable!`)
      } else if (currentIssueMilestone == null) {
        this.appendStatusMessage(milestoneConfig.message)
      }
    }
  }

  /** Ensures that assignees are present within label creation */
  async validateAsigneePopulation () {
    let assigneePopulationConfig = this.config.labels.validate_assignee_population
    let assigneeList = this.context.payload.issue.assignees

    if (!Util.isUndefined(assigneePopulationConfig)) {
      if (assigneeList.length === 0) {
        this.appendStatusMessage(assigneePopulationConfig.message)
      }
    }
  }

  /** Send API Req. to GH */
  async executeGitCommentCreation () {
    this.validator_message = this.validator_message.replace(this.issue_list.pattern,
      this.issue_list.issues)
    let params = this.context.issue({
      body: this.validator_message
    })
    if (this.issue_list.issues !== '') {
      return this.context.github.issues.createComment(params)
    }
  }

  /** Utility method for status reports to issues */
  appendStatusMessage (msg) {
    this.issue_list.issues += '\`\`\`\n - ' + msg + '\n\`\`\`\n'
  }
}

module.exports = IssueHandler
