import config from '../config';

const TokenService = {
    createAuthToken(email, password) {
        return window.btoa(`${email}:${password}`)
    },
    saveAuthToken(token) {
        window.localStorage.setItem(config.TOKEN_KEY, token)
    },
    getAuthToken() {
        return window.localStorage.getItem(config.TOKEN_KEY)
    },
    hasAuthToken() {
        return !!TokenService.getAuthToken()
    },
    clearAuthToken() {
        window.localStorage.removeItem(config.TOKEN_KEY)
    },
    clearUserId() {
        window.localStorage.removeItem(config.ID_KEY);
    },
    saveUserId(id) {
        window.localStorage.setItem(config.ID_KEY, id);
    },
    saveUsername(username) {
        window.localStorage.setItem(config.USERNAME_KEY, username);
    },
    saveEmail(email) {
        window.localStorage.setItem(config.EMAIL_KEY, email);
    },
    getUserId() {
        return window.localStorage.getItem(config.ID_KEY);
    },
    getUsername() {
        return window.localStorage.getItem(config.USERNAME_KEY);
    },
    getEmail() {
        return window.localStorage.getItem(config.EMAIL_KEY);
    },
};

export default TokenService;