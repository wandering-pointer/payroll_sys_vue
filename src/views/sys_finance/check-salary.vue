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
          <div style="flex-wrap: wrap; display: flex; align-items: center; gap: 1rem;">
            <el-select placeholder="选择年份"  v-model="calcYear" style="width: 100px;">
              <el-option
                  v-for="item in years"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
            <el-select placeholder="选择月份"  v-model="calcMonth" style="width: 100px;">
              <el-option
                  v-for="item in months"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
            <el-button type="warning" @click="handleCalc">计算该月工资</el-button>
            <el-button type="success" @click="handelPass">核算通过</el-button>
            <el-button type="danger" @click="handelUndo">全部撤销</el-button>
          </div>
				</template>
        <template #checked="{ rows }">
          <el-tag :type="rows.checked ? 'success' : 'danger'">
            {{ rows.checked ? '已通过' : '未通过' }}
          </el-tag>
        </template>
			</TableCustom>

		</div>
		<el-dialog :title="'编辑'" v-model="EditVisible" width="700px" destroy-on-close
               :close-on-click-modal="false" @close="closeEditDialog">
			<TableEdit :form-data="editRowData" :options="options" :edit=true :update="editData">
			</TableEdit>
		</el-dialog>
		<el-dialog title="查看详情" v-model="visible1" width="700px" destroy-on-close>
      <TableDetail :data="viewData"/>
		</el-dialog>
    <el-dialog title="计算工资" v-model="calculateVisible" width="700px" destroy-on-close @close="handleCalcClose">
      <h3 style="text-align: center">{{calcResult}}</h3>
      <el-button type="warning" @click="handleCalc" style="text-align: center">点我刷新</el-button>
    </el-dialog>
	</div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue';
import { CirclePlusFilled } from '@element-plus/icons-vue';
import TableCustom from '@/components/table-custom.vue';
import TableDetail from '@/components/table-detail.vue';
import TableSearch from '@/components/table-search.vue';
import { FormOption, FormOptionList } from '@/types/form-option';
import TableEdit from "@/components/table-edit.vue";
import {
  calculateMonthlySalary,
  insertMonthlySalary,
  listMonthlySalary, passMonthlySalary, undoMonthlySalary,
  updateMonthlySalary
} from "@/api/forMonthlySalary";
import {MonthlySalary} from "@/types/MonthlySalary";
import {ElMessage} from "element-plus";
import {handleConfirm, pageSize} from "@/utils/MyLittleUtils";

const calcYear = ref('')
const calcMonth = ref('')

const months = [
  { label: '1', value: '01' },{ label: '2', value: '02' },{ label: '3', value: '03' },{ label: '4', value: '04' },
  { label: '5', value: '05' },{ label: '6', value: '06' },{ label: '7', value: '07' },{ label: '8', value: '08' },
  { label: '9', value: '09' },{ label: '10', value: '10' },{ label: '11', value: '11' },{ label: '12', value: '12' },
]

// 查询相关
const query = reactive({
  year: '',
  month: '',
  empId: '',
});
const years = generateYearsSelectionView()
const searchOpt = ref<FormOptionList[]>([
  { prop: 'year', label: '年份', type: 'select', style: 'width: 100px', opts: years },
  { prop: 'month', label: '月份', type: 'select', style: 'width: 100px', opts: months },
  { prop: 'empId', label: '工号', type: 'input', placeholder: '全匹配' },
])
const handleSearch = async () => {
  var yearMonth
  if (query.year == '' || query.month == '') {
    yearMonth = null;
  }
  else{
    yearMonth = `${query.year}-${query.month}-01`;
  }
  const data = await listMonthlySalary({
    size: page.size,
    index: 1,
    monthlySalary: {yearMonth: yearMonth, empId: query.empId},
  })
  tableData.value = data.list;
  page.total = data.total
  page.index = 1;
};

// 表格相关
let columns = ref([
	{ prop: 'id', label: '编号' },
	{ prop: 'empId', label: '工号' },
  { prop: 'baseSalary', label: '基本工资(含等级加成)' },
  { prop: 'allowanceTotal', label: '加班津贴' },
  { prop: 'attendanceDeduction', label: '缺勤扣款' },
  { prop: 'tax', label: '缴税' },
  { prop: 'otherSources', label: '其他补扣' },
  { prop: 'salary', label: '应发工资' },
  { prop: 'checked', label: '状态' },
  { prop: 'operator', label: '操作', width: 250, type: 'open-button', btnInfo: [
      {label: '查看备注', type: 'warning', icon: 'View', handler: handleView },
      {label: '补扣备注', type: 'primary', icon: 'Edit', handler: handleEdit },
    ]
  }
])
const page = reactive({
	index: 1,
	size: pageSize,
	total: 0,
})
const tableData = ref<MonthlySalary[]>([]);
const getData = async () => {
  var yearMonth = null;
  if (query.year != '' && query.month != '') {
    yearMonth = `${query.year}-${query.month}-01`
  }
	const data = await listMonthlySalary({
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

// 编辑弹窗相关
let options = ref<FormOption>({
	labelWidth: '100px',
	span: 24,
	list: [
		{ type: 'input', label: '补扣', prop: 'otherSources' },
		{ type: 'input', label: '备注', prop: 'notes' },
	]
})
const EditVisible = ref(false);
const editRowData = ref({});
function handleEdit(row: MonthlySalary) {
	editRowData.value = { ...row };
	EditVisible.value = true;
};
const editData = async (form: MonthlySalary) => {
	closeEditDialog()
  await updateMonthlySalary(form)
	getData();
};

const closeEditDialog = () => {
	EditVisible.value = false;
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

// 计算工资相关
const calculateVisible = ref(false)
var calcResult = ref("未知")
async function handleCalc() {
  if (calcYear.value == '' || calcMonth.value == '') {
    ElMessage.error("未选择时间")
    return
  }
  var date = calcYear.value + '-' + calcMonth.value
  calcResult.value = await calculateMonthlySalary({date: date})
  if(calcResult.value == '0'){
    calculateVisible.value = false
    query.year = calcYear.value
    query.month = calcMonth.value
    await handleSearch()
    return
  }
  calculateVisible.value = true
}
function handleCalcClose(){
  calculateVisible.value = false
}
 function generateYearsSelectionView(){
  var res = []
  for(var i = 2025; i > 2020; i--){
    res.push({ label: String(i), value: String(i) })
  }
  return res
}

// 撤销相关
function handelUndo() {
  if (query.year == '' || query.month == '') {
    ElMessage.error("未选择时间")
    return
  }
  const date = query.year + '-' + query.month;
  handleConfirm("撤销", handleUndoMonthlySalary, {date: date})
}
async function handleUndoMonthlySalary(date){
  await undoMonthlySalary(date)
  getData()
}

// 审核通过相关
function handelPass(){
  if (query.year == '' || query.month == '') {
    ElMessage.error("未选择时间")
    return
  }
  const date = query.year + '-' + query.month;
  handleConfirm("通过", handlePassMonthlySalary, {date: date})
}
async function handlePassMonthlySalary(date) {
  await passMonthlySalary(date)
  getData()
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
