import './App.scss';
import FormAuthorization from './components/FormAuthorization/FormAuthorization'
import MainMenu from './components/MainMenu/MainMenu';
import Storage from './components/Storage/Storage';
import Employee from './components/Employee/Employee';
import Movement from './components/Movement/Movement';
import DocumentReport from './components/DocumentReport/DocumentReport';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddEmployee from './components/Employee/AddEmployee';
import AddStorage from './components/Storage/AddStorage';
import SelectEmployee from './components/Employee/SelectEmployee';
import Component from './components/Storage/Computer/Component';
import AddComponents from './components/Storage/Computer/AddComponents';
import PinningEmployee from './components/Employee/PinningEmployee';
import PinningCabinet from './components/Movement/PinningCabinet';
import PinningForm from './components/Movement/PinningForm';
import SelectUlilization from './components/MainMenu/SelectUtilization';
import Repair from './components/Movement/Repair';
import SelectChange from './components/Storage/SelectChange';
import OfficeMenu from './components/Chancellery/OfficeMenu';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FormAuthorization/>} />
        <Route path='/main_menu' element={<MainMenu/>}/>
        <Route path='/account' element={<Storage />} />
        <Route path='/employee' element={<Employee />} />
        <Route path='/movement' element={<Movement />} />
        <Route path='/report' element={<DocumentReport />} />
        <Route path='office' element={<OfficeMenu />}/>
        <Route path='/add_employee' element={<AddEmployee />} />
        <Route path='/add_storage' element={<AddStorage />} />
        <Route path='/select_employee' element={<SelectEmployee />} />
        <Route path='/components' element={<Component />} />
        <Route path='/add_components' element={<AddComponents />} />
        <Route path='/pinning_employee' element={<PinningEmployee />} />
        <Route path='/pinning_cabinet' element={<PinningCabinet />} />
        <Route path='history_pinning' element={<PinningForm />} />
        <Route path='/utilization' element={<SelectUlilization />}/>
        <Route path='/repair' element={<Repair />}/>
        <Route path='change' element={<SelectChange />}/>
      </Routes> 
    </BrowserRouter>
  )
}

export default App;
