import React from 'react';
import { Button, Modal } from 'react-bootstrap'
import { ResultCards} from './ResultCards'

export const ResultsModal = ({showModal, onClose, cards, onSelect}) => {
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
          <Modal.Header closeButton>
            <Modal.Title>Alert! Multiple Results Found </Modal.Title>
          </Modal.Header>
          <Modal.Body>Select the most probable result:
            <ResultCards cards={cards} onSelect={onSelect}/>
          </Modal.Body>
        </Modal>
      </>
    );
  }