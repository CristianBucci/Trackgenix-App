import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { confirmModalOpen, confirmModalClose, messageModalClose } from 'redux/employees/actions';
import { getByIdEmployee, updateEmployee, createEmployee } from 'redux/employees/thunks';

import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Input from 'Components/Shared/Inputs';
import Buttons from 'Components/Shared/Button/index';
import styles from './form.module.css';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeSchema } from './validations';

function Form(props) {
  const [formValues, setFormValues] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });

  const dispatch = useDispatch();
  const {
    item: employee,
    modalContent,
    showModalMessage,
    showConfirmModal
  } = useSelector((state) => state.employees);

  const params = useParams();
  const id = params.id && params.id;

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(employeeSchema)
  });

  useEffect(() => {
    if (id) {
      dispatch(getByIdEmployee(id));
    }
  }, []);

  useEffect(() => {
    if (employee && id) {
      setValue('name', employee.name);
      setValue('lastName', employee.lastName);
      setValue('email', employee.email);
      setValue('password', employee.password);
      setValue('phone', employee.phone);

      setFormValues({
        name: employee.name,
        lastName: employee.lastName,
        email: employee.email,
        password: employee.password,
        phone: employee.phone,
        firebaseUid: employee.firebaseUid
      });
    }
  }, [employee]);

  const onConfirm = () => {
    id ? dispatch(updateEmployee(id, formValues)) : dispatch(createEmployee(formValues));
    dispatch(confirmModalClose());
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const redirect = () => {
    props.history.push('/employees');
  };

  const onSubmit = (event) => {
    setFormValues({
      name: event.name,
      lastName: event.lastName,
      email: event.email,
      password: event.password,
      phone: event.phone
    });

    const content = `Are you sure you want to ${
      id ? 'edit the employee with id ' + id : 'create a new employee'
    }?`;
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>{id ? 'Edit Employee' : 'Create Employee'}</h2>
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
            type="password"
            error={errors.password?.message}
            placeholder={'Password'}
          />
          <Input
            register={register}
            label={'Phone'}
            name="phone"
            type="text"
            error={errors.phone?.message}
            placeholder={'Phone'}
          />
          <div>
            <Link to={'/employees'}>
              <Buttons variant="secondary" name="Cancel" />
            </Link>
            <Buttons type="button" variant="secondary" name="Reset" onClick={() => resetForm()} />
            <Buttons type="submit" variant="primary" name="Confirm" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
