import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// layout
import DashboardNavbar from 'components/Navbar/DashboardNavbar';
import MainLayout from 'layouts/main-layout';
import { Grid } from '@mui/material';
import Header from 'components/Header/header.component';
import MDTypography from 'components/MDTypography';

// components
import UpcomingBills from 'components/UpcomingBills/upcoming-bills.component';
import AddNewBill from 'components/AddNewBill/add-new-bill.component';

// actions
import { getExpenses } from 'store/transactions/transactions.action';
import { addRecurringTransaction } from 'store/transactions/transactions.action';

const UpcomingRoute = ({
  transactions: { expenses },
  getExpenses,
  categories: { categories },
  frequencies: { frequencies },
  addRecurringTransaction
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
          <AddNewBill
            categories={categories}
            frequencies={frequencies}
            addRecurringTransaction={addRecurringTransaction}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6}>
          <UpcomingBills
            transactions={expenses}
            frequencies={frequencies}
            categories={categories}
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
  getExpenses: PropTypes.func.isRequired,
  frequencies: PropTypes.object.isRequired,
  addRecurringTransaction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  transactions: state.transactions,
  categories: state.categories,
  frequencies: state.frequencies
});

export default connect(mapStateToProps, {
  getExpenses,
  addRecurringTransaction
})(UpcomingRoute);
