import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/auth/thunks';
import { joiResolver } from '@hookform/resolvers/joi';
import { Schema } from './validations';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { messageModalClose, messageModalOpen } from 'redux/auth/actions';

import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Input from 'Components/Shared/Inputs';
import Buttons from 'Components/Shared/Button';
import styles from './login.module.css';
import { useState } from 'react';

const Login = () => {
  const { isLoading, showModalMessage, modalContent } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(Schema)
  });

  const modalFunction = () => {
    modalContent.title.includes('ERROR');
    dispatch(messageModalClose());
  };

  const onSubmit = async (data) => {
    const role = await dispatch(login(data));
    if (role) {
      switch (role) {
        case 'SUPER_ADMIN':
          history.push('/super-admins');
          break;
        case 'ADMIN':
          history.push('/admins');
          break;
        case 'EMPLOYEE':
          history.push('/employees/home');
          break;
        default:
          history.push('/');
      }
    } else {
      dispatch(messageModalOpen());
    }
  };

  const passwordShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ModalMessage
        show={showModalMessage}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        modalFunction={modalFunction}
      />
      <div className={styles.container}>
        {!isLoading ? (
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {<h1>Login</h1>}
            <Input
              label={'Email'}
              type="text"
              name="email"
              placeholder={'Email'}
              register={register}
              error={errors.email?.message}
            />
            <div className={styles.inputPassword}>
              <div className={styles.password}>
                <Input
                  label={'Password'}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder={'Password'}
                  register={register}
                  error={errors.password?.message}
                />
              </div>
              <img
                src={
                  showPassword
                    ? '/assets/images/eye-icon-png-13.jpg'
                    : '/assets/images/eyes-closed-eyes.png'
                }
                alt="show icon"
                onClick={passwordShow}
              ></img>
            </div>
            <div className={styles.buttonContainer}>
              <Buttons type="submit" variant="primary" name="Confirm" />
            </div>
            <div className={styles.buttonContainer}>
              <Buttons
                type="button"
                variant="secondary"
                name="Sign Up"
                onClick={() => history.push('/auth/sign-up')}
              />
            </div>
          </form>
        ) : (
          <div>
            <img className={styles.spinner} src="/assets/images/spinner.gif" alt="spinner" />
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
