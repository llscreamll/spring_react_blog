import {_URL, TOKEN_USER} from "./api-сonst";

const _blogApi = "blog";
export const blogApi ={

    findAllBlog() {
        return fetch(`${_URL}/${_blogApi}/`, {
            method: "get",
            headers: {
                Authorization: `Bearer ${TOKEN_USER}`,
            },
        })
    },

    loadNewItemOutServerApi (page) {
        return fetch(`${_URL}/${_blogApi}/${page}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${TOKEN_USER}`,
            },
        }).then(data => {
            if (data.status === 200) {
                return data.json();
            }
        })
    },
    checkNewBlogToServer(countBlog){
        return fetch(`${_URL}/${_blogApi}/check/${countBlog}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${TOKEN_USER}`,
            },
        })
    },

    addLikeApi(id) {
        return fetch(`${_URL}/${_blogApi}/like/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${TOKEN_USER}`,
            },
        })
    },

    loadProfileBlog() {
        return fetch(`${_URL}/${_blogApi}/profile`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${TOKEN_USER}`,
            },
        })
    },
    savePost(title, text, file) {
        const formData = new FormData();
        formData.append("title", title)
        formData.append("text", text)
        formData.append("file", file)
        console.log(formData)

        return fetch(`${_URL}/${_blogApi}/save`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${TOKEN_USER}`,
            },
            body: formData
        })
    },
    deleteBlog(id) {
        return fetch(`${_URL}/${_blogApi}/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${TOKEN_USER}`,
                "Content-Type": "application/json"
            },

        })
    },


}