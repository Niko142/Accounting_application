import { useEffect, useState } from "react";
import Header from "../Header/Header";
import './CabinetSection.css'
import Axios from "axios";
import RepairTable from "./RepairTable";

export default function Repair() {
    const [type, setType] = useState('Все');
    const [repair, setRepair] = useState([])
    const [computer, setComputer] = useState([])
    const [laptop, setLaptop] = useState([])
    const [screen, setScreen] = useState([])
    const [scanner, setScanner] = useState([])
    const [camera, setCamera] = useState([])
    const [furniture, setFurniture] = useState([])
    const [ventilation, setVentilation] = useState([])

    useEffect(() => {
        FetchData();
    },[])

    const FetchData = async () => {
        try {
            const result = await Axios('http://localhost:3001/select_repair');
            setRepair(result.data);
            const comp = await Axios('http://localhost:3001/select_repair_computer');
            setComputer(comp.data);
            const lap = await Axios('http://localhost:3001/select_repair_laptop');
            setLaptop(lap.data);
            const scr = await Axios('http://localhost:3001/select_repair_screen');
            setScreen(scr.data);
            const scan = await Axios('http://localhost:3001/select_repair_scanner');
            setScanner(scan.data)
            const cam = await Axios('http://localhost:3001/select_repair_camera');
            setCamera(cam.data)
            const fur = await Axios('http://localhost:3001/select_repair_furniture');
            setFurniture(fur.data);
            const ven = await Axios('http://localhost:3001/select_repair_ventilation');
            setVentilation(ven.data)
        }
        catch {
            console.log('Ошибка')
        }
    }

    return (
        <>
        <Header />
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: '70%', height: '500px', border: '2px solid #000', borderRadius: '10px', overflow: 'auto'}}>
                <nav className="nav-repair">
                    <ul className="ul-repair">
                        <li className={`li-repair ${(type) === 'Все' ? 'active' : ''}`} onClick={() => setType('Все')}>Все записи</li>
                        <li className={`li-repair ${(type) === 'Компьютер' ? 'active' : ''}`} onClick={() => setType('Компьютер')}>Компьютер</li>
                        <li className={`li-repair ${(type) === 'Ноутбук' ? 'active' : ''}`} onClick={() => setType('Ноутбук')}>Ноутбук</li>
                        <li className={`li-repair ${(type) === 'Монитор' ? 'active' : ''}`} onClick={() => setType('Монитор')}>Монитор</li>
                        <li className={`li-repair ${(type) === 'МФУ' ? 'active' : ''}`} onClick={() => setType('МФУ')}>МФУ</li>
                        <li className={`li-repair ${(type) === 'Камера' ? 'active' : ''}`} onClick={() => setType('Камера')}>Камера</li>
                        <li className={`li-repair ${(type) === 'Мебель' ? 'active' : ''}`} onClick={() => setType('Мебель')}>Мебель</li>
                        <li className={`li-repair ${(type) === 'Система' ? 'active' : ''}`} onClick={() => setType('Система')}>Система вентиляции</li>
                    </ul>
                </nav>
                <section style={{textAlign: 'center'}}>
                    <h2>Материальные средства в ремонте</h2>
                </section>
                {(type === 'Все') && 
                <table className="content-table" style={{display: 'inline-block', marginLeft: '1rem', maxWidth: '96%'}}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Категория</th>
                        <th>Тип</th>
                        <th>Модель</th>
                        <th>Дата отправки</th>
                        <th>Дата окончания</th>
                        <th>Причина отправки в ремонт</th>
                    </tr>
                    </thead>
                <tbody>
                {repair.map((repair, i) => {
                    const data = repair.date.split('T');
                    const end = repair.end_date.split('T');
                    return (
                        <tr key={i}>
                            <td>{repair.id_repair}</td>
                            <td>{repair.category}</td>
                            <td>{repair.type}</td>
                            <td>{repair.model}</td>
                            <td>{data[0] + ' ' + data[1]}</td>
                            <td>{end[0] + ' ' + end[1]}</td>
                            <td>{repair.description}</td>
                        </tr>
                    )
                })}
                </tbody>
                </table>
                }
                {(type === 'Компьютер') && <RepairTable repair={computer} type={'Компьютер'}/>}
                {(type === 'Ноутбук') && <RepairTable repair={laptop} type={'Ноутбук'}/>}
                {(type === 'Монитор') && <RepairTable repair={screen} type={'Монитор'}/>}
                {(type === 'МФУ') && <RepairTable repair={scanner} type={'МФУ'}/>}
                {(type === 'Камера') && <RepairTable repair={camera} type={'Камера'}/>}
                {(type === 'Мебель') && <RepairTable repair={furniture} type={'Мебель'}/>}
                {(type === 'Система') && <RepairTable repair={ventilation} type={'Система вентиляции'}/>}
            </div>
        </div>
        </>
    )
}