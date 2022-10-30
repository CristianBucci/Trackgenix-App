import { useEffect, useState } from 'react';
// import styles from './time-sheets.module.css';
import List from './List';

function TimeSheets() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}timesheets/`)
      .then((res) => res.json())
      .then((json) => {
        setList(json.data);
      });
  }, []);

  //Delete
  const deleteItem = (id) => {
    setList([...list.filter((listItem) => listItem.id !== id)]);
  };

  return (
    <div className="App">
      <List list={list} setList={setList} deleteItem={deleteItem} />
    </div>
  );
}

export default TimeSheets;
