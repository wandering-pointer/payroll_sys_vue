export interface SelectionView {
    label: string;
    value: any;
    parent: number;
}

// 映射函数
export function formatSelectionView(list, value){
    //console.log(value);
    const item = list.find((element) => element.value === value);
    return item?.label; // 使用可选链操作符，避免 item 为 undefined 时出错
}

// list2元素的label（数字）指向list1元素的value，将list2元素的label替换为其所对应的list1元素中value对应的label
export function labelToValueLabel(list1: SelectionView[], list2: SelectionView[]): SelectionView[] {
    // 创建一个映射表，方便快速查找 list1 中的元素
    const valueToLabelMap = new Map<any, string>();
    for (const item of list1) {
        valueToLabelMap.set(item.value, item.label);
    }

    // 遍历 list2 并替换 label
    const updatedList2 = list2.map(item => {
        const newLabel = valueToLabelMap.get(Number(item.label)); // 确保 label 转换为数字
        if (newLabel !== undefined) {
            return { ...item, label: newLabel }; // 替换 label
        }
        return item; // 如果没有找到对应值，保持原样
    });

    return updatedList2;
}