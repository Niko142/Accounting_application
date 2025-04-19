import { useNavigate } from 'react-router-dom';
import Header from 'components/Header/Header';
import { React, useMemo, useCallback } from 'react';
import TableContainer from 'components/UI/TableContainer';
import DataTable from 'components/Table/Table';
import { employeeColumns } from 'data/columns';
import { useEmployee } from 'context/EmployeeContext';
import { toast, ToastContainer } from 'react-toastify';
import ReturnButton from 'components/UI/ReturnButton';

export default function SelectEmployee() {
  const { employees, deleteSelectEmployee } = useEmployee();
  const navigate = useNavigate();

  // Обработчик перехода в блок с закреплением объекта
  const handleMove = useCallback(() => {
    navigate('/employee/pinning');
  }, [navigate]);

  // Обработчик удаления сотрудника
  const handleDelete = useCallback(
    async (id) => {
      try {
        const result = await deleteSelectEmployee(id);
        if (result.success) {
          toast.success(result.message || 'Сотрудник успешно удалён');
        } else {
          toast.error(result.message || 'Ошибка при удалении сотрудника');
        }
      } catch (error) {
        toast.error('Неизвестная ошибка при удалении');
        console.error('Delete error:', error);
      }
    },
    [deleteSelectEmployee],
  );

  const memoizedColumns = useMemo(
    () => employeeColumns(handleMove, handleDelete),
    [handleMove, handleDelete],
  );

  const memoizedData = useMemo(() => employees || [], [employees]);

  return (
    <>
      <Header />
      <TableContainer>
        <ReturnButton />
        <h2 className="employee__header header-center">
          Информация о сотрудниках:
        </h2>
        <DataTable head={memoizedColumns} mockData={memoizedData} />
      </TableContainer>
      <ToastContainer />
    </>
  );
}
