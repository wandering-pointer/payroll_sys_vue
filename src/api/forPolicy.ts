import {request} from '@/utils/request';

export const listPolicy = (data) => {
    return request({
        url: '/policy/list',
        method: 'post',
        data: data
    });
};

export const updatePolicy = (data) => {
    return request({
        url: '/policy/update',
        method: 'post',
        data: data
    });
};

export const insertPolicy = (data) => {
    return request({
        url: '/policy/insert',
        method: 'post',
        data: data
    });
};

export const deletePolicy = (data) => {
    return request({
        url: '/policy/delete',
        method: 'post',
        data: data
    });
};
