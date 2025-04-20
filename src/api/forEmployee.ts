import {request} from '@/utils/request';

export const listEmployee = (data, deptId) => {
    return request({
        url: '/employee/list',
        method: 'post',
        data: data,
        params: {deptId: deptId}
    });
};

export const updateEmployee = (data) => {
    return request({
        url: '/employee/update',
        method: 'post',
        data: data
    });
};

export const insertEmployee = (data, deptId) => {
    return request({
        url: '/employee/insert',
        method: 'post',
        data: data,
        params: {deptId: deptId}
    });
};

export const deleteEmployee = (data) => {
    return request({
        url: '/employee/delete',
        method: 'post',
        data: data
    });
};
