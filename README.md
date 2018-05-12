
<p align="center">
  <img src="https://i.imgur.com/tOQ5Bhh.png"/>
</p>


<p align="center">
  <a href="https://github.com/apps/git-enforcer">
    <img src="https://i.imgur.com/0n2G4WX.png"/>
  </a>
</p>

![](https://img.shields.io/badge/GitEnforcer-v0.0.1-green.svg)
[![Waffle.io - Columns and their card count](https://badge.waffle.io/Schachte/Git-Enforcer.svg?columns=all)](https://waffle.io/Schachte/Git-Enforcer)

> GitHub bot for validating user-defined pull request structure, ensuring approval requests don't go stale, validating issues follow a specific structure, sending SMS alerts on PR status checks, customizing labels, and more!

#### Table of Contents: 

- [Example Issue Validation Analysis](#example-issue-validation-analysis)
- [Issues Validation Support](#issues-validation-support)
- [Pull Request Validation Support](#pull-request-validation-support)
- [Example Configuration .yml](#example-configuration-yml)
- [Current Roadmap](#current-roadmap)
- [Setup](#setup)

## Example Issue Validation Analysis
![](https://i.imgur.com/Glqiyrv.png)

## Issues Validation Support

Currently, the following things are supported for issues:

| Feature        | Description           | Config Mapping  |
| ------------- |:-------------:| -----:|
| Issue Title Prefix Check      | Enforcing that an issue title must be prepended with a user-specified string | title_must_be_prefixed |
| Issue Title Suffix Check      | Enforcing that an issue title must be appended with a user-specified string      |   title_must_be_suffixed |
| Required Issue Labelling | Requires new issues to have at least N (user-specified) amount of labels      |    validate_label_population |
| Auto Label On Failure | Will auto-label issues that fail spot-check      |    tbd |
| Milestone Checker Verification | Verfifies issues assigned a milestone or a particular milestone      |    tbd |
| Assignee Checker Vericiation | Verfifies an assignee has been added to a particular milestone      |    tbd |


## Pull Request Validation Support

> TBD
    
## Example Configuration .yml

The configuration for Git-Enforcer is _extremely_ customizable. As a result, the config file is quite large. Not everything needs to be used or enabled, however, you can freely toggle things on and off through the file place in the `.github/git-enforcer.yml` location of your repo. 

```
#############################################################################
#                      GIT-ENFORCER RULE FILE GUIDELINES
#############################################################################
#
# This is a sample YML file for structuring your PR mergability requirements and
# issues that are created within your repository or organization.
#
# Any any time you want to ignore a particular rule, comment it out or don't add
# it into the file.
#
# ------------------------------------------------------------------------
# BELOW IS THE LIST OF AVAILABLE RULE DEFINITIONS THAT CAN BE DEFINED:
# ------------------------------------------------------------------------

# ---------------------------
# Issue Policy Configuration:
# ---------------------------
# add_label_on_failure            : Add custom label to issues that fail git-enforcer check
# title_must_contain              : Require issue title to contain a specific pattern
# title_must_not_contain          : Require issue to NOT contain a specific pattern in title
# title_must_be_prefixed          : Require text prefix to all issue titles
# title_must_be_suffixed          : Require text suffix to all issue titles
# validate_label_population       : Require labels to be populated on all issues
# validate_assignee_population    : Require assignees to be added to all issues
# milestone_required              : Require all issues to be assigned a milestone
#
# ---------------------------------
# Pull-Request Policy Configuration:
# ---------------------------------
# approvals                       : Require N no. of approvers to pass status check
# title_must_contain              : Pattern match on title to pass status check
# title_must_not_contain          : Pattern match to not contain in title 
# title_must_be_prefixed          : Require title prefix to pass status check
# title_must_be_suffixed          : Require title suffix to pass status check
# commits_must_be_prefixed        : Require commit prefix to pass status check
# commits_must_be_suffixed        : Require commit suffix to pass status check

#############################################################################

# Here is an example git-enforcer policy. A more detailed policy guide can be
# found within the GitHub readme.
git-enforcer:
  labels:
    add_label_on_failure:
      color: "FFA500"
      name: "Issue Failure"
    title_must_contain:
      pattern: null
    title_must_not_contain:
      pattern: null
    title_must_be_prefixed:
      prefix: "[GIT-ENFORCE]"
    title_must_be_suffixed:
      suffix: SUFFIX
    validate_label_population:
      message: "Don't create issues with no labels!"
    validate_assignee_population:
      message: "Remember to choose at least one assignee to this issue!"
    milestone_required:
      message: "A milestone is required to be selected when making a new issue"
      required_milestone_name: null
  pull_requests:
    approvals:
      number: 0
    title_must_contain:
      pattern: null
    title_must_not_contain:
      pattern: null
    title_must_be_prefixed:
      prefix: null
      suffix: null
    commits_must_be_prefixed:
      prefix: null
    commits_must_be_suffixed:
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
