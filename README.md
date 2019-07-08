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

```
git clone https://github.com/cc-ai/floods-frontend.git
```

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

More details in the [React App README](reactapp/README.md).

