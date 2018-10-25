## Getting started:

cd ./frontend
npm install
npm run doc 

# School

Music School Charity Project.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running test coverage

Run `npm run test:coverage` to execute test coverage. 
This command will open browser with coverage statistics.
Or you can open ./coverage/index.html

See configuration for test coverage in karma.conf.js

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Running typescript lint

Run `npm run lint` to execute the ts linter.

See configuration for test coverage in tslint.json

## Running scss lint

Run `npm run lintScss` to execute the scss linter via sass-lint.

See configuration for test coverage in .sass-lint.yml

## Hooks

Precommit hooks include:
unit tests, 
e2e tests,
tslint,
scss lint

Prepush hooks include:
precommit hooks + test coverage

You can run precommit/prepush scripts manually:
npm run precommit
npm run prepush
