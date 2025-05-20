import { defineStore } from 'pinia';

interface ObjectList {
    [userRole: string]: string[];
}

export const usePermissStore = defineStore('permiss', {
    state: () => {
        const defaultList: ObjectList = {
            ROOT: [
                '0',
                '1',
                'debug',
                '101',
                '102',
                '103',
                '104',
                '105',
                'pwd',
            ],
            ADMIN: ['0', '105', 'pwd'],
            HR: ['0', '101', 'pwd'],
            FINANCE: ['0', '104', 'pwd'],
            MANAGER: ['0', '102', 'pwd'],
            EMPLOYEE: ['0','103', 'pwd'],
        };
        const username = localStorage.getItem('username');
        console.log(username);

        function getPermissions(val: string) {
            if (val == 'ROOT'){
                return defaultList.ROOT
            }
            if (val == 'ADMIN'){
                return defaultList.ADMIN
            }
            if (val == 'FINANCE'){
                return defaultList.FINANCE
            }
            if (val == 'MANAGER'){
                return defaultList.MANAGER
            }
            if (val == 'HR'){
                return defaultList.HR
            }
            if (val == 'EMPLOYEE'){
                return defaultList.EMPLOYEE
            }
        }

        return {
            userRole: getPermissions(localStorage.getItem('userRole')) as string[],
            defaultList,
        };
    },
    actions: {
        handleSet(val: string[]) {
            this.userRole = val;
        },
    },
});
