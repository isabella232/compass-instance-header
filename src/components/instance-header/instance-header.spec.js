import React from 'react';
import { mount } from 'enzyme';

import { InstanceHeader } from 'components/instance-header';
import styles from './instance-header.less';

describe('InstanceHeader [Component]', () => {
  let component;

  beforeEach(() => {
    component = mount(<InstanceHeader />);
  });

  afterEach(() => {
    component = null;
  });

  it('renders the correct root classname', () => {
    expect(component.find(`.${styles.root}`)).to.be.present();
  });
});
