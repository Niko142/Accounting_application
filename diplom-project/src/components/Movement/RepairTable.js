import Axios  from "axios"
import Button from "../Button/Button"

export default function RepairTable({repair, type}) {
    
    const ReturnObject = (id, del) => {
        if (type === 'Мебель') {
            Axios.patch(`http://localhost:3001/furniture_from_repair/${id}`).then((res) => {
                if(res.data.message === 'Успех') {
                    Axios.delete(`http://localhost:3001/delete-repair/${del}`)
                }
            })
        }
        else if (type === 'Система вентиляции') {
            Axios.patch(`http://localhost:3001/ventilation_from_repair/${id}`).then((res) => {
                if(res.data.message === 'Успех') {
                    Axios.delete(`http://localhost:3001/delete-repair/${del}`)
                }
            })
        }
        else if (type === 'Компьютер') {
            Axios.patch(`http://localhost:3001/computer_from_repair/${id}`).then((res) => {
                if(res.data.message === 'Успех') {
                    Axios.delete(`http://localhost:3001/delete-repair/${del}`)
                }
            })
        }
        else if (type === 'Ноутбук') {
            Axios.patch(`http://localhost:3001/laptop_from_repair/${id}`).then((res) => {
                if(res.data.message === 'Успех') {
                    Axios.delete(`http://localhost:3001/delete-repair/${del}`)
                }
            })
        }
        else if (type === 'Монитор') {
            Axios.patch(`http://localhost:3001/screen_from_repair/${id}`).then((res) => {
                if(res.data.message === 'Успех') {
                    Axios.delete(`http://localhost:3001/delete-repair/${del}`)
                }
            })
        }
        else if (type === 'МФУ') {
            Axios.patch(`http://localhost:3001/scanner_from_repair/${id}`).then((res) => {
                if(res.data.message === 'Успех') {
                    Axios.delete(`http://localhost:3001/delete-repair/${del}`)
                }
            })
        }
        else {
            Axios.patch(`http://localhost:3001/camera_from_repair/${id}`).then((res) => {
                if(res.data.message === 'Успех') {
                    Axios.delete(`http://localhost:3001/delete-repair/${del}`)
                }
            })
        }
    }

    return (
        <>
        <table className="content-table" style={{display: 'inline-block', marginLeft: '1rem', maxWidth: '96%'}}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Модель</th>
                    <th>Дата отправки</th>
                    <th>Дата окончания</th>
                    <th>Причина отправки в ремонт</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {repair.map((repair, i) => {
                    const data = repair.date.split('T');
                    const end = repair.end_date.split('T');
                    const a = new Date(Date.parse(repair.end_date));
                    const b = new Date();
                    return (
                        <tr key={repair.i}>
                            <td>{repair.id_repair}</td>
                            <td>{repair.model}</td>
                            <td>{data[0] + ' ' + data[1]}</td>
                            <td>{end[0] + ' ' + end[1]}</td>
                            <td>{repair.description}</td>
                            <td><Button isActive={a <= b} disabled={a > b} onClick={() => {ReturnObject(repair.number, repair.id_repair); window.location.reload()}}>Вернуть из ремонта</Button></td>
                        </tr>
                    )
                })}
                {repair == '' && <td>Записей нет</td>}
            </tbody>
        </table>
        </>
    )
}