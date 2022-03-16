import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Contact as ContactType } from '../../stores/contactsStore/contactsStore.models';
import { observer } from 'mobx-react-lite';
import contactsStore from '../../stores/contactsStore/contactsStore';
import SettingContact from '../SettingContact';
import { AddContactParametrs } from '../../stores/contactsStore';
import classes from './Contact.module.scss';

type ContactProps = {
    contactInfo: ContactType
}

const Contact: React.FC<ContactProps> = ({ contactInfo }) => {

    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const { deleteContact, editContact } = contactsStore;

    const deleteCard = (): void => {
        deleteContact(contactInfo.contactId);
    }

    const saveSettings = (requestParametrs: AddContactParametrs): void => {
        editContact(requestParametrs, contactInfo.contactId)
            .then(() => setIsEditMode(false));
    }

    return (
        <>
            {
                isEditMode ? (
                    <SettingContact
                        contactInfo={contactInfo}
                        saveSettings={saveSettings}
                    />
                ) : (
                    <Card sx={{ maxWidth: 345 }}>
                        <CardContent className={classes.content}>
                            <div className={classes.container}>
                                <Avatar className={classes.avatar} alt="Remy Sharp" src={contactInfo.url} />
                                <div>
                                    <Typography component="p">{contactInfo.name}</Typography>
                                    <Typography component="p">{contactInfo.number}</Typography>
                                </div>
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button
                                onClick={() => setIsEditMode(!isEditMode)}
                                size="small"
                            >
                                изменить
                            </Button>
                            <Button onClick={deleteCard} size="small">удалить</Button>
                        </CardActions>
                    </Card>
                )
            }
        </>
    )
}

export default observer(Contact);