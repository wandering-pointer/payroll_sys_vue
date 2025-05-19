<template>
  <el-container class="full-container">
    <el-main class="center-main">
      <el-card class="password-card" shadow="always">
        <div slot="header" class="card-header">
          <h3>修改密码</h3>
        </div>

        <el-form :model="form" label-width="100px" size="large">
          <el-form-item label="旧密码">
            <el-input v-model="form.oldPwd" type="password" show-password />
          </el-form-item>

          <el-form-item label="新密码">
            <el-input v-model="form.newPwd" type="password" show-password />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSubmit" block>确认修改</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import {ref} from "vue";
import {changePassword} from "@/api/forUserAccount";
import router from "@/router";
import {logout} from "@/api/forIdentify";

const form = ref({
  oldPwd: '',
  newPwd: ''
})

async function handleSubmit (){
  if (!form.value.oldPwd || !form.value.newPwd) {
    ElMessage.error('请填写完整信息')
    return
  }
  const res = await changePassword(form.value)
  if(res === 1) {
    await logout()
    window.location.reload()
    ElMessage.warning("请重新登陆")
  }
}
</script>

<style scoped>
.full-container {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.center-main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.password-card {
  width: 500px;
  padding: 20px;
}

.card-header {
  text-align: center;
  margin-bottom: 10px;
}
</style>