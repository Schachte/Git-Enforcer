
<p align="center">
  <img src="https://i.imgur.com/tOQ5Bhh.png"/>
</p>


<p align="center">
  <a href="https://github.com/apps/git-enforcer">
    <img src="https://i.imgur.com/0n2G4WX.png"/>
  </a>
</p>

> GitHub bot for validating pull request structure, ensuring approval requests don't go stale, kicking off builds, automating issue labels, setting up CRON tasks, issuing reminders and more!


## Current Roadmap:
- Validating structure of pull request titles (prefix/suffix)
  - i.e (ENFORCR-45: Adding webhooks for author notifications)
- Validating structure of individual commit messages (prefix/suffix)
  - i.e (ENFORCR-45: Fixing bug in travis build)
  - i.e (Fixing bug in travis build (#214))
- Sending reminder notifications to requested reviewers to do a code review
- Validating the number of approvals to enable mergability
- Adding SMS config via Twilio API for customizable webhooks
- Roll-Your-Own capabilities
- Verifying Milestones were Attached to PR
- Verifying Issue Number was Linked in PR
- Kick off Travis.CI builds
- Add labels for stale PR's 
- Sending reminders with parse and PB-Scheduler
 
## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```
