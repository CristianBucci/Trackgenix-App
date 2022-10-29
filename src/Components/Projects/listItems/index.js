const ListItem = ({ listItem }) => {
  return (
    <tr>
      <td>{listItem.name} </td>
      <td>{listItem.description} </td>
      <td>{listItem.clientName} </td>
      <td>{listItem.startDate} </td>
      <td>{listItem.endDate} </td>
      <td>asas</td>
    </tr>
  );
};

export default ListItem;
