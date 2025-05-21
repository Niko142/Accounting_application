import React from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const ReturnButton = ({ stretch = false }) => {
  const navigate = useNavigate();

  return (
    <FontAwesomeIcon
      className="navigate-back"
      style={{ marginBottom: stretch && '0' }}
      icon={faArrowLeft}
      onClick={() => navigate(-1)}
    />
  );
};

export default ReturnButton;
