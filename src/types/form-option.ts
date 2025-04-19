import {ComputedRef} from "vue";
import {SelectionView} from "@/types/SelectionView";

export interface FormOption {
    list: FormOptionList[];
    labelWidth?: number | string;
    span?: number;

}

export interface FormOptionList {
    prop: string;
    label: string;
    type: string;
    placeholder?: string;
    disabled?: boolean;
    opts?: any // 兼容响应式类型，其实应该是 any[] | ComputedRef<SelectionView[]> 我不会搞，IDEA给我报错
    format?: string;
    activeValue?: any;
    inactiveValue?: any;
    activeText?: string;
    inactiveText?: string;
    required?: boolean;
    style?: string;
    change?: Function;
}