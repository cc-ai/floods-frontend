# Climate Change AI (CCAI) Frontend

The CCAI project is an interdisciplinary project aimed at creating images of accurate, vivid, and personalized outcomes of climate change. Our goal is to use cutting-edge machine learning techniques to produce images of how neighborhoods and houses will look like following the effects of global warming. By creating a more visceral understanding of the effects of climate change, we aim to strengthen public support for necessary actions and motivate people to make impactful decisions. As a prototype, we first focus on modeling flood consequences on homes.


For a more detailed motivation explanation, read through our [2 page executive summary](https://docs.google.com/document/d/1WQtugSBgMVB-i0RhgCg_qaP7WDj7aimWvpZytKTEqY4/edit).

This document has the following sections:

- [Prerequisites](#prerequisites)
- [Setup](#setup)


## Prerequisites

- NodeJS (6+)
  - You can use [`n`](https://github.com/tj/n) to install NodeJS
- Yarn
  - You can use `curl -o- -L https://yarnpkg.com/install.sh | bash` to install Yarn

## Setup

Copy the sample of the env file to your local development file:

```
cd reactapp
cp .env.development.local.sample .env.development.local
```

Set the value of `REACT_APP_GOOGLE_API_KEY` in `.env.development.local` to your Google Maps API key value.

Install the dependencies in the local `node_modules` folder, and run the app in the development mode with `npm` or `yarn`:

```
npm install
npm start
```

or

```
yarn install
yarn start
```

## Deploying The App

We use Google App Engine to deploy this app. Before proceeding, please reach out to a member of the core development team and ask them for the `app.yaml` file. Take the `app.yaml` file at put it at `reactapp/app.yaml`.

Also, make sure you have installed the [`gcloud` command-line tool](https://cloud.google.com/sdk/gcloud/). Finally, please ensure that you have the appropriate Google Cloud permissions to deploy the application.

Once you have the `app.yaml` and `.env` files in-place and the `gcloud` tool is installed, run the following commands from the `reactapp` directory:

1. `npm install --save`
2. `npm run-script build`
3. `gcloud config set project climatechangeai`
4. `gcloud app deploy`

Verify the details and following the interactive instructions when running `gcloud app deploy`. Once the deploy is done, the app should be available at [https://climatechangeai.org](https://climatechangeai.org).

## Viewing PR Previews

Whenever you create a PR to this repository, a version of your PR will be deployed via [Netlify Deploy Previews](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/). For example, if your PR number is 20, the code in your PR will be deployed to https://deploy-preview-20--climatechangeai.netlify.com/.

The build status will be posted on your PR. When the PR integration says that the site has been built, click the "Details" link next to "Deploy preview ready!" to be taken to the deployed PR automatically.

