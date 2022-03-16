import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import authStore from '../../stores/authStore';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import PersonalAreaPage from '../pages/PersonalAreaPage';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import './App.scss';

const App: React.FC = () => {

  useEffect(() => {
    authStore.updateIsAuth();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/personal-area' element={
          <PrivateRoute isAuth={authStore.isAuth} >
            <PersonalAreaPage />
          </PrivateRoute>
        } />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default observer(App);
