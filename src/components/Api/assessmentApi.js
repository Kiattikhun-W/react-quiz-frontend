import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/'
})

export const getAssessment = async (id, page) => {
    const {data} = await api.get(`/assessment/${id}/session?page=${page}`)
    return data
}

export const checkAssessment = async ({topicId, answers}) => {
    const {data} = await api.post(`/assessment/${topicId}/session`, {
        answers
    })
    return data
}
