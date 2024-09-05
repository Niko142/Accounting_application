import Axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faHouseLock, faTrash, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import './Utilization.css'
import { useNavigate } from "react-router-dom";
import Button from "../../Button/Button";
export default function SelectFurniture() {
    const navigate = useNavigate('')
    const [furniture, setFurniture] = useState([]);
    const [now, setNow] = useState({name: '', id: ''})
    const [modal, setModal] = useState();
    const [repair, setRepair] = useState();
    useEffect(() =>{
        FetchData();
    }, [])

    const ViewFurniture = (id) => {
        Axios.get(`http://localhost:3001/select_furniture/${id}`).then((res) => {
            let result = res.data
            setNow({name: result[0].name + ' ' + result[0].model, id: result[0].furniture_id})
        })
    }

    const FetchData = async () => {
        try{
            const result = await Axios("http://localhost:3001/sklad_furniture");
            setFurniture(result.data)
        }
        catch (err){
            console.log('Ошибка при обработке запроса')
        }
    }

    const Utilization = ({active, setActive}) => {
        const [date, setDate] = useState(null)
        const [reason, setReason] = useState('-')
        if(!active) return null

        const PinningUtilization = () => {
            Axios.post('http://localhost:3001/utilization', {
                date: date,
                category: 'Мебель',
                type: '-',
                number: now.id,
                model: now.name,
                reason: reason,
            }).then((res)=> {
                console.log(res);
                if(res.data.message === 'Успешное добавление'){
                    Axios.post("http://localhost:3001/delete-furniture", {
                    id: now.id,
                    }).then((res)=>{
                        if(res.data.message === 'Успешное добавление'){
                            window.location.reload()
                        }
                    })
                }
                else{
                    console.log('Ошибка')
                }
            })
        }

        return(
            <div className="util-modal">
                <div className="util-content">
                    <div style={{borderBottom: '1px solid #ccc', textAlign: 'center'}}>
                        <h4>Форма для оформления записи на утилизацию</h4>
                    </div>
                    <div style={{marginTop: '1rem', width: '660px', padding: '22px'}}>
                        <label className="add">Дата утилизации</label>
                        <input type='datetime-local' id="form-input" name="date" onChange={(e) => {setDate(e.target.value); console.log(date)}}/>
                        <label className="add">Наименование утилизируемой мебели</label>
                        <input type="text" id="form-input" disabled value={now.name}/>
                        <label className="add">Причина для утилизации</label>
                        <select id="form-input" value={reason} onChange={(e) => setReason(e.target.value)}>
                            <option disabled value={'-'}>Выберите причину...</option>
                            <option>Замена на новую мебель</option>
                            <option>Наличие дефекта/ов</option>
                            <option>Срок эксплуатации истек</option>
                            <option>Мебель больше непригодна для использования</option>
                            <option>Не подлежит ремонту</option>
                        </select>
                        <Button isActive style={{float: 'left'}} onClick={PinningUtilization}>Оформить утилизацию</Button>
                        <Button isActive style={{float: 'right'}} onClick={() => setActive(false)}>Назад</Button>
                    </div>
                </div>
            </div>
        )
    }

    const Repair = ({active, setActive}) => {
        const [startDate, setStartDate] = useState(null);
        const [endDate, setEndDate] = useState(null);
        const [desc, setDesc] = useState('')
        if(!active) return null

        const RepairFurniture = () => {
            Axios.post('http://localhost:3001/repair', {
                date: startDate,
                category: 'Мебель',
                type: '-',
                model: now.name,
                number: now.id,
                end: endDate,
                description: desc,
            }).then((res)=> {
                console.log(res);
                if(res.data.message === 'Успешное добавление'){
                    Axios.post("http://localhost:3001/repair_furniture", {
                    status: 'В ремонте',
                    location: '-',
                    id: now.id,
                    }).then((res)=>{
                        if(res.data.message === 'Успешное добавление'){
                            window.location.reload()
                        }
                    })
                }
                else{
                    console.log('Ошибка')
                }
            })
        }

            return (
                <div className="util-modal">
                    <div className="repair-content">
                        <div style={{borderBottom: '1px solid #ccc', textAlign: 'center'}}>
                            <h4>Форма для оформления заявки на ремонт</h4>
                        </div>
                        <div style={{width: '660px', padding: '22px'}}>
                            <label className="add">Дата отправки в ремонт</label>
                            <input type='datetime-local' id="form-input" name="date" onChange={(e) => {setStartDate(e.target.value); console.log(startDate)}}/>
                            <label className="add">Наименование мебели</label>
                            <input type="text" id="form-input" disabled value={now.name}/>
                            <label className="add">Дата окончания ремонта</label>
                            <input type='datetime-local' id="form-input" name="date" onChange={(e) => {setEndDate(e.target.value); console.log(endDate)}}/>
                            <label className="add">Причина (кратко) отправки в ремонт</label>
                            <textarea id="form-input" onChange={(e) => setDesc(e.target.value)} value={desc}></textarea>
                            <Button isActive style={{float: 'left'}} onClick={RepairFurniture}>Отправить в ремонт</Button>
                            <Button isActive style={{float: 'right'}} onClick={() => setActive(false)}>Назад</Button>
                        </div>
                    </div>
                </div>
            )
    }

    return (
        <>
        <Utilization active={modal} setActive={setModal}/>
        <Repair active={repair} setActive={setRepair}/>
        <section id='sec'>
            <div className="sec" style={{display: 'block',textAlign: 'center'}}>
                <h2>Информация о мебели</h2>
                <table className="content-table" style={{display: 'inline-block'}}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Наименование</th>
                        <th>Модель</th>
                        <th>Стоимость</th>
                        <th>Закрепить:</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            furniture.map((furniture, i) =>{
                                return(
                                    <tr key={i}>
                                        <td>{furniture.furniture_id}</td>
                                        <td>{furniture.name}</td>
                                        <td>{furniture.model}</td>
                                        <td>{furniture.price + ' руб.'}</td>
                                        <td>
                                            <FontAwesomeIcon style={{cursor: 'pointer', color: '#1560BD', marginRight: '10px'}} onClick={() => {navigate('/pinning_employee')}}  icon={faUserLock}/>
                                            <FontAwesomeIcon style={{cursor: 'pointer', color: '#1560BD', marginLeft: '10px'}} onClick={() => {navigate('/pinning_cabinet')}}  icon={faHouseLock}/>
                                        </td>
                                        <td>
                                            <button className="util" onClick={() => {setModal(true) ;ViewFurniture(furniture.furniture_id)}}><FontAwesomeIcon style={{color: 'fff', cursor: 'pointer', marginRight: '7px'}} icon={faTrash}/>Утилизация</button>
                                            <button className='repair' onClick={() => {setRepair(true); ViewFurniture(furniture.furniture_id)}}> <FontAwesomeIcon style={{color: 'fff', cursor: 'pointer', marginRight: 'px'}} icon={faScrewdriverWrench}/>Ремонт</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
        </>
    )
}