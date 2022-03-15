import { observer } from 'mobx-react';
import React from 'react';
import authStore from '../../../stores/authStore';
import Navbar from '../../layout/Navbar';


const PersonalAreaPage: React.FC = () => {

    const { login, logout } = authStore;

    return (
        <div>
            <Navbar login={login} logout={logout} />
        </div>
    );
};

export default observer(PersonalAreaPage);