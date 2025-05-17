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
            <el-select placeholder="选择年份" v-model="calcYear" style="width: 200px;">
              <el-option
                  v-for="item in years"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
            <el-button type="warning" @click="handleCalc">计算该年年终奖</el-button>
            <el-button type="danger" @click="handelUndo">撤销该年年终奖</el-button>
          </div>
				</template>
			</TableCustom>

		</div>
    <el-dialog title="计算年终奖" v-model="calculateVisible" width="700px" destroy-on-close @close="handleCalcClose">
      <h3 style="text-align: center">{{calcResult}}</h3>
      <el-button type="warning" @click="handleCalc" style="text-align: center">点我刷新</el-button>
    </el-dialog>
	</div>
</template>

<script setup lang="ts" name="basetable">
import {ref, reactive, computed} from 'vue';
import { CirclePlusFilled } from '@element-plus/icons-vue';
import TableCustom from '@/components/table-custom.vue';
import TableDetail from '@/components/table-detail.vue';
import TableSearch from '@/components/table-search.vue';
import { FormOption, FormOptionList } from '@/types/form-option';
import TableEdit from "@/components/table-edit.vue";
import {
  calculateBonds,
  insertBonds,
  listBonds, undoBonds,
  updateBonds
} from "@/api/forBonds";
import {Bonds} from "@/types/Bonds";
import {ElMessage} from "element-plus";
import {handleConfirm} from "@/utils/MyLittleUtils";
import {SelectionView} from "@/types/SelectionView";
import {getEmployeeSelectionView} from "@/api/forEmployee";
import {getDepartmentSelectionView} from "@/api/forDepartment";

const s_departmentSV = ref<SelectionView[]>([]);
const departmentSV = computed(() => s_departmentSV.value);

const s_empSV = ref<SelectionView[]>([]);
const empSV = computed(() => s_empSV.value);

async function getSVs() {
  s_empSV.value = await getEmployeeSelectionView();
  s_departmentSV.value = await getDepartmentSelectionView(null);
}
getSVs()

// 查询相关
const query = reactive({
  year: null,
  empId: null,
  deptId: null,
});
const years = generateYearsSelectionView()
const searchOpt = ref<FormOptionList[]>([
  { prop: 'year', label: '年份', type: 'select', style: 'width: 100px', opts: years },
  { prop: 'empId', label: '工号', type: 'input', placeholder: '全匹配' },
  { prop: 'deptId', label: '所属部门', type: 'select', opts: departmentSV, style: 'width: 150px' },
])
const handleSearch = async () => {
  const data = await listBonds({
    size: page.size,
    index: 1,
    bonds: query,
    deptId: query.deptId
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
  { prop: 'year', label: '年份' },
  { prop: 'total', label: '金额' },
])
const page = reactive({
	index: 1,
	size: 10,
	total: 0,
})
const tableData = ref<Bonds[]>([]);
const getData = async () => {
	const data = await listBonds({
    size: page.size,
    index: page.index,
    bonds: query,
    deptId: query.deptId
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

// 计算相关
const calcYear = ref('2025');
const calculateVisible = ref(false)
var calcResult = ref("未知")
async function handleCalc() {
  calcResult.value = await calculateBonds({year: calcYear.value});
  if(calcResult.value == '0'){
    calculateVisible.value = false
    query.year = calcYear.value
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
  handleConfirm(`撤销${calcYear.value}年的计算结果`, handleUndoBonds, {year: calcYear.value})
}
async function handleUndoBonds(year){
  await undoBonds(year)
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
