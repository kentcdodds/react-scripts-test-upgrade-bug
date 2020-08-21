# react-scripts@4.0.0-next.77 bug

Providing feedback on the current alpha:
https://gist.github.com/iansu/282dbe3d722bd7231fa3224c0f403fa1

Notice that there's a `test` and a `jest` script. The `jest` script runs jest by
itself with no config and the tests pass fine

The `test` script uses `react-scripts test` and that fails.

I'm only using CommonJS because it's what works with jest without configuration.
Using ESModules still results in the failure for `react-scripts`.

I tried to slim this down as much as I possibly could. So if it looks contrived,
it's because it is. But it's based on an issue I hit when upgrading to
react-scripts v4 on https://github.com/kentcdodds/react-performance

Please open `src/__tests__/index.js` for instructions. Here are the file
contents to save you a click:

```javascript
// src/index.js
module.exports = {getHello: () => 'Hello'}
```

```javascript
// src/__tests__/index.js
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
```
