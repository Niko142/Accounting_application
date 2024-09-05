import { useState } from "react";
import Button from "../Button/Button";
import './Furniture.css';
import Axios from "axios";
import Success from "./Success";
import Validation from "../FormAuthorization/Validation";

export default function VentilationSelection() {
    const [ventilation, setVentilation] = useState({model: '', filter: '', warm: '', price: ''})
    const [errors, setErrors] = useState({})
    const [addStatus, setAddStatus] = useState('');

    const handleVentilationChange = (event) => {
        setVentilation(ventilation => ({...ventilation, [event.target.name] : event.target.value}));
        console.log(ventilation)
    }


    const FormSubmit = event => {
        event.preventDefault()
        setErrors(Validation(ventilation));
        if (errors.model === '' && errors.price === '') {
                Axios.post("http://localhost:3001/ventilation", {
                    model: ventilation.model,
                    filter: ventilation.filter,
                    warm: ventilation.warm,
                    price: ventilation.price,
                    location: 'Склад',
                    status: 'Находится в резерве',
                }).then((response) =>{
                    console.log(response);
                    if(response.data.message === 'Успешное добавление'){
                        console.log(response)
                        setAddStatus(true)
                    }
                    else{
                        setAddStatus(false)
                    }
                })
        }
    }

    return (
        <form style={{width: '420px'}} action="" onSubmit={FormSubmit}>
            <label htmlFor="model" className='add'>Модель:</label>
            <input type="text" id="form-input" name="model" value={ventilation.model} style={{borderColor: errors.model ? 'red' : null}} 
            onChange={handleVentilationChange}/>
            {(errors.model) && <span className='err'>{errors.model}</span>}
            <label htmlFor="type" className='add'>Тип фильтра:</label>
            <select id="form-input" name="filter" value={ventilation.filter} onChange={handleVentilationChange}>
                <option>...</option>
                <option>Базовый</option>
                <option>Угольный</option>
                <option>Полимерный</option>
                <option>С ионами серебра</option>
                <option>Фотокаталитический</option>
                <option>Плазменный</option>
            </select>
            <label htmlFor="name" className='add'>Возможность обогрева:</label>
            <select id="form-input" name="warm" value={ventilation.warm} onChange={handleVentilationChange}>
                <option>...</option>
                <option>Да</option>
                <option>Нет</option>
            </select>
            <label htmlFor="price" className='add'>Цена:</label>
            <input type="text" id="form-input" name="price" value={ventilation.price} style={{borderColor: errors.price ? 'red' : null}} onChange={handleVentilationChange}/>
            {(errors.price) && <span className='err'>{errors.price}</span>}
            <Button type='submit' isActive style={{marginLeft: '9rem'}}>Добавить</Button>
            {(addStatus === true) && <Success>Успешное добавление записи</Success>}
        </form>
    )
}