import { useNavigate } from 'react-router-dom';
import Header from 'components/Header/Header';
import { React, useMemo, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import TableContainer from 'components/UI/TableContainer';
import DataTable from 'components/Table/Table';
import { employeeColumns } from 'data/columns';
import { useEmployee } from 'context/EmployeeContext';
import { ToastContainer } from 'react-toastify';

export default function SelectEmployee() {
  const { employees, handleDeleteEmployee } = useEmployee();
  const navigate = useNavigate();

  const handleMove = useCallback(() => {
    navigate('/employee/pinning');
  }, [navigate]);

  const memoizedColumns = useMemo(
    () => employeeColumns(handleMove, handleDeleteEmployee),
    [handleMove, handleDeleteEmployee],
  );

  const memoizedData = useMemo(() => employees || [], [employees]);

  return (
    <>
      <Header />
      <TableContainer>
        <FontAwesomeIcon
          className="navigate-back"
          icon={faArrowLeft}
          onClick={() => navigate(-1)}
        />
        <h2 className="employee__header header-center">
          Информация о сотрудниках:
        </h2>
        <DataTable head={memoizedColumns} mockData={memoizedData} />
      </TableContainer>
      <ToastContainer />
    </>
  );
}
