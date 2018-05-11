const Configuration = require('./configuration')

class Util {

  /** Gather the message used to post summary for issues */
  static getIssueMessage (user, pattern) {
    // Formatting non-conventional due to markdown placement requirement
    return `
[![Go To Top of Issue Page](${Configuration.POSTER_IMAGE})]()
#### Issue Summary Analysis for @${user}:\n
${pattern}
`
  }

  /** Check if a given value is undefined or not */
  static isUndefined (input) {
    return input !== undefined ? true : false
  }
}

module.exports = Util
