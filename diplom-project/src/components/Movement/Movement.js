import { useState } from "react";
import Button from "../Button/Button";
import Header from "../Header/Header";
import CabinetSection from "./CabinetSection";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import UnitMovement from "./UnitMovement";

export default function Movement() {
    const navigate = useNavigate('');
    const [active, setActive] = useState(false)
    return(
        <>
        <Header />
        <Button id='image-button' onClick={() => setActive(true)}>Кабинеты</Button>
        {(active) && <CabinetSection active={active} setActive={setActive} children='Описание имеющихся кабинетов на предприятии:'/>}
        <Button isActive onClick={() => navigate('/history_pinning')}>История перемещений</Button>
        <Button isActive onClick={() => navigate('/pinning_cabinet')}>Закрепить технику за кабинетом</Button>
        <Button isActive onClick={() => navigate('/repair')}><FontAwesomeIcon style={{marginRight: '5px'}} icon={faScrewdriverWrench}/>Вернуть с ремонта</Button>
        <section id="sec">
                <UnitMovement></UnitMovement>
        </section>
        </>
    )
}