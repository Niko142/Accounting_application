import { React, useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserLock,
  faHouseLock,
  faTrash,
  faScrewdriverWrench,
  faRotateRight,
} from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Button/Button';

export default function SelectComputer() {
  const navigate = useNavigate('');
  const [computer, setComputer] = useState([]);
  const [now, setNow] = useState({
    name: '',
    id: '',
    videocard: '',
    videocard_id: '',
    processor: '',
    processor_id: '',
    card: '',
    card_id: '',
    memory: '',
    memory_id: '',
    disk: '',
    disk_id: '',
  });
  const [modal, setModal] = useState();
  const [repair, setRepair] = useState();
  const [replace, setReplace] = useState();
  useEffect(() => {
    FetchData();
  }, []);

  const ViewComputer = (id) => {
    Axios.get(`http://localhost:3001/computer/${id}`).then((res) => {
      let result = res.data;
      setNow({
        name: result[0].name,
        id: result[0].id_computer,
        videocard: result[0].videocards,
        videocard_id: result[0].videocard_id,
        processor: result[0].processors,
        processor_id: result[0].processor_id,
        card: result[0].mothercards,
        card_id: result[0].mothercard_id,
        memory: result[0].memories,
        memory_id: result[0].memory_id,
        disk: result[0].disks,
        disk_id: result[0].disk_id,
      });
      console.log(result);
    });
  };

  const FetchData = async () => {
    try {
      const result = await Axios('http://localhost:3001/sklad_computer');
      setComputer(result.data);
    } catch (err) {
      console.log('Ошибка при обработке запроса');
    }
  };

  const Utilization = ({ active, setActive }) => {
    const [date, setDate] = useState(null);
    const [reason, setReason] = useState('-');
    if (!active) return null;

    const PinningUtilization = () => {
      Axios.post('http://localhost:3001/utilization', {
        date: date,
        category: 'Оргтехника',
        type: 'Компьютер',
        number: now.id,
        model: now.name,
        reason: reason,
      }).then((res) => {
        console.log(res);
        if (res.data.message === 'Успешное добавление') {
          Axios.post('http://localhost:3001/delete-computer', {
            id: now.id,
          }).then((res) => {
            if (res.data.message === 'Успешное добавление') {
              window.location.reload();
            }
          });
        } else {
          console.log('Ошибка');
        }
      });
    };
    return (
      <div className="util-modal">
        <div className="util-content">
          <div style={{ borderBottom: '1px solid #ccc', textAlign: 'center' }}>
            <h4>Форма для оформления записи на утилизацию</h4>
          </div>
          <div style={{ marginTop: '1rem', width: '660px', padding: '22px' }}>
            <label className="add">Дата утилизации</label>
            <input
              type="datetime-local"
              id="form-input"
              name="date"
              onChange={(e) => {
                setDate(e.target.value);
                console.log(date);
              }}
            />
            <label className="add">
              Наименование утилизируемого компьютера
            </label>
            <input type="text" id="form-input" disabled value={now.name} />
            <label className="add">Причина для утилизации</label>
            <select
              id="form-input"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option disabled value={'-'}>
                Выберите причину...
              </option>
              <option>Замена на новый компьютер</option>
              <option>Наличие дефекта/ов</option>
              <option>Срок эксплуатации истек</option>
              <option>Компьютер больше непригоден для использования</option>
              <option>Не подлежит ремонту</option>
            </select>
            <Button
              isActive
              style={{ float: 'left' }}
              onClick={PinningUtilization}
            >
              Оформить утилизацию
            </Button>
            <Button
              isActive
              style={{ float: 'right' }}
              onClick={() => setActive(false)}
            >
              Назад
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const Repair = ({ active, setActive }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [desc, setDesc] = useState('');
    if (!active) return null;

    const RepairComputer = () => {
      Axios.post('http://localhost:3001/repair', {
        date: startDate,
        category: 'Оргтехника',
        type: 'Компьютер',
        model: now.name,
        number: now.id,
        end: endDate,
        description: desc,
      }).then((res) => {
        console.log(res);
        if (res.data.message === 'Успешное добавление') {
          Axios.post('http://localhost:3001/repair_computer', {
            status: 'В ремонте',
            location: '-',
            id: now.id,
          }).then((res) => {
            if (res.data.message === 'Успешное добавление') {
              window.location.reload();
            }
          });
        } else {
          console.log('Ошибка');
        }
      });
    };

    return (
      <div className="util-modal">
        <div className="repair-content">
          <div style={{ borderBottom: '1px solid #ccc', textAlign: 'center' }}>
            <h4>Форма для оформления заявки на ремонт</h4>
          </div>
          <div style={{ width: '660px', padding: '22px' }}>
            <label className="add">Дата отправки в ремонт</label>
            <input
              type="datetime-local"
              id="form-input"
              name="date"
              onChange={(e) => {
                setStartDate(e.target.value);
                console.log(startDate);
              }}
            />
            <label className="add">Наименование компьютера</label>
            <input type="text" id="form-input" disabled value={now.name} />
            <label className="add">Дата окончания ремонта</label>
            <input
              type="datetime-local"
              id="form-input"
              name="date"
              onChange={(e) => {
                setEndDate(e.target.value);
                console.log(endDate);
              }}
            />
            <label className="add">Причина (кратко) отправки в ремонт</label>
            <textarea
              id="form-input"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            ></textarea>
            <Button isActive style={{ float: 'left' }} onClick={RepairComputer}>
              Отправить в ремонт
            </Button>
            <Button
              isActive
              style={{ float: 'right' }}
              onClick={() => setActive(false)}
            >
              Назад
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const ReplaceMenu = ({ value, type, object, change, click }) => {
    return (
      <>
        <input disabled type="text" id="form-input" value={value} />
        <label className="add">Выберите замену для комплектующего:</label>
        <select id="form-input" onChange={change}>
          <option>...</option>
          {type === 'Видеокарта' &&
            object.map((item, i) => {
              return (
                <option key={i} value={[item.id_videocard, item.model]}>
                  {item.model}
                </option>
              );
            })}
          {type === 'Процессор' &&
            object.map((item, i) => {
              return (
                <option key={i} value={[item.id_processor, item.model]}>
                  {item.model}
                </option>
              );
            })}
          {type === 'Материнская плата' &&
            object.map((item, i) => {
              return (
                <option key={i} value={[item.id_mothercard, item.model]}>
                  {item.model}
                </option>
              );
            })}
          {type === 'Оперативная память' &&
            object.map((item, i) => {
              return (
                <option key={i} value={[item.id_memory, item.model]}>
                  {item.model}
                </option>
              );
            })}
          {type === 'Жесткий диск' &&
            object.map((item, i) => {
              return (
                <option key={i} value={[item.id_disk, item.model]}>
                  {item.model}
                </option>
              );
            })}
        </select>
        <Button isActive onClick={click}>
          Осуществить замену
        </Button>
      </>
    );
  };

  const Replacement = ({ active, setActive }) => {
    const [data, setData] = useState();
    const [type, setType] = useState('');
    const [videocard, setVideocard] = useState([]);
    const [processor, setProcessor] = useState([]);
    const [card, setCard] = useState([]);
    const [memory, setMemory] = useState([]);
    const [disk, setDisk] = useState([]);
    const [getObject, setObject] = useState('');
    useEffect(() => {
      FetchComponents();
    }, []);
    useEffect(() => {
      setData(new Date().toLocaleString());
    }, [data]);

    const ChangeVideocard = () => {
      Axios.post('http://localhost:3001/replace', {
        name: now.name,
        type: 'Видеокарта',
        start: now.videocard,
        end: getObject.split(',')[1],
        date: data,
      }).then((response) => {
        console.log(response);
        Axios.post('http://localhost:3001/update_computer_videocard', {
          videocard: +getObject.split(',')[0],
          id: now.id,
        }).then((response) => {
          console.log(response);
          Axios.post('http://localhost:3001/update_videocard', {
            location: 'Склад',
            id: now.videocard_id,
          });
          Axios.post('http://localhost:3001/update_videocard', {
            location: now.name,
            id: +getObject.split(',')[0],
          }).then((res) => {
            window.location.reload();
          });
        });
      });
    };

    const ChangeProcessor = () => {
      Axios.post('http://localhost:3001/replace', {
        name: now.name,
        type: 'Процессор',
        start: now.processor,
        end: getObject.split(',')[1],
        date: data,
      }).then((response) => {
        console.log(response);
        Axios.post('http://localhost:3001/update_computer_processor', {
          processor: +getObject.split(',')[0],
          id: now.id,
        }).then((response) => {
          console.log(response);
          Axios.post('http://localhost:3001/update_processor', {
            location: 'Склад',
            id: now.processor_id,
          });
          Axios.post('http://localhost:3001/update_processor', {
            location: now.name,
            id: +getObject.split(',')[0],
          }).then((res) => {
            window.location.reload();
          });
        });
      });
    };

    const ChangeMothercard = () => {
      Axios.post('http://localhost:3001/replace', {
        name: now.name,
        type: 'Материнская плата',
        start: now.card,
        end: getObject.split(',')[1],
        date: data,
      }).then((response) => {
        console.log(response);
        Axios.post('http://localhost:3001/update_computer_mothercard', {
          mothercard: +getObject.split(',')[0],
          id: now.id,
        }).then((response) => {
          console.log(response);
          Axios.post('http://localhost:3001/update_mothercard', {
            location: 'Склад',
            id: now.card_id,
          });
          Axios.post('http://localhost:3001/update_mothercard', {
            location: now.name,
            id: +getObject.split(',')[0],
          }).then((res) => {
            window.location.reload();
          });
        });
      });
    };

    const ChangeMemory = () => {
      Axios.post('http://localhost:3001/replace', {
        name: now.name,
        type: 'Оперативная память',
        start: now.memory,
        end: getObject.split(',')[1],
        date: data,
      }).then((response) => {
        console.log(response);
        Axios.post('http://localhost:3001/update_computer_memory', {
          memory: +getObject.split(',')[0],
          id: now.id,
        }).then((response) => {
          console.log(response);
          Axios.post('http://localhost:3001/update_memory', {
            location: 'Склад',
            id: now.memory_id,
          });
          Axios.post('http://localhost:3001/update_memory', {
            location: now.name,
            id: +getObject.split(',')[0],
          }).then((res) => {
            window.location.reload();
          });
        });
      });
    };

    const ChangeDisk = () => {
      Axios.post('http://localhost:3001/replace', {
        name: now.name,
        type: 'Видеокарта',
        start: now.disk,
        end: getObject.split(',')[1],
        date: data,
      }).then((response) => {
        console.log(response);
        Axios.post('http://localhost:3001/update_computer_disk', {
          disk: +getObject.split(',')[0],
          id: now.id,
        }).then((response) => {
          console.log(response);
          Axios.post('http://localhost:3001/update_disk', {
            location: 'Склад',
            id: now.disk_id,
          });
          Axios.post('http://localhost:3001/update_disk', {
            location: now.name,
            id: +getObject.split(',')[0],
          }).then((res) => {
            window.location.reload();
          });
        });
      });
    };

    const FetchComponents = async () => {
      const vid = await Axios.get('http://localhost:3001/videocard');
      setVideocard(vid.data);
      const proc = await Axios.get('http://localhost:3001/processor');
      setProcessor(proc.data);
      const mot = await Axios.get('http://localhost:3001/mothercard');
      setCard(mot.data);
      const mem = await Axios.get('http://localhost:3001/memory');
      setMemory(mem.data);
      const dis = await Axios.get('http://localhost:3001/disk');
      setDisk(dis.data);
    };

    if (!active) return null;
    return (
      <div className="util-modal">
        <div className="change-content">
          <div style={{ borderBottom: '1px solid #ccc', textAlign: 'center' }}>
            <h4>Форма для замены комплектующих</h4>
          </div>
          <div style={{ width: '', padding: '22px' }}>
            <label className="add">
              Выберите элемент компьютера для замены:
            </label>
            <select id="form-input" onChange={(e) => setType(e.target.value)}>
              <option>...</option>
              <option>Видеокарта</option>
              <option>Процессор</option>
              <option>Материнская плата</option>
              <option>Оперативная память</option>
              <option>Жесткий диск</option>
            </select>
            {type === 'Видеокарта' && (
              <ReplaceMenu
                value={now.videocard}
                type={'Видеокарта'}
                object={videocard}
                change={(e) => setObject(e.target.value)}
                click={ChangeVideocard}
              />
            )}
            {type === 'Процессор' && (
              <ReplaceMenu
                value={now.processor}
                type={'Процессор'}
                object={processor}
                change={(e) => setObject(e.target.value)}
                click={ChangeProcessor}
              />
            )}
            {type === 'Материнская плата' && (
              <ReplaceMenu
                value={now.card}
                type={'Материнская плата'}
                object={card}
                change={(e) => setObject(e.target.value)}
                click={ChangeMothercard}
              />
            )}
            {type === 'Оперативная память' && (
              <ReplaceMenu
                value={now.memory}
                type={'Оперативная память'}
                object={memory}
                change={(e) => setObject(e.target.value)}
                click={ChangeMemory}
              />
            )}
            {type === 'Жесткий диск' && (
              <ReplaceMenu
                value={now.disk}
                type={'Жесткий диск'}
                object={disk}
                change={(e) => setObject(e.target.value)}
                click={ChangeDisk}
              />
            )}
            <Button
              style={{ marginTop: '3rem' }}
              isActive
              onClick={() => setActive(false)}
            >
              Назад
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Utilization active={modal} setActive={setModal} />
      <Repair active={repair} setActive={setRepair} />
      <Replacement active={replace} setActive={setReplace} />
      <section id="sec">
        <div className="sec" style={{ display: 'block', textAlign: 'center' }}>
          <h2>Информация о компьютерах</h2>
          <table className="content-table" style={{ display: 'inline-block' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Модель</th>
                <th>Видеокарта</th>
                <th>Процессор</th>
                <th>Материнская плата</th>
                <th>Оперативная память</th>
                <th>Жесткий диск</th>
                <th>Закреп.</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {computer.map((computer, i) => {
                return (
                  <tr key={i}>
                    <td>{computer.id_computer}</td>
                    <td>{computer.name}</td>
                    <td>{computer.videocards}</td>
                    <td>{computer.processors}</td>
                    <td>{computer.mothercards}</td>
                    <td>{computer.memories}</td>
                    <td>{computer.disks}</td>
                    <td>
                      <FontAwesomeIcon
                        style={{
                          cursor: 'pointer',
                          color: '#1560BD',
                          marginRight: '10px',
                        }}
                        onClick={() => {
                          navigate('/pinning_employee');
                        }}
                        icon={faUserLock}
                      />
                      <FontAwesomeIcon
                        style={{
                          cursor: 'pointer',
                          color: '#1560BD',
                          marginLeft: '10px',
                        }}
                        onClick={() => {
                          navigate('/pinning_cabinet');
                        }}
                        icon={faHouseLock}
                      />
                    </td>
                    <td>
                      <button
                        className="util"
                        onClick={() => {
                          setModal(true);
                          ViewComputer(computer.id_computer);
                        }}
                      >
                        <FontAwesomeIcon
                          style={{
                            color: 'fff',
                            cursor: 'pointer',
                            marginRight: '7px',
                          }}
                          icon={faTrash}
                        />
                        Утилизация
                      </button>
                      <button
                        className="repair"
                        onClick={() => {
                          setRepair(true);
                          ViewComputer(computer.id_computer);
                        }}
                      >
                        {' '}
                        <FontAwesomeIcon
                          style={{
                            color: 'fff',
                            cursor: 'pointer',
                            marginRight: '7px',
                          }}
                          icon={faScrewdriverWrench}
                        />
                        Ремонт
                      </button>
                      <button
                        className="change"
                        onClick={() => {
                          setReplace(true);
                          ViewComputer(computer.id_computer);
                        }}
                      >
                        <FontAwesomeIcon
                          style={{
                            color: '000',
                            cursor: 'pointer',
                            marginRight: '7px',
                          }}
                          icon={faRotateRight}
                        />
                        Замена
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
