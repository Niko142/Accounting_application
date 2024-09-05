import Axios from "axios"
import { useEffect, useState } from "react"
import SELECT from 'react-select'
import { reason } from "../../data"
import Button from "../Button/Button";
import {toast, ToastContainer} from 'react-toastify';

export default function PinningScreen() {
    const [value, setValue] = useState(['']);
    const [location, setLocation] = useState([''])
    const [date, setDate] = useState('');
    const [screen, setScreen] = useState('')
    const [key, setKey] = useState('');
    const [id, setId] = useState('') 
    const [cabinet, setCabinet] = useState('')
    const [reasons, setReason] = useState('');
    const [valid, setValid] = useState(false)

    useEffect(() =>{
        if(date === '' || screen === '' || cabinet === '' || reasons === '') {
            setValid(false)
        }
        else setValid(true)
    }, [date, screen, cabinet, reasons])

    useEffect(() => {
        const FetchCabinet = async () => {
            let arr = [];
            await Axios.get('http://localhost:3001/cabinet').then((res) => {
                let result = res.data;
                result.map((cabinet) => {
                    return arr.push({value: cabinet.number, label: 'Кабинет: ' + cabinet.number})
                })
                setLocation(arr)
            })
        }
        FetchCabinet();
    }, [])

    useEffect(() => {
        const FetchData = async () => {
            let arr = [];
            await Axios.get('http://localhost:3001/screen_movement').then((res) => {
                let result = res.data;
                result.map((screen) => {
                    return arr.push({value: screen.model, label: screen.model, key: screen.location, keys: screen.screen_id})
                })
                setValue(arr)
            })
        }
        FetchData();
    }, [])

    const Label = ({children}) => {
        return(
            <>
            <label className="add">{children}</label>
            </>
        )
    }

    const pinningScreen = () => {
        Axios.post("http://localhost:3001/pinning-cabinet", {
            date: date,
            category: 'Оргтехника',
            type: 'Монитор',
            reason: reasons,
            unit: screen,
            start: key,
            end: cabinet,
        }).then((response) =>{
            console.log(response);
            if(response.data.message === 'Успешное добавление'){
                console.log(response)
                toast.success('Запись успешно создана')
            }
            else{
               toast.error('Возникла ошибка при создании записи')
            }
        })
        Axios.post("http://localhost:3001/location_screen", {
            location: cabinet,
            id: id,
            model: screen,
        }).then((response) => {
            if(response.data.message === 'Успешное добавление'){
                console.log(response)
                toast.success('Успешное закрепление монитора за кабинетом')
                if(cabinet === 'Склад') {
                    Axios.post('http://localhost:3001/status_screen', {
                        status: 'Находится в резерве',
                        id: id,
                    })
                }
            }
            else{
               toast.error('Возникла ошибка при закреплении')
            }
        })
    }

    const FormSubmit = event => {
        event.preventDefault()
    }

    return(
        <>
        <form onSubmit={FormSubmit}>
            <div style={{height: '190px'}}>
                <div style={{ width: '45%', float: 'left', height: '190px', padding: '5px'}}>
                    <Label>Дата перемещения:</Label>
                    <input type='datetime-local' id="form-input" onChange={(e) => setDate(e.target.value)}/>
                    <Label>Выберите монитор для перемещения:</Label>
                    <SELECT options={value} placeholder='Монитор...' onChange={(e) => {setScreen(e.value); setKey(e.key); setId(+e.keys)}}></SELECT>
                </div>
                <div style={{width: '45%', float: 'right', height: '190px', padding: '5px'}}>
                    <Label>Откуда</Label>
                    <input type="text" id="form-input" value={key} disabled/>
                    <Label>Куда</Label>
                    <SELECT options={location} placeholder='' onChange={(e) => setCabinet(e.value)}></SELECT>
                </div>
            </div>
                <section style={{width: '45%', marginLeft: '28%'}}>
                <Label>Причина перемещения</Label>
                <SELECT options={reason} placeholder='Причина...' onChange={(e) => setReason(e.value)}></SELECT>
                </section>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '3rem'}}>
                <Button disabled={!valid} isActive={valid} onClick={pinningScreen}>Оформить</Button>
                <ToastContainer />
                </div>
        </form>
        </>
    )
}