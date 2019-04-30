/* eslint react/sort-comp:0 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import map from 'lodash.map';
import filter from 'lodash.filter';

import NonGenuineWarningModal from 'components/non-genuine-warning-modal';
import { toggleIsVisible } from 'modules/is-visible';
import { openLink } from 'modules/link';

import classnames from 'classnames';
import styles from './instance-header.less';

class InstanceHeader extends PureComponent {
  static displayName = 'InstanceHeader';

  static propTypes = {
    name: PropTypes.string.isRequired,
    sidebarCollapsed: PropTypes.bool.isRequired,
    activeNamespace: PropTypes.string.isRequired,
    isGenuineMongoDB: PropTypes.bool.isRequired,
    isVisible: PropTypes.bool.isRequired,
    toggleIsVisible: PropTypes.func.isRequired,
    openLink: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.setupHeaderItems();
  }

  /**
   * creates React components for the plugins registering as the
   * Heeader.Item role. Separates left/right aligned items, and passes the
   * order into the css style so that flexbox can handle ordering.
   */
  setupHeaderItems() {
    const roles = global.hadronApp.appRegistry.getRole('Header.Item');
    // create all left-aligned header items
    this.leftHeaderItems = map(filter(roles, (role) => {
      return role.alignment === 'left';
    }), (role, i) => {
      return React.createElement(role.component, { key: i });
    });
    // create all right-aligned header items
    this.rightHeaderItems = map(filter(roles, (role) => {
      return role.alignment !== 'left';
    }), (role, i) => {
      return React.createElement(role.component, { key: i });
    });
  }

  handleClickHostname() {
    const NamespaceStore = global.hadronApp.appRegistry.getStore('App.NamespaceStore');
    NamespaceStore.ns = '';
    const ipc = require('hadron-ipc');
    ipc.call('window:hide-collection-submenu');
  }

  renderNonGenuineMongoDB() {
    if (this.props.isGenuineMongoDB) {
      return null;
    }
    return (
      <div
        className={classnames(styles['non-genuine-warning'])}
        onClick={() => this.props.toggleIsVisible(true)}
      >
        <div className={classnames(styles['non-genuine-warning-text'])}>
          <FontAwesome name="exclamation-circle"/>
          &nbsp;NON-GENUINE MONGODB
        </div>
      </div>
    );
  }

  /**
   * Render Component.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    const collapsed = this.props.sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded';
    const headerClasses = classnames(styles['instance-header'], styles[`instance-header-${collapsed}`]);

    const ns = this.props.activeNamespace === '' ? styles['instance-header-connection-string-is-active'] : '';
    const hostnameClasses = classnames(styles['instance-header-connection-string'], ns);

    return (
      <div className={headerClasses}>
        <div className={hostnameClasses} onClick={this.handleClickHostname.bind(this)}>
          <div className={classnames(styles['instance-header-icon-container'])}>
            <FontAwesome
              name="home"
              className={classnames(styles['instance-header-icon'], styles['instance-header-icon-home'])}
            />
          </div>
          <div
            className={classnames(styles['instance-header-details'])}
            data-test-id="instance-header-details">
            {this.props.name}
          </div>
        </div>
        <div className={classnames(styles['instance-header-items'], styles['instance-header-items-is-left'])}>
          {this.leftHeaderItems}
        </div>
        <div className={classnames(styles['instance-header-items'], styles['instance-header-items-is-right'])}>
          {this.rightHeaderItems}
          {this.renderNonGenuineMongoDB()}
        </div>
        <NonGenuineWarningModal
          isVisible={this.props.isVisible}
          toggleIsVisible={this.props.toggleIsVisible}
          openLink={this.props.openLink}
        />
      </div>
    );
  }
}

/**
 * Map the store state to properties to pass to the components.
 *
 * @param {Object} state - The store state.
 *
 * @returns {Object} The mapped properties.
 */
const mapStateToProps = (state, ownProps) => ({
  name: state.name,
  sidebarCollapsed: ownProps.sidebarCollapsed,
  activeNamespace: state.activeNamespace,
  isGenuineMongoDB: state.isGenuineMongoDB,
  isVisible: state.isVisible
});

/**
 * Connect the redux store to the component.
 * (dispatch)
 */
const MappedInstanceHeader = connect(
  mapStateToProps,
  {
    toggleIsVisible,
    openLink
  },
)(InstanceHeader);

export default MappedInstanceHeader;
export { InstanceHeader };
