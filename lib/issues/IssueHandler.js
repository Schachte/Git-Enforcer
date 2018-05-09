class IssueHandler {
  constructor(config, context) {
    this.config = config;
    this.context = context;

    validate_label_population();
  }

  /** Post message if label is missing from a new issue */
  static async validate_label_population() {
    let params;
    console.log("Calling label validation")
    console.log(this.config);

    if (this.context.payload.issue.labels.length == 0) {
      params = this.context.issue({body: "Don't create issues without labels"});
      return this.context.github.issues.createComment(params);
    }
  }
}

module.exports = IssueHandler;
