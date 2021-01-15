import React from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap'
import { ResultCards} from './ResultCards'


export const ResultsModal = ({showModal, onClose, cards, onSelect}) => {
    const handleClose = () => {
      onClose()
    }
    
    return (
      <>
        <Modal
          className="results-modal"
          size="lg"
          show={showModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
          scrollable={true}
        >
          <Modal.Header style={{  display: "flex", justifyContent: "center", alignItems: "center"}} >
            <Modal.Title  style={{color:"#404040"}}><b>Multiple Results Found</b></Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <ResultCards cards={cards} onSelect={onSelect}/>
          </Modal.Body>
          
          <Modal.Footer style={{backgroundColor:"#fafafa"}}>
            <div>
            <h6>Can't find what you are looking for?</h6>
            <Row>
              <Col md={10}><span>Try adjusting the Index of Coincidence in the <b>Advanced Settings </b>Tab.
                A lower IC will generate more flexible results while a higher IC will generate more strict results.
                </span>
              </Col>
              <Col>
                <Button className="resultsClose" style={{width:'6rem'}} onClick={handleClose}>Go Back</Button>
              </Col>
            </Row>
            
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  }