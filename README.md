# Giphy Wall

[![Netlify Status](https://api.netlify.com/api/v1/badges/8d6cfe5e-a936-41bb-9c58-808dcc8f2aac/deploy-status)](https://app.netlify.com/sites/giphywall/deploys)

An infinitely scrolling wall of trending gifs from Giphy.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Secrets

The React app **does not** use the Giphy API directly. Making a direct request to the Giphy API leaks the API Key, unique to each developer. Instead, the app makes a request to a backend that in turn makes the Giphy API request. As the backend server can be designed to respond like the Giphy API, it can be developed separately, e.g. [express-gifs](https://github.com/jnthnrzr/express-gifs). This separate endpoint is stored as an environment variable `REACT_APP_API_URL`. So before running the project, please ensure that this value is valid.

If this seems like extra work, feel free to set `REACT_APP_API_URL` to the Giphy API endpoint `http://api.giphy.com/v1/gifs/trending?api_key=API_KEY`, where `API_KEY` is the Giphy developer key.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## License

MIT
