import { useNavigate } from 'react-router-dom';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import { components } from 'data/data';
import { React, useEffect, useState } from 'react';
import './AddComponent.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';

export default function AddComponents() {
  const [category, setCategory] = useState('');
  const navigate = useNavigate('');

  //Хуки для видеокарты
  const [modelVideocard, setModelVideocard] = useState('');
  const [hasErrorModelVideo, setHasModelVideo] = useState(true);
  const [priceVideocard, setPriceVideocard] = useState('');
  const [hasErrorPriceVideo, setHasPriceVideo] = useState(true);
  const [validVideocard, setValidVideocard] = useState(false);

  useEffect(() => {
    if (hasErrorModelVideo || hasErrorPriceVideo) {
      setValidVideocard(false);
    } else {
      setValidVideocard(true);
    }
  }, [validVideocard, hasErrorModelVideo, hasErrorPriceVideo]);

  //Хуки для процессора
  const [modelProcessor, setModelProcessor] = useState('');
  const [hasErrorModelProcessor, setHasModelProcessor] = useState(true);
  const [rateProcessor, setRateProcessor] = useState('');
  const [hasErrorRateProcessor, setHasErrorRateProcessor] = useState(true);
  const [priceProcessor, setPriceProcessor] = useState('');
  const [hasErrorPriceProcessor, setHasErrorPriceProcessor] = useState(true);
  const [validProcessor, setValidProcessor] = useState(false);

  useEffect(() => {
    if (
      hasErrorModelProcessor ||
      hasErrorRateProcessor ||
      hasErrorPriceProcessor
    ) {
      setValidProcessor(false);
    } else {
      setValidProcessor(true);
    }
  }, [
    validProcessor,
    hasErrorModelProcessor,
    hasErrorRateProcessor,
    hasErrorPriceProcessor,
  ]);

  //Хуки для материнки
  const [modelCard, setModelCard] = useState('');
  const [hasErrorModelCard, setHasModelCard] = useState(true);
  const [rateCard, setRateCard] = useState('');
  const [hasErrorRateCard, setHasErrorRateCard] = useState(true);
  const [typeCard, setTypeCard] = useState('');
  const [priceCard, setPriceCard] = useState('');
  const [hasErrorPriceCard, setHasErrorPriceCard] = useState(true);
  const [validCard, setValidCard] = useState(false);

  useEffect(() => {
    if (hasErrorModelCard || hasErrorRateCard || hasErrorPriceCard) {
      setValidCard(false);
    } else {
      setValidCard(true);
    }
  }, [validCard, hasErrorModelCard, hasErrorRateCard, hasErrorPriceCard]);

  //Хуки для оперативы
  const [modelMemory, setModelMemory] = useState('');
  const [hasErrorModelMemory, setHasModelMemory] = useState(true);
  const [typeMemory, setTypeMemory] = useState('');
  const [volumeMemory, setVolumeMemory] = useState('');
  const [hasErrorVolumeMemory, setHasErrorVolumeMemory] = useState(true);
  const [priceMemory, setPriceMemory] = useState('');
  const [hasErrorPriceMemory, setHasErrorPriceMemory] = useState(true);
  const [validMemory, setValidMemory] = useState(false);

  useEffect(() => {
    if (hasErrorModelMemory || hasErrorVolumeMemory || hasErrorPriceMemory) {
      setValidMemory(false);
    } else {
      setValidMemory(true);
    }
  }, [
    validMemory,
    hasErrorModelMemory,
    hasErrorVolumeMemory,
    hasErrorPriceMemory,
  ]);

  //Хуки для жесткого диска
  const [modelDisk, setModelDisk] = useState('');
  const [hasErrorModelDisk, setHasErrorModelDisk] = useState(true);
  const [volumeDisk, setVolumeDisk] = useState('');
  const [hasErrorVolumeDisk, setHasErrorVolumeDisk] = useState(true);
  const [priceDisk, setPriceDisk] = useState('');
  const [hasErrorPriceDisk, setHasErrorPriceDisk] = useState(true);
  const [validDisk, setValidDisk] = useState(false);

  useEffect(() => {
    if (hasErrorModelDisk || hasErrorVolumeDisk || hasErrorPriceDisk) {
      setValidDisk(false);
    } else {
      setValidDisk(true);
    }
  }, [validDisk, hasErrorModelDisk, hasErrorVolumeDisk, hasErrorPriceDisk]);

  function isValid(value) {
    return /^\d\.\d\s+ГГц$/.test(value);
  }
  const handleRateProcessorChange = (event) => {
    if (!isValid(event.target.value)) {
      setHasErrorRateProcessor('Неправильный формат ввода значений');
    } else {
      setHasErrorRateProcessor(null);
    }
    setRateProcessor(event.target.value);
  };

  function CardRate(value) {
    return /^(\d{4})\s+МГц$/.test(value);
  }
  const handleRateCardChange = (event) => {
    if (!CardRate(event.target.value)) {
      setHasErrorRateCard('Неправильный формат ввода значений');
    } else {
      setHasErrorRateCard(null);
    }
    setRateCard(event.target.value);
  };

  function VolumeMemory(value) {
    return /^(\d{1,2})\sГб$/.test(value);
  }
  const handleVolumeMemoryChange = (event) => {
    if (!VolumeMemory(event.target.value)) {
      setHasErrorVolumeMemory('Неправильный формат ввода значений');
    } else {
      setHasErrorVolumeMemory(null);
    }
    setVolumeMemory(event.target.value);
  };

  function VolumeDisk(value) {
    return /^(\d{1,4})\s(Тб|Гб)$/.test(value);
  }
  const handleVolumeDiskChange = (event) => {
    if (!VolumeDisk(event.target.value)) {
      setHasErrorVolumeDisk('Неправильный формат ввода значений');
    } else {
      setHasErrorVolumeDisk(null);
    }
    setVolumeDisk(event.target.value);
  };

  function handlePriceChange(event) {
    const result = event.target.value.replace(/\D/g, '');
    if (category === 'Видеокарта') {
      setPriceVideocard(result);
      setHasPriceVideo(result.trim().length === 0);
    } else if (category === 'Процессор') {
      setPriceProcessor(result);
      setHasErrorPriceProcessor(result.trim().length === 0);
    } else if (category === 'Материнская плата') {
      setPriceCard(result);
      setHasErrorPriceCard(result.trim().length === 0);
    } else if (category === 'Оперативная память') {
      setPriceMemory(result);
      setHasErrorPriceMemory(result.trim().length === 0);
    } else {
      setPriceDisk(result);
      setHasErrorPriceDisk(result.trim().length === 0);
    }
  }

  const addVideocard = () => {
    Axios.post('http://localhost:3001/add_videocard', {
      model: modelVideocard,
      price: priceVideocard,
      location: 'Склад',
    }).then((response) => {
      console.log(response);
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Видеокарта успешно добавлена');
      } else {
        toast.error('Ошибка при совершении запроса');
      }
    });
  };
  const addProcessor = () => {
    Axios.post('http://localhost:3001/add_processor', {
      model: modelProcessor,
      rate: rateProcessor,
      price: priceProcessor,
      location: 'Склад',
    }).then((response) => {
      console.log(response);
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Процессор успешно добавлен');
      } else {
        toast.error('Ошибка при совершении запроса');
      }
    });
  };

  const addCard = () => {
    Axios.post('http://localhost:3001/add_mothercard', {
      model: modelCard,
      type: typeCard,
      rate: rateCard,
      price: priceCard,
      location: 'Склад',
    }).then((response) => {
      console.log(response);
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Материнская плата успешно добавлена');
      } else {
        toast.error('Ошибка при совершении запроса');
      }
    });
  };

  const addMemory = () => {
    Axios.post('http://localhost:3001/add_memory', {
      model: modelMemory,
      type: typeMemory,
      volume: volumeMemory,
      price: priceMemory,
      location: 'Склад',
    }).then((response) => {
      console.log(response);
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Оперативная память успешно добавлена');
      } else {
        toast.error('Ошибка при совершении запроса');
      }
    });
  };

  const addDisk = () => {
    Axios.post('http://localhost:3001/add_disk', {
      model: modelDisk,
      volume: volumeDisk,
      price: priceDisk,
      location: 'Склад',
    }).then((response) => {
      console.log(response);
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Жесткий диск успешно добавлен');
      } else {
        toast.error('Ошибка при совершении запроса');
      }
    });
  };

  const FormSubmit = (event) => {
    event.preventDefault();
  };

  const Vitrina = ({ title, src, width, alt }) => {
    return (
      <div>
        <h4 style={{ marginTop: '0px' }}>{title}</h4>
        <img style={{ padding: '4px' }} src={src} width={width} alt={alt}></img>
      </div>
    );
  };

  return (
    <>
      <Header />
      <section style={{ marginBottom: '2rem' }}>
        <Button
          id="image-button"
          isActive
          onClick={() => navigate('/components')}
        >
          Назад
        </Button>
        <Button id="image-button" isActive onClick={() => setCategory('')}>
          Сбросить категорию
        </Button>
      </section>
      <div className="block-select">
        <select
          id="category"
          className="cont"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {components.map((item) => {
            return <option key={item.value}>{item.name}</option>;
          })}
        </select>
      </div>

      {category === 'Видеокарта' && (
        <>
          <div className="block-input">
            <Vitrina
              title={'Форма для добавления видеокарты'}
              src={process.env.PUBLIC_URL + '/triple.png'}
              width={'160'}
              alt={'Видеокарта'}
            />
            <form
              style={{ display: 'block', width: '460px', height: '190px' }}
              onSubmit={FormSubmit}
            >
              <input
                type="text"
                id="components-input"
                placeholder="Модель"
                value={modelVideocard}
                style={{ borderColor: hasErrorModelVideo ? 'red' : null }}
                onChange={(event) => {
                  setModelVideocard(event.target.value);
                  setHasModelVideo(event.target.value.trim().length === 0);
                }}
              />
              {hasErrorModelVideo && <span id="err"> Поле `Модель` пусто</span>}
              <input
                type="text"
                id="components-input"
                placeholder="Стоимость"
                value={priceVideocard}
                style={{ borderColor: hasErrorModelVideo ? 'red' : null }}
                onChange={handlePriceChange}
              />
              {hasErrorPriceVideo && <span id="err">Поле `Цена` пусто</span>}
              <Button
                disabled={!validVideocard}
                isActive={validVideocard}
                style={{ float: 'right' }}
                onClick={addVideocard}
              >
                Добавить
              </Button>
              <ToastContainer />
            </form>
          </div>
        </>
      )}
      {category === 'Процессор' && (
        <>
          <div className="block-input">
            <Vitrina
              title={'Форма для добавления процессора'}
              src={process.env.PUBLIC_URL + '/processor.png'}
              width={'160'}
              alt={'Процессор'}
            />
            <form
              style={{ display: 'block', width: '470px', height: '270px' }}
              onSubmit={FormSubmit}
            >
              <input
                type="text"
                id="components-input"
                value={modelProcessor}
                placeholder="Модель"
                style={{ borderColor: hasErrorModelProcessor ? 'red' : null }}
                onChange={(event) => {
                  setModelProcessor(event.target.value);
                  setHasModelProcessor(event.target.value.trim().length === 0);
                }}
              />
              {hasErrorModelProcessor && (
                <span id="err"> Поле `Модель` пусто</span>
              )}
              <input
                type="text"
                id="components-input"
                value={rateProcessor}
                style={{ borderColor: hasErrorRateProcessor ? 'red' : null }}
                placeholder="Частота (в формате, 'x.x ГГц')"
                onChange={handleRateProcessorChange}
              />
              {hasErrorRateProcessor && (
                <span id="err">{hasErrorRateProcessor}</span>
              )}
              <input
                type="text"
                id="components-input"
                value={priceProcessor}
                style={{ borderColor: hasErrorPriceProcessor ? 'red' : null }}
                placeholder="Стоимость"
                onChange={handlePriceChange}
              />
              {hasErrorPriceProcessor && (
                <span id="err"> Поле `Цена` пусто</span>
              )}
              <Button
                disabled={!validProcessor}
                isActive={validProcessor}
                style={{ float: 'right' }}
                onClick={addProcessor}
              >
                Добавить
              </Button>
              <ToastContainer />
            </form>
          </div>
        </>
      )}
      {category === 'Материнская плата' && (
        <>
          <div className="block-input">
            <Vitrina
              title={'Форма для добавления материнской платы'}
              src={process.env.PUBLIC_URL + '/mothercard.png'}
              width={'170'}
              alt={'Материнская плата'}
            />
            <form
              style={{ display: 'block', width: '570px', height: '310px' }}
              onSubmit={FormSubmit}
            >
              <input
                type="text"
                id="components-input"
                placeholder="Модель"
                value={modelCard}
                style={{ borderColor: hasErrorModelCard ? 'red' : null }}
                onChange={(e) => {
                  setModelCard(e.target.value);
                  setHasModelCard(e.target.value.trim().length === 0);
                }}
              />
              {hasErrorModelCard && <span id="err">Поле `Модель` пусто</span>}
              <select
                id="components-input"
                value={typeCard}
                onChange={(e) => setTypeCard(e.target.value)}
              >
                <option>Выберите тип поддерживаемой памяти...</option>
                <option>DDR2</option>
                <option>DDR3</option>
                <option>DDR4</option>
                <option>DDR5</option>
              </select>
              <input
                type="text"
                id="components-input"
                placeholder="Частота (в формате 'xxxx МГц')"
                value={rateCard}
                style={{ borderColor: hasErrorRateCard ? 'red' : null }}
                onChange={handleRateCardChange}
              />
              {hasErrorRateCard && <span id="err">{hasErrorRateCard}</span>}
              <input
                type="text"
                id="components-input"
                value={priceCard}
                placeholder="Стоимость"
                style={{ borderColor: hasErrorPriceCard ? 'red' : null }}
                onChange={handlePriceChange}
              />
              {hasErrorPriceCard && <span id="err">Поле `Цена` пусто</span>}
              <Button
                disabled={!validCard}
                isActive={validCard}
                style={{ float: 'right' }}
                onClick={addCard}
              >
                Добавить
              </Button>
              <ToastContainer />
            </form>
          </div>
        </>
      )}
      {category === 'Оперативная память' && (
        <>
          <div className="block-input">
            <Vitrina
              title={'Форма для добавления ОЗУ'}
              src={process.env.PUBLIC_URL + '/memory.png'}
              width={'180'}
              alt={'ОЗУ'}
            />
            <form
              style={{ display: 'block', width: '500px', height: '300px' }}
              onSubmit={FormSubmit}
            >
              <input
                type="text"
                id="components-input"
                value={modelMemory}
                placeholder="Модель"
                style={{ borderColor: hasErrorModelMemory ? 'red' : null }}
                onChange={(e) => {
                  setModelMemory(e.target.value);
                  setHasModelMemory(e.target.value.trim().length === 0);
                }}
              />
              {hasErrorModelMemory && <span id="err">Поле `Модель` пусто</span>}
              <select
                id="components-input"
                value={typeMemory}
                onChange={(e) => setTypeMemory(e.target.value)}
              >
                <option>Выберите тип поддерживаемой памяти...</option>
                <option>DDR2</option>
                <option>DDR3</option>
                <option>DDR4</option>
                <option>DDR5</option>
              </select>
              <input
                type="text"
                id="components-input"
                value={volumeMemory}
                style={{ borderColor: hasErrorVolumeMemory ? 'red' : null }}
                placeholder="Объем памяти"
                onChange={handleVolumeMemoryChange}
              />
              {hasErrorVolumeMemory && (
                <span id="err">{hasErrorVolumeMemory}</span>
              )}
              <input
                type="text"
                id="components-input"
                placeholder="Стоимость"
                style={{ borderColor: hasErrorPriceMemory ? 'red' : null }}
                value={priceMemory}
                onChange={handlePriceChange}
              />
              {hasErrorPriceMemory && <span id="err">Поле `Цена` пусто</span>}
              <Button
                disabled={!validMemory}
                isActive={validMemory}
                style={{ float: 'right' }}
                onClick={addMemory}
              >
                Добавить
              </Button>
              <ToastContainer />
            </form>
          </div>
        </>
      )}

      {category === 'Жесткий диск' && (
        <>
          <div className="block-input">
            <Vitrina
              title={'Форма для добавления диска'}
              src={process.env.PUBLIC_URL + '/disk.png'}
              width={'240'}
              alt={'Жесткий диск'}
            />
            <form
              style={{ display: 'block', width: '450px', height: '240px' }}
              onSubmit={FormSubmit}
            >
              <input
                type="text"
                id="components-input"
                value={modelDisk}
                placeholder="Модель"
                style={{ borderColor: hasErrorModelDisk ? 'red' : null }}
                onChange={(e) => {
                  setModelDisk(e.target.value);
                  setHasErrorModelDisk(e.target.value.trim().length === 0);
                }}
              />
              {hasErrorModelDisk && <span id="err">Поле `Модель` пусто</span>}
              <input
                type="text"
                id="components-input"
                value={volumeDisk}
                placeholder="Объем"
                style={{ borderColor: hasErrorVolumeDisk ? 'red' : null }}
                onChange={handleVolumeDiskChange}
              />
              {hasErrorVolumeDisk && <span id="err">{hasErrorVolumeDisk}</span>}
              <input
                type="text"
                id="components-input"
                value={priceDisk}
                placeholder="Стоимость"
                style={{ borderColor: hasErrorPriceDisk ? 'red' : null }}
                onChange={handlePriceChange}
              />
              {hasErrorPriceDisk && <span id="err">Поле `Цена` пусто</span>}
              <Button
                disabled={!validDisk}
                isActive={validDisk}
                style={{ float: 'right' }}
                onClick={addDisk}
              >
                Добавить
              </Button>
              <ToastContainer />
            </form>
          </div>
        </>
      )}
    </>
  );
}
