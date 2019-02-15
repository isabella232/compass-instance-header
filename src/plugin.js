import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import InstanceHeader from 'components/instance-header';
import store from 'stores';

class Plugin extends Component {
  static displayName = 'InstanceHeaderPlugin';


  static propTypes = {
    sidebarCollapsed: PropTypes.bool.isRequired
  };

  /**
   * Connect the Plugin to the store and render.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <Provider store={store}>
        <InstanceHeader sidebarCollapsed={this.props.sidebarCollapsed}/>
      </Provider>
    );
  }
}

export default Plugin;
