import Buttons from 'Components/Shared/Button';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'helpers/firebase';

const SignUp = () => {
  const singUpSuperAdmin = () => signUp('');

  const signUp = (role) => {
    createUserWithEmailAndPassword(auth, role.email, role.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert(`User ${user.email} register successful`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <Buttons variant="primary" name="Sign Up Super Admin" onClick={singUpSuperAdmin} />
    </div>
  );
};

export default SignUp;
