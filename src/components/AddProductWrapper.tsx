import { useState } from 'react';
import AddProduct from '../pages/userDashboard/AddProduct';

const AddProductWrapper = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => setOpenModal(!openModal);

  return <AddProduct openModal={openModal} handleModal={handleModal} />;
};

export default AddProductWrapper;