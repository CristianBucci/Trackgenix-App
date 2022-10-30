import { useEffect, useState } from 'react';
import List from './List';
import CreateTimeSheet from './CreateTimeSheet';

function TimeSheets() {
  const [list, setList] = useState([]);
  const [active, setActive] = useState(false);

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
      {!active ? (
        <button
          onClick={() => {
            setActive(true);
          }}
        >
          Create TimeSheet
        </button>
      ) : null}
      {active ? <CreateTimeSheet /> : null}
      {!active ? <List list={list} setList={setList} deleteItem={deleteItem} /> : null}
      {active ? (
        <button
          onClick={() => {
            setActive(false);
          }}
        >
          Cancel
        </button>
      ) : null}
    </div>
  );
}

export default TimeSheets;
