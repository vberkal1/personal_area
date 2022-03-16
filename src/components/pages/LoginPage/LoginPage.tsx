import React, { useState } from 'react';
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

type Form = {
    login: string;
    password: string;
};

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<Form>({ login: '', password: '' });

    const changeFormValues = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        authStore.resetStoreValues();
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const login = async (): Promise<void> => {
        await authStore.auth(form.login, form.password);
        authStore.isAuth && navigate('personal-area');
    }

    return (
        <Container maxWidth="sm">
            <h1>Авторизация</h1>
            <FormControl sx={{ m: 1 }} error variant="standard">
                <TextField
                    value={form.login}
                    onChange={changeFormValues}
                    fullWidth
                    label="Логин"
                    name="login"
                    variant="outlined"
                />
                <br />
                <TextField
                    value={form.password}
                    onChange={changeFormValues}
                    fullWidth
                    type="password"
                    name="password"
                    label="Пароль"
                    variant="outlined"
                />
                <br />
                <FormHelperText>{authStore.errorMessage}</FormHelperText>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={login}
                >
                    Войти
                </Button>
            </FormControl>
        </Container>
    );
};

export default observer(LoginPage);