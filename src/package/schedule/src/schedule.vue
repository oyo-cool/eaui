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
          <template #footerSummary>
            <div v-if="!selectedTimesText.length" class="empty">可拖动鼠标选择时间段</div>
            <t-row v-else>
              <t-col :span="12">
                <t-row justify="space-between">
                  <t-col> 已选择时间段 </t-col>
                  <t-col>
                    <t-link hover="color" theme="primary" @click="handleClearSelectedTime"> 清空 </t-link>
                  </t-col>
                </t-row>
              </t-col>
              <t-col :span="12" class="margin-top-s">
                <t-row v-for="item in selectedTimesText" :key="item.day" class="margin-top-s">
                  <t-col :span="1"> {{ item.day }} </t-col>
                  <t-col :span="11"> {{ item.time }} </t-col>
                </t-row>
              </t-col>
            </t-row>
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

// const selectedTimes = ref<{ [key: string]: boolean }>({});

const weekdays = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
const tableData: TableProps['data'] = weekdays.flatMap((day) => [{ time: day }]);
const selectedTimesText = ref([
  {
    day: '星期一',
    time: '00:00-00:30、01:00-01:30、02:00-02:30、03:00-03:30、04:00-04:30、05:00-05:30、06:00-06:30、07:00-07:30、08:00-08:30、09:00-09:30、10:00-10:30、11:00-11:30、12:00-12:30、13:00-13:30、14:00-14:30、15:00-15:30、16:00-16:30、17:00-17:30、18:00-18:30、19:00-19:30、20:00-20:30、21:00-21:30、22:00-22:30、23:00-23:30',
  },
  {
    day: '星期二',
    time: '00:00-00:30、01:00-01:30、02:00-02:30、03:00-03:30、04:00-04:30、05:00-05:30',
  },
]);

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
      const colspan = precisionMin < 1 && index % colspanMin === 0 ? colspanMin : 0;
      const title = (Math.floor(index / colspanMin) + start).toString();
      return {
        title,
        colKey: `${prefix}${index}`,
        align: 'center',
        width: 50 * precisionMin,
        colspan,
        className: (context) => {
          // TODO 改为正常名称
          if (context.type === 'td') return 'custom-class';
          return '';
        },
        attrs: (context) => {
          if (context.type === 'td') {
            const timeIndex = start < 12 ? index : index + 24;
            return {
              'data-active': false,
              'data-week': context.row.time,
              'data-time-index': timeIndex,
              // TODO 计算index对应的时间范围
              'data-start-time': '',
              'data-end-time': '',
            };
          }
          return {};
        },
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

const rowspanAndColspan: TableProps['rowspanAndColspan'] = ({ colIndex }) => {
  if (precision > 1 && colIndex % precision === 1) {
    return { colspan: precision };
  }
  return { colspan: 1 };
};

const handleClearSelectedTime = () => {
  console.log('TODO ====> 处理清空时间选择');
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

// // 判断时间是否被选择
// const isTimeSelected = (row: TableRowData, colKey: string) => {
//   return selectedTimes.value[`${row.time}-${colKey}`] || false;
// };

// // 切换时间选择状态
// const toggleTimeSelection = (row: TableRowData, colKey: string) => {
//   const key = `${row.time}-${colKey}`;
//   selectedTimes.value[key] = !selectedTimes.value[key]; // 切换选择状态
// };

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
