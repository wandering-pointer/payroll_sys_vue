<template>
  <div>
    <TableSearch :query="query" :options="searchOpt" :search="handleSearch" />
    <div class="container">
      <TableCustom :columns="columns"
                   :tableData="tableData"
                   :total="page.total"
                   :refresh="getData"
                   :currentPage="page.index"
                   :changePage="changePage"
                   :page-size="page.size">
        <template #toolbarBtn>
        </template>
      </TableCustom>

    </div>
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
import {
  calculateBonds,
  insertBonds,
  listSelfBonds, undoBonds,
  updateBonds
} from "@/api/forBonds";
import {Bonds} from "@/types/Bonds";
import {ElMessage} from "element-plus";
import {handleConfirm} from "@/utils/MyLittleUtils";
import {SelectionView} from "@/types/SelectionView";
import {getCurrentUserDeptName, getEmployeeSelectionView, getEmployeeSelectionView_dept} from "@/api/forEmployee";
import {getDepartmentSelectionView} from "@/api/forDepartment";

const s_empSV = ref<SelectionView[]>([]);
const empSV = computed(() => s_empSV.value);

async function getSVs() {
  s_empSV.value = await getEmployeeSelectionView_dept()
}
getSVs()

// 查询相关
const query = reactive({
  year: null,
});
const years = generateYearsSelectionView()
const searchOpt = ref<FormOptionList[]>([
  { prop: 'year', label: '年份', type: 'select', style: 'width: 100px', opts: years },
])
const handleSearch = async () => {
  const data = await listSelfBonds({
    size: page.size,
    index: 1,
    bonds: query,
  })
  tableData.value = data.list;
  page.total = data.total
  page.index = 1;
};

// 表格相关
let columns = ref([
  { prop: 'id', label: '编号' },
  { prop: 'year', label: '年份' },
  { prop: 'total', label: '金额' },
])
const page = reactive({
  index: 1,
  size: 10,
  total: 0,
})
const tableData = ref<Bonds[]>([]);
const getData = async () => {
  const data = await listSelfBonds({
    size: page.size,
    index: page.index,
    bonds: query,
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

function generateYearsSelectionView(){
  var res = []
  for(var i = 2025; i > 2020; i--){
    res.push({ label: String(i), value: String(i) })
  }
  return res
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
