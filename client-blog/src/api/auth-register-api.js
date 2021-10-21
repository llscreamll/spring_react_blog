import {_URL, TOKEN_USER} from "./api-сonst";

export const authAndRegisterUrl = {

    userRegistration(name, login, email, password) {
        let data = {name: name, login: login, email: email, password: password}
        console.log(data)
        return fetch(`${_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

    },
    initialization() {
        return fetch(`${_URL}/auth`, {
            headers: {
                Authorization: `Bearer ${TOKEN_USER}`
            },
            method: "POST"
        })
    },

    checkUserByLoginAndPassword(login, password) {
        let data = {login: login, password: password};
        return fetch(`${_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    },
}




