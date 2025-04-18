import { React } from 'react';
import 'App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Основные страницы
import FormAuthorization from 'components/FormAuthorization/FormAuthorization';
import MainMenu from 'components/MainMenu/MainMenu';
import Storage from 'components/Storage/Storage';
import Employee from 'components/Employee/Employee';
import MovementMenu from 'components/Movement/MovementMenu';
import DocumentReport from 'components/DocumentReport/DocumentReport';
import AddStorage from 'components/Storage/AddStorage';
import SelectEmployee from 'components/Employee/routes/SelectEmployee';
import Component from 'components/Storage/Computer/Component';
import AddComponents from 'components/Storage/Computer/AddComponents';
import PinningEmployee from 'components/Employee/routes/PinningEmployee';
import PinningForAudience from 'components/Movement/routes/PinningForAudience';
import HistoryMovement from 'components/Movement/routes/HistoryMovement';
import Repair from 'components/Movement/routes/Repair';
import SelectChange from 'components/Storage/SelectChange';
import Chancellery from 'components/Chancellery/Chancellery';
import ChancelleryProvider from 'context/ChancelleryContext';
import GetUtilizationItems from 'components/MainMenu/Utilization/GetUtilizationItems';

// Layout-ы для контекста
import EmployeeLayout from 'layouts/EmployeeLayout';
import MovementLayout from 'layouts/MovementLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Форма авторизации */}
        <Route path="/" element={<FormAuthorization />} />

        {/* Основной блок */}
        <Route path="/main_menu" element={<MainMenu />} />
        <Route path="/utilization" element={<GetUtilizationItems />} />

        {/* Материально-ответственные лица */}
        <Route path="/employee" element={<EmployeeLayout />}>
          <Route index element={<Employee />} />
          <Route path="select" element={<SelectEmployee />} />
          <Route path="pinning" element={<PinningEmployee />} />
        </Route>

        {/* Склад */}
        <Route path="/account" element={<Storage />} />
        <Route path="/add_storage" element={<AddStorage />} />
        <Route path="/components" element={<Component />} />
        <Route path="/add_components" element={<AddComponents />} />
        <Route path="/change" element={<SelectChange />} />

        {/* Блок "Перемещение" */}
        <Route path="/movement" element={<MovementLayout />}>
          <Route index element={<MovementMenu />} />
          <Route path="history" element={<HistoryMovement />} />
          <Route path="pinning_audience" element={<PinningForAudience />} />
          <Route path="repair" element={<Repair />} />
        </Route>

        {/* Канцелярия */}
        <Route
          path="office"
          element={
            <ChancelleryProvider>
              <Chancellery />
            </ChancelleryProvider>
          }
        />

        {/* Отчеты */}
        <Route path="/report" element={<DocumentReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
