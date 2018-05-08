var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
const Configuration = require('./configuration');
const IssueHandler = require('./issues/IssueHandler');
                            

class Handler {

  static async handleIssueEvent (context) {
    await this.handleIssue(context, context.payload.issue);
  }

  static async handlePullRequestEvent (context) {
    await this.handlePullRequest(context, context.payload.pull_request);
  }

  static async handleIssue(context, issue) {
    var config = await Configuration.handleCurrentInstanceContext(context)
    IssueHandler.validate_label_population(config, context);
      
  }

  static async handlePullRequest(context, pullRequest) {
    var config = await Configuration.handleCurrentInstanceContext(context)
  }
}

module.exports = Handler
