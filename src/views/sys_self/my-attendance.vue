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
        <template #type="{ rows }">
          <el-tag :type="(rows.type == 'in') ? 'success' : 'primary'">
            {{ (rows.type == 'in') ? '上 班' : '下 班' }}
          </el-tag>
        </template>
      </TableCustom>
    </div>
  </div>
</template>

<script setup lang="ts" name="basetable">
import {ref, reactive } from 'vue';
import TableCustom from '@/components/table-custom.vue';
import TableSearch from '@/components/table-search.vue';
import { FormOptionList } from '@/types/form-option';
import {
  listSelfAttendance,
} from "@/api/forAttendance";
import {Attendance} from "@/types/Attendance";
import {pageSize} from "@/utils/MyLittleUtils";

// 查询相关
const query = reactive({
  name: '',
});
const searchOpt = ref<FormOptionList[]>([
  { prop: 'type', label: '类型', type: 'select', style: 'width: 100px', opts: [
      { label: '上班', value: 'in' },
      { label: '下班', value: 'out' }
    ]
  },
])
const handleSearch = async () => {
  const data = await listSelfAttendance({
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
  { prop: 'type', label: '类型' },
])
const page = reactive({
  index: 1,
  size: pageSize,
  total: 0,
})
const tableData = ref<Attendance[]>([]);
const getData = async () => {
  const data = await listSelfAttendance({
        size: page.size,
        index: page.index,
        attendance: query,
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
