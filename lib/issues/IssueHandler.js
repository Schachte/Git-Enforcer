class IssueHandler {
  constructor(config, context) {
    this.config = config.settings;
    this.context = context;
    this.validator_message = '''
   ------------------------------------------------------
    __    ___     ___       ___  __   __   __   ___  __
   / _` |  |     |__  |\ | |__  /  \ |__) /  ` |__  |__)
   \__> |  |     |___ | \| |    \__/ |  \ \__, |___ |  \ (Issue Analysis)
   ------------------------------------------------------\n
    '''

    this.validate_label_population();
    this.validate_title_prefix();
    this.validate_title_suffix();
    this.executeGitCommentCreation();
  }

  /** Post message if label is missing from a new issue */
  async validate_label_population() {
    let labelConfig = this.config.validate_label_population;

    if (labelConfig.enabled) {
      if (this.context.payload.issue.labels.length === 0) {
        this.validator_message += labelConfig.message + '\n';
      }
    }
  }

  async validate_title_prefix() {
    console.log('validate_title_prefix not implemented');
  }

  async validate_title_suffix() {
    console.log('validate_title_suffix');
  }

  async executeGitCommentCreation() {
      let params = this.context.issue({body: this.validator_message});
      return this.context.github.issues.createComment(params);
  }
}

module.exports = IssueHandler;
