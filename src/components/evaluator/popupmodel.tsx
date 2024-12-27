import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ReactPlayer from 'react-player';

interface ModalProps {
  show: boolean;
  url: string | null;
  onHide: () => void;
}

function MyVerticallyCenteredModal({ show, url, onHide }: ModalProps) {
  if (!url) return null;
  
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Video Player</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
        <div style={{ position: 'relative', paddingTop: '56.25%', width: '100%' }}>
          <ReactPlayer
            url={url}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
            controls
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;