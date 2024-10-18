export interface EScheduleProps {
  /**
   * 排期时间
   */
  schedule_time: string;

  /**
   * 时间精度, 内容区域每格的步长, 如传入0.5，每格代表半小时, 默认值为 0.5
   */
  precision?: number;

  /**
   * 是否显示checkbox, 默认值为 false
   */
  showCheckbox?: boolean;
}
