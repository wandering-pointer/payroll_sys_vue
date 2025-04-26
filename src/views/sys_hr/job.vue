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
        <template #usable="{ rows }">
          <el-tag :type="rows.usable ? 'success' : 'danger'">
            {{ rows.usable ? '正 常' : '禁 用' }}
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
        <template #usable="{ rows }">
          <el-tag :type="rows.usable ? 'success' : 'danger'">
            {{ rows.usable ? '正 常' : '禁 用' }}
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
import {deleteJob, insertJob, listJob, updateJob} from "@/api/forJob";
import {Job} from "@/types/Job";
import {getDepartmentSelectionView} from "@/api/forDepartment";
import {convertToNumberIfPossible, SelectionView} from "@/types/SelectionView";

// 使用响应式引用
const departmentSelectionView = ref<SelectionView[]>([]);
// 使用computed保持选项的响应式
const departmentOptions = computed(() => departmentSelectionView.value);

// 查询相关
const query = reactive({
  name: '',
});
const searchOpt = ref<FormOptionList[]>([
  { prop: 'jobId', label: '工种编号', type: 'input' },
  { prop: 'title', label: '工种名称', type: 'input' },
  { prop: 'deptId', label: '所属部门', type: 'select', opts: departmentOptions, style: 'width: 150px' },
  { prop: 'salary', label: '基本工资', type: 'input' },
  { prop: 'usable', label: '状态', type: 'select', style: 'width: 100px', opts: [
      { label: '正常', value: true },
      { label: '禁用', value: false }
    ]
  },
])
const handleSearch = async () => {
  departmentSelectionView.value = await getDepartmentSelectionView(null);
  const data = await listJob({
    size: page.size,
    index: 1,
    job: query,
  })
  tableData.value = data.list;
  page.total = data.total
  page.index = 1;
};

// 表格相关
let columns = ref([
  { prop: 'jobId', label: '工种编号' },
  { prop: 'title', label: '工种名称' },
  { prop: 'deptId', label: '所属部门', selectionView: departmentOptions, type: 'selection-view' },
  { prop: 'salary', label: '基本工资' },
  { prop: 'usable', label: '状态' },
  { prop: 'operator', label: '操作', width: 250 },
])
const page = reactive({
  index: 1,
  size: 10,
  total: 0,
})
const tableData = ref<Job[]>([]);
const getData = async () => {
  departmentSelectionView.value = await getDepartmentSelectionView(null);
  //console.log(departmentSelectionView.value);
  const data = await listJob({
    size: page.size,
    index: page.index,
    job: query,
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
    { prop: 'jobId', label: '工种编号' , type: 'input', disabled: true, placeholder: '系统自动分配'},
    { prop: 'title', label: '工种名称', type: 'input'},
    { prop: 'deptId', label: '所属部门', type: 'select', opts: departmentOptions },
    { prop: 'salary', label: '基本工资', type: 'input' },
    { prop: 'usable', label: '状态', type: 'switch', activeText: '正常', inactiveText: '禁用'},
  ]
})
const EditVisible = ref(false);
const AddVisible = ref(false);
const editRowData = ref({});
const addRowData = ref({
  usable: true,
})
const handleEdit = async (row: Job) => {
  departmentSelectionView.value = await getDepartmentSelectionView(null);
  departmentSelectionView.value =  convertToNumberIfPossible(departmentSelectionView.value)
  editRowData.value = {...row};
  EditVisible.value = true;
  //console.log(departmentSelectionView.value);
};
const editData = async (form: Job) => {
  closeEditDialog()
  await updateJob(form)
  getData();
};

const insertData = async (form: Job) => {
  closeAddDialog()
  await insertJob(form)
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
const handleView = (row: Job) => {
  viewData.value.row = { ...row }
  viewData.value.list = [
    { prop: 'jobId', label: '工种编号' },
    { prop: 'title', label: '工种名称' },
    { prop: 'deptId', label: '所属部门',isSelectionView: true, selectionView: departmentSelectionView, type: 'selection-view' },
    { prop: 'salary', label: '基本工资' },
    { prop: 'usable', label: '状态' },
  ]
  visible1.value = true;
};

// 删除相关
const handleDelete = async (row: Job) => {
  await deleteJob({jobId: row.jobId})
  page.index = 1
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
