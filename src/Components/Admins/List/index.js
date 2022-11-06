import styles from './list.module.css';
import { Link } from 'react-router-dom';

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
                  <Link to={`/admins/${admin._id}`}>
                    <button>Update</button>
                  </Link>
                  <button onClick={() => deleteAdmin(admin._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
          <Link to={'/admins/form'}>
            <button>Add</button>
          </Link>
        </tbody>
      </table>
    </section>
  );
};

export default List;
