import {request} from '@/utils/request';

export const listMonthlySalary = (data) => {
    return request({
        url: '/monthlySalary/list',
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

export const deleteMonthlySalary = (data) => {
    return request({
        url: '/monthlySalary/delete',
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
