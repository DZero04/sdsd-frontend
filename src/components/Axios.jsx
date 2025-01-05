import axios from 'axios'

// const myURL = 'http://127.0.0.1:8000/'
const isDevelopment = import.meta.env.MODE === 'development'
const myURL = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY

const AxiosInstance = axios.create({

    baseURL: myURL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
    }
})

export default AxiosInstance