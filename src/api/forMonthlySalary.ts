import {request} from '@/utils/request';

export const listMonthlySalary = (data) => {
    return request({
        url: '/monthlySalary/list',
        method: 'post',
        data: data
    });
};

export const listDeptMonthlySalary = (data) => {
    return request({
        url: '/monthlySalary/list/dept',
        method: 'post',
        data: data
    });
};

export const listSelfMonthlySalary = (data) => {
    return request({
        url: '/monthlySalary/list/self',
        method: 'post',
        data: data
    });
};

export const updateMonthlySalary = (data) => {
    return request({
        url: '/monthlySalary/update',
        method: 'post',
        data: data
    });
};

export const insertMonthlySalary = (data) => {
    return request({
        url: '/monthlySalary/insert',
        method: 'post',
        data: data
    });
};

export const calculateMonthlySalary = (data) => {
    return request({
        url: '/monthlySalary/calculate',
        method: 'get',
        params: data
    });
};

export const undoMonthlySalary = (data) => {
    return request({
        url: '/monthlySalary/undo',
        method: 'get',
        params: data
    });
};

export const passMonthlySalary = (data) => {
    return request({
        url: '/monthlySalary/pass',
        method: 'post',
        data: {},
        params: data
    });
};
