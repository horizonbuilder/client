# TerraceAg Client

This repository is home to all of the client side code for the TerraceAg project.

## Getting Started

#### Clone Repo:
```
git clone git@github.com:TerraceAg/client.git
```

#### Install Packages:
```
yarn
```
If you do not have yarn installed, follow [these instructions](https://yarnpkg.com/en/docs/install)

#### Start Development:
```
yarn dev
```

This starts a dev server at [localhost:8080](localhost:8080). Making changes to anything in the `/src` folder will rebundle and reload the page at localhost:8080.

#### Testing:
For unit test, enter the command `yarn test` to run the test suite. This project uses [Jest](https://facebook.github.io/jest/) and [Enzyme](http://airbnb.io/enzyme/index.html) for all of the Java[Type]Script and React testing.

You can also run `yarn test:watch` to run the test suite in watch mode. Jest's watch mode is very nice and allows you to do things like only run tests for changed files, all tests, and filter tests by test name and file name.

For the end to end tests, enter the command `yarn run e2e` to run the test suite.