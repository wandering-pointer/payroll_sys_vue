import {ElMessage, ElMessageBox} from "element-plus";
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
            await reDirect('/login')
            break
        case -2:
            ElMessage.error(res.message)
            break
        default:
            ElMessage.error('错误：' + res.message)
    }
}

//询问是否继续进行op操作，然后执行func(data)
export const handleConfirm = (op: string, func: Function, data: any) => {
    ElMessageBox.confirm(`确定要${op}吗？`, '提示', {
        type: 'warning'
    })
        .then(async () => {
            func(data);
        })
        .catch(() => { });
};