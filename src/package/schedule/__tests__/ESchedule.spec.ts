import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import ESchedule from '../src/schedule.vue';

describe('ESchedule', () => {
  it('renders properly', () => {
    const wrapper = mount(ESchedule, { props: { msg: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
