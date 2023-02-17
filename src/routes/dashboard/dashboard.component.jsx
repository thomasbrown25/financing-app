import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import CategoriesList from 'components/CategoriesList/categories-list.component';
import Invoices from 'components/Invoices/invoices.component';
import MDTypography from 'components/MDTypography';
import DashboardNavbar from 'components/Navbar/DashboardNavbar';
import MainLayout from 'layouts/main-layout';

// actions
import { createLinkToken, updateLinkToken } from 'store/user/user.action';
import {
  getRecurringTransactions,
  getTransactions
} from 'store/transactions/transactions.action';
import PlaidLinkComponent from 'components/plaid-link/plaid-link.component';

const Dashboard = ({
  user: { currentUser, isLinkValid, loading },
  transactions: {
    accounts,
    transactions,
    expenseTransactions,
    incomeTransactions,
    recurringTransactions
  },
  getTransactions,
  getRecurringTransactions,
  createLinkToken
}) => {
  useEffect(() => {
    if (
      (!currentUser?.accessToken && !loading) ||
      (!currentUser?.isLinkValid && !loading)
    ) {
      createLinkToken();
    }
  }, [
    currentUser?.accessToken,
    createLinkToken,
    currentUser?.isLinkValid,
    loading
  ]);

  useEffect(() => {
    if (currentUser?.accessToken) {
      getTransactions();
    }
  }, [currentUser?.accessToken, getTransactions, loading]);

  useEffect(() => {
    if (currentUser?.accessToken) {
      getRecurringTransactions();
    }
  }, [currentUser?.accessToken, getRecurringTransactions, loading]);
  return (
    <MainLayout>
      <DashboardNavbar />
      {!currentUser?.linkToken && (
        <PlaidLinkComponent
          linkToken={currentUser?.linkToken}
          isLinkValid={isLinkValid}
        />
      )}
      <Grid container spacing={2} className="jc-center">
        <Grid item xs={12} sm={4} />
        <Grid item xs={12} sm={4}>
          <CategoriesList title="cash" accounts={accounts} />
        </Grid>
        <Grid item xs={12} sm={4} />
        <Grid item xs={12} sm={4} />
        <Grid item xs={12} sm={4}>
          <CategoriesList
            title="credit"
            accounts={[
              {
                name: 'BOA Credit Card',
                officialName: 'BOA',
                balance: { available: '$2,307' }
              }
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={4} />
        <Grid item xs={12} sm={4} />
        <Grid item xs={12} sm={4}>
          {/* <CategoriesList
            title="loans"
            categories={[
              {
                color: 'dark',
                icon: 'currency_exchange',
                name: 'Student Loan',
                description: (
                  <>
                    SoFi -{' '}
                    <MDTypography
                      variant="caption"
                      color="text"
                      fontWeight="medium"
                    >
                      $4,802
                    </MDTypography>
                  </>
                ),
                route: '/'
              },
              {
                color: 'dark',
                icon: 'currency_exchange',
                name: 'Personal Loan',
                description: (
                  <>
                    Upgrade -{' '}
                    <MDTypography
                      variant="caption"
                      color="text"
                      fontWeight="medium"
                    >
                      $3,731
                    </MDTypography>
                  </>
                ),
                route: '/'
              }
            ]}
          /> */}
        </Grid>
        <Grid item xs={12} sm={4} />
        <Grid item xs={12} sm={4} />
        <Grid item xs={12} sm={4}>
          <Invoices transactions={incomeTransactions} />
        </Grid>
        <Grid item xs={12} sm={4} />
      </Grid>
    </MainLayout>
  );
};
Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
  createLinkToken: PropTypes.func.isRequired,
  updateLinkToken: PropTypes.func.isRequired,
  getRecurringTransactions: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  transactions: state.transactions
});

export default connect(mapStateToProps, {
  createLinkToken,
  updateLinkToken,
  getRecurringTransactions,
  getTransactions
})(Dashboard);
