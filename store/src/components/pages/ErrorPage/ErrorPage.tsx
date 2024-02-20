import { ImageListItem, Stack, Typography } from "@mui/material";
import { FC } from "react";
import image404 from '../../../assets/img/404-error.jpg'

const ErrorPage: FC = () => {
  return (
    <Stack justifyContent={'center'} alignItems={'center'}>
      <ImageListItem component={'div'} sx={{ width: '70%' }}>
        <img src={image404} alt="product image" loading="lazy" />
      </ImageListItem>
      <Typography variant="h5">Sorry, we cannot find this page...</Typography>
    </Stack>
  )
}

export default ErrorPage;