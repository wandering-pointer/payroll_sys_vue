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
      <TableEdit :form-data="editRowData" :options="options" :edit=true :update="editData">
      </TableEdit>
    </el-dialog>
    <el-dialog :title="'新增'" v-model="AddVisible" width="700px" destroy-on-close :open="handleAdd"
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

    <el-dialog title="授权" v-model="visibleRole" width="500px" destroy-on-close>
      <div style="text-align:center">
        <div>
          <el-checkbox label="普通员工" v-model="roles.employee" size="large" :disabled="true" class="for-checkbox"/>
          <el-checkbox label="部门经理" v-model="roles.manager" size="large" class="for-checkbox"/>
        </div>
        <div>
          <el-checkbox label="财务管理员" v-model="roles.finance" size="large" class="for-checkbox"/>
          <el-checkbox label="人力资源管理员" v-model="roles.hr" size="large" class="for-checkbox"/>
        </div>
        <div>
          <el-checkbox label="系统运维" v-model="roles.admin" size="large" class="for-checkbox"/>
          <el-checkbox label="超级管理员" v-model="roles.root" size="large" class="for-checkbox"/>
        </div>
      </div>
      <div style="text-align:right">
        <el-button type="success" @click="editRole" style="margin: 20px"> 保存 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="basetable">
import {ref, reactive, computed} from 'vue';
import {CirclePlusFilled, Delete} from '@element-plus/icons-vue';
import TableCustom from '@/components/table-custom.vue';
import TableDetail from '@/components/table-detail.vue';
import TableSearch from '@/components/table-search.vue';
import { FormOption, FormOptionList } from '@/types/form-option';
import TableEdit from "@/components/table-edit.vue";
import {deleteEmployee, insertEmployee, listEmployee, updateEmployee} from "@/api/forEmployee";
import {Employee} from "@/types/Employee";
import {getDepartmentSelectionView} from "@/api/forDepartment";
import {convertToNumberIfPossible, labelToValueLabel, SelectionView} from "@/types/SelectionView";
import {getJobSelectionView} from "@/api/forJob";
import {editEmployeeRoles, getEmployeeRoles} from "@/api/forUserAccount";

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
  { prop: 'id', label: '工号', type: 'input', placeholder: '需完全匹配' },
  { prop: 'name', label: '姓名', type: 'input', placeholder: '模糊搜索' },
  { prop: 'deptId', label: '所属部门', type: 'select', opts: departmentSV, style: 'width: 150px' },
  { prop: 'level', label: '等级', type: 'select', opts: [{value: 0}, {value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}], style: 'width: 100px' },
  { prop: 'working', label: '状态', type: 'select', style: 'width: 100px', opts: [
      { label: '在职', value: true },
      { label: '离职', value: false }
    ]
  },
])
const handleSearch = async () => {
  s_departmentSV.value = await getDepartmentSelectionView(null);
  const data = await listEmployee({
    size: page.size,
    index: 1,
    employee: query,
  },
  query.deptId)
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
  { prop: 'operator', label: '操作', width: 350, type: 'open-button', btnInfo: [
      {label: '查看', type: 'warning', icon: 'View', handler: handleView },
      {label: '编辑', type: 'primary', icon: 'Edit', handler: handleEdit },
      {label: '授权', type: 'success', icon: 'Position', handler: handleEditRole },
      {label: '删除', type: 'danger', icon: 'Delete', needConfirm: {op: '删除', handler: handleDelete,} }
    ]
  }
])
const page = reactive({
  index: 1,
  size: 10,
  total: 0,
})
const tableData = ref<Employee[]>([]);
const getData = async () => {
  s_departmentSV.value = await getDepartmentSelectionView(null);
  s_jobSV_deptId.value = await getJobSelectionView('deptId', null);
  s_jobSV_title.value = await getJobSelectionView('title', null);
  s_jobSV_salary.value = await getJobSelectionView('salary', null);
  s_jobSV_deptName.value = labelToValueLabel(s_departmentSV.value, s_jobSV_deptId.value)
  const data = await listEmployee({
    size: page.size,
    index: page.index,
    employee: query,
  },
      query.deptId)
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
    { prop: 'hireDate', label: '入职日期', type: 'input', disabled: true, placeholder: '系统自动记录' },
    { prop: 'deptId', label: '所属部门', type: 'select', opts: departmentSV, change: handleDepartmentSelected},
    { prop: 'jobId', label: '工种', type: 'select', opts: jobSV_title_select },
    { prop: 'level', label: '等级', type: 'select', opts: [{value: 0}, {value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}] },
    { prop: 'working', label: '状态' , type: 'switch', activeText: '在职', inactiveText: '离职'},
  ]
})
const EditVisible = ref(false);
const AddVisible = ref(false);
const editRowData = ref({});
const addRowData = ref({
  working: true,
})
async function handleEdit(row: Employee) {
  s_departmentSV.value = await getDepartmentSelectionView(null);
  s_jobSV_title_select.value = await getJobSelectionView('title', null);

  const deptId = jobSV_deptId.value.filter(item => item.value == row.jobId)[0].label;
  const deptData = {deptId: deptId}; // 把部门名称绑定到显示上
  handleDepartmentSelected(deptId);

  editRowData.value = {...row, ...deptData};
  EditVisible.value = true;
};

const handleAdd = async () => {
  s_departmentSV.value = await getDepartmentSelectionView(true);
  s_jobSV_title_select.value = await getJobSelectionView('title', true);
}

const editData = async (form: Employee) => {
  closeEditDialog()
  await updateEmployee(form)
  getData();
};

const insertData = async (form) => {
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
function handleDepartmentSelected(value) {
  editRowData.value.jobId = null;
  addRowData.value.jobId = null;
  s_jobSV_title_select.value = jobSV_title.value.filter(item => item.parent == value);
  s_jobSV_title_select.value = convertToNumberIfPossible(s_jobSV_title_select.value)
}


// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref({
  row: {},
  list: []
});
async function handleView(row: Employee){
  viewData.value.row = { ...row }
  viewData.value.list = [
    { prop: 'id', label: '工号' },
    { prop: 'name', label: '姓名' },
    { prop: 'phoneNum', label: '电话' },
    { prop: 'hireDate', label: '入职日期' },
    { prop: 'jobId', label: '所属部门', selectionView: jobSV_deptName, type: 'selection-view', isSelectionView: true },
    { prop: 'jobId', label: '工种', selectionView: jobSV_title, type: 'selection-view', isSelectionView: true },
    { prop: 'jobId', label: '基本工资', selectionView: jobSV_salary, type: 'selection-view', isSelectionView: true },
    { prop: 'level', label: '等级' },
    { prop: 'working', label: '状态' },
  ]
  visible1.value = true;
};

// 删除相关
async function handleDelete(row: Employee) {
  await deleteEmployee({id: row.id})
  getData()
}

// 编辑权限相关
const visibleRole = ref(false);
const roles = ref({})
let empId = null
async function handleEditRole(row) {
  roles.value = await getEmployeeRoles(row.id);
  empId = row.id;
  visibleRole.value = true;
}
async function editRole(){
  await editEmployeeRoles({
    empId: empId,
    roles: roles.value,
  })
  visibleRole.value = false;
  await getData()
}

</script>

<style scoped>
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}

.for-checkbox{
  width: 150px;
}
</style>
