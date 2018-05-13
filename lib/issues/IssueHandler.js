const Configuration = require('../configuration')
const Util = require('../util')
const groupBy = require('json-groupby')

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
    ]).then(
      function () {
        this.executeGitCommentCreation()
      }.bind(this)
    )
  }

  /** Post message if label is missing from a new issue */
  async validateLabelPopulation () {
    let labelConfig = this.config.labels.validate_label_population

    if (Util.isNotUndefined(labelConfig)) {
      if (!this.context.payload.issue.labels.length) {
        this.appendStatusMessage(labelConfig.message)
      }
    }
  }

  /** Validate that the issue title is prefixed with WIP or the required name */
  async validateTitlePrefix () {
    let prefixConfig = this.config.labels.title_must_be_prefixed
    let prefix = prefixConfig.prefix

    if (Util.isNotUndefined(prefixConfig) && Util.isNotUndefined(prefix)) {
      if (!this.context.payload.issue.title.startsWith(prefix)) {
        this.appendStatusMessage(`Title must be prefixed with: ${prefix}`)
      }
    }
  }

  /** Validate that the issue title is suffixed the required name */
  async validateTitleSuffix () {
    let suffixConfig = this.config.labels.title_must_be_suffixed
    let suffix = suffixConfig.suffix

    if (Util.isNotUndefined(suffixConfig) && Util.isNotUndefined(suffix)) {
      if (!this.context.payload.issue.title.endsWith(suffix)) {
        this.appendStatusMessage(`Title must be suffixed with: ${suffix}`)
      }
    }
  }

  /** Validating population of milestone or population of specific milestone */
  async validateMilestoneAssignment () {
    let milestoneConfig = this.config.labels.milestone_required
    let currentIssueMilestone = this.context.payload.issue.milestone

    if (Util.isNotUndefined(milestoneConfig)) {
      if (
        Util.isNotUndefined(milestoneConfig.message) &&
        Util.isNotUndefined(milestoneConfig.required_milestone_name) &&
        Util.isNotUndefined(currentIssueMilestone) &&
        currentIssueMilestone.title != milestoneConfig.required_milestone_name
      ) {
        this.appendStatusMessage(
          `Only issues pertaining to the "${milestoneConfig.required_milestone_name}" milestone are acceptable!`
        )
      } else if (Util.isNotUndefined(currentIssueMilestone)) {
        this.appendStatusMessage(milestoneConfig.message)
      }
    }
  }

  /** Ensures that assignees are present within label creation */
  async validateAsigneePopulation () {
    let assigneePopulationConfig = this.config.labels
      .validate_assignee_population
    let assigneeList = this.context.payload.issue.assignees

    if (
      Util.isNotUndefined(assigneePopulationConfig) &&
      Util.isNotUndefined(assigneePopulationConfig.message)
    ) {
      if (!assigneeList.length) {
        this.appendStatusMessage(assigneePopulationConfig.message)
      }
    }
  }

  /** Send API Req. to GH */
  async executeGitCommentCreation () {
    this.validator_message = this.validator_message.replace(
      this.issue_list.pattern,
      this.issue_list.issues
    )
    let params = this.context.issue({
      body: this.validator_message
    })
    if (this.issueHasIssues()) {
      await this.createFailureLabel()

      this.validator_message = this.validator_message.replace(
        this.issue_list.pattern,
        this.issue_list.issues
      )
      let params = this.context.issue({
        body: this.validator_message
      })
      if (this.issueHasIssues()) {
        return this.context.github.issues.createComment(params)
      }
    }
  }

  /** Creates custom label if analysis check fails */
  async createFailureLabel () {
    let labelConfig = this.config.labels.add_label_on_failure
    if (labelConfig && this.issueHasIssues()) {
      let color = labelConfig.color
      let name = labelConfig.name
      let existingLabelList = await this.getExistingLabels()
      let params = await this.constructNewLabel(name, color)

      // Only create label if we haven't already created it
      if (!Util.itemInList(existingLabelList, name)) {
        await this.context.github.issues.createLabel(params)
      }

      await this.attachLabelToIssue(name)
    }
  }

  async attachLabelToIssue (labelName) {
    await this.context.github.issues.addLabels(
      this.context.issue({
        labels: [labelName]
      })
    )
  }

  /** Create a new, custom GH label based on user-settings or defaults */
  async constructNewLabel (name, color) {
    let params = await this.context.issue({
      color: color != undefined
        ? color
        : Configuration.defaults.add_label_on_failure.color,
      name: name != undefined
        ? name
        : Configuration.defaults.add_label_on_failure.name
    })
    return params
  }

  /** Get current list of existing user issue labels */
  async getExistingLabels () {
    const result = await this.context.github.issues.getLabels(
      this.context.issue({})
    )
    let labelList = Object.keys(groupBy(result.data, ['name'])).map(function (
      label
    ) {
      return label
    })
    return labelList
  }

  /** User issue has failed the issue status check */
  issueHasIssues () {
    return this.issue_list.issues !== ''
  }

  /** Utility method for status reports to issues */
  appendStatusMessage (msg) {
    this.issue_list.issues += '\`\`\`\n - ' + msg + '\n\`\`\`\n'
  }
}

module.exports = IssueHandler
