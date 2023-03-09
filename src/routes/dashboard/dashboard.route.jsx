import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import DashboardNavbar from 'components/Navbar/DashboardNavbar';
import MainLayout from 'layouts/main-layout';
import PlaidLink from 'components/plaid-link/plaid-link.component';
import { ColorRing } from 'react-loader-spinner';

// components
import Header from 'components/Header/header.component';
import ItemContainer from 'components/ItemContainer/item-container.component';
import Accounts from 'components/Accounts/accounts.component';
import Calendar from 'components/Calendar/calendar.component';
import Transactions from 'components/Transactions/transactions.component';
import UpcomingBills from 'components/UpcomingBills/upcoming-bills.component';
import Footer from 'layouts/authentication/footer';

// actions
import { createLinkToken, updateLinkToken } from 'store/user/user.action';
import {
  getRecurringTransactions,
  getTransactions
} from 'store/transactions/transactions.action';
import { getAccountsBalance } from 'store/accounts/accounts.action';
import { ItemLoginRequired } from 'utils/plaid-errors';
import MDTypography from 'components/MDTypography';
import { getCategories } from 'store/categories/categories.action';

const DashboardRoute = ({
  user: { currentUser, isLinkValid, loading },
  accounts: { cashAccounts, creditAccounts },
  transactions: {
    transactions,
    expenses,
    incomes,
    recurringTransactions,
    tithes
  },
  categories: { categories },
  refresh: { syncing, refreshError },
  getTransactions,
  getRecurringTransactions,
  getAccountsBalance,
  createLinkToken,
  getCategories
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

  const [isPlaidError, setIsPlaidError] = useState(false);

  useEffect(() => {
    if (currentUser?.accessToken) {
      getTransactions();
    }
  }, [currentUser?.accessToken, getTransactions, loading]);

  useEffect(() => {
    if (currentUser?.accessToken) {
      getCategories();
    }
  }, [currentUser?.accessToken, getCategories, loading]);

  useEffect(() => {
    if (currentUser?.accessToken) {
      getRecurringTransactions();
    }
  }, [currentUser?.accessToken, getRecurringTransactions, loading]);

  useEffect(() => {
    if (currentUser?.accessToken) {
      getAccountsBalance();
    }
  }, [currentUser?.accessToken, getAccountsBalance, loading]);

  useEffect(() => {
    if (refreshError?.error_code === 3) {
      setIsPlaidError(true);
    }
  }, [refreshError]);

  useEffect(() => {
    if (!syncing) {
      getTransactions();
      getRecurringTransactions();
      getAccountsBalance();
      getCategories();
    }
  }, [syncing, currentUser?.accessToken]);

  return (
    <MainLayout>
      <DashboardNavbar />
      {!currentUser?.accessToken && (
        <PlaidLink
          linkToken={currentUser?.linkToken}
          isLinkValid={isLinkValid}
        />
      )}

      {syncing ? (
        <ColorRing
          visible={true}
          height="150"
          width="150"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="center-item"
          colors={['#1A73E8', '#1662C4', '#1A73E8', '#1662C4', '#1A73E8']}
          className="center-item"
        />
      ) : (
        <Grid container spacing={2} className="jc-center">
          <Header error={refreshError} />
          <ItemContainer>
            <Accounts
              title={'Accounts'}
              cashAccounts={cashAccounts}
              creditAccounts={creditAccounts}
              incomes={incomes}
              tithes={tithes}
            />
          </ItemContainer>

          <ItemContainer>
            <UpcomingBills transactions={expenses} categories={categories} />
          </ItemContainer>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Calendar
              events={recurringTransactions}
              header={{ title: 'Upcoming' }}
            />
          </Grid>

          <Grid item xs={12} lg={12}>
            <Transactions transactions={transactions} uppercase={true} />
          </Grid>
        </Grid>
      )}
      <Footer />
    </MainLayout>
  );
};
DashboardRoute.propTypes = {
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
  refresh: PropTypes.object.isRequired,
  createLinkToken: PropTypes.func.isRequired,
  updateLinkToken: PropTypes.func.isRequired,
  getRecurringTransactions: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  getAccountsBalance: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  transactions: state.transactions,
  accounts: state.accounts,
  categories: state.categories,
  refresh: state.refresh
});

export default connect(mapStateToProps, {
  createLinkToken,
  updateLinkToken,
  getRecurringTransactions,
  getTransactions,
  getAccountsBalance,
  getCategories
})(DashboardRoute);
