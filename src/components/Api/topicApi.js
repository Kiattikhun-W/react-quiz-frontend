import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/'
})

export const getTopics = () => api.get('/topic').then(res => res.data)

export const getTopic = (id) => api.get(`/topic/${id}`)