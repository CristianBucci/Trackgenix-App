import ListItem from '../ListItems';
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
              <a href={'/projects/form'}>
                <button>Add Project</button>
              </a>
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <ListItem key={item.id} listItem={item} deleteItem={deleteItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
