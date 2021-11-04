import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { Button } from '@material-ui/core';
import InputField from '../../components/InputField';

import { userSignUp } from '../../services/AuthService';
import axiosInstance from '../../services/CreateService';

import styles from './Signup.module.scss';
import Illustration from '../../assets/undraw_explore.svg';

const SignIn = (props) => {
  const history = useHistory();

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const dataPayload = {
      name: formName,
      email: formEmail,
      password: formPassword,
    };

    userSignUp(dataPayload)
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
        console.log('Error While Signin Up', errorData);
      });
  };

  return (
    <section className={styles.pageWrapper}>
      <div className={styles.signupPageWrapper}>
        <div className={styles.formWrapper}>
          <h1 className={styles.heading}>Sign Up</h1>
          <h2 className={styles.description}>
            Enter your email and a password
          </h2>
          <form className={styles.form} onSubmit={(e) => handleFormSubmit(e)}>
            <InputField
              label='Name'
              inputProps={{
                type: 'text',
                required: true,
                value: formName,
                placeholder: 'John Doe',
                onChange: (e) => setFormName(e.target.value),
              }}
            />

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
              Sign Me Up
            </Button>
          </form>
        </div>
        <div className={styles.illustrationWrapper}>
          <img src={Illustration} alt={'Engineering Team Image'} />

          <h3 className={styles.heading}>Hey There!</h3>
          <h4 className={styles.description}>
            We appreciate you taking the time to visit us
          </h4>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
