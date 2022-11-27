import Buttons from 'Components/Shared/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'helpers/firebase';
import { mokedUsers } from 'helpers/firebase';

const Login = () => {
  const { employee, admin, superAdmin } = mokedUsers;
  const loginEmployee = () => login(employee);

  const loginAdmin = () => login(admin);

  const loginSuperAdmin = () => login(superAdmin);

  const login = (role) => {
    signInWithEmailAndPassword(auth, role.email, role.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert(`User ${user.email} login successful`);
        console.log('User access token:', user.accessToken);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <a></a>
      <Buttons variant="primary" name="Login Employee" onClick={loginEmployee} />
      <Buttons variant="secondary" name="Login Admin" onClick={loginAdmin} />
      <Buttons variant="primary" name="Login Super Admin" onClick={loginSuperAdmin} />
    </div>
  );
};

export default Login;
