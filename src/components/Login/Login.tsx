import React from 'react';
import {useFormik} from "formik";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {AuthLoginThunkCreator} from "../../redux/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {DataLoginType} from "../../api/api";
import {AppRootStateType} from "../../redux/redux-store";
import {Navigate} from "react-router-dom";
import {ErrorSnackbar} from "../ErrorSnackbar/ErrorSnackbar";
//здесь страница логина

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const Login = () => {
         const dispatch=useDispatch();
         const isAuth= useSelector<AppRootStateType,boolean>(state=>state.auth.isAuth);
        const validate = (values:DataLoginType) => {
            const errors:FormikErrorType= {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <=3) {
                errors.password = 'symbol of password should > 3';
            }

            return errors;
        };
        const formik = useFormik({
            initialValues: {
                email: '',
                password: '',
                rememberMe: false
            },
            validate,
            onSubmit: values => { //сдесь данные собранные с форм
               // alert(JSON.stringify(values)); //это для теста что все работает)
                //@ts-ignore
                 dispatch(AuthLoginThunkCreator(values));
                 formik.resetForm(); //обнуляем формы
            },

        })
         if (isAuth){ //если тру-то сделай редирект на страницу с тодолистами
           return <Navigate to ={'/profile/userID'}/>
         }

    return <Grid container justifyContent={'center'}>

        <ErrorSnackbar/>

        {/*//оборачиваем наши все формы тегом form..*/}
        <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <FormGroup>
                    <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />

                    {formik.touched.email && formik.errors.email &&  <div style={{color:"red"}}>{formik.errors.email}</div> }

                    <TextField type="password" label="Password" {...formik.getFieldProps('password')}
                               margin="normal"
                    />
                    {formik.touched.password && formik.errors.password &&  <div style={{color:"red"}}>{formik.errors.password}</div> }
                    <FormControlLabel label={'Remember me'} control={<Checkbox  {...formik.getFieldProps('rememberMe')}
                                                                                checked={formik.values.rememberMe}/> //благодаря этой строке чекбокс тоже сбрасывается
                    }/>


                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Login
                    </Button>
                    {/*<ErrorSnackbar/>*/}
                </FormGroup>
            </FormControl>
        </form>

    </Grid>



};

