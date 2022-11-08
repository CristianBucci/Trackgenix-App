import ListItem from '../ListItems';
import { Link } from 'react-router-dom';
import './list.module.css';

const ProjectList = ({ list, deleteItem }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th id="id">Project Name</th>
            <th id="description">Description</th>
            <th id="ClientName">Client Name</th>
            <th id="StartingDate">Starting Date</th>
            <th id="EndDate">End Date</th>
            <th id="Employees">Employees</th>
            <th id="Actions">
              <Link to={'/projects/form'}>
                <button>Add Project</button>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <ListItem key={item._id} listItem={item} deleteItem={deleteItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
