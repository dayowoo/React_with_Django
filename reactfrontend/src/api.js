import axios from "axios"

//"": 백엔드 서버 주소, api: api문서에 있는대로 씀
axios.defaults.baseURL = "http://127.0.0.1:8000/api"

export default {

    // 모든 글 불러오기
    getAllPosts() {
        return axios.get('/posts/')
    },

    // 글 작성하기
    createPost(data) {
        return axios.post('/posts/', data)
    }



}