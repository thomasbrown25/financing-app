import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// layout
import DashboardNavbar from 'components/Navbar/DashboardNavbar';
import MainLayout from 'layouts/main-layout';
import { Card, Grid } from '@mui/material';
import Header from 'components/Header/header.component';
import MDTypography from 'components/MDTypography';

// components
import UpcomingBills from 'components/UpcomingBills/upcoming-bills.component';
import AddNewBill from 'components/AddNewBill/add-new-bill.component';

// actions
import { getExpenses } from 'store/transactions/transactions.action';
import { addRecurringTransaction } from 'store/transactions/transactions.action';
import Incomes from 'components/Incomes/incomes.component';
import MDBox from 'components/MDBox';

const IncomeRoute = ({
  transactions: { expenses, incomes, tithes, totalIncome },
  getExpenses,
  categories: { categories },
  addRecurringTransaction
}) => {
  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  return (
    <MainLayout>
      <DashboardNavbar />
      <Grid container spacing={2} className="jc-center">
        <Header title={'Income'} />
        <Grid item xs={12} sm={12} md={12} lg={3}></Grid>

        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Card>
            <MDBox p={2}>
              <Incomes
                transactions={incomes}
                tithes={tithes}
                totalIncome={totalIncome}
                viewAll={false}
              />
            </MDBox>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={3} />
      </Grid>
    </MainLayout>
  );
};
IncomeRoute.propTypes = {
  transactions: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  getExpenses: PropTypes.func.isRequired,
  addRecurringTransaction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  transactions: state.transactions,
  categories: state.categories
});

export default connect(mapStateToProps, {
  getExpenses,
  addRecurringTransaction
})(IncomeRoute);
