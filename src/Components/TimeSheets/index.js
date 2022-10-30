import { useEffect, useState } from 'react';
import List from './List';

function TimeSheets() {
  const [list, setList] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}timesheets/`);
      const json = await response.json();
      console.log(json.data);
      setList(json.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  //Delete
  const deleteItem = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}timesheets/${id}`, {
      method: 'DELETE'
    });
    location.reload();
  };

  return (
    <div className="App">
      <List list={list} setList={setList} deleteItem={deleteItem} />
    </div>
  );
}

export default TimeSheets;
