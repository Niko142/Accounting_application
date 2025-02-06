import { useNavigate } from 'react-router-dom';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import { React, useEffect, useState } from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faUserSlash } from '@fortawesome/free-solid-svg-icons';

export default function SelectEmployee() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    FetchData();
  }, []);

  const DeleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete-employee/${id}`);
  };

  const FetchData = async () => {
    try {
      const result = await Axios('http://localhost:3001/select_employee');
      setEmployee(result.data);
    } catch (err) {
      console.log('Ошибка при обработке запроса');
    }
  };

  return (
    <>
      <Header />
      <section id="sec">
        <div className="sec" style={{ display: 'block', textAlign: 'center' }}>
          <h2>Информация о материальных лицах</h2>
          <table className="content-table" style={{ display: 'inline-block' }}>
            <thead>
              <tr>
                <th>Идентификатор</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Отчество</th>
                <th>Email</th>
                <th>Номер телефона</th>
                <th>Закрепить:</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {employee.map((employee, i) => {
                return (
                  <tr key={i}>
                    <td>{employee.employee_id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.surname}</td>
                    <td>{employee.patronymic}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>
                      <FontAwesomeIcon
                        style={{ cursor: 'pointer', color: '#1560BD' }}
                        onClick={() => {
                          navigate('/pinning_employee');
                        }}
                        icon={faUserLock}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        style={{ cursor: 'pointer', color: 'red' }}
                        icon={faUserSlash}
                        onClick={() => {
                          DeleteEmployee(employee.employee_id);
                          window.location.reload();
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <Button isActive onClick={() => navigate('/employee')}>
              Обратно
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
