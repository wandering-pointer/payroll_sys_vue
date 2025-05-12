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
                path: '/system-user',
                name: 'system-user',
                meta: {
                    title: '用户管理',
                    permiss: '11',
                },
                component: () => import(/* webpackChunkName: "system-user" */ '../views/system/user.vue'),
            },
            {
                path: '/system-role',
                name: 'system-role',
                meta: {
                    title: '角色管理',
                    permiss: '12',
                },
                component: () => import(/* webpackChunkName: "system-role" */ '../views/system/role.vue'),
            },
            {
                path: '/system-menu',
                name: 'system-menu',
                meta: {
                    title: '菜单管理',
                    permiss: '13',
                },
                component: () => import(/* webpackChunkName: "system-menu" */ '../views/system/menu.vue'),
            },
            {
                path: '/table',
                name: 'basetable',
                meta: {
                    title: '基础表格',
                    permiss: '31',
                },
                component: () => import(/* webpackChunkName: "table" */ '../views/table/basetable.vue'),
            },
            {
                path: '/table-editor',
                name: 'table-editor',
                meta: {
                    title: '可编辑表格',
                    permiss: '32',
                },
                component: () => import(/* webpackChunkName: "table-editor" */ '../views/table/table-editor.vue'),
            },
            {
                path: '/schart',
                name: 'schart',
                meta: {
                    title: 'schart图表',
                    permiss: '41',
                },
                component: () => import(/* webpackChunkName: "schart" */ '../views/chart/schart.vue'),
            },
            {
                path: '/echarts',
                name: 'echarts',
                meta: {
                    title: 'echarts图表',
                    permiss: '42',
                },
                component: () => import(/* webpackChunkName: "echarts" */ '../views/chart/echarts.vue'),
            },

            {
                path: '/icon',
                name: 'icon',
                meta: {
                    title: '图标',
                    permiss: '5',
                },
                component: () => import(/* webpackChunkName: "icon" */ '../views/pages/icon.vue'),
            },
            {
                path: '/ucenter',
                name: 'ucenter',
                meta: {
                    title: '个人中心',
                },
                component: () => import(/* webpackChunkName: "ucenter" */ '../views/pages/ucenter.vue'),
            },
            {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器',
                    permiss: '291',
                },
                component: () => import(/* webpackChunkName: "editor" */ '../views/pages/editor.vue'),
            },
            {
                path: '/markdown',
                name: 'markdown',
                meta: {
                    title: 'markdown编辑器',
                    permiss: '292',
                },
                component: () => import(/* webpackChunkName: "markdown" */ '../views/pages/markdown.vue'),
            },
            {
                path: '/export',
                name: 'export',
                meta: {
                    title: '导出Excel',
                    permiss: '34',
                },
                component: () => import(/* webpackChunkName: "export" */ '../views/table/export.vue'),
            },
            {
                path: '/import',
                name: 'import',
                meta: {
                    title: '导入Excel',
                    permiss: '33',
                },
                component: () => import(/* webpackChunkName: "import" */ '../views/table/import.vue'),
            },
            {
                path: '/theme',
                name: 'theme',
                meta: {
                    title: '主题设置',
                    permiss: '7',
                },
                component: () => import(/* webpackChunkName: "theme" */ '../views/pages/theme.vue'),
            },
            {
                path: '/calendar',
                name: 'calendar',
                meta: {
                    title: '日历',
                    permiss: '24',
                },
                component: () => import(/* webpackChunkName: "calendar" */ '../views/element/calendar.vue'),
            },
            {
                path: '/watermark',
                name: 'watermark',
                meta: {
                    title: '水印',
                    permiss: '25',
                },
                component: () => import(/* webpackChunkName: "watermark" */ '../views/element/watermark.vue'),
            },
            {
                path: '/carousel',
                name: 'carousel',
                meta: {
                    title: '走马灯',
                    permiss: '23',
                },
                component: () => import(/* webpackChunkName: "carousel" */ '../views/element/carousel.vue'),
            },
            {
                path: '/tour',
                name: 'tour',
                meta: {
                    title: '分步引导',
                    permiss: '26',
                },
                component: () => import(/* webpackChunkName: "tour" */ '../views/element/tour.vue'),
            },
            {
                path: '/steps',
                name: 'steps',
                meta: {
                    title: '步骤条',
                    permiss: '27',
                },
                component: () => import(/* webpackChunkName: "steps" */ '../views/element/steps.vue'),
            },
            {
                path: '/form',
                name: 'forms',
                meta: {
                    title: '表单',
                    permiss: '21',
                },
                component: () => import(/* webpackChunkName: "form" */ '../views/element/form.vue'),
            },
            {
                path: '/upload',
                name: 'upload',
                meta: {
                    title: '上传',
                    permiss: '22',
                },
                component: () => import(/* webpackChunkName: "upload" */ '../views/element/upload.vue'),
            },
            {
                path: '/statistic',
                name: 'statistic',
                meta: {
                    title: '统计',
                    permiss: '28',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/element/statistic.vue'),
            },
//
//========================================= 以下是我自己的 =============================================
//
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
//
//========================================= 以上是我自己的 =============================================
//
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
        path: '/register',
        meta: {
            title: '注册',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "register" */ '../views/pages/register.vue'),
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
