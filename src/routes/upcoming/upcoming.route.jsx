import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// layout
import DashboardNavbar from 'components/Navbar/DashboardNavbar';
import MainLayout from 'layouts/main-layout';
import { Grid } from '@mui/material';
import Header from 'components/Header/header.component';

// components
import UpcomingBills from 'components/UpcomingBills/upcoming-bills.component';

// actions
import { getExpenses } from 'store/transactions/transactions.action';
import MDTypography from 'components/MDTypography';
import AddNewBill from 'components/AddNewBill/add-new-bill.component';

const UpcomingRoute = ({
  transactions: { expenses },
  getExpenses,
  categories: { categories }
}) => {
  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  return (
    <MainLayout>
      <DashboardNavbar />
      <Grid container spacing={2} className="jc-center">
        <Header title={'Upcoming Bills'} />
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <AddNewBill categories={categories} />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6}>
          <UpcomingBills
            transactions={expenses}
            viewAll={false}
            viewMore={true}
            amount={20}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={3} />
      </Grid>
    </MainLayout>
  );
};
UpcomingRoute.propTypes = {
  transactions: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  getExpenses: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  transactions: state.transactions,
  categories: state.categories
});

export default connect(mapStateToProps, { getExpenses })(UpcomingRoute);
