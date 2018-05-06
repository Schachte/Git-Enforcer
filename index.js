/**
  Handle Pull Request Specific Events
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
    ]
  ), (context) => { }

  /**
    Handle Issue Specific Events
  */
  robot.on([
    'issues.milestoned',
    'issues.demilestoned',
    'issues.renamed',
    'issues.opened',
  ])
}

  // robot.on('issues.opened', async context => {
  //   // // `context` extracts information from the event, which can be passed to
  //   // // GitHub API calls. This will return:
  //   // //   {owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World!}
  //   // const params = context.issue({body: 'Hello World!'})
  //   //
  //   // // Post a comment on the issue
  //   // return context.github.issues.createComment(params)
