import { useNavigate } from 'react-router-dom';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { React, useMemo, useState } from 'react';
import ButtonContainer from 'components/UI/ButtonContainer';
import TableContainer from 'components/UI/TableContainer';
import DataTable from 'components/Table/Table';
import { pinningEmployeeColumns } from 'data/columns';
import { useEmployee } from 'context/EmployeeContext';
import CustomModal from 'components/Modal/Modal';
import AddEmployeeForm from './UI/AddEmployeeForm';
import { ToastContainer } from 'react-toastify';

export default function Employee() {
  const { pinning, handleAddEmployee } = useEmployee();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const memoizedColumns = useMemo(() => pinningEmployeeColumns, []);
  const memoizedData = useMemo(
    () => (Array.isArray(pinning) ? pinning : []),
    [pinning],
  );

  return (
    <>
      <Header />
      <ButtonContainer>
        <Button isActive onClick={() => setOpenModal(true)}>
          <FontAwesomeIcon icon={faUser} /> Назначить материальное лицо
        </Button>
        <Button isActive onClick={() => navigate('/employee/select')}>
          <FontAwesomeIcon icon={faUser} /> Информация о материальных лицах
        </Button>
        <Button isActive onClick={() => navigate('/employee/pinning')}>
          Закрепление за лицом материальной единицы
        </Button>
      </ButtonContainer>
      <CustomModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title={'Добавление нового материального лица'}
      >
        <AddEmployeeForm
          onSubmit={(productData) => {
            handleAddEmployee(productData);
            setOpenModal(false);
          }}
        />
      </CustomModal>
      <TableContainer>
        <h2 className="employee__header">
          История закрепления материальных средств за сотрудниками:
        </h2>
        <DataTable head={memoizedColumns} mockData={memoizedData} />
      </TableContainer>
      <ToastContainer />
    </>
  );
}
