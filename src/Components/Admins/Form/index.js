import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../Shared/Inputs';
const Form = (props) => {
  const params = useParams();
  const id = params.Id ? params.Id : '';
  const [admin, setAdmin] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [err, setError] = useState('');

  const adminForm = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`);
      response = await response.json();
      setAdmin({
        name: response.data.name,
        lastName: response.data.lastName,
        email: response.data.email,
        password: response.data.password
      });
    } catch (error) {
      setError(error);
      alert(err);
    }
  };

  useEffect(async () => {
    if (id) {
      adminForm();
    }
  }, []);

  const addAdmin = async (newData) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/admin/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
      if (response.status === 201) {
        response = await response.json();
        alert(response.message);
        props.history.push('/admins');
      } else {
        response = await response.json();
        alert(response.message);
      }
    } catch (error) {
      setError(error);
      alert(err);
    }
  };

  const updateAdmin = async (newData) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
      if (response.status === 200) {
        response = await response.json();
        alert(response.message);
        props.history.push('/admins');
      } else {
        response = await response.json();
        alert(response.message);
      }
    } catch (error) {
      setError(error);
      alert(err);
    }
  };

  const changeController = () => {
    if (id) {
      updateAdmin(admin);
    } else {
      addAdmin(admin);
    }
  };

  const onChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    changeController();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Input
          label={'Name'}
          type="text"
          name="name"
          required
          value={admin.name}
          onChange={onChange}
          placeholder={'Name'}
        />
        <Input
          label={'Last Name'}
          type="text"
          name="lastName"
          required
          value={admin.lastName}
          onChange={onChange}
          placeholder={'Last Name'}
        />
        <Input
          label={'Email'}
          type="text"
          name="email"
          required
          value={admin.email}
          onChange={onChange}
          placeholder={'Email'}
        />
        <Input
          label={'Password'}
          type="text"
          name="password"
          required
          value={admin.password}
          onChange={onChange}
          placeholder={'Password'}
        />
        <div>
          <input type="submit" value="Confirm" />
        </div>
      </form>
    </div>
  );
};

export default Form;
