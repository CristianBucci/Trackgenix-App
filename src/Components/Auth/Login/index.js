import Buttons from "Components/Shared/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "helpers/firebase";
import { mokedUser } from "helpers/firebase";

const Login = () => {


  const {email, password} = mokedUser;

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert(`User ${user.email} login successful`)
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      console.log(errorCode, errorMessage);
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <Buttons variant="primary" name="Login" onClick={login} />
    </div>
  );
};

export default Login;