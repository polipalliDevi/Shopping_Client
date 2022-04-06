function getToken() {
    if (window.localStorage) {
        return localStorage.getItem("token");
    }
    return "";
}

function setToken(token) {
    if (window.localStorage) {
        const settoken = localStorage.setItem("token", token);
        return settoken;
    }
}

export {getToken,setToken};