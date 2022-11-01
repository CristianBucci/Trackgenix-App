import { useState } from 'react';
import ListItem from './ListItem';
import Popup from '../Popup/Popup';

const List = ({ tasksList = [], deleteTask, setTask }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupId, setPopupId] = useState(false);

  const setPutPost = (boolean, id) => {
    id ? setPopupId(id) : setPopupId(false);
    setShowPopup(boolean);
  };

  return (
    <>
      <Popup popup={showPopup} setPutPost={setPutPost} setTask={setTask} id={popupId} />
      <table>
        <thead>
          <tr>
            <th id="id">ID</th>
            <th id="description">Description</th>
            <td>
              <button onClick={() => setPutPost(true)}>ADD</button>
            </td>
          </tr>
        </thead>
        <tbody>
          {tasksList.map((task) => (
            <ListItem
              key={task.id}
              taskList={task}
              deleteTask={deleteTask}
              setPutPost={setPutPost}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default List;
