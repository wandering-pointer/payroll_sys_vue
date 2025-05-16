<template>
  <div>
    <TableSearch :query="query" :options="searchOpt" :search="handleSearch" />
    <div class="container">
      <TableCustom :columns="columns"
                   :tableData="tableData"
                   :total="page.total"
                   :refresh="getData"
                   :currentPage="page.index"
                   :changePage="changePage"
                   :page-size="page.size">
        <template #toolbarBtn>
          <h4>部门：{{deptName}}</h4>
        </template>
      </TableCustom>

    </div>
    <el-dialog title="查看详情" v-model="visible1" width="700px" destroy-on-close>
      <TableDetail :data="viewData"/>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="basetable">
import {ref, reactive, computed} from 'vue';
import TableCustom from '@/components/table-custom.vue';
import TableDetail from '@/components/table-detail.vue';
import TableSearch from '@/components/table-search.vue';
import { FormOption, FormOptionList } from '@/types/form-option';
import {
  calculateMonthlySalary,
  listDeptMonthlySalary, passMonthlySalary, undoMonthlySalary,
  updateMonthlySalary
} from "@/api/forMonthlySalary";
import {MonthlySalary} from "@/types/MonthlySalary";
import {ElMessage} from "element-plus";
import {handleConfirm} from "@/utils/MyLittleUtils";
import {getCurrentUserDeptName, getEmployeeSelectionView} from "@/api/forEmployee";
import {SelectionView} from "@/types/SelectionView";
import {getDepartmentSelectionView} from "@/api/forDepartment";

const deptName = ref('无数据')

const s_empSV = ref<SelectionView[]>([]);
const empSV = computed(() => s_empSV.value);

async function getStaticData() {
  s_empSV.value = await getEmployeeSelectionView();
  deptName.value = await getCurrentUserDeptName()
}
getStaticData()

// 查询相关
const query = reactive({
  year: '未选择',
  month: '未选择',
  empId: '',
  deptId: undefined,
});
const years = generateYearsSelectionView()
const searchOpt = ref<FormOptionList[]>([
  { prop: 'year', label: '年份', type: 'select', style: 'width: 100px', opts: years },
  { prop: 'month', label: '月份', type: 'select', style: 'width: 100px', opts: [
      { label: '1', value: '01' },{ label: '2', value: '02' },{ label: '3', value: '03' },{ label: '4', value: '04' },
      { label: '5', value: '05' },{ label: '6', value: '06' },{ label: '7', value: '07' },{ label: '8', value: '08' },
      { label: '9', value: '09' },{ label: '10', value: '10' },{ label: '11', value: '11' },{ label: '12', value: '12' },
    ]
  },
  { prop: 'empId', label: '工号', type: 'input', placeholder: '全匹配' },
])
const handleSearch = async () => {
  var yearMonth
  if (query.year == '未选择' || query.month == '未选择') {
    yearMonth = null;
  }
  else{
    yearMonth = `${query.year}-${query.month}-01`;
  }
  const data = await listDeptMonthlySalary({
    size: page.size,
    index: 1,
    monthlySalary: {yearMonth: yearMonth, empId: query.empId},
    deptId: query.deptId,
  })
  tableData.value = data.list;
  page.total = data.total
  page.index = 1;
};

// 表格相关
let columns = ref([
  { prop: 'id', label: '编号' },
  { prop: 'empId', label: '工号' },
  { prop: 'empId', label: '姓名', type: 'selection-view', selectionView: empSV },
  { prop: 'baseSalary', label: '基本工资(含等级加成)' },
  { prop: 'allowanceTotal', label: '加班津贴' },
  { prop: 'attendanceDeduction', label: '缺勤扣款' },
  { prop: 'tax', label: '缴税' },
  { prop: 'otherSources', label: '其他补扣' },
  { prop: 'salary', label: '应发工资' },
  { prop: 'operator', label: '操作', width: 120, type: 'open-button', btnInfo: [
      {label: '查看备注', type: 'warning', icon: 'View', handler: handleView },
    ]
  }
])
const page = reactive({
  index: 1,
  size: 10,
  total: 0,
})
const tableData = ref<MonthlySalary[]>([]);
const getData = async () => {
  var yearMonth = null;
  if (query.year != '未选择' && query.month != '未选择') {
    yearMonth = `${query.year}-${query.month}-01`
  }
  const data = await listDeptMonthlySalary({
    size: page.size,
    index: page.index,
    monthlySalary: {yearMonth: yearMonth},
  })
  tableData.value = data.list;
  page.total = data.total
  return data
};
getData();

const changePage = (val: number) => {
  page.index = val;
  getData();
};

// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref({
  row: {},
  list: []
});
function handleView (row: MonthlySalary) {
  viewData.value.row = { ...row }
  viewData.value.list = [
    { prop: 'notes', label: '备注' },
  ]
  visible1.value = true;
}

function generateYearsSelectionView(){
  var res = []
  for(var i = 2025; i > 2020; i--){
    res.push({ label: String(i), value: String(i) })
  }
  return res
}

</script>

<style scoped>
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
