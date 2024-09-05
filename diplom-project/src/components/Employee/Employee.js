import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Header from "../Header/Header";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import DataTable from "react-data-table-component";

export default function Employee() {
    const navigate = useNavigate('');
    const [pinning, setPinning] = useState([])
    const custom = {
        rows: {
            style: {
                fontSize: '15px',
                backgroundColor: 'rgba(0,0,0, 0.01)'
            }
        },
        headCells: {
            style: {
                fontSize: '15px',
                fontWeight: '700',
                backgroundColor: 'rgba(0, 0, 255, 0.1)'
            }
        }
    }
    
    const employeeForm = [
        {name: 'Номер записи',selector: row => row.id_pinning, sortable: true, grow: 0.3},
        {name: 'Категория', selector: row => row.category, sortable: true, grow: 0.46},
        {name: 'Тип', selector: row => row.type, sortable: true, grow: 0.4},
        {name: 'Наименование средства', selector: row => row.unit, sortable: true, grow: 1},
        {name: 'Сотрудник', selector: row => row.surname + ' ' + row.name + ' ' + row.patronymic, sortable: true, grow: 0.7},
        {name: 'Дата закрепления', selector: row => row.date.slice(0, 10) + ' ' + row.date.slice(11, 16), sortable: true, grow: 0.5},
    ]
    useEffect(() => {
        const FetchData = async () => {
            try{
                const result = await Axios('http://localhost:3001/select_pinning')
                setPinning(result.data)
            }
            catch(err) {
                console.log('Ошибка при обработке запроса')
            }
        }
        FetchData();
    }, [])
    return(
        <>
        <Header />
        <Button isActive style={{marginLeft: "1rem"}} onClick={() => navigate('/add_employee')}><FontAwesomeIcon icon={faUser} /> Назначить материальное лицо</Button>
        <Button isActive style={{marginLeft: "1rem"}} onClick={() => navigate('/select_employee')}><FontAwesomeIcon icon={faUser} /> Информация о материальных лицах</Button>
        <Button isActive style={{marginLeft: "1rem"}} onClick={() => navigate('/pinning_employee')}>Закрепление за лицом материальной единицы</Button>
        
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
            <div className='sec' style={{display: 'block',textAlign: 'center'}}>
                <h2>История закрепления материальных средств за сотрудниками:</h2>
                <DataTable columns={employeeForm} data={pinning} pagination fixedHeader highlightOnHover customStyles={custom}></DataTable>
            </div>
        </div>
        </>
    )
}