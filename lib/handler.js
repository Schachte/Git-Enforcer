const Configuration = require('./configuration');
const IssueHandler = require('./issues/IssueHandler');

class Handler {

  static async handleIssueEvents (context) {
    let config = await Configuration.handleCurrentInstanceContext(context);
    IssueHandler.validate_label_population(config, context);
  }

  static async handlePullRequestEvents (context) {
    let config = await Configuration.handleCurrentInstanceContext(context);
    await this.handlePullRequest(context, context.payload.pull_request);
  }
}

module.exports = Handler
