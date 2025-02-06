import { React, useEffect, useState } from 'react';
import Button from 'components/Button/Button';
import Axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
export default function ComputerSection() {
  const [computer, setComputer] = useState({
    name: '',
    videocard: '',
    processor: '',
    mothercard: '',
    memory: '',
    disk: '',
  });
  const [videocard, setVideocard] = useState(['']);
  const [processor, setProcessor] = useState(['']);
  const [mothercard, setMothercard] = useState(['']);
  const [memory, setMemory] = useState(['']);
  const [disk, setDisk] = useState(['']);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (
      computer.name === '' ||
      computer.videocard === '' ||
      computer.processor === '' ||
      computer.mothercard === '' ||
      computer.memory === '' ||
      computer.disk === ''
    ) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [computer]);

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const videocard = await Axios('http://localhost:3001/videocard');
      const processor = await Axios('http://localhost:3001/processor');
      const mothercard = await Axios('http://localhost:3001/mothercard');
      const memory = await Axios('http://localhost:3001/memory');
      const disk = await Axios('http://localhost:3001/disk');
      setVideocard(videocard.data);
      setProcessor(processor.data);
      setMothercard(mothercard.data);
      setMemory(memory.data);
      setDisk(disk.data);
    } catch (err) {
      console.log('Ошибка при обработке запроса');
    }
  };
  const addComputer = () => {
    Axios.post('http://localhost:3001/add_computer', {
      name: computer.name,
      videocard_id: +computer.videocard,
      processor_id: +computer.processor,
      mothercard_id: +computer.mothercard,
      memory_id: +computer.memory,
      disk_id: +computer.disk,
      location: 'Склад',
      status: 'Находится в резерве',
    }).then((response) => {
      console.log(response);
      if (response.data.message === 'Успешное добавление') {
        toast.success('Компьютер успешно добавлен на склад');
      } else {
        console.log('Ошибка');
        toast.error('Ошибка при добавлении компьютера');
      }
    });
    Axios.post('http://localhost:3001/update_videocard', {
      location: computer.name,
      id: +computer.videocard,
    }).then((response) => {
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
      } else {
        console.log('Ошибка');
      }
    });
    Axios.post('http://localhost:3001/update_processor', {
      location: computer.name,
      id: +computer.processor,
    }).then((response) => {
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
      } else {
        console.log('Ошибка');
      }
    });
    Axios.post('http://localhost:3001/update_mothercard', {
      location: computer.name,
      id: +computer.mothercard,
    }).then((response) => {
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
      } else {
        console.log('Ошибка');
      }
    });
    Axios.post('http://localhost:3001/update_memory', {
      location: computer.name,
      id: +computer.memory,
    }).then((response) => {
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
      } else {
        console.log('Ошибка');
      }
    });
    Axios.post('http://localhost:3001/update_disk', {
      location: computer.name,
      id: +computer.disk,
    }).then((response) => {
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
      } else {
        console.log('Ошибка');
      }
    });
  };

  const handleComputerChange = (event) => {
    setComputer((computer) => ({
      ...computer,
      [event.target.name]: event.target.value,
    }));
    console.log(computer);
  };

  return (
    <div style={{ width: '420px' }}>
      <label htmlFor="name" className="add">
        Наименование:
      </label>
      <input
        id="form-input"
        name="name"
        value={computer.name}
        onChange={handleComputerChange}
      />
      <label htmlFor="videocard" className="add">
        Видеокарта:
      </label>
      <select
        id="form-input"
        defaultValue={'DEFAULT'}
        name="videocard"
        onChange={handleComputerChange}
      >
        <option disabled value="DEFAULT">
          ...
        </option>
        {videocard.map((item, i) => {
          return (
            <option key={i} value={item.id_videocard}>
              {item.model}
            </option>
          );
        })}
      </select>
      <label htmlFor="processor" className="add">
        Процессор:
      </label>
      <select
        id="form-input"
        name="processor"
        defaultValue={'DEFAULT'}
        onChange={handleComputerChange}
      >
        <option disabled value="DEFAULT">
          ...
        </option>
        {processor.map((item, i) => {
          return (
            <option key={i} value={item.id_processor}>
              {item.model}
            </option>
          );
        })}
      </select>
      <label htmlFor="mothercard" className="add">
        Материнская плата:
      </label>
      <select
        id="form-input"
        defaultValue={'DEFAULT'}
        name="mothercard"
        onChange={handleComputerChange}
      >
        <option disabled value="DEFAULT">
          ...
        </option>
        {mothercard.map((item, i) => {
          return (
            <option key={i} value={item.id_mothercard}>
              {item.model}
            </option>
          );
        })}
      </select>
      <label htmlFor="memory" className="add">
        Оперативная память:
      </label>
      <select
        id="form-input"
        defaultValue={'DEFAULT'}
        name="memory"
        onChange={handleComputerChange}
      >
        <option disabled value="DEFAULT">
          ...
        </option>
        {memory.map((item, i) => {
          return (
            <option key={i} value={item.id_memory}>
              {item.model}
            </option>
          );
        })}
      </select>
      <label htmlFor="disk" className="add">
        Жесткий диск:
      </label>
      <select
        id="form-input"
        defaultValue={'DEFAULT'}
        name="disk"
        onChange={handleComputerChange}
      >
        <option disabled value="DEFAULT">
          ...
        </option>
        {disk.map((item, i) => {
          return (
            <option key={i} value={item.id_disk}>
              {item.model}
            </option>
          );
        })}
      </select>
      <Button
        disabled={!valid}
        isActive={valid}
        style={{ marginLeft: '9rem' }}
        onClick={addComputer}
      >
        Добавить
      </Button>
      <ToastContainer />
    </div>
  );
}
