import React from 'react';

import { Button, Modal } from 'react-bootstrap';

export default function PopupConfirm(props){
  const resultSend = props.resultSend;
  const onHide = props.onHide;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton><h4>Do you confirm to resign?</h4></Modal.Header>
      <Modal.Footer className="popup-confirm">
        <Button variant="outline-info" type="button" onClick={onHide}>No</Button>
        <Button variant="outline-info" type="button" onClick={resultSend}>Yes</Button>
      </Modal.Footer>
    </Modal>
  )
}