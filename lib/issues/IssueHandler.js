class IssueHandler {

  /** Post message if label is missing from a new issue */
  static async validate_label_population(config, context) {

    let params;
    
    if (context.payload.issue.labels.length == 0) {
      params = context.issue({body: "Don't create issues without labels"});
      return context.github.issues.createComment(params);
    } else {
      params = context.issue({body: "Nice use of labels!"});
      return context.github.issues.createComment(params);
    }
  }
}

module.exports = IssueHandler;