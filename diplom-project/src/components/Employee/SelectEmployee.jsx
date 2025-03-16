import { useNavigate } from 'react-router-dom';
import Header from 'components/Header/Header';
import { React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import TableContainer from 'components/UI/TableContainer';
import DataTable from 'components/Table/Table';
import { employeeColumns } from 'data/columns';
import { useEmployee } from 'context/EmployeeContext';

export default function SelectEmployee() {
  const { employee } = useEmployee();
  const navigate = useNavigate();

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
        <DataTable head={employeeColumns()} mockData={employee} />
      </TableContainer>
      {/* Добавить блоки действий */}
      {/* <FontAwesomeIcon
        style={{ cursor: 'pointer', color: '#1560BD' }}
        onClick={() => {
          navigate('/pinning_employee');
        }}
        icon={faUserLock}
      />
      <FontAwesomeIcon
        style={{ cursor: 'pointer', color: 'red' }}
        icon={faUserSlash}
        onClick={() => {
          DeleteEmployee(employee.employee_id);
          window.location.reload();
        }}
      /> */}
    </>
  );
}
