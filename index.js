const Handler = require('./lib/handler');

/**
  Handle Pull Request Specific Events To PR Handler
*/
module.exports = (robot) => {
  robot.on(
    [ 'pull_request.opened',
      'pull_request.edited',
      'pull_request_review.submitted',
      'pull_request_review.edited',
      'pull_request_review.dismissed',
      'pull_request.labeled',
      'pull_request.unlabeled',
      'pull_request.synchronize'
    ],
    (context) => { Handler.handlePullRequestEvent(context) }
  )

  /**
    Handle Issue Specific Events
  */
  robot.on([
      'issues.milestoned',
      'issues.demilestoned',
      'issues.renamed',
      'issues.opened',
    ],
    (context) => { Handler.handleIssueEvent(context) }
  )
};
