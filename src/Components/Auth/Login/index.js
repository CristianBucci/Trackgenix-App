import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/auth/thunks';
import { joiResolver } from '@hookform/resolvers/joi';
import { Schema } from './validations';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Input from 'Components/Shared/Inputs';
import Buttons from 'Components/Shared/Button';
import styles from './login.module.css';

const Login = () => {
  const { isLoading } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(Schema)
  });

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
    }
  };

  return (
    <div className={styles.container}>
      {!isLoading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {<h1>Login</h1>}
          <Input
            label={'Email'}
            type="text"
            name="email"
            placeholder={'Email'}
            register={register}
            error={errors.email?.message}
          />
          <Input
            label={'Password'}
            type="password"
            name="password"
            placeholder={'Password'}
            register={register}
            error={errors.password?.message}
          />
          <div>
            <Buttons type="submit" variant="primary" name="Confirm" />
          </div>
        </form>
      ) : (
        <div>
          <img src="/assets/images/spinner.gif" alt="spinner" />
        </div>
      )}
    </div>
  );
};

export default Login;
