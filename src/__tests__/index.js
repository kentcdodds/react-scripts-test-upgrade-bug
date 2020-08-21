const {getHello} = require('..')

jest.mock('..', () => {
  const moduleExports = jest.requireActual('..')
  // comment this next line out and react-scripts v4 works
  jest.spyOn(moduleExports, 'getHello')

  return moduleExports
})

test('should render fine', () => {
  expect(getHello()).toBeDefined()
  // for the bug to be "fixed", everything should be unchanged
  // and this next assertion should pass:
  // expect(getHello).toHaveBeenCalled()
})
