const ID_TOKEN_KEY = "id_token";

export const getToken = () => {
    return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const saveToken = token => {
    window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
    window.localStorage.removeItem(ID_TOKEN_KEY);
};

export const parsJWT = token=>{

    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);

};

export default { getToken, saveToken, destroyToken };
