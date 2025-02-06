import { React, useEffect, useState } from 'react';
import Button from 'components/Button/Button';
import './CabinetSection.css';
import Axios from 'axios';

const CabinetSection = ({ active, setActive, children }) => {
  const [cabinet, setCabinet] = useState([]);
  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const res = await Axios('http://localhost:3001/cabinet');
      setCabinet(res.data);
      console.log(res);
    } catch (err) {
      console.log('Ошибка при обработке запроса');
    }
  };

  if (!active) return null;
  return (
    <>
      <div className="cabinet_overlay">
        <div className="cabinet_modal">
          <section className="cabinet_header">
            <p style={{ fontWeight: '650', fontSize: '20px' }}>{children}</p>
          </section>
          <div className="cabinet_container">
            <table className="cabinet_table">
              <thead className="cabinet_thead">
                <tr className="cabinet_trhead">
                  <th className="cabinet_th">Идентификатор</th>
                  <th className="cabinet_th">Номер кабинета</th>
                  <th className="cabinet_th">Краткое описание</th>
                </tr>
              </thead>
              <tbody className="cabinet_tbody">
                {cabinet.map((cabinet, i) => {
                  return (
                    <tr className="cabinet_trbody" key={i}>
                      <td className="cabinet_td">{i + 1}</td>
                      <td className="cabinet_td">{cabinet.number}</td>
                      <td className="cabinet_td">{cabinet.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="cabinet_footer">
            <Button isActive onClick={() => setActive(false)}>
              Назад
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default CabinetSection;
