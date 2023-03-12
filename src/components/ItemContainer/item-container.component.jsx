import { Grid } from '@mui/material';

const ItemContainer = ({ children, ...rest }) => {
  return (
    <>
      <Grid item xs={12} sm={12} md={12} lg={3}></Grid>
      <Grid item {...rest}>
        {children}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={3}></Grid>
    </>
  );
};

export default ItemContainer;
