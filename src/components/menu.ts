import { Menus } from '@/types/menu';

export const menuData: Menus[] = [
    {
        id: '0',
        title: '系统首页',
        index: '/homePage',
        icon: 'Odometer',
    },
    {
        id: '101', // 自己的页面从101开始，避免编号冲突
        icon: 'Avatar',
        index: '7',
        title: '人事资源管理',
        children: [
            {
                id: '101-1',
                pid: '7',
                index: '/hr/department',
                title: '部门管理',
            },
            {
                id: '101-2',
                pid: '7',
                index: '/hr/job',
                title: '工种管理',
            },
            {
                id: '101-3',
                pid: '7',
                index: '/hr/employee',
                title: '员工管理',
            },
            {
                id: '101-4',
                pid: '7',
                index: '/hr/userAccount',
                title: '账号管理',
            },
            {
                id: '101-5',
                pid: '7',
                index: '/hr/policy',
                title: '加班津贴规则',
            },
        ],
    },
    {
        id: '102',
        icon: 'Management',
        index: '8',
        title: '部门经理功能',
        children: [
            {
                id: '102-1',
                pid: '8',
                index: '/manager/attendance',
                title: '部门考勤记录',
            },
            {
                id: '102-2',
                pid: '8',
                index: '/manager/overtime',
                title: '部门加班记录',
            },
            {
                id: '102-3',
                pid: '8',
                index: '/manager/salary',
                title: '部门工资记录',
            },
            {
                id: '102-4',
                pid: '8',
                index: '/manager/bonds',
                title: '部门年终奖记录',
            },
        ],
    },
    {
        id: '103',
        icon: 'goods',
        index: '9',
        title: '员工自助功能',
        children: [
            {
                id: '103-1',
                pid: '9',
                index: '/self/attendance',
                title: '个人考勤记录',
            },
            {
                id: '103-2',
                pid: '9',
                index: '/self/overtime',
                title: '个人加班记录',
            },
            {
                id: '103-3',
                pid: '9',
                index: '/self/salary',
                title: '个人工资记录',
            },
            {
                id: '103-4',
                pid: '9',
                index: '/self/bonds',
                title: '个人年终奖记录',
            },
            {
                id: '103-5',
                pid: '9',
                index: '/self/password',
                title: '修改密码',
            },
        ],
    },
    {
        id: '104',
        icon: 'DataLine',
        index: '10',
        title: '财务人员功能',
        children: [
            {
                id: '104-1',
                pid: '10',
                index: '/finance/check',
                title: '工资核算',
            },
            {
                id: '104-2',
                pid: '10',
                index: '/finance/history',
                title: '历史工资查看',
            },
            {
                id: '104-3',
                pid: '10',
                index: '/finance/bonds',
                title: '年终奖管理',
            },
        ],
    },
    {
        id: 'debug',
        icon: 'Lock',
        index: 'debug',
        title: '开发者选项',
        children: [
            {
                id: 'debug-1',
                pid: 'debug',
                index: '/debug/tools',
                title: '小工具'
            },
            {
                id: 'debug-2',
                pid: 'debug',
                index: '/debug/attendance',
                title: '全司考勤记录',
            },
            {
                id: 'debug-3',
                pid: 'debug',
                index: '/debug/overtime',
                title: '全司加班记录',
            },
        ],
    },
];
