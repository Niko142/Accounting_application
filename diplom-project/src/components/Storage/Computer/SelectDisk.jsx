import { React, useEffect, useState } from 'react';
import Button from 'components/Button/Button';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function SelectDisk() {
  const navigate = useNavigate('');
  const [disk, setDisk] = useState([]);
  useEffect(() => {
    FetchData();
  }, []);

  const DeleteDisk = (id) => {
    Axios.delete(`http://localhost:3001/delete-disk/${id}`);
  };

  const FetchData = async () => {
    try {
      const result = await Axios('http://localhost:3001/disk');
      setDisk(result.data);
    } catch (err) {
      console.log('Ошибка при обработке запроса');
    }
  };

  return (
    <>
      <section id="sec">
        <div className="sec" style={{ display: 'block', textAlign: 'center' }}>
          <h2>Информация о жестких дисках</h2>
          <table className="content-table" style={{ display: 'inline-block' }}>
            <thead>
              <tr>
                <th>Номер</th>
                <th>Модель</th>
                <th>Объем</th>
                <th>Стоимость</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {disk.map((disk, i) => {
                return (
                  <tr key={i}>
                    <td>{disk.id_disk}</td>
                    <td>{disk.model}</td>
                    <td>{disk.volume}</td>
                    <td>{disk.price + ' руб.'}</td>
                    <td>
                      <FontAwesomeIcon
                        onClick={() => {
                          DeleteDisk(disk.id_disk);
                          window.location.reload();
                        }}
                        style={{ color: 'red', cursor: 'pointer' }}
                        icon={faTrash}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <Button isActive onClick={() => navigate('/add_components')}>
              Добавить диск
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
