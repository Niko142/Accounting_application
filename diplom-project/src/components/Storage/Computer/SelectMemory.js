import { useEffect, useState } from "react";
import Button from "../../Button/Button";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function SelectMemory() {
    const navigate = useNavigate('')
    const [memory, setMemory] = useState([])
    useEffect(() =>{
        FetchData();
    }, [])

    const DeleteMemory = (id) => {
        Axios.delete(`http://localhost:3001/delete-memory/${id}`)
    }

    const FetchData = async () => {
        try{
            const result = await Axios("http://localhost:3001/memory");
            setMemory(result.data)
        }
        catch (err){
            console.log('Ошибка при обработке запроса')
        }
    }

    return(
        <>
        <section id='sec'>
            <div className="sec" style={{display: 'block',textAlign: 'center'}}>
                <h2>Информация об оперативной памяти</h2>
                <table className="content-table" style={{display: 'inline-block'}}>
                    <thead>
                    <tr>
                        <th>Идентификатор</th>
                        <th>Модель</th>
                        <th>Тип памяти</th>
                        <th>Суммарный объем</th>
                        <th>Стоимость</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            memory.map((memory, i) =>{
                                return(
                                    <tr key={i}>
                                        <td>{memory.id_memory}</td>
                                        <td>{memory.model}</td>
                                        <td>{memory.type}</td>
                                        <td>{memory.volume}</td>
                                        <td>{memory.price + ' руб.'}</td>
                                        <td><FontAwesomeIcon onClick={()=>{DeleteMemory(memory.id_memory); window.location.reload()}} style={{color: 'red', cursor: 'pointer'}} icon={faTrash}/></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div> 
                    <Button isActive  onClick = {() => navigate('/add_components')}>Добавить оперативную память</Button>
                </div>
            </div>
        </section>
        </>
    )
}