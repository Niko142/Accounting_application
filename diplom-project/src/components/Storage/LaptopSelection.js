import { useState } from "react";
import Button from "../Button/Button";
import Axios from "axios";
import Success from "./Success";
import Validation from "../FormAuthorization/Validation";

export default function LaptopSelection() {
    const [laptop, setLaptop] = useState({model: '', system: '', videocard: '', processor: '', memory: '', volume: '', price: ''})
    const [errors, setErrors] = useState({})
    const [addStatus, setAddStatus] = useState('');

    const handleLaptopChange = (event) => {
        setLaptop(laptop => ({...laptop, [event.target.name] : event.target.value}));
        console.log(laptop)
    }

    const FormSubmit = event =>{
        event.preventDefault()
        setErrors(Validation(laptop))
        if(errors.model === '' && errors.memory === '' && errors.volume === '' && errors.price === '') {
                Axios.post("http://localhost:3001/add-laptop", {
                    model: laptop.model,
                    systems: laptop.system,
                    videocard: laptop.videocard,
                    processor: laptop.processor,
                    memory: laptop.memory,
                    volume: laptop.volume,
                    price: laptop.price,
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
        <form style={{width: '420px'}} onSubmit={FormSubmit}>
            <label htmlFor="model" className='add'>Модель:</label>
            <input type="text" id="form-input" name="model" value={laptop.model} style={{borderColor: errors.model ? 'red' : null}} 
            onChange={handleLaptopChange}/>
            
            {(errors.model) && <span className='err'>{errors.model}</span>}
            
            <label htmlFor="systems" className='add'>Операционная система:</label>
            <select id="form-input" name="system" value={laptop.system} onChange={handleLaptopChange}>
                <option>...</option>
                <option>Linux</option>
                <option>Windows XP</option>
                <option>Windows 7</option>
                <option>Windows 8</option>
                <option>Windows 10</option>
                <option>Windows 11</option>
            </select>
            <label htmlFor="videocard" className='add'>Видеокарта:</label>
            <input type="text" id="form-input" name="videocard" value={laptop.videocard} style={{borderColor: errors.videocard ? 'red' : null}} 
            onChange={handleLaptopChange}/>
            
            {(errors.videocard) && <span className='err'>{errors.videocard}</span>}
            
            <label htmlFor="processor" className='add'>Процессор:</label>
            <input type="text" id="form-input" name="processor" value={laptop.processor} style={{borderColor: errors.processor ? 'red' : null}} 
            onChange={handleLaptopChange}/>
            
            {(errors.processor) && <span className='err'>{errors.processor}</span>}
            
            <label htmlFor="memory" className='add'>ОЗУ (в формате 'значение' ГБ):</label>
            <input type="text" id="form-input" name="memory" value={laptop.memory} style={{borderColor: errors.memory ? 'red' : null}} 
            onChange={handleLaptopChange}/>
            
            {(errors.memory) && <span className='err'>{errors.memory}</span>}
            
            <label htmlFor="volume" className='add'>Объем жесткого диска (в формате 'значение' ГБ):</label>
            <input type="text" id="form-input" name="volume" value={laptop.volume} style={{borderColor: errors.volume ? 'red' : null}} 
            onChange={handleLaptopChange}/>
            
            {(errors.volume) && <span className='err'>{errors.volume}</span>}
            
            <label htmlFor="price" className='add'>Цена:</label>
            <input type="text" id="form-input" name="price" value={laptop.price} style={{borderColor: errors.price ? 'red' : null}} 
            onChange={handleLaptopChange}/>
            {(errors.price) && <span className='err'>{errors.price}</span>}
            
            <Button isActive style={{marginLeft: '9rem'}} type='submit'>Добавить</Button>
            {(addStatus === true) && <Success>Успешное добавление ноутбука</Success>}
        </form>
    )
}