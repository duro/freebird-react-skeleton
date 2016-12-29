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

## Project Generator

### `npm run generate:generator [generator-name]`

This will create a new generator in the generators folder, and add a `generate:<generator-name>` script to the `npm run` scripts.

### `npm run generate:component [ComponentName]`

This will generate a new component in the `/src/components` folder.

### `npm run generate:view [ViewName]`

This will generate a new view in the `/src/views` folder. This will consist of the `component.js` for declaring the view in JSX and defining React view logic, as well as the `container.js` which should only contain the React <-> Redux connection. All styles should be defined in `style.scss`. At the very least, the `component.js` should have Jest test coverage.

### `npm run generate:duck [duckName]`

This will generate a new duck in the `/src/store` folder. There are two types of ducks you can generate: one that "fetches" data from an API, and a "plain" one that will just be used for holding on to synchronous UI state.

## Project Structure

### `/src/components`

This folder should house all of our components that are shared across the app. These components should be atomic. Ideally, they should never be connected to the redux store, and should only be functions of props passed. Each component should get it's own folder (ie. `/src/components/MyComponent`) and will likely consist of the following files:

* `index.js`: This is the main component file, where JSX and component logic lives.

* `style.scss`: This is where class name styles for the component are defined.

* `story.js`: This is the React Storybook story definition

* `__tests__/component.test.js`: This is where the Jest tests for the component should be defined.

### `/src/store`

This is the folder where all Redux state management code should live. The structure is based on the modular ["ducks"](https://github.com/erikras/ducks-modular-redux) concept.

The `index.js` at the root of the folder is used to wire up the reducers contained in each duck as well as declare any middleware that should be used by Redux.

Each main node of state in the Redux store should have it's own folder inside `/src/store` (ie. `/src/store/user`). Within this folder you will find the following types of files:

  * `duck.js`: This is where actions, action types, redux-observable "epics", and the reducer for this node of the store are kept.

  * `api.js`: This is a library file that contains all AJAX calls that power this node of state. Each named export should be a function that returns a Promise that ultimately resolves with the data that should be passed to the store.

### `/src/theme`

This is where any theme based code should go. This includes components provided by a Material UI Theme.

### `/src/views`

This folder should contain entire views of the application. These could almost be tought of as "pages." Typically they will be responsible for rendering some kind of route, or sub-route.

There should be a sub-folder for each view. Inside that folder you will likely have files with the following names:

* `container.js`: This follows the ["Container"](http://redux.js.org/docs/basics/UsageWithReact.html#presentational-and-container-components) concept that the redux community has standardized around. The file should only be used for setting up the bindings between the underlying React components and the Redux store.

* `component.js`: This is where the presentational code for the view should live. This includes the JSX that declares what the HTML/Component structure is and any React lifecycle or component logic. This component should be testable without any knowledge of Redux and should implement PropTypes to indicate what data or actions it requires from the store.

* `component.test.js`: This is the Jest based test that should test for specific component DOM structure that is critical to it's function and also test any component logic.

* `style.scss`: This is a SASS stylesheet that declares any styles that are specific to the view. This should not declare any styles that are inherited by the child components. You should keep styles and their impact isolated to the view.
