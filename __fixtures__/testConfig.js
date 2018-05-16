module.exports = {
  sampleData1: `
git-enforcer:
  issues:
    add_label_on_failure:
      color: "FFA500"
      name: "Issue Failure"
    title_must_contain:
      pattern: null
    title_must_not_contain:
      pattern: null
    title_must_be_prefixed:
      prefix: "[GIT-ENFORCE]"
    title_must_be_suffixed:
      suffix: null
    validate_label_population:
      message: "All issues require a label!"
    validate_assignee_population:
      message: "Be sure to add assignee!"
    milestone_required:
      message: null
      required_milestone_name: null
  pull_requests:
    approvals:
      number: 0
    title_must_contain:
      pattern: null
    title_must_not_contain:
      pattern: null
    title_must_be_prefixed:
      prefix: null
    title_must_be_suffixed:
      suffix: null
    commits_must_be_prefixed:
      prefix: null
    commits_must_be_suffixed:
      suffix: null
`,
  sampleData2: ``
}
