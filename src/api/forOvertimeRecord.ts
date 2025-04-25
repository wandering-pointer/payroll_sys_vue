import {request} from '@/utils/request';

export const listOvertimeRecord = (data) => {
    return request({
        url: '/overtimeRecord/list',
        method: 'post',
        data: data
    });
};

export const updateOvertimeRecord = (data) => {
    return request({
        url: '/overtimeRecord/update',
        method: 'post',
        data: data
    });
};

export const insertOvertimeRecord = (data) => {
    return request({
        url: '/overtimeRecord/insert',
        method: 'post',
        data: data
    });
};

export const deleteOvertimeRecord = (data) => {
    return request({
        url: '/overtimeRecord/delete',
        method: 'post',
        data: data
    });
};
