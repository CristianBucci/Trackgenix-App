import { useState, useEffect } from 'react';

const Form = () => {
  const listUrl = 'http://localhost:3000/admins';
  const [admin, setAdmin] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [err, setError] = useState('');

  const adminForm = async () => {
    try {
      const id = window.location.href.substring(window.location.href.lastIndexOf('=') + 1);
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
    if (window.location.href.includes('id=')) {
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
        window.location.assign(listUrl);
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
      const id = window.location.href.substring(window.location.href.lastIndexOf('=') + 1);
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
        window.location.assign(listUrl);
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
    if (window.location.href.includes('id=')) {
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
        <div>
          <label>Name</label>
          <input type="text" name="name" value={admin.name} onChange={onChange} />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" name="lastName" value={admin.lastName} onChange={onChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="text" name="email" value={admin.email} onChange={onChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={admin.password} onChange={onChange} />
        </div>
        <div>
          <input type="submit" value="Confirm" />
        </div>
      </form>
    </div>
  );
};

export default Form;
