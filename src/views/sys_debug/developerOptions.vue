<script setup lang="ts">
import {ref} from "vue";
import {insertAttendance} from "@/api/forAttendance";

const empId = ref('')
const date = ref('')
const time = ref('')
async function insert(type){
  await insertAttendance({
    empId: empId.value,
    time: `${date.value}T${time.value}`,
    type: type,
  })
}
</script>

<template>
<div style="padding: 10px">
  <div style="padding: 20px; width: 400px; background: #BEF">
    <div style="margin: 5px">
      <label>考勤打卡模拟终端</label>
    </div>
    <div style="margin-bottom: 5px">
      <el-text size="large">工号：</el-text>
      <el-input v-model="empId" style="width: 230px;"/>
    </div>
    <div style="margin-bottom: 5px">
      <el-text size="large">日期：</el-text>
      <el-date-picker v-model="date" type="date" value-format="YYYY-MM-DD" style="width: 230px;"/>
      <el-text>{{ date }}</el-text>
    </div>
    <div style="margin-bottom: 5px">
      <el-text size="large">时间：</el-text>
      <el-time-picker v-model="time" value-format="HH:mm:ss" style="width: 230px;"/>
      <el-text>{{ time }}</el-text>
    </div>
    <div style="margin-bottom: 5px">
      <el-text>{{date}}T{{ time }}</el-text>
    </div>
    <div style="margin-bottom: 5px; text-align: right">
      <el-button @click="insert('in')">上班打卡</el-button>
      <el-button @click="insert('out')">下班打卡</el-button>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>