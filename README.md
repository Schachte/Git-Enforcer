# Git Polizei
GitHub Bot For Validating Pull Request Structure To Maintain Quality Codebases 


## Current Roadmap:
- Validating structure of pull request titles (prefix/suffix)
  - i.e (POLIZEI-45: Adding webhooks for author notifications)
- Validating structure of individual commit messages (prefix/suffix)
  - i.e (POLIZEI-45: Fixing bug in travis build)
  - i.e (Fixing bug in travis build (#214))
- Sending reminder notifications to requested reviewers to do a code review
- Validating the number of approvals to enable mergability
- Adding SMS config via Twilio API for customizable webhooks
- Roll-Your-Own capabilities
 
## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```
