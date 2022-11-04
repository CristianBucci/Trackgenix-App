import styles from './list.module.css';

const adminsList = ({ list, selectUpdate, deleteAdmin, setShow }) => {
  return (
    <section className={styles.table}>
      <table className={styles.td}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {list.map((admin) => {
            return (
              <tr key={admin._id}>
                <td>{admin._id}</td>
                <td>{admin.name}</td>
                <td>{admin.lastName}</td>
                <td>{admin.email}</td>
                <td>
                  <button onClick={() => selectUpdate(admin._id)}>Update</button>
                  <button onClick={() => deleteAdmin(admin._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
          <button onClick={() => setShow(3)}>Add</button>
        </tbody>
      </table>
    </section>
  );
};

export default adminsList;
