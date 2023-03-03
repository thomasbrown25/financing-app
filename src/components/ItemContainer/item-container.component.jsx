import { Grid } from '@mui/material';

const ItemContainer = ({ children }) => {
  return (
    <>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        {children}
      </Grid>
    </>
  );
};

export default ItemContainer;
