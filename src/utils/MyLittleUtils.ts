import {ElMessage} from "element-plus";
import {reDirect} from "@/router";

export function showMessage(res){
    switch (res.code){
        case 0:
            if(res.message.length > 0){
                ElMessage.success(res.message)
            }
            break
        case -1:
            ElMessage.error('服务器错误：' + res.message)
            break
        case -2:
            ElMessage.error('身份信息已失效，请重新登录')
            reDirect('/login')
            break
        default:
            ElMessage.error('未知错误：' + res.message)
    }
}