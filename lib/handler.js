const Configuration = require('./configuration');
const IssueHandler = require('./issues/IssueHandler');

class Handler {

  static async handleIssueEvents (context) {
    let config = await Configuration.handleCurrentInstanceContext(context);
    new IssueHandler(config, context);
  }

  static async handlePullRequestEvents (context) {
    throw new Error("Pull Requests Unsupported In Current Version!");
  }
}

module.exports = Handler
