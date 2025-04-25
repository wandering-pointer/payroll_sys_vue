<template>
  <div>
    <TableSearch :query="query" :options="searchOpt" :search="handleSearch" />
    <div class="container">
      <TableCustom :columns="columns"
                   :tableData="tableData"
                   :total="page.total"
                   :delFunc="handleDelete"
                   :editFunc="handleEdit"
                   :refresh="getData"
                   :currentPage="page.index"
                   :changePage="changePage"
                   :page-size="page.size">
        <template #toolbarBtn>
          <h3>部门：{{deptName}}</h3>
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
  </div>
</template>

<script setup lang="ts" name="basetable">
import {ref, reactive, computed} from 'vue';
import TableCustom from '@/components/table-custom.vue';
import TableSearch from '@/components/table-search.vue';
import { FormOption, FormOptionList } from '@/types/form-option';
import TableEdit from "@/components/table-edit.vue";
import {
  deleteDeptAttendance,
  listAttendance,
  listDeptAttendance,
  updateDeptAttendance
} from "@/api/forAttendance";
import {Attendance} from "@/types/Attendance";
import {SelectionView} from "@/types/SelectionView";
import {getEmployeeSelectionView_dept} from "@/api/forEmployee";
import {formatDateTime} from "@/utils/MyLittleUtils";

const s_employeeSV_name = ref<SelectionView[]>([]);
const employeeSV_name = computed(() => s_employeeSV_name.value);

const deptName = ref('无数据')

// 查询相关
const query = reactive({
  name: '',
});
const searchOpt = ref<FormOptionList[]>([
  { prop: 'empId', label: '工号', type: 'input', placeholder: '需完全匹配' },
  { prop: 'type', label: '类型', type: 'select', style: 'width: 100px', opts: [
      { label: '上班', value: 'in' },
      { label: '下班', value: 'out' }
    ]
  },
])
const handleSearch = async () => {
  const data = await listDeptAttendance({
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
  { prop: 'operator', label: '操作', width: 200, type: 'open-button', btnInfo: [
      {label: '编辑时间', type: 'primary', icon: 'Edit', handler: handleEdit },
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
  const data = await listDeptAttendance({
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
    { prop: 'time', label: '时间', type: 'datetime' },
  ]
})
const EditVisible = ref(false);
const editRowData = ref({});
async function handleEdit(row: Attendance) {
  editRowData.value = {...row};
  EditVisible.value = true;
};

const editData = async (form: Attendance | any) => {
  closeEditDialog()
  form.time = formatDateTime(form.time)
  await updateDeptAttendance(form)
  getData();
};

const closeEditDialog = () => {
  EditVisible.value = false;
};

// 删除相关
async function handleDelete(row: Attendance) {
  await deleteDeptAttendance({id: row.id})
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

.for-checkbox{
  width: 150px;
}
</style>
