class IssueHandler {

  /** Post message if label is missing from a new issue */
  static async validate_label_population(config, context) {
    console.log(context)
    const params = context.issue({body: "Error, add label to field"});
    return context.github.issues.createComment(params);
  }


}

module.exports = IssueHandler;