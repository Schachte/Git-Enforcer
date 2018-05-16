const { createRobot } = require('probot')
const Config = require('../lib/configuration')
const testConfig = require('../__fixtures__/testConfig')

test('failure thrown with invalid config data', async () => {
  let context = {
    repo: jest.fn().mockReturnValue({
      repo: '',
      owner: ''
    }),
    payload: {
      pull_request: {
        number: 1
      }
    },
    github: {
      repos: {
        getContent: jest.fn().mockReturnValue(
          Promise.resolve({
            data: {
              content: Buffer.from(testConfig.sampleData2).toString('base64')
            }
          })
        )
      }
    }
  }

  try {
    await Config.handleCurrentInstanceContext(context)
  } catch (e) {
    expect(e.message).toMatch(Config.GITHUB_RETRIEVAL_ERR)
  }
})

test('context loads the proper yml config', () => {
  let context = {
    repo: jest.fn().mockReturnValue({
      repo: '',
      owner: ''
    }),
    payload: {
      pull_request: {
        number: 1
      }
    },
    github: {
      repos: {
        getContent: jest.fn().mockReturnValue(
          Promise.resolve({
            data: {
              content: Buffer.from(testConfig.sampleData1).toString('base64')
            }
          })
        )
      }
    }
  }
  Promise.all([Config.handleCurrentInstanceContext(context)]).then(data => {
    let settings = data[0].settings

    // Root Level Elements
    expect(settings).toHaveProperty('issues')
    expect(settings).toHaveProperty('pull_requests')

    // Issue Level Elements
    expect(settings.issues).toHaveProperty('add_label_on_failure')
    expect(settings.issues).toHaveProperty('title_must_contain')
    expect(settings.issues).toHaveProperty('title_must_not_contain')
    expect(settings.issues).toHaveProperty('title_must_be_prefixed')
    expect(settings.issues).toHaveProperty('title_must_be_suffixed')
    expect(settings.issues).toHaveProperty('validate_label_population')
    expect(settings.issues).toHaveProperty('validate_assignee_population')
    expect(settings.issues).toHaveProperty('milestone_required')

    // Pull Request Level Elements
    expect(settings.pull_requests).toHaveProperty('approvals')
    expect(settings.pull_requests).toHaveProperty('title_must_contain')
    expect(settings.pull_requests).toHaveProperty('title_must_not_contain')
    expect(settings.pull_requests).toHaveProperty('title_must_be_prefixed')
    expect(settings.pull_requests).toHaveProperty('commits_must_be_prefixed')
    expect(settings.pull_requests).toHaveProperty('commits_must_be_suffixed')

    // Issue Level Element Values
    expect(settings.issues.add_label_on_failure['color']).toBe('FFA500')
    expect(settings.issues.add_label_on_failure['name']).toBe('Issue Failure')
    expect(settings.issues.title_must_contain['pattern']).toBe(null)
    expect(settings.issues.title_must_not_contain['pattern']).toBe(null)
    expect(settings.issues.title_must_be_prefixed['prefix']).toBe(
      '[GIT-ENFORCE]'
    )
    expect(settings.issues.title_must_be_suffixed['suffix']).toBe(null)
    expect(settings.issues.validate_label_population['message']).toBe(
      'All issues require a label!'
    )
    expect(settings.issues.validate_assignee_population['message']).toBe(
      'Be sure to add assignee!'
    )
    expect(settings.issues.milestone_required.message).toBe(null)

    // Pull Request Level Element Values
    expect(settings.pull_requests.approvals.number).toBe(0)
    expect(settings.pull_requests.title_must_contain.pattern).toBe(null)
    expect(settings.pull_requests.title_must_not_contain.pattern).toBe(null)
    expect(settings.pull_requests.title_must_be_prefixed.prefix).toBe(null)
    expect(settings.pull_requests.title_must_be_suffixed.suffix).toBe(null)
    expect(settings.pull_requests.commits_must_be_prefixed.prefix).toBe(null)
    expect(settings.pull_requests.commits_must_be_suffixed.suffix).toBe(null)
  })
})

test('context throws error when config cannot be properly found in repo', () => {
  let context = {
    repo: jest.fn().mockReturnValue({
      repo: '',
      owner: ''
    }),
    github: {
      repos: {
        getContent: jest.fn().mockRejectedValue(
          new Promise((resolve, reject) => {
            reject(new Error('reject'))
          }).catch(err => {
            return err
          })
        )
      }
    }
  }

  try {
    Config.handleCurrentInstanceContext(context)
  } catch (e) {
    expect(e.message).toMatch(Config.GITHUB_RETRIEVAL_ERR)
  }
})
