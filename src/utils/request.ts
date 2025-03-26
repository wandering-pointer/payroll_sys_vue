import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// 创建自定义实例
const instance = axios.create({
    baseURL: 'http://localhost:8080/api/',
    timeout: 5000,
});

instance.interceptors.request.use(
    (config) => {
        // 从存储中获取 Token（如 localStorage、Vuex、Redux 等）
        const token = localStorage.getItem('token');
        // 如果 Token 存在，将其添加到请求头
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    (error) => {
        // 对请求错误做处理
        console.log(error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            return response;
        } else {
            Promise.reject();
        }
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

export default instance;