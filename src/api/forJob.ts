import {request} from '@/utils/request';

export const listJob = (data) => {
    return request({
        url: '/job/list',
        method: 'post',
        data: data
    });
};

export const updateJob = (data) => {
    return request({
        url: '/job/update',
        method: 'post',
        data: data
    });
};

export const insertJob = (data) => {
    return request({
        url: '/job/insert',
        method: 'post',
        data: data
    });
};

export const deleteJob = (data) => {
    return request({
        url: '/job/delete',
        method: 'post',
        data: data
    });
};
