import {request} from '@/utils/request';

export const insertAttendance = (data) => {
    return request({
        url: '/attendance/insert',
        method: 'post',
        data: data
    });
};

export const listAttendance = (data) => {
    return request({
        url: '/attendance/list',
        method: 'post',
        data: data
    });
};

export const updateAttendance = (data) => {
    return request({
        url: '/attendance/update',
        method: 'post',
        data: data
    });
};

export const deleteAttendance = (data) => {
    return request({
        url: '/attendance/delete',
        method: 'post',
        data: data
    });
};

export const listDeptAttendance = (data) => {
    return request({
        url: '/attendance/dept/list',
        method: 'post',
        data: data
    });
};

export const updateDeptAttendance = (data) => {
    return request({
        url: '/attendance/dept/update',
        method: 'post',
        data: data
    });
};

export const deleteDeptAttendance = (data) => {
    return request({
        url: '/attendance/dept/delete',
        method: 'post',
        data: data
    });
};