<template>
  <div>
    <TableSearch :query="query" :options="searchOpt" :search="handleSearch" />
    <div class="container">
      <TableCustom :columns="columns"
                   :tableData="tableData"
                   :total="page.total"
                   :viewFunc="handleView"
                   :delFunc="handleDelete"
                   :editFunc="handleEdit"
                   :refresh="getData"
                   :currentPage="page.index"
                   :changePage="changePage"
                   :page-size="page.size">
        <template #toolbarBtn>
          <el-button type="warning" :icon="CirclePlusFilled" @click="AddVisible = true">新增</el-button>
        </template>
        <template #working="{ rows }">
          <el-tag :type="rows.working ? 'success' : 'danger'">
            {{ rows.working ? '在 职' : '离 职' }}
          </el-tag>
        </template>
      </TableCustom>

    </div>
    <el-dialog :title="'编辑'" v-model="EditVisible" width="700px" destroy-on-close
               :close-on-click-modal="false" @close="closeEditDialog">
      <TableEdit :form-data="editRowData" :options="options" :edit=true :update="editData" :is-ref=true>
      </TableEdit>
    </el-dialog>
    <el-dialog :title="'新增'" v-model="AddVisible" width="700px" destroy-on-close
               :close-on-click-modal="false" @close="closeAddDialog">
      <TableEdit :form-data="addRowData" :options="options" :edit=true :update="insertData">
      </TableEdit>
    </el-dialog>
    <el-dialog title="查看详情" v-model="visible1" width="700px" destroy-on-close>
      <TableDetail :data="viewData">
        <template #working="{ rows }">
          <el-tag :type="rows.working ? 'success' : 'danger'">
            {{ rows.working ? '在 职' : '离 职' }}
          </el-tag>
        </template>
      </TableDetail>
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
import {deleteEmployee, insertEmployee, listEmployee, updateEmployee} from "@/api/forEmployee";
import {Employee} from "@/types/Employee";
import {getDepartmentSelectionView} from "@/api/forDepartment";
import {labelToValueLabel, SelectionView} from "@/types/SelectionView";
import {getJobSelectionView} from "@/api/forJob";

// 使用响应式引用
const s_departmentSV = ref<SelectionView[]>([]);
// 使用computed保持选项的响应式
const departmentSV = computed(() => s_departmentSV.value);

const s_jobSV_deptId = ref<SelectionView[]>([]);
const jobSV_deptId = computed(() => s_jobSV_deptId.value);

const s_jobSV_title = ref<SelectionView[]>([]);
const jobSV_title = computed(() => s_jobSV_title.value);

const s_jobSV_salary = ref<SelectionView[]>([]);
const jobSV_salary = computed(() => s_jobSV_salary.value);

const s_jobSV_deptName = ref<SelectionView[]>([]);
const jobSV_deptName = computed(() => s_jobSV_deptName.value);

const s_jobSV_title_select = ref<SelectionView[]>([]);
const jobSV_title_select = computed(() => s_jobSV_title_select.value);


// 查询相关
const query = reactive({
  name: '',
});
const searchOpt = ref<FormOptionList[]>([
  { prop: 'jobId', label: '工种编号', type: 'input' },
  { prop: 'title', label: '工种名称', type: 'input' },
  { prop: 'deptId', label: '所属部门', type: 'select', opts: departmentSV, style: 'width: 150px' },
  { prop: 'level', label: '等级', type: 'input' },
  { prop: 'salary', label: '基本工资', type: 'input' },
  { prop: 'usable', label: '状态', type: 'select', style: 'width: 100px', opts: [
      { label: '正常', value: true },
      { label: '禁用', value: false }
    ]
  },
])
const handleSearch = async () => {
  s_departmentSV.value = await getDepartmentSelectionView(null);
  const data = await listEmployee({
    size: page.size,
    index: 1,
    employee: query,
  })
  tableData.value = data.list;
  page.total = data.total
  page.index = 1;
};

// 表格相关
let columns = ref([
  { prop: 'id', label: '工号' },
  { prop: 'name', label: '姓名' },
  { prop: 'phoneNum', label: '电话' },
  { prop: 'hireDate', label: '入职日期' },
  { prop: 'jobId', label: '所属部门', selectionView: jobSV_deptName, type: 'selection-view' },
  { prop: 'jobId', label: '工种', selectionView: jobSV_title, type: 'selection-view' },
  { prop: 'jobId', label: '基本工资', selectionView: jobSV_salary, type: 'selection-view' },
  { prop: 'level', label: '等级' },
  { prop: 'working', label: '状态' },
  { prop: 'operator', label: '操作', width: 250 },
])
const page = reactive({
  index: 1,
  size: 10,
  total: 0,
})
const tableData = ref<Employee[]>([]);
const getData = async () => {
  s_departmentSV.value = await getDepartmentSelectionView(null);
  s_jobSV_deptId.value = await getJobSelectionView('deptId');
  s_jobSV_title.value = await getJobSelectionView('title');
  s_jobSV_salary.value = await getJobSelectionView('salary');
  s_jobSV_deptName.value = labelToValueLabel(s_departmentSV.value, s_jobSV_deptId.value)
  const data = await listEmployee({
    size: page.size,
    index: page.index,
    employee: {},
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

// 新增/编辑弹窗相关
let options = ref<FormOption>({
  labelWidth: '100px',
  span: 24,
  list: [
    { prop: 'id', label: '工号', type: 'input', disabled: true, placeholder: '系统自动分配' },
    { prop: 'name', label: '姓名', type: 'input' },
    { prop: 'phoneNum', label: '电话', type: 'input' },
    { prop: 'hireDate', label: '入职日期', type: 'input', disabled: true },
    { prop: 'deptId', label: '所属部门', type: 'select', opts: departmentSV, change: handleDepartmentSelected},
    { prop: 'jobId', label: '工种', type: 'select', opts: jobSV_title_select },
    { prop: 'level', label: '等级', type: 'select', opts: [{value: 0}, {value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}] },
    { prop: 'working', label: '状态' , type: 'switch', activeText: '在职', inactiveText: '离职'},
  ]
})
const EditVisible = ref(false);
const AddVisible = ref(false);
const editRowData = ref({});
const addRowData = {
  working: true,
}
const handleEdit = async (row: Employee) => {
  s_departmentSV.value = await getDepartmentSelectionView(true);
  s_jobSV_title.value = await getJobSelectionView('title');

  const deptId = Number(jobSV_deptId.value.filter(item => item.value === row.jobId)[0].label);
  const deptData = {deptId: deptId}; // 把部门名称绑定到显示上
  handleDepartmentSelected(deptId);

  editRowData.value = {...row, ...deptData};
  EditVisible.value = true;
};
const editData = async (form: Employee) => {
  closeEditDialog()
  await updateEmployee(form)
  getData();
};

const insertData = async (form: Employee) => {
  closeAddDialog()
  await insertEmployee(form)
  getData();
};

const closeEditDialog = () => {
  EditVisible.value = false;
};

const closeAddDialog = () => {
  AddVisible.value = false;
};

// 筛选所选部门的工种
function handleDepartmentSelected(value: number) {
  editRowData.value.jobId = null;
  s_jobSV_title_select.value = jobSV_title.value.filter(item => item.parent === value);
}

// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref({
  row: {},
  list: []
});
const handleView = (row: Employee) => {
  viewData.value.row = { ...row }
  viewData.value.list = [
    { prop: 'jobId', label: '工种编号' },
    { prop: 'title', label: '工种名称' },
    { prop: 'deptId', label: '所属部门',isSelectionView: true, selectionView: s_departmentSV, type: 'selection-view' },
    { prop: 'level', label: '等级' },
    { prop: 'salary', label: '基本工资' },
    { prop: 'usable', label: '状态' },
  ]
  visible1.value = true;
};

// 删除相关
const handleDelete = async (row: Employee) => {
  await deleteEmployee({id: row.id})
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
