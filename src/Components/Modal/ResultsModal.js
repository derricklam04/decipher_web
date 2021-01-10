import React from 'react';
import { Modal } from 'react-bootstrap'
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
          <Modal.Header style={{backgroundColor:"#e6f4ff"}} closeButton>
            <Modal.Title style={{color:"#383838"}}>Multiple Results Found!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ResultCards cards={cards} onSelect={onSelect}/>
          </Modal.Body>
          <Modal.Footer style={{backgroundColor:"#f5f5f5"}}>
            <p>If the result you are looking for is not shown, try adjusting the Index of Coincidence (IC) in the [Advanced Settings] menu.
              A lower IC will generate more flexible results whereas a higher IC will generate more strict results.
            </p>
          </Modal.Footer>
        </Modal>
      </>
    );
  }