import './FormAuthorization.css'
import Button from '../Button/Button'
import {useState} from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Validation from './Validation';
export default function FormAuthorization() {

    const [user, setUser] = useState({username: '', password: ''})
    const [errors, setErrors] = useState({})
    const [loginStatus, setLoginStatus] = useState('')
    const navigate = useNavigate();

    const handleUserChange = (event) => {
        setUser(user => ({...user, [event.target.name] : event.target.value}));
        console.log(user)
    }

    const authorization = () => {
        Axios.post("http://localhost:3001/login", {
            username: user.username,
            password: user.password,
        }).then((response) =>{
            console.log(response);
            if(response.data.message === 'Успешная авторизация'){
                navigate('/main_menu')
            }
            else{
                setLoginStatus(response.data.message)
            }
        })
    }

    const FormSubmit = event => {
        event.preventDefault();
        setErrors(Validation(user));
    }

    return(
    <form className='main' action='' onSubmit={FormSubmit}>
        <div className='sub-main'>
            <label htmlFor="name" className='sign' onClick={() => {setUser({username: '', password: ''})}}>Форма авторизации</label>
            <input type="text" className="control" name='username' placeholder = 'Login' style={{borderColor: (errors.username) ? 'red' : null}} value={user.username} onChange={handleUserChange}/>
            {(errors.username) && <span className='error'>{errors.username}</span>}
            <input type="password" className="control" name='password' placeholder = 'Password' style={{borderColor: (errors.password) ? 'red' : null}} value={user.password} onChange={handleUserChange}/>
            {errors.password && <span className='error'>{errors.password}</span>}
            
            <section className='autho'>
            <Button isActive onClick={authorization}>Авторизироваться {'=>'} </Button>
            </section>
            <span style={{color: 'red'}}>{loginStatus}</span>
        </div>
    </form>
    )
}