import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { Button } from '@material-ui/core';
import InputField from '../../components/InputField';

import { userSignIn } from '../../services/AuthService';
import axiosInstance from '../../services/CreateService';

import styles from './Signin.module.scss';
import Illustration from '../../assets/undraw_engineering_team.svg';

const SignIn = (props) => {
  const history = useHistory();

  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const dataPayload = {
      email: formEmail,
      password: formPassword,
    };

    userSignIn(dataPayload)
      .then((responseData) => {
        if (responseData.data && responseData.data.token) {
          localStorage.setItem('TOKEN', responseData.data.token);

          axiosInstance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${responseData.data.token}`;

          history.replace('/dashboard');
        }
      })
      .catch((errorData) => {
        console.log('Error While Signin In', errorData);
      });
  };

  return (
    <section className={styles.pageWrapper}>
      <div className={styles.signinPageWrapper}>
        <div className={styles.formWrapper}>
          <h1 className={styles.heading}>Sign In</h1>
          <h2 className={styles.description}>Enter your email and password</h2>
          <form className={styles.form} onSubmit={(e) => handleFormSubmit(e)}>
            <InputField
              label='Email'
              inputProps={{
                type: 'email',
                required: true,
                value: formEmail,
                placeholder: 'someone@example.com',
                onChange: (e) => setFormEmail(e.target.value),
              }}
            />

            <InputField
              label='Password'
              inputProps={{
                required: true,
                type: 'password',
                value: formPassword,
                placeholder: 'Password$123',
                onChange: (e) => setFormPassword(e.target.value),
              }}
            />

            <Button
              size='large'
              role='button'
              type='submit'
              color='primary'
              variant='contained'
            >
              Sign In
            </Button>
          </form>
        </div>
        <div className={styles.illustrationWrapper}>
          <img src={Illustration} alt={'Engineering Team Image'} />

          <h3 className={styles.heading}>Welcome Back</h3>
          <h4 className={styles.description}>
            We have been looking forward for this
          </h4>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
