<script setup lang="ts">

import {ref} from "vue";

const time_zh = ref("你")
time_zh.value = getTimeOfDay()

const name = ref("")
name.value = localStorage.getItem("username")

function getTimeOfDay() {
  const now = new Date(); // 获取当前时间
  const hour = now.getHours(); // 获取小时数（0-23）

  if (hour >= 5 && hour < 8) {
    return "清晨好";
  } else if (hour >= 8 && hour < 11) {
    return "上午好";
  } else if (hour >= 11 && hour < 13) {
    return "中午好";
  } else if (hour >= 13 && hour < 17) {
    return "下午好";
  } else if (hour >= 18 && hour < 23) {
    return "晚上好";
  } else if (hour >= 23 || hour < 5) {
    return "夜深了";
  }
}

</script>

<template>
  <body style="background-image: url('src/assets/img/home-background.jpg');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center; ">
  <div style="text-align: center">
    <br><br><br><br>
    <div style="text-align: center; background-color: rgba(255, 255, 255, 0.7); width: 1000px ; margin: 0 auto;">
      <br>
      <h1 style="color: #05B">欢迎来到工资管理系统</h1><br>
      <h2>{{time_zh}}，{{name}}</h2>
      <br>
    </div>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
<!--  html高手，换行仙人  -->
  </div>
  </body>
</template>

<style scoped>

</style>