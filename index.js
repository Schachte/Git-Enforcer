const Handler = require('./lib/handler');
const EventRegistrar = require('lib/event_registrar');


let prEvents = [
  'pull_request.opened',
  'pull_request.edited',
  'pull_request_review.submitted',
  'pull_request_review.edited',
  'pull_request_review.dismissed',
  'pull_request.labeled',
  'pull_request.unlabeled',
  'pull_request.synchronize'
]

let issueEvents = [
  'issues.milestoned',
  'issues.demilestoned',
  'issues.renamed',
  'issues.opened'
]

module.exports = (robot) => {

/** Pull Requests */
  robot.on(
    prEvents,
    (context) => { Handler.handlePullRequestEvent(context) }
  )

/** Issues */
  robot.on(
    issueEvents,
    (context) => { Handler.handleIssueEvent(context) }
  )
};
