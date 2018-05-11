
<p align="center">
  <img src="https://i.imgur.com/tOQ5Bhh.png"/>
</p>


<p align="center">
  <a href="https://github.com/apps/git-enforcer">
    <img src="https://i.imgur.com/0n2G4WX.png"/>
  </a>
</p>

> GitHub bot for validating pull request structure, ensuring approval requests don't go stale, kicking off builds, automating issue labels, setting up CRON tasks, issuing reminders and more!

#### Table of Contents: 

- [Issues Validation Support](#issues-validation-support)
- [Pull Request Validation Support](#pull-request-validation-support)
- [Example Configuration .yml](#example-configuration-yml)
- [Current Roadmap](#current-roadmap)
- [Setup](#setup)


![](https://img.shields.io/badge/GitEnforcer-v0.0.1-green.svg)
[![Waffle.io - Columns and their card count](https://badge.waffle.io/Schachte/Git-Enforcer.svg?columns=all)](https://waffle.io/Schachte/Git-Enforcer)

## Issues Validation Support

Currently, the following things are supported for issues:

| Feature        | Description           | Config Mapping  |
| ------------- |:-------------:| -----:|
| Issue Title Prefix Check      | Enforcing that an issue title must be prepended with a user-specified string | title_must_be_prefixed |
| Issue Title Suffix Check      | Enforcing that an issue title must be appended with a user-specified string      |   title_must_be_suffixed |
| Required Issue Labelling | Requires new issues to have at least N (user-specified) amount of labels      |    validate_label_population |


## Pull Request Validation Support

> TBD
    
## Example Configuration .yml

The configuration for Git-Enforcer is _extremely_ customizable. As a result, the config file is quite large. Not everything needs to be used or enabled, however, you can freely toggle things on and off through the file place in the `.github/git-enforcer.yml` location of your repo. 

```
#############################################################################
#                      GIT-ENFORCER RULE FILE GUIDELINES
#############################################################################
#
# This is a sample YML file for structuring your PR mergability requirements
# Any any time you want to ignore a particular rule, write null or delete the
# entirely.
#
# approvals: Any integer value that represents the no. of required approvers.
# title_must_contain: Regex rule that needs to contain string, pipe delimiter
# title_must_not_contain: Regex rule that must not contain string, pipe delimiter
# title_must_be_prefixed: Prefix requirement for PR title
# title_must_be_suffixed: Suffix requirement for PR title
# commit_must_be_prefixed: Prefix requirement for PR (individual commits)
# commit_must_be_suffixed: Suffix requirement for PR (individual commits)
# validate_label_population: Ensures that labels must be added to an opened issue
#############################################################################

# Here is an example git-enforcer policy:
# All settings can be saved, but toggling the enabled flag will conditionally
# shut them off 1 by 1.
git-enforcer:
  labels:
    title_must_contain:
      enabled: true
      pattern: null
    title_must_not_contain:
      enabled: true
      pattern: null
    title_must_be_prefixed:
      enabled: true
      prefix: "[GIT-ENFORCE]"
    title_must_be_suffixed:
      enabled: true
      suffix: SUFFIX
    commits_must_be_prefixed:
      enabled: true
      prefix: null
    commits_must_be_suffixed:
      enabled: true
      suffix: null
    validate_label_population:
      enabled: true
      message: "Don't create issues with no labels!"
  pull_requests:
    approvals:
      enabled: true
      number: 0
    title_must_contain:
      enabled: true
      pattern: null
    title_must_not_contain:
      enabled: true
      pattern: null
    title_must_be_prefixed:
      enabled: true
      prefix: null
    title_must_be_suffixed:
      enabled: true
      suffix: null
    commits_must_be_prefixed:
      enabled: true
      prefix: null
    commits_must_be_suffixed:
      enabled: true
      suffix: null
```


## Current Roadmap
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
