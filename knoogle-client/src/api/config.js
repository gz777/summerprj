let API_URL;

/**
 * The code below checks if the application is either in development mode or in
 * production mode. If the application is in development mode, then the API
 * calls will target the endpoints under the localhost URL for the back-end.
 * If the application is in production, then the API calls will target the
 * endpoints under the production URL.
 */
if (process.env.NODE_ENV === "development") {
    API_URL = "http://0.0.0.0:8000";
} else {
    API_URL = "https://knowglet-server.herokuapp.com";
}

export default API_URL;
