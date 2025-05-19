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

//询问是否继续进行op操作，然后执行func(data)  === 以后一定要直接改成异步的
export const handleConfirm = async (op: string, func: Function, data: any) => {
    ElMessageBox.confirm(`确定要${op}吗？`, '提示', {
        type: 'warning'
    })
        .then(async () => {
            func(data);
        })
        .catch(() => { });
};

export function formatDateTime(date, format = 'YYYY-MM-DDTHH:mm:ss') {
    const padZero = (num) => num.toString().padStart(2, '0'); // 补零函数

    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1); // 月份从 0 开始
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());

    // 替换占位符
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const pageSize = 15;
