# Floods frontend
Frontend (React) to the CCAI Floods project.

## Prerequisites
- nodejs (6+) - You can use [`n`](https://github.com/tj/n) to install NodeJS
- yarn: `curl -o- -L https://yarnpkg.com/install.sh | bash`

```
git clone https://github.com/cc-ai/floods-frontend.git
```

## Setup
Copy the sample of the env file to your local development file:

```
cd flood-front
cp .env.development.local.sample .env.development.local
```
Set the value of `REACT_APP_GOOGLE_API_KEY` in `.env.development.local` to your Google Maps API key value.

Install the dependencies in the local node_modules folder, and run the app in the development mode with `npm` or `yarn`:
```
npm install
npm start
```
or
```
yarn install
yarn start
```

More details in the [flood-front README](flood-front/README.md).

## With Docker

To run the webapp:
- With docker-compose:
    ```sh
    docker-compose build webapp
    docker-compose up webapp
    ```
- Or with docker:
    ```
    docker build -t "cc-ai-flood-webapp" ./flood-front
    docker run -p 3000:3000 cc-ai-flood-webapp
    ```
The webapp will be available at: http://localhost:3000.
