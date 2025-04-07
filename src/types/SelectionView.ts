export interface SelectionView {
    label: string;
    value: number;
}

// 映射函数
export function formatSelectionView(list, value){
    //console.log(value);
    const item = list.find((element) => element.value === value);
    return item?.label; // 使用可选链操作符，避免 item 为 undefined 时出错
}