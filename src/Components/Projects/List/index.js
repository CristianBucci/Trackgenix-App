import ListItem from '../ListItems';
const ProjectTable = ({ list, deleteItem }) => {
  return (
    <div>
      <a href={'/projects/form'}>
        <button>Add Project</button>
      </a>
      <table>
        <thead>
          <tr>
            <th id="id">Project Name</th>
            <th id="description">Description</th>
            <th id="ClientName">Client Name</th>
            <th id="StartingDate">Starting Date</th>
            <th id="EndDate">End Date</th>
            <th id="Employees">Employees</th>
            <th id="Actions">Edit and Delete</th>
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

export default ProjectTable;
