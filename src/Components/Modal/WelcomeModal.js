import React from 'react';
import { Button, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'

export const WelcomeModal = ({showModal, onClose}) => {
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
          <Modal.Header style={{backgroundColor:'#baedff', display: "flex",justifyContent: "center",alignItems: "center"}}>
            <Modal.Title style={{color:"#383838"}}>Welcome to Vigenère Code Cracker!</Modal.Title>
          </Modal.Header>
          <Modal.Body>To get started, 
          </Modal.Body>
          <Modal.Footer style={{backgroundColor:"#f5f5f5",paddingBottom:'0', paddingTop:'0'}}>
            <Button variant="secondary" onClick={handleClose}>
              Let's get Started
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  