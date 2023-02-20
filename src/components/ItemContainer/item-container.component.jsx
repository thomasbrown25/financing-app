import { Grid } from '@mui/material';

const ItemContainer = ({ children }) => {
  return (
    <>
      <Grid item xs={12} sm={4}>
        {children}
      </Grid>
    </>
  );
};

export default ItemContainer;
