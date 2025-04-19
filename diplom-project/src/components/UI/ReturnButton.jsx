import React from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const ReturnButton = () => {
  const navigate = useNavigate();

  return (
    <FontAwesomeIcon
      className="navigate-back"
      icon={faArrowLeft}
      onClick={() => navigate(-1)}
    />
  );
};

export default ReturnButton;
