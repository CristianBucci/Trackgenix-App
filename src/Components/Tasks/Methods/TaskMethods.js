const del = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    alert(`Task with id ${id} delete successfully`);
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
};

const put = async (data, id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ description: data }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    alert(`Task with id ${id} updated successfully`);
  } catch (error) {
    alert(error);
  }
};

const post = async (data) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      method: 'POST',
      body: JSON.stringify({ description: data }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    alert(`New task ${data} created successfully`);
  } catch (error) {
    alert(error);
  }
};

export { del, put, post };
