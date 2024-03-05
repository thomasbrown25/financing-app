import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MainLayout from 'layouts/main-layout';
import PlaidLink from 'components/plaid-link/plaid-link.component';

// Mui components
import { Fade, Grid, Card } from '@mui/material';

// components
import Header from 'components/Header/header.component';
import Accounts from 'components/Accounts/accounts.component';
import Transactions from 'components/Transactions/transactions.component';
import UpcomingBills from 'components/UpcomingBills/upcoming-bills.component';
import RecentBills from 'components/RecentBills/recent-bills.component';
import Footer from 'layouts/footer';

// actions
import { createLinkToken, updateLinkToken } from 'store/user/user.action';
import { getCategories } from 'store/categories/categories.action';
import {
  getRecurringTransactions,
  getTransactions,
  getRecentBills
} from 'store/transactions/transactions.action';
import { getAccountsBalance } from 'store/accounts/accounts.action';

const DashboardRoute = ({
  user: { currentUser, loading },
  transactions: { transactions, recentBills, expenses },
  getTransactions,
  getRecurringTransactions,
  getAccountsBalance,
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
  }, [currentUser?.accessToken, getTransactions]);

  useEffect(() => {
    if (currentUser?.accessToken) {
      getRecurringTransactions();
    }
  }, [currentUser?.accessToken, getRecurringTransactions]);

  useEffect(() => {
    if (currentUser?.accessToken) {
      getAccountsBalance();
    }
  }, [currentUser?.accessToken, getAccountsBalance]);

  return (
    <MainLayout>
      <Grid container spacing={2} className="jc-center">
        <Grid item xs={12} lg={12}>
          <Card
            sx={{
              position: 'relative',
              mt: -8,
              mx: 3,
              px: 2
            }}
          >
            <Header title="Dashboard" />
            {!currentUser?.accessToken && (
              <PlaidLink buttonText="Add Accounts" gettingStarted />
            )}
            <Accounts />
          </Card>
        </Grid>

        {recentBills && (
          <Fade in={recentBills.length > 0}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <RecentBills title={'Recent Bills'} bills={recentBills} />
            </Grid>
          </Fade>
        )}

        {/* Upcoming Bills */}
        {expenses && (
          <Fade in={expenses.length > 0}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <UpcomingBills title="Upcoming Bills" />
            </Grid>
          </Fade>
        )}

        {transactions && (
          <Fade in={transactions.length > 0}>
            <Grid item xs={12} lg={12}>
              <Transactions
                title="Transactions"
                transactions={transactions}
                uppercase={true}
              />
            </Grid>
          </Fade>
        )}
      </Grid>
      <Footer />
    </MainLayout>
  );
};
DashboardRoute.propTypes = {
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
  createLinkToken: PropTypes.func.isRequired,
  updateLinkToken: PropTypes.func.isRequired,
  getRecurringTransactions: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  getRecentBills: PropTypes.func.isRequired,
  getAccountsBalance: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  transactions: state.transactions,
  accounts: state.accounts
});

export default connect(mapStateToProps, {
  createLinkToken,
  updateLinkToken,
  getRecurringTransactions,
  getTransactions,
  getRecentBills,
  getAccountsBalance,
  getCategories
})(DashboardRoute);
