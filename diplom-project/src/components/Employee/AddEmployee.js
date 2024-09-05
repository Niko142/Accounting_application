import './AddEmployee.css';
import 'react-phone-number-input/style.css';
import { useState } from "react";
import Header from "../Header/Header";
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import Success from '../Storage/Success';
import Axios from "axios";
import PhoneInput from 'react-phone-number-input'
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import Validation from '../FormAuthorization/Validation';

export default function AddEmployee() {
    const navigate = useNavigate('');
    const [employee, setEmployee] = useState({name: '', surname: '', patronymic: '', email: ''})
    const [errors, setErrors] = useState({})
    const [phoneReg, setPhone] = useState(null);
    const [addStatus, setAddStatus] = useState('');

      const handleEmployeeChange = (event) => {
        setEmployee(employee => ({...employee, [event.target.name] : event.target.value}));
        console.log(employee)
    }

    const addEmployee = () => {
        Axios.post("http://localhost:3001/add-employee", {
            name: employee.name,
            surname: employee.surname,
            patronymic: employee.patronymic,
            email: employee.email,
            phone: phoneReg,
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

    const FormSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(employee))
    }

    return(
    <>
        <Header />
        <form className='section_employee' onSubmit={FormSubmit}>
            <div className='add_employee'>
                <label htmlFor="name" className='add'>Имя</label>
                <input type="text" id='form-input' name='name' style={{borderColor: (errors.name) ? 'red' : null}} value={employee.name} 
                onChange={handleEmployeeChange}/>
            {(errors.name) && <span className='err'>{errors.name}</span>}
                <label htmlFor="surname" className='add'>Фамилия</label>
                <input type="text" id='form-input' name='surname' style={{borderColor: (errors.surname) ? 'red' : null}} value={employee.surname}
                onChange={handleEmployeeChange}/>
            {(errors.surname) && <span className='err'>{errors.surname}</span>}
                <label htmlFor="patronymic" className='add'>Отчество</label>
                <input type="text" id='form-input' name='patronymic' style={{borderColor: (errors.patronymic) ? 'red' : null}} value={employee.patronymic}
                onChange={handleEmployeeChange} />
            {(errors.patronymic) && <span className='err'>{errors.patronymic}</span>}
                <label htmlFor="email" className='add'>Email</label>
                <input type='email' name='email' id='form-input' style={{borderColor: (errors.email) ? 'red' : null}} value={employee.email} 
                onChange={handleEmployeeChange}/>
                {errors.email && <span className='err'>{errors.email}</span>}
                <label htmlFor="phone" className='add'>Номер телефона</label>
                <PhoneInput defaultCountry='RU' placeholder="Введите номер телефона" value={phoneReg} onChange={setPhone}/>
                { phoneReg && isPossiblePhoneNumber(phoneReg) ? 
                  <div style={{color:'green'}}>Номер телефона введен корректно</div> : <div style={{color: 'red'}}>Неправильный формат номера</div>
                }
            <section style={{marginLeft: '56px', marginTop: '1rem'}}>
                <Button isActive onClick={addEmployee}>Добавить</Button>
                <Button isActive onClick={() => navigate('/employee')}>Обратно</Button>
            </section>
            {(addStatus === true) && <Success>Материальное лицо добавлено</Success>}
            </div>
        </form>
    </>
    )
}