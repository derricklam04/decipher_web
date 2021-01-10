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
          <Modal.Header style={{backgroundColor:'#ffbfbf', textAlign:'center'}}>
            <Modal.Title style={{color:"#383838"}}>Error: Unable to Decrypt inputted Cipher Text!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Possible reasons:
            <ul>
              <li>The Cipher Text is too short for Frequency Analysis</li>
              <li>The Cipher Text is not derived from a Vigenère Encryption of a plaintext</li>
            </ul>
          </Modal.Body>
          <Modal.Footer style={{backgroundColor:"#f5f5f5",paddingBottom:'0', paddingTop:'0'}}>
            <Button variant="secondary" onClick={handleClose}>
              Understood
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  