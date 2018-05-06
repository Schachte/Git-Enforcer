
class Handler {

  static async handleIssueEvent (context) {
    await this.handleIssue(context, context.payload.pull_request);
  }

  static async handlePullRequestEvent (context) {
    await this.handlePullRequest(context, context.payload.pull_request);
  }

  static async handleIssue(context, issue) {
    console.log("This is the object for the associated issue");
    console.log(issue)
    console.log(JSON.stringify(issue));
  }

  static async handlePullRequest(context, pullRequest) {
    console.log("This is the object for the associated pull request");
    console.log(pullRequest)
    console.log(JSON.stringify(pullRequest));
  }
}

module.exports = Handler
