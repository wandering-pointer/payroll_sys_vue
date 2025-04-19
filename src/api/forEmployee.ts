import {request} from '@/utils/request';

export const listEmployee = (data) => {
    return request({
        url: '/employee/list',
        method: 'post',
        data: data
    });
};

export const updateEmployee = (data) => {
    return request({
        url: '/employee/update',
        method: 'post',
        data: data
    });
};

export const insertEmployee = (data) => {
    return request({
        url: '/employee/insert',
        method: 'post',
        data: data
    });
};

export const deleteEmployee = (data) => {
    return request({
        url: '/employee/delete',
        method: 'post',
        data: data
    });
};
