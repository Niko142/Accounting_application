import { useState } from "react";
import Header from "../../Header/Header";
import ComponentsSelection from "./ComponentsSelection";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import Button from "../../Button/Button";
import { useNavigate } from "react-router-dom";
import SelectVideocard from "./SelectVideocard";
import SelectProcessor from "./SelectProcessor";
import SelectMothercard from "./SelectMothercard";
import SelectMemory from "./SelectMemory";
import SelectDisk from "./SelectDisk";

export default function Component() {
    const navigate = useNavigate('');
    const [type, setType] = useState('');
    return(
        <>
        <Header />
        <Button id="image-button" onClick = {() => window.location.reload()}><FontAwesomeIcon icon={faArrowsRotate} /> Обновить</Button>
        <Button isActive onClick ={() => navigate('/account')}>Обратно</Button>
        <ComponentsSelection active={type} onChange={(type) => setType(type)}/>
        <section id='sec'>
            <div className='sec'>
                {(type === 'videocard') && <> <SelectVideocard /></>}
                {(type === 'processor') && <> <SelectProcessor /></>}
                {(type === 'mothercard') && <> <SelectMothercard /></>}
                {(type === 'memory') && <> <SelectMemory /></>}
                {(type === 'disk') && <> <SelectDisk /></>}
            </div>
        </section>
        </>
    )
}