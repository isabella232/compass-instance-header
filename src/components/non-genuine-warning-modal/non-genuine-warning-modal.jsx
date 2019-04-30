/* eslint react/sort-comp:0 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { TextButton } from 'hadron-react-buttons';
import FontAwesome from 'react-fontawesome';

import classnames from 'classnames';
import styles from './non-genuine-warning-modal.less';

/**
 * The help URL for collation.
 */
const P1 = 'This server or service appears to be emulating'
  + ' MongoDB. Some documented MongoDB features may work differently, may be'
  + ' entirely missing or incomplete, or may have unexpectedly different'
  + ' performance characteristics than would be found when connecting to a'
  + ' real MongoDB server or service.';
const WARNING_BANNER = 'This server or service appears to be emulating MongoDB.';
export const ATLAS_URL = 'https://www.mongodb.com/cloud/atlas';
export const LEARN_MORE_URL = '';
export const MODAL_TITLE = 'Non-Genuine MongoDB Detected';

/**
 * Component for the non-genuine MongoDB warning modal.
 */
class NonGenuineWarningModal extends PureComponent {
  static displayName = 'NonGenuineWarningModal';
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    toggleIsVisible: PropTypes.func.isRequired,
    openLink: PropTypes.func.isRequired
  };

  /**
   * Close modal.
   *
   * @param {Object} evt - The click event.
   */
  handleClose(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.props.toggleIsVisible(false);
  }

  /**
   * User wants to try Atlas.
   *
   * @param {Object} evt - The click event.
   */
  handleTryAtlasClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.props.openLink(ATLAS_URL);
    this.props.toggleIsVisible(false);
  }

  /**
   * Render the non-genuine mongodb warning modal.
   *
   * @returns {React.Component} The non-genuine warning modal.
   */
  render() {
    return (
      <Modal show={this.props.isVisible}
        backdrop="static"
        dialogClassName={classnames(styles['non-genuine-warning-modal'])}
        onHide={this.handleClose.bind(this)} >

        <Modal.Header>
          <Modal.Title>{MODAL_TITLE}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className={classnames(styles['non-genuine-warning-modal-message'])}>
            <FontAwesome name="exclamation-circle"/>
            &nbsp; {WARNING_BANNER} &nbsp;
            <a
              onClick={() => this.props.openLink(LEARN_MORE_URL)}
              data-test-id="non-genuine-warning-modal-learn-more-link"
            >
              Learn more
            </a>&nbsp;
          </div>

          <div className={classnames(styles['non-genuine-warning-modal-p1'])}>
            {P1}
          </div>

          <div className={classnames(styles['non-genuine-warning-modal-p2'])}>
            <b>Recommended:</b>&nbsp;
            <a
              onClick={() => this.props.openLink(ATLAS_URL)}
              data-test-id="non-genuine-warning-modal-atlas-link"
            >
              MongoDB Atlas&nbsp;<FontAwesome name="external-link"/>
            </a>&nbsp;
             is the fully managed database-as-a-service with all the
             features and performance of MongoDB. Atlas runs on AWS, Azure, and GCP.
             To explore Atlas, use the promotional code<code>MONGO4REAL</code>
             for 250 USD of Atlas credit.
          </div>
        </Modal.Body>

        <Modal.Footer>
          <TextButton
            className="btn btn-default btn-sm"
            dataTestId="try-mongodb-atlas-button"
            text="TRY MONGODB ATLAS"
            clickHandler={this.handleTryAtlasClick.bind(this)} />
          <TextButton
            className="btn btn-primary btn-sm"
            dataTestId="continue-button"
            text="CONTINUE"
            clickHandler={this.handleClose.bind(this)} />
        </Modal.Footer>
      </Modal>
    );
  }
}

export default NonGenuineWarningModal;
