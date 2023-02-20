import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import CategoriesList from 'components/CategoriesList/categories-list.component';
import Invoices from 'components/Invoices/invoices.component';
import MDTypography from 'components/MDTypography';
import DashboardNavbar from 'components/Navbar/DashboardNavbar';
import MainLayout from 'layouts/main-layout';
import PlaidLinkComponent from 'components/plaid-link/plaid-link.component';

import ItemContainer from 'components/ItemContainer/item-container.component';
import DefaultStatisticsCard from 'components/DefaultStatisticsCard';

// actions
import { createLinkToken, updateLinkToken } from 'store/user/user.action';
import {
  getRecurringTransactions,
  getTransactions
} from 'store/transactions/transactions.action';
import { getLiabilities } from 'store/liabilities/liabilities.action';

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
        <ItemContainer>
          <DefaultStatisticsCard
            title={'Accounts'}
            income={'currentMonthIncome'}
            expense={'currentMonthExpense'}
            description={'Totals for current month'}
            accounts={accounts}
            cashAmount={cashAmount}
          />
        </ItemContainer>

        <ItemContainer>
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
        </ItemContainer>

        <ItemContainer>
          <Invoices transactions={incomeTransactions} />
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
