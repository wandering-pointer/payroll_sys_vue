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
					<el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button>
				</template>
				<template #money="{ rows }">
					￥{{ rows.money }}
				</template>
				<template #thumb="{ rows }">
					<el-image class="table-td-thumb" :src="rows.thumb" :z-index="10" :preview-src-list="[rows.thumb]"
						preview-teleported>
					</el-image>
				</template>
				<template #disabled="{ rows }">
					<el-tag :type="rows.disabled ? 'success' : 'danger'">
						{{ rows.disabled ? '正 常' : '禁 用' }}
					</el-tag>
				</template>
			</TableCustom>

		</div>
		<el-dialog :title="isEdit ? '编辑' : '新增'" v-model="visible" width="700px" destroy-on-close
			:close-on-click-modal="false" @close="closeDialog">
			<TableEdit :form-data="rowData" :options="options" :edit="isEdit" :update="updateData">
				<template #thumb="{ rows }">
					<img class="table-td-thumb" :src="rows.thumb"></img>
				</template>
			</TableEdit>
		</el-dialog>
		<el-dialog title="查看详情" v-model="visible1" width="700px" destroy-on-close>
			<TableDetail :data="viewData">
        <template #disabled="{ rows }">
          <el-tag :type="disabled ? 'danger' : 'success'">
            {{ disabled ? '禁 用' : '正 常' }}
          </el-tag>
        </template>
			</TableDetail>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue';
import { ElMessage, } from 'element-plus';
import { CirclePlusFilled } from '@element-plus/icons-vue';
import {fetchData, getDepartment} from '@/api/index';
import TableCustom from '@/components/table-custom.vue';
import TableDetail from '@/components/table-detail.vue';
import TableSearch from '@/components/table-search.vue';
import { TableItem } from '@/types/table';
import { FormOption, FormOptionList } from '@/types/form-option';
import {getToken} from "@/utils/MyLittleUtils";

// 查询相关
const query = reactive({
	name: '',
});
const searchOpt = ref<FormOptionList[]>([
	{ type: 'input', label: '用户名：', prop: 'name' }
])
const handleSearch = () => {
	changePage(1);
};

// 表格相关
let columns = ref([
	{ prop: 'id', label: '部门编号' },
	{ prop: 'name', label: '部门名称' },
	{ prop: 'disabled', label: '状态' },
	{ prop: 'operator', label: '操作', width: 250 },
])
const page = reactive({
	index: 1,
	size: 5,
	total: 0,
})
const tableData = ref<TableItem[]>([]);
const getData = async () => {
	const res = await getDepartment({
    token: getToken(),
    limit: page.size,
    offset: (page.index - 1) * page.size,
    deptName: '',
  })
	tableData.value = res.data.list;
  page.total = res.data.total
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
		{ type: 'name', label: '部门编号', prop: 'id', required: true },
		{ type: 'input', label: '部门名称', prop: 'name', required: true },
		{ type: 'switch', activeText: '正常', inactiveText: '禁用', label: '状态', prop: 'disabled', required: true },
	]
})
const visible = ref(false);
const isEdit = ref(false);
const rowData = ref({});
const handleEdit = (row: TableItem) => {
	rowData.value = { ...row };
	isEdit.value = true;
	visible.value = true;
};
const updateData = () => {
	closeDialog();
	getData();
};

const closeDialog = () => {
	visible.value = false;
	isEdit.value = false;
};

// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref({
	row: {},
	list: []
});
const handleView = (row: TableItem) => {
	viewData.value.row = { ...row }
	viewData.value.list = [
    { prop: 'id', label: '部门编号' },
    { prop: 'name', label: '部门名称' },
    { prop: 'disabled', label: '状态' },
	]
	visible1.value = true;
};

// 删除相关
const handleDelete = (row: TableItem) => {
	ElMessage.success('删除成功');
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
