import { useState } from "react";
import Button from "../Button/Button";
import Success from "./Success";
import Fail from "./Fail";
import Axios from "axios";
import Validation from "../FormAuthorization/Validation";

export default function ScreenSection() {
    const [screen, setScreen] = useState({model: '', diagonal: '', rate: '', type: '', price: ''});
    const [errors, setErrors] = useState({})
    const [addStatus, setAddStatus] = useState(null);

    const handleScreenChange = (event) => {
        setScreen(screen => ({...screen, [event.target.name] : event.target.value}));
        console.log(screen)
    }

    const FormSubmit = event =>{
        event.preventDefault()
        setErrors(Validation(screen))
        if(errors.model === '' && errors.diagonal === '' && errors.rate === '' && errors.price) {
                Axios.post("http://localhost:3001/screen", {
                    model: screen.model,
                    diagonal: screen.diagonal,
                    rate: screen.rate,
                    type: screen.type,
                    price: screen.price,
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
        else {
            setAddStatus(false)
        }
    }

    return (
        <form style={{width: '420px'}} onSubmit={FormSubmit}>
            <label htmlFor="model" className='add'>Модель:</label>
            <input type="text" name="model" id="form-input" value={screen.model} style={{borderColor: errors.model ? 'red' : null}} 
            onChange={handleScreenChange}/>
            
            {(errors.model) && <span className='err'>{errors.model}</span>}
            
            <label htmlFor="diagonal" className='add'>Диагональ (в дюймах):</label>
            <input type="text" name="diagonal" id="form-input" value={screen.diagonal} style={{borderColor: errors.diagonal ? 'red' : null}} 
            onChange={handleScreenChange}/>
            
            {(errors.diagonal) && <span className='err'>{errors.diagonal}</span>}
            
            <label htmlFor="rate" className='add'>Частота (в формате "число" ГЦ):</label>
            <input type="text" name="rate" id="form-input" value={screen.rate} style={{borderColor: errors.rate ? 'red' : null}} 
            onChange={handleScreenChange}/>

            {(errors.rate) && <span className='err'>{errors.rate}</span>}

            <label htmlFor="type" className='add'>Тип матрицы:</label>
            <select id="form-input" name="type" value={screen.type} onChange={handleScreenChange}>
                <option>...</option>
                <option>TN</option>
                <option>VA</option>
                <option>IPS</option>
            </select>
            <label htmlFor="price" className='add'>Цена:</label>
            <input type="text" name="price" id="form-input" value={screen.price} style={{borderColor: errors.price ? 'red' : null}} 
            onChange={handleScreenChange}/>

            {(errors.price) && <span className='err'>{errors.price}</span>}

            <Button isActive style={{marginLeft: '9rem'}} type='submit'>Добавить</Button>
            {(addStatus === true) && <Success>Успешное добавление монитора</Success>}
            {(addStatus === false) && <Fail>Возникла ошибка при добавлении монитора</Fail>}
        </form>
    )
}