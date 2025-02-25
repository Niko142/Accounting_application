import { React, useEffect, useState } from 'react';
import Header from 'components/Header/Header';
import Button from 'components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { product_groups } from 'data';
import { ToastContainer, toast } from 'react-toastify';
import {
  fetchData,
  selectChancellery,
  deleteChancellery,
  addChancellery,
  editAmounts,
} from 'api/chancellery';
import { chancelleryColumns } from 'data/columns';
import DataTable from 'components/Table/Table';

export default function OfficeMenu() {
  const [result, setResult] = useState([]);
  const [modal, setModal] = useState();
  const [change, setChange] = useState();
  const [target, setTarget] = useState({ name: '', id: '', amounts: '' });

  useEffect(() => {
    const abortController = new AbortController();
    fetchData(abortController, setResult);
    return () => abortController.abort();
  }, []);

  const handleSelect = (id) => {
    setChange(true);
    selectChancellery(id, setTarget);
  };

  const handleDelete = (id) => {
    deleteChancellery(id);
  };

  const AddGroup = ({ active, setActive }) => {
    const [office, setOffice] = useState({
      type: '...',
      name: '',
      unit: '',
      price: '',
      amounts: '',
    });

    const [valid, setValid] = useState(false);
    useEffect(() => {
      if (
        office.name === '' ||
        office.type === '' ||
        office.price === '' ||
        office.amounts === '' ||
        office.unit === ''
      ) {
        setValid(false);
      } else setValid(true);
    }, [office]);

    const HandleChange = (event) => {
      setOffice((office) => ({
        ...office,
        [event.target.name]: event.target.value,
      }));
    };

    if (!active) return null;
    return (
      <div className="util-modal">
        <div className="office-content">
          <div style={{ borderBottom: '1px solid #ccc', textAlign: 'center' }}>
            <h4>Форма для добавления новой товарной группы</h4>
          </div>
          <div style={{ width: '', padding: '22px' }}>
            <label className="add">Товарная группа:</label>
            <select
              id="form-input"
              name="type"
              value={office.type}
              onChange={HandleChange}
            >
              <option value={'...'}>...</option>
              {product_groups.map((item, i) => {
                return (
                  <option key={i} value={item.value}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <label className="add">
              Наименование (описание) принадлежности:
            </label>
            <textarea
              id="form-input"
              name="name"
              value={office.name}
              onChange={HandleChange}
            ></textarea>
            <label className="add">Единица измерения:</label>
            <select
              id="form-input"
              name="unit"
              value={office.unit}
              onChange={HandleChange}
            >
              <option>...</option>
              <option>шт.</option>
              <option>пач.</option>
              <option>уп.</option>
            </select>
            <label className="add">Цена за 1 ед.</label>
            <input
              type="number"
              id="form-input"
              name="price"
              value={office.price}
              onChange={HandleChange}
            />
            <label className="add">Количество:</label>
            <input
              type="number"
              id="form-input"
              name="amounts"
              value={office.amounts}
              onChange={HandleChange}
            />
            <Button isActive onClick={() => setActive(false)}>
              Назад
            </Button>
            <Button
              isActive={valid}
              disabled={!valid}
              style={{ float: 'right' }}
              onClick={() =>
                addChancellery(
                  {
                    type: office.type,
                    name: office.name,
                    unit: office.unit,
                    price: +office.price,
                    amounts: +office.amounts,
                  },
                  toast,
                )
              }
            >
              Добавить
            </Button>
            <ToastContainer />
          </div>
        </div>
      </div>
    );
  };

  const ChangeAmounts = ({ active, setActive }) => {
    const [amount, setAmount] = useState(target.amounts);

    if (!active) return null;

    return (
      <div className="util-modal">
        <div className="amount-content">
          <div style={{ borderBottom: '1px solid #ccc', textAlign: 'center' }}>
            <h4>Корректировка количества канцелярных принадлежностей</h4>
          </div>
          <div style={{ width: '', padding: '15px' }}>
            <textarea disabled value={target.name} id="form-input"></textarea>
            <input
              type="number"
              value={amount}
              id="form-input"
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button isActive onClick={() => setActive(false)}>
              Назад
            </Button>
            <Button
              isActive
              style={{ float: 'right' }}
              onClick={() =>
                editAmounts({ amounts: amount, id: target.id }, toast)
              }
            >
              Изменить
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <AddGroup active={modal} setActive={setModal} />
      <ChangeAmounts active={change} setActive={setChange} />
      <section className="chancellery">
        <div className="chancellery__block">
          <div className="chancellery__header">
            <Button className="add-group-btn" onClick={() => setModal(true)}>
              Добавить новую товарную группу
            </Button>
            <button
              className="reload-btn"
              onClick={() => window.location.reload()}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <DataTable
            head={chancelleryColumns(handleSelect, handleDelete)}
            mockData={result}
          />
        </div>
      </section>
    </>
  );
}
