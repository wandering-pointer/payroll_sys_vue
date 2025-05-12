import { Menus } from '@/types/menu';

export const menuData: Menus[] = [
    {
        id: '0',
        title: '系统首页',
        index: '/homePage',
        icon: 'Odometer',
    },
//
//========================================= 以下是我自己的 =============================================
//
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
//
//========================================= 以上是我自己的 =============================================
//
    {
        id: '1',
        title: '系统管理',
        index: '1',
        icon: 'HomeFilled',
        children: [
            {
                id: '11',
                pid: '1',
                index: '/system-user',
                title: '用户管理',
            },
            {
                id: '12',
                pid: '1',
                index: '/system-role',
                title: '角色管理',
            },
            {
                id: '13',
                pid: '1',
                index: '/system-menu',
                title: '菜单管理',
            },
        ],
    },
    {
        id: '2',
        title: '组件',
        index: '2-1',
        icon: 'Calendar',
        children: [
            {
                id: '21',
                pid: '3',
                index: '/form',
                title: '表单',
            },
            {
                id: '22',
                pid: '3',
                index: '/upload',
                title: '上传',
            },
            {
                id: '23',
                pid: '2',
                index: '/carousel',
                title: '走马灯',
            },
            {
                id: '24',
                pid: '2',
                index: '/calendar',
                title: '日历',
            },
            {
                id: '25',
                pid: '2',
                index: '/watermark',
                title: '水印',
            },
            {
                id: '26',
                pid: '2',
                index: '/tour',
                title: '分布引导',
            },
            {
                id: '27',
                pid: '2',
                index: '/steps',
                title: '步骤条',
            },
            {
                id: '28',
                pid: '2',
                index: '/statistic',
                title: '统计',
            },
            {
                id: '29',
                pid: '3',
                index: '29',
                title: '三级菜单',
                children: [
                    {
                        id: '291',
                        pid: '29',
                        index: '/editor',
                        title: '富文本编辑器',
                    },
                    {
                        id: '292',
                        pid: '29',
                        index: '/markdown',
                        title: 'markdown编辑器',
                    },
                ],
            },
        ],
    },
    {
        id: '3',
        title: '表格',
        index: '3',
        icon: 'Calendar',
        children: [
            {
                id: '31',
                pid: '3',
                index: '/table',
                title: '基础表格',
            },
            {
                id: '32',
                pid: '3',
                index: '/table-editor',
                title: '可编辑表格',
            },
            {
                id: '33',
                pid: '3',
                index: '/import',
                title: '导入Excel',
            },
            {
                id: '34',
                pid: '3',
                index: '/export',
                title: '导出Excel',
            },
        ],
    },
    {
        id: '4',
        icon: 'PieChart',
        index: '4',
        title: '图表',
        children: [
            {
                id: '41',
                pid: '4',
                index: '/schart',
                title: 'schart图表',
            },
            {
                id: '42',
                pid: '4',
                index: '/echarts',
                title: 'echarts图表',
            },
        ],
    },
    {
        id: '5',
        icon: 'Guide',
        index: '/icon',
        title: '图标',
        permiss: '5',
    },
    {
        id: '7',
        icon: 'Brush',
        index: '/theme',
        title: '主题',
    },
    {
        id: '6',
        icon: 'DocumentAdd',
        index: '6',
        title: '附加页面',
        children: [
            {
                id: '61',
                pid: '6',
                index: '/ucenter',
                title: '个人中心',
            },
            {
                id: '62',
                pid: '6',
                index: '/login',
                title: '登录',
            },
            {
                id: '63',
                pid: '6',
                index: '/register',
                title: '注册',
            },
            {
                id: '64',
                pid: '6',
                index: '/reset-pwd',
                title: '重设密码',
            },
            {
                id: '65',
                pid: '6',
                index: '/403',
                title: '403',
            },
            {
                id: '66',
                pid: '6',
                index: '/404',
                title: '404',
            },
        ],
    },
];
