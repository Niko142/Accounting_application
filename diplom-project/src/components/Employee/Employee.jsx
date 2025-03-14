import { useNavigate } from 'react-router-dom';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import DataTable from 'react-data-table-component';
import ButtonContainer from 'components/UI/ButtonContainer';
import TableContainer from 'components/UI/TableContainer';

export default function Employee() {
  const navigate = useNavigate('');
  const [pinning, setPinning] = useState([]);
  const custom = {
    rows: {
      style: {
        fontSize: '15px',
        backgroundColor: 'rgba(0,0,0, 0.01)',
      },
    },
    headCells: {
      style: {
        fontSize: '15px',
        fontWeight: '700',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
      },
    },
  };

  const employeeForm = [
    {
      name: 'ID',
      selector: (row) => row.id_pinning,
      sortable: true,
      grow: 0.3,
    },
    {
      name: 'Категория',
      selector: (row) => row.category,
      sortable: true,
      grow: 0.46,
    },
    { name: 'Тип', selector: (row) => row.type, sortable: true, grow: 0.4 },
    {
      name: 'Наименование средства',
      selector: (row) => row.unit,
      sortable: true,
      grow: 1,
    },
    {
      name: 'Сотрудник',
      selector: (row) => row.surname + ' ' + row.name + ' ' + row.patronymic,
      sortable: true,
      grow: 0.7,
    },
    {
      name: 'Дата закрепления',
      selector: (row) => row.date.slice(0, 10) + ' ' + row.date.slice(11, 16),
      sortable: true,
      grow: 0.5,
    },
  ];
  useEffect(() => {
    const FetchData = async () => {
      try {
        const result = await Axios('http://localhost:3001/select_pinning');
        setPinning(result.data);
      } catch (err) {
        console.log('Ошибка при обработке запроса');
      }
    };
    FetchData();
  }, []);
  return (
    <>
      <Header />
      <ButtonContainer>
        <Button isActive onClick={() => navigate('/add_employee')}>
          <FontAwesomeIcon icon={faUser} /> Назначить материальное лицо
        </Button>
        <Button isActive onClick={() => navigate('/select_employee')}>
          <FontAwesomeIcon icon={faUser} /> Информация о материальных лицах
        </Button>
        <Button isActive onClick={() => navigate('/pinning_employee')}>
          Закрепление за лицом материальной единицы
        </Button>
      </ButtonContainer>
      <TableContainer>
        <h2 className="employee__header">
          История закрепления материальных средств за сотрудниками:
        </h2>
        <DataTable
          columns={employeeForm}
          data={pinning}
          pagination
          fixedHeader
          highlightOnHover
          customStyles={custom}
        ></DataTable>
      </TableContainer>
    </>
  );
}
