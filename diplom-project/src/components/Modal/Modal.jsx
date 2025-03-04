import React from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Button/Button';

Modal.setAppElement('#root');

const CustomModal = ({ isOpen, onClose, title, children, onComplete }) => {
  return (
    <Modal
      overlayClassName={'modal-overlay'}
      className={'modal-content'}
      isOpen={isOpen}
    >
      <div className="modal__header">
        <h2>{title}</h2>
        <button className="btn-close" onClick={() => onClose()}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      {children}
      {onComplete && (
        <Button
          style={{ marginTop: '10px', alignSelf: 'end' }}
          isActive
          onClick={onComplete}
        >
          Далее
        </Button>
      )}
    </Modal>
  );
};

export default CustomModal;
