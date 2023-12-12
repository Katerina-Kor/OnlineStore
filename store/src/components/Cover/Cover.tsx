import { Backdrop, Button } from '@mui/material';
import { FC, useState } from 'react';

const Cover: FC<{ isOpen: boolean }> = (props) => {
  const [open, setOpen] = useState(props.isOpen);
  const handleClose = () => {
    setOpen(false);
  };
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Show backdrop</Button> */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <div>Please, login</div>
      </Backdrop>
    </div>
  );
};

export default Cover;
