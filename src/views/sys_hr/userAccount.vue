<template>
  <div>
    <TableSearch :query="query" :options="searchOpt" :search="handleSearch" />
    <div class="container">
      <TableCustom :columns="columns"
                   :tableData="tableData"
                   :total="page.total"
                   :viewFunc="handelResetPassword"
                   :delFunc="handleDelete"
                   :editFunc="handleEdit"
                   :refresh="getData"
                   :currentPage="page.index"
                   :changePage="changePage"
                   :page-size="page.size">
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
import {deleteUserAccount, insertUserAccount, listUserAccount, updateUserAccount} from "@/api/forUserAccount";
import {UserAccount, userRolesSelectionView} from "@/types/UserAccount";
import {handleConfirm} from "@/utils/MyLittleUtils";

// 查询相关
const query = reactive({
  name: '',
});
const searchOpt = ref<FormOptionList[]>([
  { prop: 'accountId', label: '工种编号', type: 'input' },
  { prop: 'title', label: '工种名称', type: 'input' },
  { prop: 'salary', label: '基本工资', type: 'input' },
  { prop: 'usable', label: '状态', type: 'select', style: 'width: 100px', opts: [
      { label: '正常', value: true },
      { label: '禁用', value: false }
    ]
  },
])
const handleSearch = async () => {
  const data = await listUserAccount({
    size: page.size,
    index: 1,
    userAccount: query,
  })
  tableData.value = data.list;
  page.total = data.total
  page.index = 1;
};

// 表格相关
let columns = ref([
  { prop: 'accountId', label: '账号编号' },
  { prop: 'userName', label: '账号' },
  { prop: 'empId', label: '工号' },
  { prop: 'role', label: '角色', type: 'selection-view', selectionView: userRolesSelectionView },
  { prop: 'usable', label: '状态' },
  { prop: 'operator', label: '操作', type: 'for-userAccount', width: 300 },
])
const page = reactive({
  index: 1,
  size: 10,
  total: 0,
})
const tableData = ref<UserAccount[]>([]);
const getData = async () => {
  const data = await listUserAccount({
    size: page.size,
    index: page.index,
    userAccount: {},
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
    { prop: 'userName', label: '账号', type: 'input', disabled: true, placeholder: '不可修改' },
    { prop: 'empId', label: '工号', type: 'input', disabled: true, placeholder: '不可修改' },
    { prop: 'role', label: '角色', type: 'select', opts: userRolesSelectionView, disabled: true },
    { prop: 'usable', label: '状态', type: 'switch', activeText: '正常', inactiveText: '禁用'},
  ]
})
const EditVisible = ref(false);
const AddVisible = ref(false);
const editRowData = ref({});
const addRowData = ref({
  usable: true,
})
const handleEdit = async (row: UserAccount) => {
  editRowData.value = {...row};
  EditVisible.value = true;
};
const editData = async (form: UserAccount) => {
  closeEditDialog()
  form['pwdHash'] = null
  await updateUserAccount(form)
  getData();
};

const insertData = async (form: UserAccount) => {
  closeAddDialog()
  await insertUserAccount(form)
  getData();
};

const closeEditDialog = () => {
  EditVisible.value = false;
};

const closeAddDialog = () => {
  AddVisible.value = false;
};

// 重置密码动作
const handelResetPassword = (row: UserAccount) => {
  row['pwdHash'] = '123456'
  handleConfirm('重置该账号密码为“123456”', updateUserAccount, row);
};

// 删除相关
const handleDelete = async (row: UserAccount) => {
  await deleteUserAccount({accountId: row.accountId})
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
