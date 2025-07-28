import { React } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// Основные страницы
import FormAuthorization from 'components/Auth/FormAuthorization';
import FormRegistration from 'components/Auth/FormRegistration';
import MainMenu from 'components/MainMenu/MainMenu';
import Storage from 'components/Storage/Storage';
import Employee from 'components/Employee/Employee';
import MovementMenu from 'components/Movement/MovementMenu';
import DocumentReport from 'components/DocumentReport/DocumentReport';
import AddToStorage from 'components/Storage/routes/AddToStorage';
import SelectEmployee from 'components/Employee/routes/SelectEmployee';
import ComponentsMenu from 'components/Storage/routes/ComponentsMenu';
import AddComponents from 'components/Storage/routes/AddComponents';
import PinningEmployee from 'components/Employee/routes/PinningEmployee';
import PinningForAudience from 'components/Movement/routes/PinningForAudience';
import HistoryMovement from 'components/Movement/routes/HistoryMovement';
import Repair from 'components/Movement/routes/Repair';
import ChangeDetailsHistory from 'components/Storage/routes/ChangeDetailsHistory';
import Chancellery from 'components/Chancellery/Chancellery';
import GetUtilizationItems from 'components/MainMenu/Utilization/GetUtilizationItems';

// Layout-ы для контекста или provider-ы
import EmployeeLayout from 'layouts/EmployeeLayout';
import MovementLayout from 'layouts/MovementLayout';
import ChancelleryProvider from 'context/ChancelleryContext';
import StorageLayout from 'layouts/StorageLayout';
import ExcelImportBlock from 'components/Storage/routes/ExcelImportBlock';
import AuthLayout from 'layouts/AuthLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Автоматическое перенаправление на форму авторизации */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

        {/* Форма авторизации и регистрации */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<FormAuthorization />} />
          <Route path="registration" element={<FormRegistration />} />
        </Route>

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
        <Route path="/storage" element={<StorageLayout />}>
          <Route index element={<Storage />} />
          <Route path="add-objects" element={<AddToStorage />}></Route>
          <Route path="import-file" element={<ExcelImportBlock />} />
          <Route path="components" element={<ComponentsMenu />} />
          <Route path="add-components" element={<AddComponents />} />
          <Route
            path="change-details-history"
            element={<ChangeDetailsHistory />}
          />
        </Route>

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
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
