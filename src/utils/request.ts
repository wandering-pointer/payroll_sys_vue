import axios, {AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig} from 'axios';
import {showMessage} from "@/utils/MyLittleUtils";

// 自定义类型，剥离 AxiosResponse 包装
interface CustomAxiosInstance extends AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    // 可根据需要添加其他方法（delete、put 等）
}

const instance: CustomAxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/',
    timeout: 5000,
}) as CustomAxiosInstance; // 类型断言

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
            showMessage(response.data);
            return response.data.data; //剥离最外层包装和业务状态，只返回业务数据
        } else {
            Promise.reject();
        }
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

export function request(config: AxiosRequestConfig) {
    return instance.request(config);
}