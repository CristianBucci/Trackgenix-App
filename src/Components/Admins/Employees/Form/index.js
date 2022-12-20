import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { confirmModalOpen, confirmModalClose, messageModalClose } from 'redux/employees/actions';
import { getByIdEmployee, updateEmployee } from 'redux/employees/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeSchema } from './validations';

import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Input from 'Components/Shared/Inputs';
import Buttons from 'Components/Shared/Button/index';
import styles from './form.module.css';

function Form(props) {
  const token = sessionStorage.getItem('token');
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
      dispatch(getByIdEmployee(id, token));
    }
  }, []);

  useEffect(() => {
    if (employee) {
      setValue('name', employee.name);
      setValue('lastName', employee.lastName);
      setValue('email', employee.email);
      setValue('phone', employee.phone);

      setFormValues({
        name: employee.name,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        firebaseUid: employee.firebaseUid
      });
    }
  }, [employee]);

  const onConfirm = () => {
    dispatch(updateEmployee(id, formValues, token));
    dispatch(confirmModalClose());
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const onSubmit = (event) => {
    setFormValues({
      name: event.name,
      lastName: event.lastName,
      email: event.email,
      phone: event.phone
    });

    const content = 'Are you sure you want to edit the employee ?';
    dispatch(confirmModalOpen(content));
  };

  const redirect = () => {
    props.history.push('/admins/employees');
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
          <h2>Edit Employee</h2>
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
            label={'Phone'}
            name="phone"
            type="text"
            error={errors.phone?.message}
            placeholder={'Phone'}
          />
          <div>
            <Link to={'/admins/employees'}>
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
