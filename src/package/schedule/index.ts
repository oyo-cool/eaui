import './style';

import withInstall from '@/utils/withInstall';

import _schedule from './src/schedule.vue';
import type { EuScheduleProps } from './type';

export * from './type';
export type EScheduleProps = EuScheduleProps;

export const ESchedule = withInstall(_schedule);

export default ESchedule;
