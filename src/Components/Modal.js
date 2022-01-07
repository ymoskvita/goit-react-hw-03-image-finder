import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalStyled } from './ImagesFinder.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = event => {
        if (event.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleOverlayClick = event => {
        if (event.currentTarget === event.target) {
            this.props.onClose();
        }
    }

    render() {
        return createPortal(
            <Overlay onClick={this.handleOverlayClick}>
                <ModalStyled>{this.props.children}</ModalStyled>
            </Overlay>,
            modalRoot,
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func,
}
