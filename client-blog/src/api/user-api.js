import {_URL, TOKEN_USER} from "./api-сonst";
const _USER  = "user";

export const userApi = {

    getAllPeoples() {
        return fetch(`${_URL}/${_USER}/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${TOKEN_USER}`
            },
        })
    },
    getUserById(id) {
        return fetch(`${_URL}/${_USER}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${TOKEN_USER}`
            },
        })
    },

    setStatus(status) {
        return fetch(`${_URL}/${_USER}/status/${status}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${TOKEN_USER}`,
                "Content-Type": "application/json"
            },
        })
    },
    checkPresentationImage(file) {
        const formData = new FormData();
        formData.append("file", file[0])

        return fetch(`${_URL}/${_USER}/img`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${TOKEN_USER}`,
            },
            body: formData
        }).then(data => {

            if (data.status === 200) {
                return  data.json()
                    .then(data => data)
            }
            return null;
        })
    },
}