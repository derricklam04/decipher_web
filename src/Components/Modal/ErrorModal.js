import React from 'react';
import { Button, Modal } from 'react-bootstrap'

export const ErrorModal = ({showModal, onClose}) => {
    const handleClose = () => {
      onClose()
    }
    return (
      <>
        <Modal
          size="lg"
          show={showModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header>
            <Modal.Title>Error: Unable to Decrypt inputted Cipher Text!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Possible reasons:
            <ul>
              <li>The Cipher Text is too short for Frequency Analysis</li>
              <li>The Cipher Text is not derived from an Vignere Encryption of Plaintext</li>
            </ul>
          </Modal.Body>
          <Modal.Footer style={{paddingBottom:'0', paddingTop:'0'}}>
            <Button variant="secondary" onClick={handleClose}>
              Understood
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  