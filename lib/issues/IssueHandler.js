class IssueHandler {
  constructor(config, context) {
    this.config = config.settings;
    this.context = context;

    this.validate_label_population();
    this.validate_title_prefix();
    this.validate_title_suffix();
  }

  /** Post message if label is missing from a new issue */
  async validate_label_population() {
    let labelConfig = this.config.validate_label_population;

    if (labelConfig.enabled) {
      if (this.context.payload.issue.labels.length === 0) {
        let params = this.context.issue({body: labelConfig.message});
        return this.context.github.issues.createComment(params);
      }
    }
  }

  async validate_title_prefix() {
    console.log('validate_title_prefix not implemented');
  }

  async validate_title_suffix() {
    console.log('validate_title_suffix');
  }
}

module.exports = IssueHandler;
