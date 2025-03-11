import request from '../utils/request';
import {makeRequest} from "@/utils/MyLittleUtils";

export const listDepartment = (data) => {
    return request({
        url: '/department/list',
        method: 'post',
        data: makeRequest(data)
    });
};

export const updateDepartment = (data) => {
    return request({
        url: '/department/update',
        method: 'post',
        data: makeRequest(data)
    });
};

export const insertDepartment = (data) => {
    return request({
        url: '/department/insert',
        method: 'post',
        data: makeRequest(data)
    });
};

export const deleteDepartment = (data) => {
    return request({
        url: '/department/delete',
        method: 'post',
        data: makeRequest(data)
    });
};
