import {ElMessage} from "element-plus";
import {reDirect} from "@/router";

export async function showMessage(res) {
    switch (res.code) {
        case 0:
            if (res.message.length > 0) {
                ElMessage.success(res.message)
            }
            break
        case -1:
            ElMessage.error('身份信息已失效，请重新登录')
            console.log(res.message)
            await reDirect('/login')
            break
        case -2:
            ElMessage.error(res.message)
            break
        default:
            ElMessage.error('错误：' + res.message)
    }
}