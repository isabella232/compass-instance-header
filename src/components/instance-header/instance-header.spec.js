import React from 'react';
import { mount } from 'enzyme';

import { InstanceHeader } from 'components/instance-header';
import styles from './instance-header.less';

describe('InstanceHeader [Component]', () => {
  let component;

  describe('not collapsed', () => {
    beforeEach(() => {
      component = mount(<InstanceHeader sidebarCollapsed={false} name="name" activeNamespace="active namespace"/>);
    });

    afterEach(() => {
      component = null;
    });

    it('renders the correct root classname', () => {
      expect(component.find(`.${styles['instance-header']}`)).to.be.present();
    });
    it('renders as expanded', () => {
      // expect(component.find(`.${styles['instance-header-sidebar-expanded']}`)).to.be.present();
    });
    it('renders one item on the left', () => {
      expect(component.find(`.${styles['instance-header-items-is-left']}`).children()).to.have.lengthOf(1);
    });
  });
});
