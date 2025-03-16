import { useNavigate } from 'react-router-dom';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { React, useState } from 'react';
import ButtonContainer from 'components/UI/ButtonContainer';
import TableContainer from 'components/UI/TableContainer';
import DataTable from 'components/Table/Table';
import { pinningEmployeeColumns } from 'data/columns';
import { useEmployee } from 'context/EmployeeContext';
import CustomModal from 'components/Modal/Modal';
import AddEmployeeForm from './UI/AddEmployeeForm';
import { ToastContainer } from 'react-toastify';

export default function Employee() {
  const { pinning } = useEmployee();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <ButtonContainer>
        <Button isActive onClick={() => setOpenModal(true)}>
          <FontAwesomeIcon icon={faUser} /> Назначить материальное лицо
        </Button>
        <Button isActive onClick={() => navigate('/select_employee')}>
          <FontAwesomeIcon icon={faUser} /> Информация о материальных лицах
        </Button>
        <Button isActive onClick={() => navigate('/pinning_employee')}>
          Закрепление за лицом материальной единицы
        </Button>
      </ButtonContainer>
      <CustomModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title={'Добавление нового материального лица'}
      >
        <AddEmployeeForm />
      </CustomModal>
      <TableContainer>
        <h2 className="employee__header">
          История закрепления материальных средств за сотрудниками:
        </h2>
        <DataTable
          head={pinningEmployeeColumns}
          mockData={Array.isArray(pinning) ? pinning : []}
        />
      </TableContainer>
      <ToastContainer />
    </>
  );
}
