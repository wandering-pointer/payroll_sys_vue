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
        <template #type="{ rows }">
          <el-tag :type="(rows.type == 'in') ? 'success' : 'primary'">
            {{ (rows.type == 'in') ? '上 班' : '下 班' }}
          </el-tag>
        </template>
      </TableCustom>

    </div>
    <el-dialog :title="'编辑'" v-model="EditVisible" width="700px" destroy-on-close
               :close-on-click-modal="false" @close="closeEditDialog">
      <TableEdit :form-data="editRowData" :options="options" :edit=true :update="editData">
      </TableEdit>
    </el-dialog>
    <el-dialog :title="'新增'" v-model="AddVisible" width="700px" destroy-on-close
               :close-on-click-modal="false" @close="closeAddDialog">
      <TableEdit :form-data="addRowData" :options="options" :edit=true :update="insertData">
      </TableEdit>
    </el-dialog>
    <el-dialog title="查看详情" v-model="visible1" width="700px" destroy-on-close>
      <TableDetail :data="viewData">
        <template #type="{ rows }">
          <el-tag :type="(rows.type == 'in') ? 'success' : 'primary'">
            {{ (rows.type == 'in') ? '上 班' : '下 班' }}
          </el-tag>
        </template>
      </TableDetail>
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
import {deleteDeptAttendance, insertAttendance, listAttendance, updateDeptAttendance} from "@/api/forAttendance";
import {Attendance} from "@/types/Attendance";
import {SelectionView} from "@/types/SelectionView";
import {getEmployeeSelectionView_dept} from "@/api/forEmployee";

const s_employeeSV_name = ref<SelectionView[]>([]);
const employeeSV_name = computed(() => s_employeeSV_name.value);

// 查询相关
const query = reactive({
  name: '',
});
const searchOpt = ref<FormOptionList[]>([
  { prop: 'id', label: '工号', type: 'input', placeholder: '需完全匹配' },
  { prop: 'name', label: '姓名', type: 'input', placeholder: '模糊搜索' },
  { prop: 'level', label: '等级', type: 'select', opts: [{value: 0}, {value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}], style: 'width: 100px' },
  { prop: 'type', label: '类型', type: 'select', style: 'width: 100px', opts: [
      { label: '上班', value: 'in' },
      { label: '下班', value: 'out' }
    ]
  },
])
const handleSearch = async () => {
  const data = await listAttendance({
        size: page.size,
        index: 1,
        attendance: query,
      })
  tableData.value = data.list;
  page.total = data.total
  page.index = 1;
};

// 表格相关
let columns = ref([
  { prop: 'id', label: '记录编号' },
  { prop: 'time', label: '时间', format: 'date' },
  { prop: 'empId', label: '工号' },
  { prop: 'empId', label: '姓名' , type: 'selection-view', selectionView: employeeSV_name},
  { prop: 'type', label: '类型' },
  { prop: 'operator', label: '操作', width: 250, type: 'open-button', btnInfo: [
      {label: '查看', type: 'warning', icon: 'View', handler: handleView },
      {label: '编辑', type: 'primary', icon: 'Edit', handler: handleEdit },
      {label: '删除', type: 'danger', icon: 'Delete', needConfirm: {op: '删除', handler: handleDelete,} }
    ]
  }
])
const page = reactive({
  index: 1,
  size: 10,
  total: 0,
})
const tableData = ref<Attendance[]>([]);
const getData = async () => {
  s_employeeSV_name.value = await getEmployeeSelectionView_dept()
  const data = await listAttendance({
        size: page.size,
        index: page.index,
        attendance: {},
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
    { prop: 'hireDate', label: '入职日期', type: 'input', disabled: true, placeholder: '系统自动记录' },
    { prop: 'level', label: '等级', type: 'select', opts: [{value: 0}, {value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}] },
    { prop: 'type', label: '状态' , type: 'switch', activeText: '在职', inactiveText: '离职'},
  ]
})
const EditVisible = ref(false);
const AddVisible = ref(false);
const editRowData = ref({});
const addRowData = ref({
  type: true,
})
async function handleEdit(row: Attendance) {
  editRowData.value = {...row};
  EditVisible.value = true;
};

const editData = async (form: Attendance) => {
  closeEditDialog()
  await updateDeptAttendance(form)
  getData();
};

const insertData = async (form) => {
  closeAddDialog()
  await insertAttendance(form)
  getData();
};

const closeEditDialog = () => {
  EditVisible.value = false;
};

const closeAddDialog = () => {
  AddVisible.value = false;
};

// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref({
  row: {},
  list: []
});
async function handleView(row: Attendance){
  viewData.value.row = { ...row }
  viewData.value.list = [
    { prop: 'id', label: '工号' },
    { prop: 'name', label: '姓名' },
    { prop: 'phoneNum', label: '电话' },
    { prop: 'hireDate', label: '入职日期' },
    { prop: 'level', label: '等级' },
    { prop: 'type', label: '状态' },
  ]
  visible1.value = true;
};

// 删除相关
async function handleDelete(row: Attendance) {
  await deleteDeptAttendance({id: row.id})
  getData()
}

// 编辑权限相关
const visibleRole = ref(false);
const roles = ref({})
let empId = null
async function handleEditRole(row) {
  empId = row.id;
  visibleRole.value = true;
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
