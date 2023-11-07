## What is it

The Doctor's office staff (especially doctors and schedulers) will enjoy a desktop environment to manage scheduling mostly - they may use other features, but reaching to patients and scheduling will be a main focus.

## Prerequisites

You must have the following installed:

- [Node.js v14+](https://nodejs.org/en/download/)
- NPM v6+ (comes installed with newer Node versions)

You can check which versions of Node.js and NPM you currently have installed with the following commands:

    node --version
    npm --version


## Install Dependencies

Run `npm install` inside the main project folder to install all dependencies from NPM.

If you want to use `yarn` to install dependencies, first run the [yarn import](https://classic.yarnpkg.com/en/docs/cli/import/) command. This will ensure that yarn installs the package versions that are specified in `package-lock.json`.

### Running the App locally

Run the app locally with

    npm start

This will start the local token server and run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to see the application in the browser.

### Building

Build the React app with

    npm run build

This script will build the static assets for the application in the `build/` directory.

### TO DELETE
test fix