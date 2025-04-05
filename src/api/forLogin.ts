import {request} from '../utils/request';

export const tryLogin = (data) => {
    return request({
        url: '/public/tryLogin',
        method: 'post',
        data: data,
    });
};

export const checkToken = () => {
    return request({
        url: '/public/checkToken',
        method: 'post',
        data: {},
    });
};

export const logout = () => {
    return request({
        url: '/public/logout',
        method: 'post',
        data: {token: localStorage.getItem("token")},
    });
};


// export const fetchData = () => {
//     return request({
//         url: './mock/table.json',
//         method: 'get'
//     });
// };
//
// export const fetchUserData = () => {
//     return request({
//         url: './mock/user.json',
//         method: 'get'
//     });
// };
//
// export const fetchRoleData = () => {
//     return request({
//         url: './mock/role.json',
//         method: 'get'
//     });
// };