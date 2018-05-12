const {createRobot} = require('probot')
const Config = require('../lib/configuration')

test('configuration defaults get instantiated properly on-load', () => {

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
          Promise.resolve({ data: { content: Buffer.from(`
            mergeable:
              approvals: 5
              label: 'label regex'
              title: 'title regex'
          `).toString('base64') }})
        )
      }
    }
  }
  Config.handleCurrentInstanceContext(context)
})

test('context throws error when config cannot be properly found in repo', () => {

})

test('context throws error when config cannot be properly found in repo', () => {

})

console.log = s => {
  process.stdout.write(s + '\n')
}
