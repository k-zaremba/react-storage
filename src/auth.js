class Auth {
    constructor() {
    }

    login(cb) {
        sessionStorage.setItem('authenticated', true);
        cb()
    }

    logout(cb) {
        sessionStorage.setItem('authenticated', false);
        cb()
    }

    isAuthenticated() {
        return sessionStorage.getItem('authenticated')
    }
}

export default new Auth();