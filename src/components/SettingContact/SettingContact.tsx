import React, { useState } from 'react';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AddContactParametrs } from '../../stores/contactsStore';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import classes from './SettingContact.module.scss';


const phoneRegExp = /(?:\+|\d)[\d\-\(\) ]{9,}\d/g;

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Поле не заполнено'),
    number: Yup.string().matches(phoneRegExp, 'Невалидный номер'),
    url: Yup.string(),
});

type SettingContactProps = {
    saveSettings: (requestParametrs: AddContactParametrs) => void;
    contactInfo: AddContactParametrs;
}

const SettingContact: React.FC<SettingContactProps> = ({ saveSettings, contactInfo }) => {

    const [form, setForm] = useState<AddContactParametrs>(contactInfo);

    const {
        values,
        handleChange,
        submitForm,
        errors,
        touched,
    } = useFormik({
        initialValues: {
            name: form.name,
            number: form.number,
            url: form.url,
        },

        async onSubmit(formData) {
            saveSettings(formData);
            console.log(formData);
        },
        validationSchema,
    });

  

    const changeFormValues = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setForm({ ...form, [e.target.name]: e.target.value });
        handleChange(e);
    };

    return (
        <Card className={classes.component} sx={{ maxWidth: 345 }}>
            <CardContent>
                <TextField
                    name="name"
                    id="name"
                    value={values.name}
                    onChange={changeFormValues}
                    label="Имя"
                    variant="outlined"
                    helperText={touched.name ? errors.name : undefined}
                />
                <br /><br />
                <TextField
                    id="number"
                    name="number"
                    value={values.number}
                    onChange={handleChange}
                    label="Номер телефона"
                    variant="outlined"
                    helperText={touched.number ? errors.number : undefined}
                />
                <br /><br />
                <TextField
                    name="url"
                    id="url"
                    value={values.url}
                    onChange={handleChange}
                    label="URL картинки"
                    variant="outlined"
                />
                <br />
            </CardContent>
            <CardActions>
                <Button
                    onClick={submitForm}
                    size="small"
                >
                    сохранить
                </Button>
            </CardActions>
        </Card>
    );
};

export default SettingContact;