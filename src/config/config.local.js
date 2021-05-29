const HOSTNAME = window.location.hostname;
const PORT =  window.location.port;
export default {
    BASE_URL: `http://${HOSTNAME}:${PORT}`,
    API_URL: `http://${HOSTNAME}:5000/api`,
    BASE_API_URL: `http://${HOSTNAME}:5000`,
    AUTH_URL: `http://${HOSTNAME}:${PORT}/public/auth`,
    PORTAL_URL: `http://localhost:${PORT}`,
    EXTERNAL_API_URL: "",
    apiUrl: `http://localhost:${PORT}`,
    authUrl: `http://localhost:${PORT}/public/auth`
}