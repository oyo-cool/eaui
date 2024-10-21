<template>
  <t-space direction="vertical">
    <t-row class="eaui-schedule">
      <t-col class="header">
        <div class="explain">
          <span class="selected">已选</span>
          <span class="selectable">未选</span>
        </div>
      </t-col>
      <t-col>
        <t-table
          row-key="time"
          :data="tableData"
          :columns="columns"
          :rowspan-and-colspan="rowspanAndColspan"
          bordered
          @on-row-mousedown="handleMousedown"
          @on-row-mouseup="handleMouseup"
          @on-row-mouseover="handleMousemove"
        >
          <template #cell="{ col, row }">
            {{ col }} 1
            {{ row }}
            <t-checkbox
              v-if="col.colKey !== 'time'"
              :checked="isTimeSelected(row, col.colKey)"
              :style="{ backgroundColor: isTimeSelected(row, col.colKey) ? '#d1e7dd' : 'transparent' }"
              @change="toggleTimeSelection(row, col.colKey)"
            />
          </template>
          <template #footerSummary>
            <div class="empty">可拖动鼠标选择时间段</div>
          </template>
        </t-table>
      </t-col>
    </t-row>
  </t-space>
</template>

<script setup lang="tsx">
import type { PrimaryTableCol, TableProps, TableRowData } from 'tdesign-vue-next';
import { ref } from 'vue';

import type { EuScheduleProps } from '../type';

const { schedule_time = '', precision = 0.5, showCheckbox = false } = defineProps<EuScheduleProps>();

console.log('schedule_time', schedule_time);

const emits = defineEmits(['receive']);

const selectedTimes = ref<{ [key: string]: boolean }>({});

const days = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
const tableData: TableProps['data'] = days.flatMap((day) => [{ time: day }]);

const precisionMin = Math.min(precision, 1);
const colspanMin = Math.ceil(1 / precisionMin);
const totalHours = 24;
const totalColumns = totalHours / precisionMin;

const createColumn = (prefix: string, start: number): PrimaryTableCol<TableRowData> => {
  return {
    title: start === 0 ? '00:00 - 12:00' : '12:00 - 24:00',
    colKey: prefix,
    align: 'center',
    children: Array.from({ length: totalColumns / 2 }, (_, index) => {
      const colspan = precisionMin < 1 && index % 2 === 0 ? colspanMin : 0;
      const title = (Math.floor(index / 2) + start).toString();
      return {
        title,
        colKey: `${prefix}${index}`,
        align: 'center',
        width: 50 * precisionMin,
        colspan,
      };
    }),
  };
};

const columns: TableProps['columns'] = [
  {
    colKey: 'time',
    title: '星期/时间',
    align: 'center',
    width: 100,
    cell: (h, { row }) => {
      return showCheckbox ? (
        <t-checkbox onChange={(checked: boolean) => handleCheckboxChange(checked, row)}>{row.time}</t-checkbox>
      ) : (
        row.time
      );
    },
  },
  createColumn('a', 0),
  createColumn('p', 12),
];

const rowspanAndColspan: TableProps['rowspanAndColspan'] = ({ col, rowIndex, colIndex }) => {
  console.log('col ===>', col, 'rowIndex ===>', rowIndex, 'colIndex ===>', colIndex);
  // if (colIndex === 0 && rowIndex % 2 === 0) {
  //   return {
  //     rowspan: 2,
  //   };
  // }
  // return {
  //   colspan: 2,
  //   rowspan: 2,
  // };
};

// 处理星期选择
const handleCheckboxChange = (checked: boolean, row: TableRowData) => {
  console.log(checked, row);
  if (checked) {
    // TODO 将对应星期的时间全部选择
  } else {
    // TODO 将对应星期的时间全部取消
  }
};

// 判断时间是否被选择
const isTimeSelected = (row: TableRowData, colKey: string) => {
  return selectedTimes.value[`${row.time}-${colKey}`] || false;
};

// 切换时间选择状态
const toggleTimeSelection = (row: TableRowData, colKey: string) => {
  const key = `${row.time}-${colKey}`;
  selectedTimes.value[key] = !selectedTimes.value[key]; // 切换选择状态
};

const handleMousedown = (event: MouseEvent) => {
  console.log('handleMousedown ===>', event);
};

const handleMouseup = (event: MouseEvent) => {
  console.log('handleMouseup ===>', event);
};

const handleMousemove = (event: MouseEvent) => {
  console.log('handleMousemove ====>', event);
};

emits('receive', '122');
</script>

<style lang="less" scoped>
@import '../style/index.less';
</style>
