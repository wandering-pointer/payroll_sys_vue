import request from '../utils/request';

export const listDepartment = (data) => {
    return request({
        url: '/department/list',
        method: 'post',
        data: data
    });
};

export const updateDepartment = (data) => {
    return request({
        url: '/department/update',
        method: 'post',
        data: data
    });
};

export const insertDepartment = (data) => {
    return request({
        url: '/department/insert',
        method: 'post',
        data: data
    });
};

export const deleteDepartment = (data) => {
    return request({
        url: '/department/delete',
        method: 'post',
        data: data
    });
};
