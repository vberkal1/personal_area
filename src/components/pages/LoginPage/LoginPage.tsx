import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Container,
    FormControl,
    TextField,
    FormHelperText
} from '@mui/material';
import authStore from '../../../stores/authStore';
import { observer } from 'mobx-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
    login: Yup.string().required('Поле не заполнено'),
    password: Yup.string().required('Поле не заполнено'),
});


const LoginPage: React.FC = () => {

    const {
        values,
        handleChange,
        submitForm,
        errors,
        touched,
    } = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        async onSubmit(formData) {
            await authStore.auth(formData.login, formData.password);
            authStore.isAuth && navigate('personal-area');
        },
        validationSchema,
    });

    const navigate = useNavigate();

    const changeFormValues = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        authStore.resetStoreValues();
        handleChange(e);
    };

    useEffect(() => {
        authStore.isAuth && navigate('personal-area');
    }, []);

    return (
        <Container maxWidth="sm">
            <h1>Авторизация</h1>
            <FormControl sx={{ m: 1 }} error variant="standard">
                <TextField
                    required
                    value={values.login}
                    onChange={changeFormValues}
                    fullWidth
                    label="Логин"
                    id="login"
                    name="login"
                    variant="outlined"
                />
                <FormHelperText>{touched.login ? errors.login : undefined}</FormHelperText>
                <br />
                <TextField
                    required
                    value={values.password}
                    onChange={changeFormValues}
                    fullWidth
                    id="password"
                    type="password"
                    name="password"
                    label="Пароль"
                    variant="outlined"
                />
                <FormHelperText>{touched.password ? errors.password : undefined}</FormHelperText>
                <br />
                <FormHelperText>{authStore.errorMessage}</FormHelperText>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={submitForm}
                >
                    Войти
                </Button>
            </FormControl>
        </Container>
    );
};

export default observer(LoginPage);