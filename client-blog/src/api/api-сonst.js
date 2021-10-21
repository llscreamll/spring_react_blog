export const _URL = "http://localhost:8099";

export let TOKEN_USER = "";

export const setTokenUser = (token = "") => {
    TOKEN_USER = localStorage.getItem("token");
    if(token !== ""){
    localStorage.setItem("token", token)
    TOKEN_USER = token;
    }
}
export const removeTokenUser = () => {
    localStorage.setItem("token", "");
    TOKEN_USER = "";
}