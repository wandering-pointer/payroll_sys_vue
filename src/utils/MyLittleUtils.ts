import {ElMessage} from "element-plus";
import {reDirect} from "@/router";

export function showMessage(res){
    switch (res.data.code){
        case 0:
            ElMessage.success(res.data.message)
            break
        case -1:
            ElMessage.error('服务器未知错误：' + res.data.message)
            break
        case -2:
            ElMessage.error('登录认证已失效，请重新登录')
            reDirect('/login')
            break
        default:
            ElMessage.error('未知错误：' + res.data.message)
    }
}