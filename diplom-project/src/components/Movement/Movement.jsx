import { React, useState } from 'react';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import AudienceForm from './UI/AudienceForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import UnitMovement from './UnitMovement';
import ButtonContainer from 'components/UI/ButtonContainer';
import CustomModal from 'components/Modal/Modal';

export default function Movement() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Header />
      <ButtonContainer>
        <Button isActive onClick={() => setOpenModal(true)}>
          Аудитории
        </Button>
        <CustomModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title={'Описание текущих аудиторий'}
        >
          <AudienceForm />
        </CustomModal>
        <Button isActive onClick={() => navigate('/movement/history')}>
          История перемещения объектов
        </Button>
        <Button isActive onClick={() => navigate('/movement/pinning_audience')}>
          Закрепление техники за кабинетом
        </Button>
        <Button isActive onClick={() => navigate('/movement/repair')}>
          <FontAwesomeIcon icon={faScrewdriverWrench} />
          Вернуть из ремонта
        </Button>
      </ButtonContainer>
      <UnitMovement></UnitMovement>
    </>
  );
}
