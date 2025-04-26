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
import {deletePolicy, insertPolicy, listPolicy, updatePolicy} from "@/api/forPolicy";
import {Policy} from "@/types/Policy";

// 查询相关
const query = reactive({
	name: '',
});
const searchOpt = ref<FormOptionList[]>([
  { prop: 'type', label: '规则类型', type: 'input' },
  { prop: 'usable', label: '状态', type: 'select', style: 'width: 100px', opts: [
      { label: '正常', value: true },
      { label: '禁用', value: false }
    ]
  },
])
const handleSearch = async () => {
  const data = await listPolicy({
    size: page.size,
    index: 1,
    policy: query,
  })
  tableData.value = data.list;
  page.total = data.total
  page.index = 1;
};

// 表格相关
let columns = ref([
	{ prop: 'id', label: '规则编号' },
	{ prop: 'type', label: '规则类型' },
  { prop: 'rate', label: '津贴比率（%）' },
  { prop: 'usable', label: '状态' },
  { prop: 'operator', label: '操作', width: 350, type: 'open-button', btnInfo: [
      {label: '编辑', type: 'primary', icon: 'Edit', handler: handleEdit },
      {label: '删除', type: 'danger', icon: 'Delete', needConfirm: {op: '删除', handler: handleDelete,} }
    ]
  },
])
const page = reactive({
	index: 1,
	size: 10,
	total: 0,
})
const tableData = ref<Policy[]>([]);
const getData = async () => {
	const data = await listPolicy({
    size: page.size,
    index: page.index,
    policy: query,
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
		{ type: 'input', label: '规则编号', prop: 'id', disabled: true, placeholder: '系统自动分配'},
    { prop: 'type', label: '规则类型', type: 'input' },
    { prop: 'rate', label: '津贴比率(%)', type: 'input' },
		{ type: 'switch', activeText: '正常', inactiveText: '禁用', label: '状态', prop: 'usable'},
	]
})
const EditVisible = ref(false);
const AddVisible = ref(false);
const editRowData = ref({});
const addRowData = ref({
  usable: true,
  name: ''
})
async function handleEdit(row: Policy) {
	editRowData.value = { ...row };
	EditVisible.value = true;
};
const editData = async (form: Policy) => {
	closeEditDialog()
  await updatePolicy(form)
	getData();
};

const insertData = async (form: Policy) => {
  closeAddDialog()
  await insertPolicy(form)
  getData();
};

const closeEditDialog = () => {
	EditVisible.value = false;
};

const closeAddDialog = () => {
  AddVisible.value = false;
};

// 删除相关
async function handleDelete (row: Policy){
  const data = await deletePolicy({id: row.id})
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
