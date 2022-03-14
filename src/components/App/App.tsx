import { observer } from 'mobx-react';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import authStore from '../../stores/authStore';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import PersonalAreaPage from '../pages/PersonalAreaPage';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        {authStore.isAuth && <Route path='/personal-area' element={<PersonalAreaPage/>}/>}
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default observer(App);
