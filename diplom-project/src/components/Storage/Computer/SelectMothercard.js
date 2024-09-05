import { useEffect, useState } from "react";
import Button from "../../Button/Button";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function SelectMothercard() {
    const navigate = useNavigate('');
    const [mothercard, setMothercard] = useState([])
    useEffect(() =>{
        FetchData();
    }, [])

    const DeleteCard = (id) => {
        Axios.delete(`http://localhost:3001/delete-mothercard/${id}`)
    }

    const FetchData = async () => {
        try{
            const result = await Axios("http://localhost:3001/mothercard");
            setMothercard(result.data)
        }
        catch (err){
            console.log('Ошибка при обработке запроса')
        }
    }

    return(
        <>
        <section id='sec'>
            <div className="sec" style={{display: 'block',textAlign: 'center'}}>
                <h2>Информация о материнских платах</h2>
                <table className="content-table" style={{display: 'inline-block'}}>
                    <thead>
                    <tr>
                        <th>Идентификатор</th>
                        <th>Модель</th>
                        <th>Тип памяти</th>
                        <th>Частота</th>
                        <th>Стоимость</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            mothercard.map((mothercard, i) =>{
                                return(
                                    <tr key={i}>
                                        <td>{mothercard.id_mothercard}</td>
                                        <td>{mothercard.model}</td>
                                        <td>{mothercard.type}</td>
                                        <td>{mothercard.rate}</td>
                                        <td>{mothercard.price + ' руб.'}</td>
                                        <td><FontAwesomeIcon onClick={()=>{DeleteCard(mothercard.id_mothercard); window.location.reload()}} style={{color: 'red', cursor: 'pointer'}} icon={faTrash}/></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div> 
                    <Button isActive   onClick = {() => navigate('/add_components')}>Добавить плату</Button>
                </div>
            </div>
        </section>
        </>
    )
}