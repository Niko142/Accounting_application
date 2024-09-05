import Header from "../Header/Header";
import Button from "../Button/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { product_groups } from "../../data";
import  {ToastContainer, toast} from 'react-toastify'
import Axios from "axios";
export default function OfficeMenu() {
    const [result, setResult] = useState([])
    const [modal, setModal] = useState();
    const [change, setChange] = useState()
    const [now, setNow] = useState({name: '', id: '', amounts: ''})
    
    useEffect(() => {
        const FetchData = async () => {
            const res = await Axios.get('http://localhost:3001/chancellery');
            setResult(res.data);
        }
        FetchData()
    },[])

    const ViewChancellery = (id) => {
        Axios.get(`http://localhost:3001/select_chancellery/${id}`).then((res) => {
            let result = res.data;
            setNow({name: result[0].name, id: result[0].id_chancellery, amounts: result[0].amounts})
            console.log(result)
        })
    }

    const DeleteChancellery = (id) => {
        Axios.delete(`http://localhost:3001/delete-chancellery/${id}`).then((res) => {
            window.location.reload();
        })
    }

    const AddGroup = ({active, setActive}) => {
        const [office, setOffice] = useState({type: '...', name: '', unit: '', price: '', amounts: ''});
        const [valid, setValid] = useState(false)
        useEffect(() => {
            if (office.name === '' || office.type === '' || office.price === '' || office.amounts === '' || office.unit === '') {
                setValid(false)
            }
            else setValid(true)
        }, [office])

        const HandleChange = (event) => {
            setOffice(office => ({...office, [event.target.name]: event.target.value}))
            console.log(office)
        }

        const AddChancellery = () => {
            Axios.post('http://localhost:3001/add-chancellery', {
                type: office.type,
                name: office.name,
                unit: office.unit,
                price: +office.price,
                amounts: +office.amounts,
            }).then((response) => {
                if(response.data.message === 'Успешное добавление') {
                    window.location.reload('')
                }
                else{
                    toast.error('Ошибка при добавлении товарной группы')
                }
            })
        }
        
        if(!active) return null
        return (
            <div className="util-modal">
                <div className="office-content">
                    <div style={{borderBottom: '1px solid #ccc', textAlign: 'center'}}>
                        <h4>Форма для добавления новой товарной группы</h4>
                    </div>
                    <div style={{width: '', padding: '22px'}}>
                    <label className="add">Товарная группа:</label>
                    <select id="form-input" name="type" value={office.type} onChange={HandleChange}>
                    <option value={'...'}>...</option>
                    {product_groups.map((item, i) => {return (<option key={i} value={item.value}>{item.name}</option>)})}
                    </select>
                    <label className="add">Наименование (описание) принадлежности:</label>
                    <textarea id="form-input" name="name" value={office.name} onChange={HandleChange}></textarea>   
                    <label className="add">Единица измерения:</label>
                    <select id="form-input" name="unit" value={office.unit} onChange={HandleChange}>
                        <option>...</option>
                        <option>шт.</option>
                        <option>пач.</option>
                        <option>уп.</option>
                    </select>
                    <label className="add">Цена за 1 ед.</label>
                    <input type="number" id="form-input" name="price" value={office.price} onChange={HandleChange}/>
                    <label className="add">Количество:</label>
                    <input type="number" id="form-input" name="amounts" value={office.amounts} onChange={HandleChange}/>
                        <Button isActive onClick={() => setActive(false)}>Назад</Button>
                        <Button isActive={valid} disabled={!valid} style={{float: 'right'}} onClick={AddChancellery}>Добавить</Button>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        )
    }

    const ChangeAmounts = ({active, setActive}) => {
        const [amount, setAmount] = useState(now.amounts);

        const EditAmounts = () => {
            Axios.post('http://localhost:3001/update-chancellery', {
                amounts: amount,
                id: now.id
            }).then((response) => {
                if(response.data.message === 'Успех') {
                    window.location.reload('')
                }
                else{
                    toast.error('Ошибка при изменении количества товаров')
                }
            })
        }

        if(!active) return null;

        return (
            <div className="util-modal">
                <div className="amount-content">
                    <div style={{borderBottom: '1px solid #ccc', textAlign: 'center'}}>
                        <h4>Корректировка количества канцелярных принадлежностей</h4>
                    </div>
                    <div style={{width: '', padding: '15px'}}>
                    <textarea disabled value={now.name} id="form-input"></textarea>
                    <input type="number" value={amount} id="form-input" onChange={(e) => setAmount(e.target.value)}/>
                    <Button isActive onClick={() => setActive(false)}>Назад</Button>
                    <Button isActive style={{float: 'right'}} onClick={EditAmounts}>Изменить</Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
        <Header></Header>
        <AddGroup active={modal} setActive={setModal}/>
        <ChangeAmounts active={change} setActive={setChange}/>

        <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{border: '1px solid #ccc', width: '90%', height: '600px', borderRadius: '10px', overflow: 'auto'}}>
                <section style={{border: '1px solid #000', height: '50px', alignItems: 'center', display: 'flex', justifyContent: 'space-between', borderRadius: '10px'}}>
                    <Button isActive style={{marginLeft: '1rem', backgroundColor: 'green'}} onClick={() => setModal(true)}>Добавить новую товарную группу</Button>
                    <Button style={{backgroundColor: 'white', padding: '15px', fontSize: '17px'}} onClick={() => window.location.reload()}><FontAwesomeIcon icon={faArrowsRotate}/></Button>
                </section>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <table className="content-table" style={{display: 'inline-block', textAlign: 'center'}}>
                    <thead>
                        <tr>
                            <th>ID товара</th>
                            <th>Товарная группа</th>
                            <th>Наименование</th>
                            <th>Ед. измерения</th>
                            <th>Цена (ед.)</th>
                            <th>Количество</th>
                            <th>Общая сумма</th>
                            <th>Действие:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            result.map((res, i) =>{
                                return(
                                    <tr key={i}>
                                        <td>{res.id_chancellery}</td>
                                        <td>{res.type}</td>
                                        <td>{res.name}</td>
                                        <td>{res.unit}</td>
                                        <td>{res.price + ' руб.'}</td>
                                        <td>{res.amounts}</td>
                                        <td>{res.itog_price + ' руб.'}</td>
                                        <td><button className="amounts" onClick={() => {setChange(true); ViewChancellery(res.id_chancellery)}}>Изменить кол-во</button>
                                            <button className="util" onClick={() => {DeleteChancellery(res.id_chancellery)}}>Удалить</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                </div>
            </div>
        </div>
        </>
    )
}