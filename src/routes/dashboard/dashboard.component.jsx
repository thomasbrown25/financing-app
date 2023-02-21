import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import MDTypography from 'components/MDTypography';
import DashboardNavbar from 'components/Navbar/DashboardNavbar';
import MainLayout from 'layouts/main-layout';
import PlaidLinkComponent from 'components/plaid-link/plaid-link.component';

import ItemContainer from 'components/ItemContainer/item-container.component';
import Accounts from 'components/Accounts/accounts.component';

// actions
import { createLinkToken, updateLinkToken } from 'store/user/user.action';
import {
  getRecurringTransactions,
  getTransactions
} from 'store/transactions/transactions.action';
import { getLiabilities } from 'store/liabilities/liabilities.action';
import Header from 'components/Header/header.component';
import Calendar from 'components/Calendar/calendar.component';
import Transactions from 'components/Transactions/transactions.component';

const Dashboard = ({
  user: { currentUser, isLinkValid, loading },
  transactions: {
    accounts,
    transactions,
    expenseTransactions,
    incomeTransactions,
    recurringTransactions,
    cashAmount
  },
  liabilities: { liabilities },
  getTransactions,
  getRecurringTransactions,
  getLiabilities,
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

  useEffect(() => {
    if (currentUser?.accessToken) {
      getLiabilities();
    }
  }, [currentUser?.accessToken, getLiabilities, loading]);

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
        <Header />
        <ItemContainer>
          <Accounts
            title={'Accounts'}
            income={'currentMonthIncome'}
            expense={'currentMonthExpense'}
            description={'Totals for current month'}
            dropdown={true}
            accounts={accounts}
            cashAmount={cashAmount}
            incomeTransactions={incomeTransactions}
          />
        </ItemContainer>

        <ItemContainer>
          <Transactions />
        </ItemContainer>

        <ItemContainer>
          <Calendar />
        </ItemContainer>
      </Grid>
    </MainLayout>
  );
};
Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
  liabilities: PropTypes.object.isRequired,
  createLinkToken: PropTypes.func.isRequired,
  updateLinkToken: PropTypes.func.isRequired,
  getRecurringTransactions: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  getLiabilities: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  transactions: state.transactions,
  liabilities: state.liabilities
});

export default connect(mapStateToProps, {
  createLinkToken,
  updateLinkToken,
  getRecurringTransactions,
  getTransactions,
  getLiabilities
})(Dashboard);
