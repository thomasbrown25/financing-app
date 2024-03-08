import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// layout
import MainLayout from 'layouts/main-layout';
import { Grid } from '@mui/material';
import MDBox from 'components/MDBox';

// components
import UpcomingBills from 'components/UpcomingBills/upcoming-bills.component';

const UpcomingRoute = ({ categories: { categories } }) => {
  return (
    <MainLayout>
      <Grid container spacing={2} className="jc-center">
        <Grid item xs={12} lg={12}>
          <MDBox
            sx={{
              position: 'relative',
              mt: -8,
              mx: -2,
              px: 2
            }}
          >
            <UpcomingBills
              header="Upcoming Bills"
              categories={categories}
              viewAll={false}
              viewMore={true}
              amount={20}
            />
          </MDBox>
        </Grid>
      </Grid>
    </MainLayout>
  );
};
UpcomingRoute.propTypes = {
  transactions: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  frequencies: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  transactions: state.transactions,
  categories: state.categories,
  frequencies: state.frequencies
});

export default connect(mapStateToProps, {})(UpcomingRoute);
