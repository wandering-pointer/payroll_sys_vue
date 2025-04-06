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
import { ref, reactive } from 'vue';
import { CirclePlusFilled } from '@element-plus/icons-vue';
import TableCustom from '@/components/table-custom.vue';
import TableDetail from '@/components/table-detail.vue';
import TableSearch from '@/components/table-search.vue';
import { FormOption, FormOptionList } from '@/types/form-option';
import TableEdit from "@/components/table-edit.vue";
import {deleteDepartment, insertDepartment, listDepartment, updateDepartment} from "@/api/forDepartment";
import {Department} from "@/types/Department";
import {showMessage} from "@/utils/MyLittleUtils";

// 查询相关
const query = reactive({
	name: '',
});
const searchOpt = ref<FormOptionList[]>([
  { type: 'input', label: '部门名称：', prop: 'name' },
  { type: 'input', label: '部门编号：', prop: 'id' },
])
const handleSearch = async () => {
  const data = await listDepartment({
    size: page.size,
    index: 1,
    department: query,
  })
  tableData.value = data.list;
  page.total = data.total
  page.index = 1;
};

// 表格相关
let columns = ref([
	{ prop: 'id', label: '部门编号' },
	{ prop: 'name', label: '部门名称' },
	{ prop: 'usable', label: '状态' },
	{ prop: 'operator', label: '操作', width: 250 },
])
const page = reactive({
	index: 1,
	size: 10,
	total: 0,
})
const tableData = ref<Department[]>([]);
const getData = async () => {
	const data = await listDepartment({
    size: page.size,
    index: page.index,
    department: {},
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
		{ type: 'input', label: '部门编号', prop: 'id', disabled: true, placeholder: '系统自动分配'},
		{ type: 'input', label: '部门名称', prop: 'name', required: true },
		{ type: 'switch', activeText: '正常', inactiveText: '禁用', label: '状态', prop: 'usable'},
	]
})
const EditVisible = ref(false);
const AddVisible = ref(false);
const editRowData = ref({});
const addRowData = {
  usable: true,
  name: ''
}
const handleEdit = (row: Department) => {
	editRowData.value = { ...row };
	EditVisible.value = true;
};
const editData = async (form: Department) => {
	closeEditDialog()
  let data = await updateDepartment(form)
	getData();
};

const insertData = async (form: Department) => {
  closeAddDialog()
  let data = await insertDepartment({department: form})
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
const handleView = (row: Department) => {
	viewData.value.row = { ...row }
	viewData.value.list = [
    { prop: 'id', label: '部门编号' },
    { prop: 'name', label: '部门名称' },
    { prop: 'usable', label: '状态' },
	]
	visible1.value = true;
};

// 删除相关
const handleDelete = async (row: Department) => {
  const data = await deleteDepartment({department: row})
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
