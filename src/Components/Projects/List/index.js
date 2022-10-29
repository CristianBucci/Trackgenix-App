import ListItem from '../listItems';

const ProjectTable = ({ list }) => {
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
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <ListItem key={item.id} listItem={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
