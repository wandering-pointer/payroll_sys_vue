import {request} from '@/utils/request';

export const insertAttendance = (data) => {
    return request({
        url: '/attendance/insert',
        method: 'post',
        data: data
    });
};