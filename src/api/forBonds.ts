import {request} from '@/utils/request';

export const listBonds = (data) => {
    return request({
        url: '/bonds/list',
        method: 'post',
        data: data
    });
};

export const listDeptBonds = (data) => {
    return request({
        url: '/bonds/list/dept',
        method: 'post',
        data: data
    });
};

export const listSelfBonds = (data) => {
    return request({
        url: '/bonds/list/self',
        method: 'post',
        data: data
    });
};

export const updateBonds = (data) => {
    return request({
        url: '/bonds/update',
        method: 'post',
        data: data
    });
};

export const insertBonds = (data) => {
    return request({
        url: '/bonds/insert',
        method: 'post',
        data: data
    });
};

export const calculateBonds = (data) => {
    return request({
        url: '/bonds/calculate',
        method: 'get',
        params: data
    });
};

export const undoBonds = (data) => {
    return request({
        url: '/bonds/undo',
        method: 'get',
        params: data
    });
};

