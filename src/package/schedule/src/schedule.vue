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
          row-key="id"
          :data="tableData"
          :columns="columns"
          bordered
          @mousedown="handleMousedown"
          @mouseup="handleMouseup"
          @mousemove="handleMousemove"
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
import type { TableProps, TableRowData } from 'tdesign-vue-next';
import { ref } from 'vue';

const days = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];

const showCheckbox = ref(true);
const selectedTimes = ref<{ [key: string]: boolean }>({});

const tableData: TableProps['data'] = days.flatMap((day) => [{ time: day }]);

const columns: TableProps['columns'] = [
  {
    colKey: 'time',
    title: '星期/时间',
    align: 'center',
    width: 100,
    cell: (h, { row }) => {
      return showCheckbox.value ? (
        <t-checkbox onChange={(checked: boolean) => handleCheckboxChange(checked, row)}>{row.time}</t-checkbox>
      ) : (
        row.time
      );
    },
  },
  {
    title: '00:00 - 12:00',
    colKey: 'am',
    align: 'center',
    children: [
      {
        title: '0',
        align: 'center',
      },
      {
        title: '1',
        align: 'center',
      },
      {
        title: '2',
        align: 'center',
      },
      {
        title: '2',
        align: 'center',
      },
      {
        title: '3',
        align: 'center',
      },
      {
        title: '4',
        align: 'center',
      },
      {
        title: '5',
        align: 'center',
      },
      {
        title: '6',
        align: 'center',
      },
      {
        title: '7',
        align: 'center',
      },
      {
        title: '8',
        align: 'center',
      },
      {
        title: '9',
        align: 'center',
      },
      {
        title: '10',
        align: 'center',
      },
      {
        title: '11',
        align: 'center',
      },
    ],
  },
  {
    title: '12:00 - 24:00',
    colKey: 'pm',
    align: 'center',
    children: [
      {
        title: '11',
        align: 'center',
      },
      {
        title: '12',
        align: 'center',
      },
      {
        title: '13',
        align: 'center',
      },
      {
        title: '14',
        align: 'center',
      },
      {
        title: '15',
        align: 'center',
      },
      {
        title: '16',
        align: 'center',
      },
      {
        title: '17',
        align: 'center',
      },
      {
        title: '18',
        align: 'center',
      },
      {
        title: '19',
        align: 'center',
      },
      {
        title: '20',
        align: 'center',
      },
      {
        title: '21',
        align: 'center',
      },
      {
        title: '22',
        align: 'center',
      },
      {
        title: '23',
        align: 'center',
      },
    ],
  },
];

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
</script>

<style lang="less" scoped>
.eaui-schedule {
  user-select: none;
  border: 1px solid var(--td-gray-color-3);
  border-radius: 4px;
  overflow: hidden;
  background-color: var(--td-font-white-1);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 12px;
    font-size: 12px;
    line-height: 20px;

    .explain {
      display: flex;

      .selected,
      .selectable {
        display: flex;
        align-items: center;
        margin-left: 11px;

        &::before {
          content: '';
          display: block;
          width: 12px;
          height: 4px;
          background-color: var(--td-brand-color-6);
          border-radius: 2px;
          margin-right: 8px;
        }
      }

      .selectable::before {
        border: 1px solid var(--td-gray-color-5);
        background-color: transparent;
      }
    }
  }

  .empty {
    text-align: center;
  }
}

:deep(.t-table--bordered .t-table__content) {
  border: none;
  border-top: 1px solid var(--td-gray-color-3);
}

:deep(.t-table:not(.t-table--striped) .t-table__footer > tr) {
  background-color: var(--td-bg-color-container);
}
</style>
