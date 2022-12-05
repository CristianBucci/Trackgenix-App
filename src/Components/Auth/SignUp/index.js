import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { confirmModalOpen, confirmModalClose, messageModalClose } from 'redux/employees/actions';
import { createEmployee } from 'redux/employees/thunks';

import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Input from 'Components/Shared/Inputs';
import Buttons from 'Components/Shared/Button/index';
import styles from './signUp.module.css';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeSchema } from './validations';

function SignUp(props) {
  const [formValues, setFormValues] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const passwordShow = () => {
    setShowPassword(!showPassword);
  };
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const repeatPasswordShow = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const dispatch = useDispatch();
  const { isLoading, modalContent, showModalMessage, showConfirmModal } = useSelector(
    (state) => state.employees
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(employeeSchema)
  });

  const onConfirm = () => {
    dispatch(createEmployee(formValues));
    dispatch(confirmModalClose());
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const redirect = () => {
    props.history.push('/login');
  };

  const onSubmit = (event) => {
    setFormValues({
      name: event.name,
      lastName: event.lastName,
      email: event.email,
      password: event.password,
      phone: event.phone
    });

    const content = `Are you sure you want to create a new employee?`;
    dispatch(confirmModalOpen(content));
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS') && redirect();
    dispatch(messageModalClose());
  };

  const resetForm = () => {
    reset(formValues);
  };

  return (
    <>
      <ModalConfirm
        show={showConfirmModal}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <ModalMessage
        show={showModalMessage}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        modalFunction={modalFunction}
      />
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Create Employee</h2>
          {isLoading ? (
            <div className={styles.spinnerContainer}>
              <img src="/assets/images/spinner.gif" alt="spinner" />
            </div>
          ) : (
            <>
              <Input
                register={register}
                label={'Name'}
                name="name"
                type="text"
                error={errors.name?.message}
                placeholder={'Name'}
              />
              <Input
                register={register}
                label={'Last Name'}
                name="lastName"
                type="text"
                error={errors.lastName?.message}
                placeholder={'Last Name'}
              />
              <Input
                register={register}
                label={'Email'}
                name="email"
                type="text"
                error={errors.email?.message}
                placeholder={'Email'}
              />
              <Input
                register={register}
                label={'Password'}
                name="password"
                type={showPassword ? 'text' : 'password'}
                error={errors.password?.message}
                placeholder={'Password'}
                show={passwordShow}
                showState={showPassword}
              />
              <Input
                register={register}
                label={'Repeat Password'}
                name="repeatPassword"
                type={showRepeatPassword ? 'text' : 'password'}
                error={errors.repeatPassword?.message}
                placeholder={'Repeat Password'}
                show={repeatPasswordShow}
                showState={showRepeatPassword}
              />
              <Input
                register={register}
                label={'Phone'}
                name="phone"
                type="password"
                error={errors.phone?.message}
                placeholder={'Phone'}
              />
              <div>
                <Link to={'/login'}>
                  <Buttons variant="secondary" name="Cancel" />
                </Link>
                <Buttons
                  type="button"
                  variant="secondary"
                  name="Reset"
                  onClick={() => resetForm()}
                />
                <Buttons type="submit" variant="primary" name="Confirm" />
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
}

export default SignUp;
