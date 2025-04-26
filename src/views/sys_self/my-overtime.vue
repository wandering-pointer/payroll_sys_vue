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
          <el-button type="warning" :icon="CirclePlusFilled" @click="AddVisible = true">加班申请</el-button>
        </template>
        <template #status="{ rows }">
          <el-tag :type="(rows.status == 'pending') ? 'primary' : ((rows.status == 'approved') ? 'success' : 'danger')">
            {{ (rows.status == 'pending') ? '待审核' : ((rows.status == 'approved') ? '已通过' : '未通过') }}
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
        <template #status="{ rows }">
          <el-tag :type="(rows.status == 'pending') ? 'primary' : ((rows.status == 'approved') ? 'success' : 'danger')">
            {{ (rows.status == 'pending') ? '待审核' : ((rows.status == 'approved') ? '已通过' : '未通过') }}
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
import {deleteSelfOvertimeRecord, insertSelfOvertimeRecord, listSelfOvertimeRecord, updateSelfOvertimeRecord} from "@/api/forOvertimeRecord";
import {OvertimeRecord} from "@/types/OvertimeRecord";
import {convertToNumberIfPossible, labelToValueLabel, SelectionView} from "@/types/SelectionView";
import {getPolicySelectionView} from "@/api/forPolicy";
import {formatDateTime} from "@/utils/MyLittleUtils";

const policy_SV = ref<SelectionView[]>([]);

// 查询相关
const query = reactive({

});
const searchOpt = ref<FormOptionList[]>([
  { prop: 'id', label: '编号', type: 'input' },
  // { prop: 'empId', label: '工号', type: 'input' },
  { prop: 'policyId', label: '加班类型', type: 'select', opts: policy_SV, style: 'width: 200px' },
  { prop: 'notes', label: '备注', type: 'input' },
  { prop: 'status', label: '状态', style: 'width: 100px', type: 'select', opts: [
      { value: 'pending', label: '待审核'},
      { value: 'approved', label: '已通过'},
      { value: 'rejected', label: '未通过'},
    ]
  },
])
const handleSearch = async () => {
  const data = await listSelfOvertimeRecord({
        size: page.size,
        index: 1,
        overtimeRecord: query,
      })
  tableData.value = data.list;
  page.total = data.total
  page.index = 1;
};

// 表格相关
let columns = ref([
  { prop: 'id', label: '编号' },
  // { prop: 'empId', label: '工号' },
  // { prop: 'empId', label: '姓名' },
  { prop: 'start', label: '开始时间' },
  { prop: 'end', label: '结束时间' },
  { prop: 'policyId', label: '类型', type: 'selection-view', selectionView: policy_SV },
  { prop: 'status', label: '状态' },
  { prop: 'operator', label: '操作', width: 350, type: 'open-button', btnInfo: [
      {label: '查看', type: 'warning', icon: 'View', handler: handleView },
      // {label: '编辑', type: 'primary', icon: 'Edit', handler: handleEdit },
      {label: '删除', type: 'danger', icon: 'Delete', needConfirm: {op: '删除', handler: handleDelete,} }
    ]
  }
])
const page = reactive({
  index: 1,
  size: 10,
  total: 0,
})
const tableData = ref<OvertimeRecord[]>([]);
const getData = async () => {
  policy_SV.value = await getPolicySelectionView(null)
  const data = await listSelfOvertimeRecord({
        size: page.size,
        index: page.index,
        overtimeRecord: {},
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
    { prop: 'id', label: '编号', type: 'input', disabled: true, placeholder: '系统自动分配' },
    // { prop: 'empId', label: '工号', type: 'input' },
    { prop: 'start', label: '开始时间', type: 'datetime' },
    { prop: 'end', label: '结束时间', type: 'datetime' },
    { prop: 'policyId', label: '加班类型', type: 'select', opts: policy_SV },
    { prop: 'notes', label: '备注', type: 'input' },
    // { prop: 'status', label: '状态', type: 'select', opts: [
    //     { value: 'pending', label: '待审核'},
    //     { value: 'approved', label: '已通过'},
    //     { value: 'rejected', label: '未通过'},
    //   ]
    // },
  ]
})
const EditVisible = ref(false);
const AddVisible = ref(false);
const editRowData = ref({});
const addRowData = ref({
  working: true,
})
async function handleEdit(row: OvertimeRecord) {
  editRowData.value = {...row};
  EditVisible.value = true;
};

const handleAdd = async () => {
}

const editData = async (form: OvertimeRecord) => {
  closeEditDialog()
  await updateSelfOvertimeRecord(form)
  getData();
};

const insertData = async (form: OvertimeRecord) => {
  form.start = formatDateTime(form.start)
  form.end = formatDateTime(form.end)
  closeAddDialog()
  await insertSelfOvertimeRecord(form)
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
async function handleView(row: OvertimeRecord){
  viewData.value.row = { ...row }
  viewData.value.list = [
    { prop: 'id', label: '编号' },
    // { prop: 'empId', label: '工号' },
    // { prop: 'empId', label: '姓名' },
    { prop: 'start', label: '开始时间' },
    { prop: 'end', label: '结束时间' },
    { prop: 'policyId', label: '类型' },
    { prop: 'status', label: '状态', isSelectionView: true, selectionView: [
          { value: 'pending', label: '待审核'},
          { value: 'approved', label: '已通过'},
          { value: 'rejected', label: '未通过'},
      ]
    },
    { prop: 'notes', label: '备注' },
  ]
  visible1.value = true;
}

// 删除相关
async function handleDelete(row: OvertimeRecord) {
  await deleteSelfOvertimeRecord({id: row.id})
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
