import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {component as ConfirmationModal} from '../../application/confirmation-popin';
import Connect from '../../behaviours/store/connect';
import {application} from 'focus-core';
const {builtInStore: applicationStore} = application;
const propTypes = {
    isVisible: PropTypes.bool,
    ConfirmContentComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    handleCancel: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired
};

const defaultProps = {
    isVisible: false,
    ConfirmContentComponent: null
};


@Connect(
    [{store: applicationStore, properties: ['confirmConfig']}],
    () => {
        const {isVisible = false, Content: ConfirmContentComponent = null, handleCancel: cancelHandler, handleConfirm: confirmHandler} = applicationStore.getConfirmConfig() || {};
        return {isVisible, ConfirmContentComponent, cancelHandler, confirmHandler};
    }
)
class ConfirmWrapper extends Component {
    render() {
        console.log('confirm wrapper', this.props);
        const {isVisible, ConfirmContentComponent, cancelHandler, confirmHandler} = this.props;
        return isVisible ? <ConfirmationModal open={true} cancelHandler={cancelHandler} confirmHandler={confirmHandler}>{ConfirmContentComponent ? <ConfirmContentComponent /> : null}</ConfirmationModal> : null;
    }
}

ConfirmWrapper.propTypes = propTypes;
ConfirmWrapper.defaultProps = defaultProps;
ConfirmWrapper.displayName = 'ConfirmWrapper';

export default ConfirmWrapper;
