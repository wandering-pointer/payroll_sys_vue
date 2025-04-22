import {request} from '@/utils/request';

export const listUserAccount = (data) => {
    return request({
        url: '/userAccount/list',
        method: 'post',
        data: data,
    });
};

export const updateUserAccount = (data) => {
    return request({
        url: '/userAccount/update',
        method: 'post',
        data: data
    });
};

export const insertUserAccount = (data) => {
    return request({
        url: '/userAccount/insert',
        method: 'post',
        data: data,
    });
};

export const deleteUserAccount = (data) => {
    return request({
        url: '/userAccount/delete',
        method: 'post',
        data: data
    });
};
