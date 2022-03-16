import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import authStore from '../../../stores/authStore';
import contactsStore from '../../../stores/contactsStore/contactsStore';
import Navbar from '../../layout/Navbar';
import Container from '@mui/material/Container';
import { v4 as uuidv4 } from 'uuid';
import Contact from '../../Contact';
import classes from './PersonalAreaPage.module.scss';



const PersonalAreaPage: React.FC = () => {

    const { login, logout } = authStore;
    const { getContacts, contacts } = contactsStore;

    useEffect(() => {
        getContacts();
    }, [])

    return (
        <div>
            <Navbar login={login} logout={logout} />
            <Container maxWidth="sm">
                <div className={classes.contacts}>
                    {contacts.map(contact => <Contact contactInfo={contact} />)}
                </div>
            </Container>
        </div>

    );
};




export default observer(PersonalAreaPage);