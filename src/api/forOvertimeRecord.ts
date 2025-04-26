import {request} from '@/utils/request';

export const insertOvertimeRecord = (data) => {
    return request({
        url: '/overtimeRecord/insert',
        method: 'post',
        data: data
    });
};

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

export const deleteOvertimeRecord = (data) => {
    return request({
        url: '/overtimeRecord/delete',
        method: 'post',
        data: data
    });
};

//=========================================== dept ============================================================
//=========================================== dept ============================================================

export const insertDeptOvertimeRecord = (data) => {
    return request({
        url: '/overtimeRecord/dept/insert',
        method: 'post',
        data: data
    });
};

export const listDeptOvertimeRecord = (data) => {
    return request({
        url: '/overtimeRecord/dept/list',
        method: 'post',
        data: data
    });
};

export const updateDeptOvertimeRecord = (data) => {
    return request({
        url: '/overtimeRecord/dept/update',
        method: 'post',
        data: data
    });
};

export const deleteDeptOvertimeRecord = (data) => {
    return request({
        url: '/overtimeRecord/dept/delete',
        method: 'post',
        data: data
    });
};

//========================================= self ==============================================================
//========================================= self ==============================================================

export const insertSelfOvertimeRecord = (data) => {
    return request({
        url: '/overtimeRecord/self/insert',
        method: 'post',
        data: data
    });
};

export const listSelfOvertimeRecord = (data) => {
    return request({
        url: '/overtimeRecord/self/list',
        method: 'post',
        data: data
    });
};

export const updateSelfOvertimeRecord = (data) => {
    return request({
        url: '/overtimeRecord/self/update',
        method: 'post',
        data: data
    });
};

export const deleteSelfOvertimeRecord = (data) => {
    return request({
        url: '/overtimeRecord/self/delete',
        method: 'post',
        data: data
    });
};