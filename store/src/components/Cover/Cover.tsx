import { Backdrop, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FC, useState } from 'react';

const Cover: FC<{ isOpen: boolean }> = (props) => {
  const [open, setOpen] = useState(props.isOpen);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate('/login');
  };

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <Link component={RouterLink} to="/login" variant="h5" color='secondary'>
        Please, login to continue
      </Link>
    </Backdrop>
  );
};

export default Cover;
