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
                '11',
                '12',
                '13',
                '2',
                '21',
                '22',
                '23',
                '24',
                '25',
                '26',
                '27',
                '28',
                '29',
                '291',
                '292',
                '3',
                '31',
                '32',
                '33',
                '34',
                '4',
                '41',
                '42',
                '5',
                '7',
                '6',
                '61',
                '62',
                '63',
                '64',
                '65',
                '66',
                'debug',
                '101',
            ],
            ADMIN: [],
            HR: [],
            FINANCE: [],
            MANAGER: [],
            EMPLOYEE: [],
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
