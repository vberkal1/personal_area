import React, { useState } from 'react';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AddContactParametrs } from '../../stores/contactsStore';


type SettingContactProps = {
    saveSettings: (requestParametrs: AddContactParametrs) => void;
    contactInfo: AddContactParametrs;
}


const SettingContact: React.FC<SettingContactProps> = ({ saveSettings, contactInfo }) => {

    const [form, setForm] = useState<AddContactParametrs>(contactInfo);

    const changeFormValues = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <TextField
                    name="name"
                    value={form.name}
                    onChange={changeFormValues}
                    label="Имя"
                    variant="standard"
                />
                <TextField
                    name="number"
                    value={form.number}
                    onChange={changeFormValues}
                    label="Номер телефона"
                    variant="standard"
                />
                <TextField
                    name="url"
                    value={form.url}
                    onChange={changeFormValues}
                    label="URL картинки"
                    variant="standard"
                />
            </CardContent>
            <CardActions>
                <Button
                    onClick={() => saveSettings(form)}
                    size="small"
                >
                    сохранить
                </Button>
            </CardActions>
        </Card>
    );
};

export default SettingContact;