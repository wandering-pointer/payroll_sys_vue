import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { usePermissStore } from '../store/permiss';
import Home from '../views/home.vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import axios from "axios";
import {ElMessage} from "element-plus";
import {checkToken} from "@/api/forIdentify";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/homePage',
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/homePage',
                name: 'homePage',
                meta: {
                    title: '系统首页',
                    noAuth: true,
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/homePage.vue'),
            },
            {
                path: '/debug/tools',
                meta: {
                    title: '小工具',
                    permiss: 'debug',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/sys_debug/developerOptions.vue'),
            },
            {
                path: '/debug/attendance',
                meta: {
                    title: '全司考勤记录',
                    permiss: 'debug',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/sys_debug/_attendance.vue'),
            },
            {
                path: '/hr/department',
                meta: {
                    title: '部门管理',
                    permiss: '101',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/sys_hr/department.vue'),
            },
            {
                path: '/hr/job',
                meta: {
                    title: '工种管理',
                    permiss: '101',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/sys_hr/job.vue'),
            },
            {
                path: '/hr/employee',
                meta: {
                    title: '员工管理',
                    permiss: '101',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/sys_hr/employee.vue'),
            },
            {
                path: '/hr/userAccount',
                meta: {
                    title: '账号管理',
                    permiss: '101',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/sys_hr/userAccount.vue'),
            },
            {
                path: '/hr/policy',
                meta: {
                    title: '加班津贴规则',
                    permiss: '101',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/sys_hr/policy.vue'),
            },
            {
                path: '/manager/attendance',
                meta: {
                    title: '部门考勤记录',
                    permiss: '102',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/sys_manager/dept-attendance.vue'),
            },
            {
                path: '/manager/overtime',
                meta: {
                    title: '部门加班记录',
                    permiss: '102',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/sys_manager/dept-overtime.vue'),
            },
            {
                path: '/self/overtime',
                meta: {
                    title: '个人加班记录',
                    permiss: '103',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '@/views/sys_self/my-overtime.vue'),
            },
            {
                path: '/debug/overtime',
                meta: {
                    title: '全司加班记录',
                    permiss: 'debug',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '@/views/sys_debug/_overtime.vue'),
            },
            {
                path: '/self/attendance',
                meta: {
                    title: '个人考勤记录',
                    permiss: '103',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/sys_self/my-attendance.vue'),
            },
            {
                path: '/finance/check',
                meta: {
                    title: '工资核算',
                    permiss: '104',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/sys_finance/check-salary.vue'),
            },
            {
                path: '/finance/history',
                meta: {
                    title: '历史工资查看',
                    permiss: '104',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/sys_finance/history-salary.vue'),
            },
            {
                path: '/manager/salary',
                meta: {
                    title: '部门工资记录',
                    permiss: '102',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/sys_manager/dept-salary.vue'),
            },
            {
                path: '/self/salary',
                meta: {
                    title: '个人工资记录',
                    permiss: '103',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/sys_self/delf-salary.vue'),
            },
            {
                path: '/finance/bonds',
                meta: {
                    title: '年终奖管理',
                    permiss: '104',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/sys_finance/check-bonds.vue'),
            },
            {
                path: '/manager/bonds',
                meta: {
                    title: '部门年终奖记录',
                    permiss: '102',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/sys_manager/dept-bonds.vue'),
            },
            {
                path: '/self/bonds',
                meta: {
                    title: '个人年终奖记录',
                    permiss: '103',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/sys_self/delf-bonds.vue'),
            },
            {
                path: '/self/password',
                meta: {
                    title: '修改密码',
                    permiss: '103',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/sys_self/change-pwd.vue'),
            },
        ],
    },
    {
        path: '/login',
        meta: {
            title: '登录',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/pages/login.vue'),
    },
    {
        path: '/reset-pwd',
        meta: {
            title: '重置密码',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "reset-pwd" */ '../views/pages/reset-pwd.vue'),
    },
    {
        path: '/403',
        meta: {
            title: '没有权限',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/pages/403.vue'),
    },
    {
        path: '/404',
        meta: {
            title: '找不到页面',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "404" */ '../views/pages/404.vue'),
    },
    {
        path: '/404',
        meta: {
            title: '找不到页面',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "404" */ '../views/pages/404.vue'),
    },
    { path: '/:path(.*)', redirect: '/404' },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    NProgress.start();

    const publicPages = ['/login']; // 不需要验证的页面
    const authRequired = !publicPages.includes(to.path);

    if (authRequired) {
        // 检查登录状态
        try{
            checkToken()
        }
        catch (error){
            ElMessage.error('请求失败，请检查网络');
            console.error('检查登录状态 error:', error);
            return next('/login');
        }
    }
    next();
});

router.afterEach(() => {
    NProgress.done();
});

export function reDirect(path: string){
    router.push(path)
}

export default router;
