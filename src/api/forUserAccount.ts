import {request} from '@/utils/request';

export const listUserAccount = (data) => {
    return request({
        url: '/userAccount/list',
        method: 'post',
        data: data,
    });
};

export const updateUserAccount = (data) => {
    return request({
        url: '/userAccount/update',
        method: 'post',
        data: data
    });
};

export const insertUserAccount = (data) => {
    return request({
        url: '/userAccount/insert',
        method: 'post',
        data: data,
    });
};

export const deleteUserAccount = (data) => {
    return request({
        url: '/userAccount/delete',
        method: 'post',
        data: data
    });
};

export const getEmployeeRoles = (empId) =>{
    return request({
        url: '/userAccount/roles',
        method: 'get',
        params: {empId: empId}
    });
}

export const editEmployeeRoles = (data) =>{
    return request({
        url: '/userAccount/roles',
        method: 'post',
        data: data,
    });
}

export const changePassword = (data) =>{
    return request({
        url: '/userAccount/changePassword',
        method: 'post',
        data: data,
    });
}