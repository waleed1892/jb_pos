import axios from "axios";

const api = axios.create({
    baseURL: `https://postest.cf/api`
})

export const post = (url, data) => {
    return api.post(url, data)
}

export const get = (url) => {
    return api.get(url)
}
