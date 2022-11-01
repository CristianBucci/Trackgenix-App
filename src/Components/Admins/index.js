import { useEffect, useState } from 'react';
import List from './List';
import Add from './Add';
import Update from './Update';
import styles from './admins.module.css';

function Admins() {
  const [Admins, setAdmins] = useState([]);
  const [show, setShow] = useState(1);
  const [toEdit, setToEdit] = useState({});

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/Admin`);
      const responseJson = await response.json();
      setAdmins(responseJson.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addAdmin = async (newData) => {
    await fetch(`${process.env.REACT_APP_API_URL}/Admin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    });
    setShow(1);
  };

  const selectUpdate = async (id) => {
    setToEdit(Admins.find((admin) => admin._id === id));
    setShow(2);
  };

  const updateAdmin = async (id, newData) => {
    await fetch(`${process.env.REACT_APP_API_URL}/Admin/${id}`, {
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
    await fetch(`${process.env.REACT_APP_API_URL}/Admin/${id}`, {
      method: 'DELETE'
    });

    const updatedAdmins = Admins.filter((admin) => admin._id !== id);
    setAdmins(updatedAdmins);
  };

  return (
    <section className={styles.container}>
      {show === 1 && (
        <List
          list={Admins}
          selectUpdate={selectUpdate}
          deleteAdmin={deleteAdmin}
          setShow={setShow}
        />
      )}
      {show === 2 && <Update updateAdmin={updateAdmin} toEdit={toEdit} />}
      {show === 3 && <Add addAdmin={addAdmin} />}
    </section>
  );
}

export default Admins;
