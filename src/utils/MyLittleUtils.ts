export const getToken = () => {
    return localStorage.getItem("token")
};

export const makeRequest = (data) => {
    return Object.assign({token: getToken()}, data)
};