import React from 'react';
import { mount } from 'enzyme';

import { InstanceHeader } from 'components/instance-header';
import styles from './instance-header.less';

describe('InstanceHeader [Component]', () => {
  let component;
  let toggleIsVisibleSpy = sinon.spy();
  let openLinkSpy = sinon.spy();

  describe('not collapsed', () => {
    beforeEach(() => {
      component = mount(
        <InstanceHeader
          sidebarCollapsed={false}
          name="name"
          activeNamespace="active namespace"
          isGenuineMongoDB
          isVisible={false}
          toggleIsVisible={toggleIsVisibleSpy}
          openLink={openLinkSpy}
        />
      );
    });

    afterEach(() => {
      component = null;
    });

    it('renders the correct root classname', () => {
      expect(component.find(`.${styles['instance-header']}`)).to.be.present();
    });
    it('renders one item on the left', () => {
      expect(component.find(`.${styles['instance-header-items']}`).children()).to.have.lengthOf(1);
    });
  });

  describe('collapsed', () => {
    beforeEach(() => {
      component = mount(
        <InstanceHeader
          sidebarCollapsed
          name="name"
          activeNamespace="active namespace"
          isGenuineMongoDB
          isVisible={false}
          toggleIsVisible={toggleIsVisibleSpy}
          openLink={openLinkSpy}
        />
      );
    });

    afterEach(() => {
      component = null;
    });

    it('renders the correct root classname', () => {
      expect(component.find(`.${styles['instance-header']}`)).to.be.present();
    });
    it('renders as expanded', () => {
      expect(component.find(`.${styles['instance-header-sidebar-collapsed']}`)).to.be.present();
    });
    it('renders one item on the left', () => {
      expect(component.find(`.${styles['instance-header-items']}`).children()).to.have.lengthOf(1);
    });
  });

  describe('genuine', () => {
    beforeEach(() => {
      component = mount(
        <InstanceHeader
          sidebarCollapsed name="name"
          activeNamespace="active namespace"
          isVisible={false}
          isGenuineMongoDB
          toggleIsVisible={toggleIsVisibleSpy}
          openLink={openLinkSpy}
        />
      );
    });

    afterEach(() => {
      component = null;
    });

    it('renders the correct root classname', () => {
      expect(component.find(`.${styles['instance-header']}`)).to.be.present();
    });
    it('does not render the warning', () => {
      expect(component.find(`.${styles['non-genuine-warning']}`)).to.not.be.present();
    });
  });

  describe('non genuine', () => {
    beforeEach(() => {
      toggleIsVisibleSpy = sinon.spy();
      openLinkSpy = sinon.spy();
      component = mount(
        <InstanceHeader
          sidebarCollapsed
          name="name"
          activeNamespace="active namespace"
          isVisible={false}
          isGenuineMongoDB={false}
          toggleIsVisible={toggleIsVisibleSpy}
          openLink={openLinkSpy}
        />
      );
    });

    afterEach(() => {
      component = null;
    });

    it('renders the correct root classname', () => {
      expect(component.find(`.${styles['instance-header']}`)).to.be.present();
    });
    it('does not render the warning', () => {
      expect(component.find(`.${styles['non-genuine-warning']}`)).to.be.present();
    });
    it('clicking the warning opens the modal', () => {
      component.find(`.${styles['non-genuine-warning']}`).simulate('click');
      expect(toggleIsVisibleSpy.calledOnce).to.equal(true);
    });
  });
});
