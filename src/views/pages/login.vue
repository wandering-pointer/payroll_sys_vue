<template>
    <div class="login-bg">
        <div class="login-container">
            <div class="login-header">
                <img class="logo mr10" src="../../assets/img/logo.svg" alt="" />
                <div class="login-title">后台管理系统</div>
            </div>
            <el-form :model="param" :rules="rules" ref="login" size="large">
                <el-form-item prop="username">
                    <el-input v-model="param.empId" placeholder="用户名">
                        <template #prepend>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="密码"
                        v-model="param.password"
                        @keyup.enter="submitForm(login)"
                    >
                        <template #prepend>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
              <el-form-item label="用户角色" prop="selectedRole">
                <el-select v-model="param.role" placeholder="请选择">
                  <el-option key="ROOT" label="超级管理员" value="ROOT"></el-option>
                  <el-option key="ADMIN" label="系统运维" value="ADMIN"></el-option>
                  <el-option key="HR" label="人力资源管理员" value="HR"></el-option>
                  <el-option key="MANAGER" label="部门经理" value="MANAGER"></el-option>
                  <el-option key="FINANCE" label="财务管理员" value="FINANCE"></el-option>
                  <el-option key="EMPLOYEE" label="普通员工" value="EMPLOYEE"></el-option>
                </el-select>
              </el-form-item>
                <el-button class="login-btn" type="primary" size="large" @click="submitForm(login)">登录</el-button>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useTabsStore } from '@/store/tabs';
import { usePermissStore } from '@/store/permiss';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import {tryLogin} from '@/api/forLogin';

interface LoginInfo {
    empId: string;
    password: string;
    role: string;
}

const lgStr = localStorage.getItem('login-param');
const defParam = lgStr ? JSON.parse(lgStr) : null;
const checked = ref(lgStr ? true : false);

const router = useRouter();
const param = reactive<LoginInfo>({
    empId: defParam ? defParam.empId : '',
    password: defParam ? defParam.password : '',
    role: defParam ? defParam.role : 'ROOT',
});

const rules: FormRules = {
  empId: [
        {
            required: true,
            message: '请输入工号',
            trigger: 'blur',
        },
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};
const permiss = usePermissStore();
const login = ref<FormInstance>();
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async (valid: boolean) => {
      if (valid) {
        try {
          // 发送登录请求到后端
          console.log(param)
          const response = await tryLogin(param);

          // 处理响应
          if (response.data.data.token) {
            ElMessage.success('登录成功，令牌：' + response.data.data.token);
            localStorage.setItem('username', param.empId);
            localStorage.setItem('token', response.data.data.token) //后端给的令牌
            localStorage.setItem('userRole', param.role)
            //
            const keys = permiss.defaultList[param.role];
            permiss.handleSet(keys);
            await router.push('/');

          } else {
            ElMessage.error(response.data.data.message || '登录失败');
          }
        } catch (error) {
          ElMessage.error('请求失败，请检查网络');
          console.error('Login error:', error);
        }
      } else {
        ElMessage.error('表单验证失败');
        return false;
      }
    });
};

const tabs = useTabsStore();
tabs.clearTabs();
</script>

<style scoped>
.login-bg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: url(../../assets/img/login-bg.jpg) center/cover no-repeat;
}

.login-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
}

.logo {
    width: 35px;
}

.login-title {
    font-size: 22px;
    color: #333;
    font-weight: bold;
}

.login-container {
    width: 450px;
    border-radius: 5px;
    background: #fff;
    padding: 40px 50px 50px;
    box-sizing: border-box;
}

.pwd-tips {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin: -10px 0 10px;
    color: #787878;
}

.pwd-checkbox {
    height: auto;
}

.login-btn {
    display: block;
    width: 100%;
}

.login-tips {
    font-size: 12px;
    color: #999;
}

.login-text {
    display: flex;
    align-items: center;
    margin-top: 20px;
    font-size: 14px;
    color: #787878;
}
</style>
