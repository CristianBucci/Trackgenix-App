import { useEffect, useState } from 'react';
import styles from './form.module.css';

const Form = () => {
  const urlValues = window.location.search;
  const urlParams = new URLSearchParams(urlValues);
  var product = urlParams.get('_id');
  console.log(urlValues);
  console.log(urlParams);
  console.log(product);
  console.log(typeof product);
  const idRegEx = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

  const [nameValue, setNameValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');

  if (idRegEx.test(product)) {
    useEffect(async () => {
      try {
        const response = await fetch(`http://localhost:4000/employees/${product}`);
        const data = await response.json();
        setNameValue(data.data.name);
        setUsernameValue(data.data.username);
        setEmailValue(data.data.email);
        setPasswordValue(data.data.password);
        setPhoneValue(data.data.phone);
      } catch (error) {
        console.error(error);
      }
    }, []);
  }

  const editEmployee = async (product) => {
    try {
      let response = await await fetch(`${process.env.REACT_APP_API_URL}/employee/${product}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameValue,
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
          phone: phoneValue
        })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      alert(error);
    }
  };

  const createEmployee = async () => {
    if (confirm('Create employee?')) {
      await fetch(`http://localhost:4000/employees/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameValue,
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
          phone: phoneValue
        })
      });
    }
  };

  const changeName = (e) => {
    setNameValue(e.target.value);
  };
  const changeUsername = (e) => {
    setUsernameValue(e.target.value);
  };
  const changeEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const changePassword = (e) => {
    setPasswordValue(e.target.value);
  };
  const changePhone = (e) => {
    setPhoneValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h3>Go Back</h3>
      <form>
        <h2>Form</h2>
        <div>
          <label htmlFor="input-name">Name</label>
          <input id="input-name" name="name" required value={nameValue} onChange={changeName} />
        </div>
        <div>
          <label htmlFor="input-username">Username</label>
          <input
            id="input-username"
            name="username"
            required
            value={usernameValue}
            onChange={changeUsername}
          />
        </div>
        <div>
          <label htmlFor="input-email">Email</label>
          <input id="input-email" name="email" required value={emailValue} onChange={changeEmail} />
        </div>
        <div>
          <label htmlFor="input-password">Password</label>
          <input
            id="input-password"
            type="password"
            name="password"
            required
            value={passwordValue}
            onChange={changePassword}
          />
        </div>
        <div>
          <label htmlFor="input-phone">Phone</label>
          <input id="input-phone" name="phone" required value={phoneValue} onChange={changePhone} />
        </div>
      </form>
      <button
        type="submit"
        onClick={idRegEx.test(product) ? () => editEmployee(product) : () => createEmployee()}
      >
        Save
      </button>
    </div>
  );
};

export default Form;
