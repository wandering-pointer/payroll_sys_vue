<template>
	<el-descriptions :title="title" :column="column" border>
		<el-descriptions-item v-for="item in list" :span="item.span">
			<template #label> {{ item.label }} </template>

			<slot :name="item.prop" :rows="row" v-if="! item.isSelectionView">
				{{ item.value || row[item.prop] }}
			</slot>

      <!--      用于映射value和label        -->
      <slot :name="item.prop" :rows="row" v-if="item.isSelectionView">
        {{formatSelectionView(item.selectionView, row[item.prop])}}
      </slot>

		</el-descriptions-item>
	</el-descriptions>
</template>

<script lang="ts" setup>
import {formatSelectionView} from "../types/SelectionView";

const props = defineProps({
	data: {
		type: Object,
		required: true,
	}
});
const { row, title, column = 2, list } = props.data;

</script>
