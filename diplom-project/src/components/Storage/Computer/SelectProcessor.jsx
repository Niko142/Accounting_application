import { React, useEffect, useState } from 'react';
import Button from 'components/Button/Button';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function SelectProcessor() {
  const navigate = useNavigate('');
  const [processor, setProcessor] = useState([]);
  useEffect(() => {
    FetchData();
  }, []);

  const DeleteProcessor = (id) => {
    Axios.delete(`http://localhost:3001/delete-processor/${id}`);
  };

  const FetchData = async () => {
    try {
      const result = await Axios('http://localhost:3001/processor');
      setProcessor(result.data);
    } catch (err) {
      console.log('Ошибка при обработке запроса');
    }
  };

  return (
    <>
      <section id="sec">
        <div className="sec" style={{ display: 'block', textAlign: 'center' }}>
          <h2>Информация о процессорах</h2>
          <table className="content-table" style={{ display: 'inline-block' }}>
            <thead>
              <tr>
                <th>Идентификатор</th>
                <th>Модель</th>
                <th>Частота</th>
                <th>Стоимость</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {processor.map((processor, i) => {
                return (
                  <tr key={i}>
                    <td>{processor.id_processor}</td>
                    <td>{processor.model}</td>
                    <td>{processor.rate}</td>
                    <td>{processor.price + ' руб.'}</td>
                    <td>
                      <FontAwesomeIcon
                        onClick={() => {
                          DeleteProcessor(processor.id_processor);
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
              Добавить процессор{' '}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
