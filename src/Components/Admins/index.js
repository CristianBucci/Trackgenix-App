import { useEffect, useState } from 'react';
import List from './List';
import Add from './Add';
import Update from './Update';
import styles from './admins.module.css';

const admins = () => {
  const [admins, setAdmins] = useState([]);
  const [show, setShow] = useState(1);
  const [toEdit, setToEdit] = useState({});

  const getAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin`);
      const responseJson = await response.json();
      setAdmins(responseJson.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  async function addAdmin(newData) {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/admin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
    } catch (error) {
      alert(error);
    }
    setShow(1);
  }

  const selectUpdate = async (id) => {
    setToEdit(admins.find((admin) => admin._id === id));
    setShow(2);
  };

  const updateAdmin = async (id, newData) => {
    await fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    });
    setShow(1);
  };

  const deleteAdmin = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`, {
        method: 'DELETE'
      });
      const updatedAdmins = admins.filter((admin) => admin._id !== id);
      setAdmins(updatedAdmins);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className={styles.container}>
      {show === 1 && (
        <List
          list={admins}
          selectUpdate={selectUpdate}
          deleteAdmin={deleteAdmin}
          setShow={setShow}
        />
      )}
      {show === 2 && <Update updateAdmin={updateAdmin} toEdit={toEdit} />}
      {show === 3 && <Add addAdmin={addAdmin} />}
    </section>
  );
};

export default admins;
