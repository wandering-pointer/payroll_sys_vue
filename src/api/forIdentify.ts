import {request} from '@/utils/request';

export const tryLogin = (data) => {
    return request({
        url: '/public/tryLogin',
        method: 'post',
        data: data,
    });
};

export const checkToken = () => {
    return request({
        url: '/public/checkToken',
        method: 'post',
        data: {},
    });
};

export const logout = () => {
    return request({
        url: '/public/logout',
        method: 'post',
        data: {},
    });
};