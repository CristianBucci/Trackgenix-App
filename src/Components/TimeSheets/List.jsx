import React from 'react';

const List = ({ list, deleteItem }) => {
  const handleDelete = () => {
    deleteItem(list._id);
  };

  return (
    <section>
      <h2>TimeSheets</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th id="description">Description</th>
              <th id="date">Date</th>
              <th id="hours">Hours</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.description}</td>
                  <td>{item.date}</td>
                  <td>{item.hours}</td>
                  <td>
                    <button onClick={() => handleDelete(item._id)}>X</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default List;
