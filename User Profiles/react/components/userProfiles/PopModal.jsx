import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

export default class PopModal extends React.PureComponent {

    fAStyle = {
        textAlign: 'center'
    };

    tStyle = {
        fontSize: '150%'
    };

    hStyle = {
        border: '3px solid purple',
        borderRadius: '15px'
    };

    render() {
        return (
            <div>
                <div>
                    <Modal style={this.props.hStyle} isOpen={this.props.isOpen} toggle={this.props.toggle} >
                        <div>
                            <ModalHeader toggle={this.props.toggle}>
                                <div style={this.tStyle}>{this.props.title} </div>
                            </ModalHeader>
                        </div>
                        <ModalBody>
                            <div style={this.fAStyle}><i className={this.props.className}></i>
                                <p></p>
                                {this.props.body}</div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.props.redirectFunction}>{this.props.redirectName}</Button>{' '}
                            <Button color="secondary" onClick={this.props.toggle}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </div>

            </div >
        );
    }
}

PopModal.propTypes = {
    toggle: PropTypes.func.isRequired,
    redirectFunction: PropTypes.func,
    isOpen: PropTypes.bool.isRequired,
    redirectName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    hStyle: PropTypes.object.isRequired,
    className: PropTypes.string.isRequired
};