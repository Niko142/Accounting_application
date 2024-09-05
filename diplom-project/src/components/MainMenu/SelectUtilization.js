import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Header from "../Header/Header";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import  Axios  from "axios";
export default function SelectUlilization() {
    const navigate = useNavigate('')
    const [utilization, setUtilization] = useState([])
    const [search, setSearch] = useState([])
    
    const custom = {
        rows: {
            style: {
                fontSize: '13px',
                backgroundColor: 'rgba(0,0,0, 0.01)'
            }
        },
        headCells: {
            style: {
                fontSize: '13px',
                fontWeight: '700',
                backgroundColor: 'rgba(0, 0, 255, 0.1)'
            }
        }
    }

    useEffect(() => {
        const FetchData = async () => {
            try{
                const result = await Axios('http://localhost:3001/select_utilization')
                setUtilization(result.data)
                setSearch(result.data)
            }
            catch(err) {
                console.log('Ошибка')
            }
        }
        FetchData();
    },[])

    const Filter = (e) => {
        const res = search.filter(row => row.model.toLowerCase().includes(e.target.value.toLowerCase()));
        setUtilization(res)
    }

    const column = [
        {name: 'Номер записи', selector: row => row.id_utilization, sortable: true, grow: 0.55},
        {name: 'Дата утилизации', selector: row => row.date.slice(0, 10) + ' ' + row.date.slice(11, 16), sortable: true, grow: 0.7},
        {name: 'Категория', selector: row => row.category, sortable: true, grow: 0.7},
        {name: 'Тип', selector: row => row.type, sortable: true, grow: 0.7},
        {name: 'Инвентарный номер', selector: row => row.number, sortable: true, grow: 0.68},
        {name: 'Наименование средства', selector: row => row.model, sortable: true},
        {name: 'Причина утилизации', selector: row => row.reason, sortable: true},
    ]

    return(
        <>
        <Header></Header>
        <Button id='image-button' onClick={() => navigate('/main_menu')}>В главное меню</Button>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
            <div style={{width: '85%', height: '', border: '2px solid #ccc', padding: '20px'}}>
                <DataTable customStyles={custom} columns={column} data={utilization} pagination fixedHeader highlightOnHover
                subHeader subHeaderComponent = {<input type="text" style={{width: '40%'}} id="form-input" placeholder="Поиск" onChange={Filter}/>}
                ></DataTable>
            </div>
        </div>
        </>
    )
}