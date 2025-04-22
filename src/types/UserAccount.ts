import {SelectionView} from "@/types/SelectionView";

export interface UserAccount {
    accountId: number;
    userName: string;
    empId: number;
    pwdHash: string;
    role: string;
    usable: boolean;
}

export const userRolesSelectionView: SelectionView[] = [
    {value: 'ROOT', label: '超级管理员', parent: null},
    {value: 'ADMIN', label: '系统运维', parent: null},
    {value: 'HR', label: '人力资源管理员', parent: null},
    {value: 'FINANCE', label: '部门经理', parent: null},
    {value: 'MANAGER', label: '财务管理员', parent: null},
    {value: 'EMPLOYEE', label: '普通员工', parent: null},
];