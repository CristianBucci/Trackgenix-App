import Buttons from 'Components/Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from 'redux/auth/thunks';
import { mokedUsers } from 'helpers/firebase';

const Login = () => {
  const dispatch = useDispatch();
  const { role, email, isLoading } = useSelector((state) => state.auth);
  const { employee, admin, superAdmin } = mokedUsers;

  const loginEmployee = () => dispatch(login(employee));

  const loginAdmin = () => dispatch(login(admin));

  const loginSuperAdmin = () => dispatch(login(superAdmin));

  const logoutUser = () => dispatch(logout());

  return (
    <div>
      <h1>Login</h1>
      <Buttons variant="primary" name="Login Employee" onClick={loginEmployee} />
      <Buttons variant="secondary" name="Login Admin" onClick={loginAdmin} />
      <Buttons variant="primary" name="Login Super Admin" onClick={loginSuperAdmin} />
      {isLoading ? (
        <div>
          <img src="/assets/images/spinner.gif" alt="spinner" />
        </div>
      ) : (
        role &&
        email && (
          <>
            <h1>
              {' '}
              Bienvenido {role} {email}{' '}
            </h1>
            <Buttons variant="primary" name="Logout" onClick={logoutUser} />
          </>
        )
      )}
    </div>
  );
};

export default Login;
