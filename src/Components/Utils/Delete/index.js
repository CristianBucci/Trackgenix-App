const deleteItem = async ({ id, path, list, setList, setModalContent, setShowModalMessage }) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${path}/${id}`, {
      method: 'DELETE'
    });
    if (response.status === 204) {
      setModalContent({
        title: 'SUCCESS!',
        content: `${path} whit id ${id} successfully deleted`
      });
      setShowModalMessage(true);
      setList([...list.filter((item) => item._id !== id)]);
    } else {
      setModalContent({
        title: 'ERROR!',
        content: `${path} could not be removed.`
      });
      setShowModalMessage(true);
    }
  } catch (error) {
    alert(`${path} could not be removed.`, error);
  }
};

export default deleteItem;
