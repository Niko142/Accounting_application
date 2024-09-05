import { useEffect, useState } from "react";
import Button from "../../Button/Button";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function SelectVideocard() {
    const navigate = useNavigate('');
    const [videocard, setVideocard] = useState([])
    useEffect(() =>{
        FetchData();
    }, [])

    const DeleteVideocard = (id) => {
        Axios.delete(`http://localhost:3001/delete-videocard/${id}`)
    }

    const FetchData = async () => {
        try{
            const result = await Axios("http://localhost:3001/videocard");
            setVideocard(result.data)
        }
        catch (err){
            console.log('Ошибка при обработке запроса')
        }
    }

    return(
        <>
        <section id='sec'>
            <div className="sec" style={{display: 'block',textAlign: 'center'}}>
                <h2>Информация о видеокартах</h2>
                <table className="content-table" style={{display: 'inline-block'}}>
                    <thead>
                    <tr>
                        <th>Идентификатор</th>
                        <th>Модель</th>
                        <th>Стоимость</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            videocard.map((videocard, i) =>{
                                return(
                                    <tr key={i}>
                                        <td>{videocard.id_videocard}</td>
                                        <td>{videocard.model}</td>
                                        <td>{videocard.price + ' руб.'}</td>
                                        <td><FontAwesomeIcon onClick={()=>{DeleteVideocard(videocard.id_videocard); window.location.reload()}} style={{color: 'red', cursor: 'pointer'}} icon={faTrash}/></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div> 
                    <Button isActive onClick = {() => navigate('/add_components')}>Добавить видеокарту</Button>
                </div>
            </div>
        </section>
        </>
    )
}