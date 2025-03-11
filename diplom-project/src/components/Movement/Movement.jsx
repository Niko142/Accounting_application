import { React, useState } from 'react';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import CabinetSection from './CabinetSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import UnitMovement from './UnitMovement';
import ButtonContainer from 'components/UI/ButtonContainer';

export default function Movement() {
  const navigate = useNavigate('');
  const [active, setActive] = useState(false);
  return (
    <>
      <Header />
      <ButtonContainer>
        <Button isActive onClick={() => setActive(true)}>
          Кабинеты
        </Button>
        {active && (
          <CabinetSection active={active} setActive={setActive}>
            Описание имеющихся кабинетов на предприятии:
          </CabinetSection>
        )}
        <Button isActive onClick={() => navigate('/history_pinning')}>
          История перемещений
        </Button>
        <Button isActive onClick={() => navigate('/pinning_cabinet')}>
          Закрепить технику за кабинетом
        </Button>
        <Button isActive onClick={() => navigate('/repair')}>
          <FontAwesomeIcon
            style={{ marginRight: '5px' }}
            icon={faScrewdriverWrench}
          />
          Вернуть с ремонта
        </Button>
      </ButtonContainer>
      <section id="sec">
        <UnitMovement></UnitMovement>
      </section>
    </>
  );
}
