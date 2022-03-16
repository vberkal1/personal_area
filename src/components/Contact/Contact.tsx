import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import classes from './Contact.module.scss';
import { Contact as ContactType } from '../../stores/contactsStore/contactsStore.models';
import { observer } from 'mobx-react-lite';
import contactsStore from '../../stores/contactsStore/contactsStore';

type ContactProps = {
    contactInfo: ContactType
}

const Contact: React.FC<ContactProps> = ({ contactInfo }) => {

    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const { deleteContact } = contactsStore;

    const deleteCard = (): void => {
        deleteContact(contactInfo.contactId);
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            {
                isEditMode ? (
                    <>
                        <CardContent>
                            <TextField label="Имя" variant="standard" />
                            <TextField label="Номер телефона" variant="standard" />
                            <TextField label="URL картинки" variant="standard" />
                        </CardContent>
                        <CardActions>
                            <Button
                                onClick={() => setIsEditMode(!isEditMode)}
                                size="small"
                            >
                                сохранить
                            </Button>
                            <Button size="small">удалить</Button>
                        </CardActions>

                    </>
                ) : (
                    <>
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
                    </>
                )
            }
        </Card>
    )
}

export default observer(Contact);