# Freebird React Skeleton

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Libraries In Use

* State Management: [Redux](http://redux.js.org/)
  * React State Bindings: [react-redux](http://redux.js.org/docs/basics/UsageWithReact.html)
  * Thunk Middleware: [redux-thunk](https://github.com/gaearon/redux-thunk)
  * Promise Middleware: [redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware)
* Immutable Data: [ImmutableJS](https://facebook.github.io/immutable-js/)
  * Immutable Data PropTypes: [react-immutable-proptypes](https://github.com/HurricaneJames/react-immutable-proptypes)
* Routing: [react-router v4](https://react-router.now.sh/)
* Testing
  * Test Runner: [Jest](https://facebook.github.io/jest/)
  * Test Helper: [Enzyme](http://airbnb.io/enzyme/)

## Development Setup

1. `npm install`
2. `npm run start` (In one tab)
3. `npm test` (In another tab)

## Project Structure

### `/src/components`

This folder should house all of our components that are shared across the app. These components should be atomic. Ideally, they should never be connected to the redux store, and should only be functions of props passed. Each component should get it's own folder (ie. `/src/components/MyComponent`) and will likely consist of the following files:

* `component.js`: This is the main component file, where JSX and component logic lives.

* `style.scss`: This is where class name styles for the component are defined.

* `component.test.js`: This is where the Jest tests for the component should be defined.

### `/src/store`

This is the folder where all Redux state management code should live. The structure is loosely based on the ["ducks"](https://github.com/erikras/ducks-modular-redux) concept.

The `index.js` at the root of the folder is used to wire up the reducers contained in each duck as well as declare any middleware that should be used by Redux.

Each main node of state in the Redux store should have it's own folder inside `/src/store` (ie. `/src/store/user`). Within this folder there are two options for how to declare reducers, actions, and action type constants.

#### Simple Duck

If your duck is relatively simple (small reducer, only a modest handful of actions) then you can declare all of it in a single file at `/src/store/*duck*/index.js`. The file structure will look like this:

```
import Immutable from 'immutable';

/**
 * Private: Initial State
 */

const initialState = new Immutable.fromJS({
  window: {
    width: 0,
    height: 0
  }
});

/**
 * Public: Action Types
 */

export const actionTypes = {
  WINDOW_RESIZE: 'FB/app/WINDOW_RESIZE'
};

/**
 * Public: Action Creators
 */

export function windowResized(width, height) {
  return {
    type: actionTypes.WINDOW_RESIZE,
    payload: { width, height }
  }
}

/**
 * Public: Reducer
 */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case actionTypes.WINDOW_RESIZE:
      const { width, height } = action.payload;
      return state.mergeIn(['window'], { width, height })

    default:
      return state;
  }
}
```

Note that the reducer is exported as the **default** export, and action creators are exported as *named* exports. This will allow you to import both from the same file reference.

#### Complex Duck

If you start to find your simple duck growing to many hundreds of lines, then it is likely a good idea to start breaking it up into separate files. You should still use the `index.js` to aggregate these together, but you can move your actions out into a seperate `actions.js` file.

**NOTE: This is not set in stone. More on this to be defined as we grow the app**

### `/src/theme`

This is where any theme based code should go. This includes components provided by a Material UI Theme.

### `/src/views`

This folder should contain entire views of the application. These could almost be tought of as "pages." Typically they will be responsible for rendering some kind of route, or sub-route.

There should be a sub-folder for each view. Inside that folder you will likely have files with the following names:

* `container.js`: This follows the ["Container"](http://redux.js.org/docs/basics/UsageWithReact.html#presentational-and-container-components) concept that the redux community has standardized around. The file should only be used for setting up the bindings between the underlying React components and the Redux store.

* `component.js`: This is where the presentational code for the view should live. This includes the JSX that declares what the HTML/Component structure is and any React lifecycle or component logic. This component should be testable without any knowledge of Redux and should implement PropTypes to indicate what data or actions it requires from the store.

* `component.test.js`: This is the Jest based test that should test for specific component DOM structure that is critical to it's function and also test any component logic.

* `style.scss`: This is a SASS stylesheet that declares any styles that are specific to the view. This should not declare any styles that are inherited by the child components. You should keep styles and their impact isolated to the view.
