import Buttons from 'Components/Shared/Button';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'helpers/firebase';
import { mokedUser } from 'helpers/firebase';

const SignUp = () => {
  const { email, password } = mokedUser;

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert(`User ${user.email} register successful`);
        console.log(user);
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
      <h1>Sign Up</h1>
      <Buttons variant="primary" name="Sign Up" onClick={signUp} />
    </div>
  );
};

export default SignUp;
