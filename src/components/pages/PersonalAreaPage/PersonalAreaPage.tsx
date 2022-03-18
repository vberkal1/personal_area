import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import authStore from '../../../stores/authStore';
import contactsStore from '../../../stores/contactsStore/contactsStore';
import Navbar from '../../layout/Navbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import { AddContactParametrs } from '../../../stores/contactsStore';
import SettingContact from '../../SettingContact';
import Contact from '../../Contact';
import classes from './PersonalAreaPage.module.scss';
import { TextField } from '@mui/material';



const PersonalAreaPage: React.FC = () => {

    const { login, logout } = authStore;
    const { getContacts, contacts, changeSearchValue, searchValue } = contactsStore;

    useEffect(() => {
        getContacts();
    }, []);

    const [isAddPannelVisible, setIsAddPannelVisible] = useState<boolean>(false);
    const initialEditFormValues = { name: '', number: '', url: '' };

    const addContact = (requestParametrs: AddContactParametrs): void => {
        contactsStore.addContact(requestParametrs).then(() => setIsAddPannelVisible(false));
    };

    const toggleAddPannelVisible = (): void => {
        setIsAddPannelVisible(!isAddPannelVisible)
    };


    return (
        <div>
            <Navbar login={login} logout={logout} />
            <Container maxWidth="sm">
                <div className={classes.content}>
                    <Button
                        onClick={toggleAddPannelVisible}
                        className={classes.addButton}
                        variant="outlined"
                    >
                        {isAddPannelVisible ? "Отмена" : "Добавить"}
                    </Button>
                    {
                        isAddPannelVisible &&
                        <SettingContact contactInfo={initialEditFormValues} saveSettings={addContact} />
                    }
                    <TextField value={searchValue} onChange={changeSearchValue} label="Поиск" variant="standard" />
                    <div className={classes.contacts}>
                        {contacts.map(contact => <Contact key={uuidv4()} contactInfo={contact} />)}
                    </div>
                </div>
            </Container>
        </div>

    );
};




export default observer(PersonalAreaPage);