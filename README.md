# fastmail_test

This project is a simple Node.js application that uses `axios` to fetch data from an API endpoint and allows users to filter images based on color tags and orientation.

## Project Overview

The API endpoint `http://frontendtest.jobs.fastmail.com.user.fm/data.json` provides a list of images with metadata (such as name, width, height, and tags). This application fetches the data and prints the image file names to the console.

## Prerequisites

To run this project, you need to have the following installed:

- [Node.js](https://nodejs.org/) (v20.x or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

You can check if Node.js and npm are installed by running:

```bash
node -v
npm -v
```

## Get Started

Get started developing...

```shell
# install deps
npm install

# run in development mode
npm run dev
```

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Run It
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

`NOTE:` Command-line arguments doesn't work well with `pino-pretty` when it is used with `nodemon`
 Instead use this command e.g: `node index.js "pink white" | npx pino-pretty`