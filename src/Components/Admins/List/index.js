import styles from './list.module.css';

const List = ({ list, deleteAdmin }) => {
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
                  <button onClick={() => window.location.assign(`/admins/form?id=${admin._id}`)}>
                    Update
                  </button>
                  <button onClick={() => deleteAdmin(admin._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
          <button onClick={() => window.location.assign('/admins/form')}>Add</button>
        </tbody>
      </table>
    </section>
  );
};

export default List;
