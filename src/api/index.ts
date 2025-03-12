import request from '../utils/request';
import axios from "axios";
import {getToken} from "@/utils/MyLittleUtils";
axios.defaults.baseURL ='http://localhost:8080/api/'; //配置请求地址

export const fetchData = () => {
    return request({
        url: './mock/table.json',
        method: 'get'
    });
};

export const fetchUserData = () => {
    return request({
        url: './mock/user.json',
        method: 'get'
    });
};

export const fetchRoleData = () => {
    return request({
        url: './mock/role.json',
        method: 'get'
    });
};

export const tryLogin = (data) => {
    return request({
        url: '/tryLogin',
        method: 'post',
        data: data,
    });
};

export const checkToken = (data) => {
    return request({
        url: '/checkToken',
        method: 'post',
        data: data,
    });
};

export const logout = () => {
    return request({
        url: '/logout',
        method: 'post',
        data: {token: getToken()},
    });
};
