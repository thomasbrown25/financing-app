import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// layout
import DashboardNavbar from 'components/Navbar/DashboardNavbar';
import MainLayout from 'layouts/main-layout';
import { Grid } from '@mui/material';
import Header from 'components/Header/header.component';

// components
import Transactions from 'components/Transactions/transactions.component';

// actions
import { getTransactions } from 'store/transactions/transactions.action';

const TransactionsRoute = ({
  transactions: { transactions },
  getTransactions
}) => {
  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return (
    <MainLayout>
      <DashboardNavbar />
      <Grid container spacing={2} className="jc-center">
        <Header title={'Transactions'} />
        <Grid item xs={12} sm={12} md={12} lg={3} />

        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Transactions
            transactions={transactions}
            viewAll={false}
            viewMore={true}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={3} />
      </Grid>
    </MainLayout>
  );
};
TransactionsRoute.propTypes = {
  transactions: PropTypes.object.isRequired,
  getTransactions: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  transactions: state.transactions
});

export default connect(mapStateToProps, { getTransactions })(TransactionsRoute);
