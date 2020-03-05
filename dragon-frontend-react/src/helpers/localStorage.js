export const saveAuthentication = (username, apiKey) => {
    window.localStorage.setItem('authenticated', true);
    window.localStorage.setItem('username', username);
    window.localStorage.setItem('apiKey', apiKey);
}

export const removeAuthentication = () => {
    window.localStorage.setItem('authenticated', false);
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('apiKey');
}