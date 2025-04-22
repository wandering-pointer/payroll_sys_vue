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
    {value: 'ROOT', label: '超级管理员', parent: undefined},
    {value: 'ADMIN', label: '系统运维', parent: undefined},
    {value: 'HR', label: '人力资源管理员', parent: undefined},
    {value: 'FINANCE', label: '部门经理', parent: undefined},
    {value: 'MANAGER', label: '财务管理员', parent: undefined},
    {value: 'EMPLOYEE', label: '普通员工', parent: undefined},
];