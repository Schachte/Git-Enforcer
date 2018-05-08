Class IssueHandler {

  /** Post message if label is missing from a new issue */
  static async validate_label_population(config, context, message) {
    const params = context.issue({body: message});
    return context.github.issues.createComments(params);
  }

}
