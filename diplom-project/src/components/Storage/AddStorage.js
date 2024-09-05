import Button from "../Button/Button";
import Header from "../Header/Header";
import TypeSelection from "../MainMenu/TypeSelection";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { categories } from "../../data";
import FurnitureSelection from "./FurnitureSelection";
import './AddStorage.css'
import VentilationSelection from "./VentilationSelection";
import LaptopSelection from "./LaptopSelection";
import ScreenSection from "./ScreenSection";
import ScannerSelection from "./ScannerSection";
import CameraSection from "./CameraSection";
import { useNavigate } from "react-router-dom";
import ComputerSection from "./Computer/ComputerSection";

export default function AddStorage() {
    const [type, setType] = useState('');
    const navigate = useNavigate();
    const [category, setCategory] = useState('');
    function handleCategoryChange(event) {
        setCategory(event.target.value);
    }

    return (
        <>
        <Header/>
        <Button id="image-button" onClick = {() => window.location.reload()}><FontAwesomeIcon icon={faArrowsRotate} /> Обновить</Button>
        <Button id="image-button" onClick = {() => navigate('/account')} >Назад к просмотру</Button>
        <div>
            <h2 style={{textAlign: 'center', color: ''}}>Выберите категорию, к которой относится материальная ценность:</h2> 
            <TypeSelection active={type} onChange={(type) =>{setType(type); setCategory('')}}/> 
        </div>
                {(type === 'technic') && <>
                    <select id="category" style={{marginLeft: '9rem'}} className="control" value={category}
                    onChange={handleCategoryChange}>{categories.map(item => {return (<option key={item.value}>{item.name}</option>)})}</select>    
                </>}
        <section id='sec'>
            <div className='sec'>
            {<>

                {(category === 'Ноутбук') && <><LaptopSelection/></>}
                {(category === 'Компьютер') && <><ComputerSection /></>}
                {(category === 'Монитор') && <><ScreenSection /></>}
                {(category === 'МФУ') && <><ScannerSelection /></>}
                {(category === 'Камера') && <><CameraSection /></>} 
                </>
                }
                {(type === 'furniture') && <div>
                    
                <FurnitureSelection/>
                </div>}
                {(type === 'ventilation') && <><VentilationSelection /></>}
            </div>
        </section>
        </>
    )
}      