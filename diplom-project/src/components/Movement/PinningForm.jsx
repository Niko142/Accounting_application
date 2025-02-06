import { React, useEffect, useState } from 'react';
import Header from 'components/Header/Header';
import Axios from 'axios';
import DataTable from 'react-data-table-component';
import Button from 'components/Button/Button';
import { useNavigate } from 'react-router-dom';
export default function PinningForm() {
  const [record, setRecord] = useState([]);
  const [search, setSearch] = useState([]);
  const navigate = useNavigate('');
  const historyColumn = [
    {
      name: 'ID',
      selector: (row) => row.id_pinning,
      sortable: true,
      grow: 0.1,
    },
    {
      name: 'Дата закрепления',
      selector: (row) => row.date.slice(0, 10) + ' ' + row.date.slice(11, 16),
      sortable: true,
      grow: 0.5,
    },
    {
      name: 'Категория',
      selector: (row) => row.category,
      sortable: true,
      grow: 0.5,
    },
    { name: 'Тип', selector: (row) => row.type, sortable: true, grow: 0.5 },
    {
      name: 'Причина',
      selector: (row) => row.reason,
      sortable: true,
      grow: 0.75,
    },
    { name: 'Наименованиe', selector: (row) => row.unit, sortable: true },
    {
      name: 'Откуда',
      selector: (row) => row.start_location,
      sortable: true,
      grow: 0.4,
    },
    {
      name: 'Куда',
      selector: (row) => row.end_location,
      sortable: true,
      grow: 0.4,
    },
  ];

  const custom = {
    rows: {
      style: {
        fontSize: '15px',
        backgroundColor: 'rgba(0,0,0, 0.01)',
      },
    },
    headCells: {
      style: {
        fontSize: '16px',
        fontWeight: 650,
        backgroundColor: 'rgba(0,0,255, 0.15)',
      },
    },
  };

  useEffect(() => {
    const FetchData = async () => {
      await Axios.get('http://localhost:3001/history-cabinet').then((res) => {
        setRecord(res.data);
        setSearch(res.data);
        console.log(res);
      });
    };
    FetchData();
  }, []);

  const Filter = (e) => {
    const res = search.filter((row) =>
      row.unit.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setRecord(res);
  };

  return (
    <>
      <Header></Header>
      <Button id="image-button" onClick={() => navigate('/movement')}>
        Назад
      </Button>
      <div style={{ padding: '30px 5%', maxHeight: '500px' }}>
        <DataTable
          columns={historyColumn}
          data={record}
          pagination
          fixedHeader
          highlightOnHover
          customStyles={custom}
          subHeader
          subHeaderComponent={
            <input
              type="text"
              style={{ width: '40%' }}
              id="form-input"
              placeholder="Поиск"
              onChange={Filter}
            />
          }
        ></DataTable>
      </div>
    </>
  );
}
